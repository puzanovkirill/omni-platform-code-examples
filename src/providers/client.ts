import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { t } from 'i18next';
import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { checkIsNetworkError, dev } from '../helpers';
import { NetworkError } from '@apollo/client/errors';
import { ERRORS_KEYS, ERROR_MESSAGES, INACTIVE_USER_ERROR } from '../consts';

const networkErrorToastId = 'network-error';
const toastOptions: UseToastOptions = {
  position: 'top',
  variant: 'solid',
  isClosable: false,
};
const networkToast = createStandaloneToast({
  defaultOptions: toastOptions,
});
const userBlockedToast = createStandaloneToast({
  defaultOptions: toastOptions,
});

const licenseVar = makeVar(Cookies.get('license') || '');
const workspaceVar = makeVar(Cookies.get('workspace') || '');
const authenticatedVar = makeVar(
  Cookies.get('user_status') === 'logged_in' ||
    Cookies.get('user_status') === 'logged'
);
const accessVar = makeVar(Cookies.get('access') || '');

/**
 * Очищает уведомления об отсутствии интернета, после успешного ответа от сервера
 */
const successLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    if (response.data && networkToast.toast.isActive(networkErrorToastId)) {
      networkToast.toast.update(networkErrorToastId, {
        status: 'success',
        duration: 3000,
        title: t<string>('components:errors.NetworkErrorSuccess'),
        isClosable: true,
      });
    }
    return response;
  })
);
/**
 * Проверяет ошибки.
 * Если networkError, то деалет запись в консоль.
 */
const errorLink = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors?.length) {
    if (networkToast.toast.isActive(networkErrorToastId))
      networkToast.toast.update(networkErrorToastId, {
        status: 'success',
        duration: 3000,
        title: t<string>('components:errors.NetworkErrorSuccess'),
        isClosable: true,
      });
    const message = graphQLErrors[0]?.message ?? '';
    // Проверка связана ли ошибка с авторизацией, если да - то разлогиниваемся
    if (ERROR_MESSAGES.ACCESS_DANIED.includes(message)) {
      Cookies.remove('user_status');
      Cookies.remove('workspace');
      Cookies.remove('license');
      client
        .clearStore()
        .catch((resetWorkspaceError) => dev.log(resetWorkspaceError));
      workspaceVar('');
      authenticatedVar(false);
      return;
    }
    // Проверка не заблокирован ли аккаунт
    if (message === INACTIVE_USER_ERROR) {
      userBlockedToast.toast({
        title: t<string>(`components:errors.AccountBlocked`),
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
      return;
    }
    // Все непрошедшие через проверки ошибки транслируются через наш словарь в ключ для locales
    const error = graphQLErrors[0];
    if (response && error) {
      error.message = ERRORS_KEYS[message] ?? 'SomeError';
      response.errors = [error];
    }
    dev.log(`[Error]: ${message}`);
  }
  // Если пришла ошибка сети, то активируем уведомление об отсутсвии интернета
  if (
    checkIsNetworkError(networkError) &&
    !networkToast.toast.isActive(networkErrorToastId)
  ) {
    networkToast.toast({
      id: networkErrorToastId,
      title: t<string>(`components:errors.NetworkError`),
      status: 'error',
      duration: null,
    });
  }
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error: NetworkError) => checkIsNetworkError(error),
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
});

const setClientLinks = (selectApiUrl: ApolloLink) =>
  client.setLink(from([retryLink, errorLink, successLink, selectApiUrl]));

export {
  client,
  setClientLinks,
  licenseVar,
  workspaceVar,
  authenticatedVar,
  accessVar,
};
