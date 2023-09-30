import {
  FormControl,
  HStack,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CustomFormLabel } from '../../../../../elements';

type TProfileSort = {
  value: string;
  handleChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function ProfilesSort({ handleChangeSelect, value }: TProfileSort) {
  const { t } = useTranslation('pages');
  const selectColor = useColorModeValue('white', 'gray.800');

  const ProfileSortFields = [
    'creation_date',
    '-creation_date',
    'last_modified',
    '-last_modified',
    'info__name',
    '-info__name',
    'info__age',
    '-info__age',
    'info__gender',
    '-info__gender',
    'profile_groups__title',
    '-profile_groups__title',
  ];

  return (
    <FormControl>
      <CustomFormLabel label={t('Profiles.Filters.Sort.Label')} />
      <HStack>
        <Select
          borderRadius="md"
          size="sm"
          bg={selectColor}
          name="sort"
          onChange={handleChangeSelect}
          value={value}
        >
          {ProfileSortFields.map((field) => (
            <option value={field} key={field}>
              {t(`Profiles.Filters.Sort.${field}`)}
            </option>
          ))}
        </Select>
      </HStack>
    </FormControl>
  );
}

export default ProfilesSort;
