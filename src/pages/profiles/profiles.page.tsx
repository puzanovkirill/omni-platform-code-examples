import { formatNumber, useCustomQuery } from '@3divi/shared-components';
import { useReactiveVar } from '@apollo/client';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PaginationLimits } from '../../consts';
import { GET_GROUPS, TGroupsList } from '../../domains/group';
import {
  GET_PROFILES_LIST,
  TListProfileMainInfo,
  TProfileMainInfo,
  useGetProfileFilters,
} from '../../domains/profiles';
import { Page, PersonCreateButton } from '../../elements';
import { useChangePolling, useGetPaginatedItems } from '../../hooks';
import { pollingDateVar } from '../../providers/apollo-client';
import {
  ManageProfilesButtons,
  ProfilesTableHeader,
  ProfilesTableRow,
} from './components';
import { ProfilesAside } from './widgets';

const ProfilesTableHeaderTitles = [
  'Profiles.ProfileInfo.Photo',
  'Profiles.ProfileInfo.Name',
  'Profiles.ProfileInfo.Gender',
  'Profiles.ProfileInfo.Age',
  'Profiles.ProfileInfo.Groups',
  'Profiles.ProfileInfo.Activities',
];

function ProfilesPage() {
  const { t } = useTranslation('pages');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const pollingDate = useReactiveVar(pollingDateVar);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { filters, ids, order } = useGetProfileFilters();
  const { setStartDate } = useChangePolling('persons', [GET_PROFILES_LIST]);

  const {
    items: profiles,
    pagination,
    totalCount,
    loading,
  } = useGetPaginatedItems<TProfileMainInfo>(GET_PROFILES_LIST, {
    order,
    filter: JSON.stringify(filters),
    limit: PaginationLimits.PROFILES,
    isPolling: true,
    variables: { ids },
  });

  const { data: groupsData, loading: groupsLoading } =
    useCustomQuery<TGroupsList>(GET_GROUPS, {
      fetchPolicy: 'cache-and-network',
      variables: { withItems: true },
    });

  const groupsList = groupsData?.items.collectionItems ?? [];

  const { data: countData } = useCustomQuery<TListProfileMainInfo>(
    GET_PROFILES_LIST,
    {
      variables: {
        filter: JSON.stringify({
          ...filters,
          creation_date__lte: undefined,
          creation_date__gte: pollingDate.persons ?? undefined,
        }),
        withItems: false,
      },
      isPolling: !!pollingDate.persons,
    }
  );

  const updatesCount = countData?.items.totalCount ?? 0;

  return (
    <>
      <Page
        templateColumns="max-content max-content minmax(100px, 1fr) minmax(150px, max-content)
            minmax(150px, max-content) minmax(150px, max-content) minmax(100px, max-content)"
        buttons={
          <ManageProfilesButtons
            selectedItems={selectedItems}
            groupsList={groupsList}
            resetSelectedItems={() => setSelectedItems([])}
          />
        }
        header={
          <ProfilesTableHeader
            profiles={profiles ?? []}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            titles={ProfilesTableHeaderTitles}
          />
        }
        updatesCounter={
          !!pollingDate.persons && updatesCount ? (
            <Button
              h={8}
              w="full"
              variant="ghost"
              onClick={setStartDate}
              borderRadius="none"
              textAlign="center"
              fontWeight="normal"
              gridColumn={`1 / ${ProfilesTableHeaderTitles.length + 2}`}
              borderBottom="1px"
              borderColor={borderColor}
            >
              {t('Profiles.UpdatesCount', {
                updatesCount: formatNumber(updatesCount),
              })}
            </Button>
          ) : null
        }
        body={profiles?.map((profile) => (
          <ProfilesTableRow
            key={profile.id}
            profile={profile}
            setSelectedItems={setSelectedItems}
            isChecked={selectedItems.some((item) => item === profile.id)}
          />
        ))}
        noItemsComponents={<PersonCreateButton />}
        loading={loading || groupsLoading}
        pagination={pagination}
        totalCount={totalCount}
        noItemsTitle={t('Profiles.NoProfile')}
        noItemsTitleWithFilters={t(`Profiles.NoFilterProfile`)}
      />
      <ProfilesAside />
    </>
  );
}

export default ProfilesPage;
