import { useTranslation } from 'react-i18next';
import { FilterInput } from '../../../../../elements';

function PersonName() {
  const { t } = useTranslation('components');

  return <FilterInput id="name" label={t('Filters.Name')} />;
}

export default PersonName;
