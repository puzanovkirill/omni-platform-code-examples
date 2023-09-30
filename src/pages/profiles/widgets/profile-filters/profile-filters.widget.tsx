import { useTranslation } from 'react-i18next';
import { FiltersBlock } from '../../../../blocks';
import { FiltersSearchParamsNames, FILTERS_NAMES } from '../../../../consts';
import {
  FilterByIds,
  FilterSelect,
  GroupsFilter,
  RadioOrCheckboxFilters,
  TRadioOrCheckboxOption,
} from '../../../../elements';
import {
  FilterGenderButtons,
  PersonAge,
  PersonDescription,
  PersonName,
} from './elements';

function ProfileFilters() {
  const { t } = useTranslation('pages');
  const options: TRadioOrCheckboxOption[] = [
    { value: 'all', label: t('Profiles.Filters.Avatar.All') },
    { value: 'true', label: t('Profiles.Filters.Avatar.With') },
    { value: 'false', label: t('Profiles.Filters.Avatar.Without') },
  ];

  return (
    <FiltersBlock filtersNames={FILTERS_NAMES.profiles}>
      <FilterSelect
        title={FiltersSearchParamsNames.SORT}
        defaultValue="-creation_date"
        fields={[
          '-creation_date',
          'creation_date',
          '-last_modified',
          'last_modified',
          '-info__name',
          'info__name',
          '-info__age',
          'info__age',
          '-info__gender',
          'info__gender',
          '-profile_groups__title',
          'profile_groups__title',
        ]}
        label={t('components:Filters.Sort')}
      />
      <RadioOrCheckboxFilters
        id={FiltersSearchParamsNames.MY_PERSON}
        label={t('Profiles.Filters.Avatar.Title')}
        options={options}
      />
      <FilterByIds id="ids" label={t('Settings.Aside.Filters.Ids')} />
      <PersonAge />
      <FilterGenderButtons />
      <PersonName />
      <PersonDescription />
      <GroupsFilter />
    </FiltersBlock>
  );
}

export default ProfileFilters;
