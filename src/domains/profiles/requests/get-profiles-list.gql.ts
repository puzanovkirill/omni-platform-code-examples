import { gql } from '@apollo/client';
import { TActivitiesItem } from '../../activity';
import { TGroup } from '../../group';
import { TProfileInfo } from './get-one-profile.gql';

type TProfileMainInfo = {
  id: string;
  activitiesCount: number;
  lastActivityDate: string;
  profileGroups: TGroup[];
  avatar: string;
  info: TProfileInfo;
  activities: TActivitiesItem[];
};

type TListProfileMainInfo = {
  items: {
    totalCount: number;
    collectionItems?: Array<TProfileMainInfo>;
  };
};

const GET_PROFILES_LIST = gql`
  query GetListProfileMainInfo(
    $offset: Int
    $limit: Int
    $filter: JSONString
    $ids: [ID]
    $order: [String]
    $withItems: Boolean!
  ) {
    items: profiles(
      offset: $offset
      limit: $limit
      order: $order
      filter: $filter
      ids: $ids
    ) {
      totalCount
      collectionItems @include(if: $withItems) {
        avatar
        id
        activitiesCount
        lastActivityDate
        info
        profileGroups {
          id
          title
          info
        }
        activities {
          bestShotId
          data
        }
      }
    }
  }
`;

export { GET_PROFILES_LIST, type TProfileMainInfo, type TListProfileMainInfo };
