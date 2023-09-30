import { TProfileInfo } from '../requests';

const deleteProfileInfoIdsFields = (info: TProfileInfo) => {
  const newProfileInfo: TProfileInfo = {
    ...info,
    age: info.age ? info.age.toString() : info.age,
  };

  delete newProfileInfo.main_sample_id;
  delete newProfileInfo.avatar_id;

  return newProfileInfo;
};

export { deleteProfileInfoIdsFields };
