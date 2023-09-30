import { useTranslation } from 'react-i18next';
import { FilterInput } from '../../../../../elements';

function PersonAge() {
  const { t } = useTranslation('components');

  return <FilterInput id="age" label={t('Filters.Age')} type="number" />;
}

export default PersonAge;
