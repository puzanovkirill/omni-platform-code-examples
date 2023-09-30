import { REQUIRED_PROFILES_FIELDS } from '../../../consts';

const filterProfilesRequiredFields = (fields: string[]) =>
  fields.filter((field) => !REQUIRED_PROFILES_FIELDS.includes(field));

export { filterProfilesRequiredFields };
