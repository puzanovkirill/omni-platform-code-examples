import { HttpLink, makeVar, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { INTERNAL_API } from '../consts';
import { SequrOsIntegrationAPITitles } from '../domains/sequr-os-integration';
import { EventServiceAPITitle } from '../domains/events';
import {
  accessVar,
  client,
  licenseVar,
  setClientLinks,
  workspaceVar,
} from './client.ts';

export const pollingDateVar = makeVar<{
  [x: string]: string | null;
}>({
  notifications: null,
  activities: null,
  persons: null,
  events: null,
});

const SecureOsIntegrationHttpLink = new HttpLink({
  uri: () => `/securos-integration-service/`,
});

const eventServiceHttpLink = new HttpLink({
  uri: () => `/event-service/graphql`,
});

const authLink = setContext((_, { headers }) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  headers: {
    ...headers,
    Token: workspaceVar(),
  },
}));

const eventServiceAuthLink = setContext((_, { headers }) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  headers: {
    ...headers,
    Token: accessVar(),
  },
}));

const selectEventServiceApiUrl = split(
  (operation) => EventServiceAPITitle.includes(operation.operationName),
  eventServiceAuthLink.concat(eventServiceHttpLink),
  new HttpLink({
    uri: () =>
      `/api/v2/${workspaceVar() ? `?workspace_id=${workspaceVar()}` : ''}`,
  })
);

const selectIntegrationApiUrl = split(
  (operation) => SequrOsIntegrationAPITitles.includes(operation.operationName),
  authLink.concat(SecureOsIntegrationHttpLink),
  selectEventServiceApiUrl
);
/**
 * В зависимости от имени запроса GraphQL выбирает точку входа в API
 */
const selectApiUrl = split(
  (operation) => INTERNAL_API.includes(operation.operationName),
  new HttpLink({
    uri: () =>
      `/internal-api/v2/?${
        workspaceVar() ? `workspace_id=${workspaceVar()}` : ''
      }${licenseVar() ? `&license_id=${licenseVar()}` : ''}`,
  }),
  selectIntegrationApiUrl
);

setClientLinks(selectApiUrl);

export { client };
