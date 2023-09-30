import { useTranslation } from 'react-i18next';
import { FilterInput } from '../../../../../elements';

function PersonDescription() {
  const { t } = useTranslation('components');

  return <FilterInput id="description" label={t('Filters.Description')} />;
}

export default PersonDescription;
