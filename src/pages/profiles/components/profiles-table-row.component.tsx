import { useTranslation } from 'react-i18next';
import { SetStateAction } from 'react';
import { Box, Link, Text } from '@chakra-ui/react';
import { ProfileImage } from '../../../elements';
import { TableRow } from '../../../elements/table';
import ProfileCheckbox from './profile-checkbox.element';
import GroupRounds from './group-rounds.element';
import missingImageLight from '../../../static/missing-image-light.svg';
import missingImageDark from '../../../static/missing-image-dark.svg';
import anonymousLight from '../../../static/anonymous-light.svg';
import anonymousDark from '../../../static/anonymous-dark.svg';
import {
  getApproximateProfileAge,
  TProfileMainInfo,
} from '../../../domains/profiles';
import { ManageProfileModal } from '../../../modals';
import { getActivityImage, getImageUrl } from '../../../helpers';

type TProfilesTableRow = {
  profile: TProfileMainInfo;
  setSelectedItems: (value: SetStateAction<string[]>) => void;
  isChecked: boolean;
};

function ProfilesTableRow({
  profile,
  setSelectedItems,
  isChecked,
}: TProfilesTableRow) {
  const { t } = useTranslation('pages');
  const isAnonymous =
    profile.activities.length &&
    profile.activities.every((activity) => getActivityImage(activity)) &&
    !profile.avatar;

  const getModals = (isOpen: boolean, onClose: () => void) =>
    isOpen ? (
      <ManageProfileModal isOpen={isOpen} onClose={onClose} id={profile.id} />
    ) : undefined;

  return (
    <Box display="contents" role="group">
      <ProfileCheckbox
        setSelectedItems={setSelectedItems}
        id={profile.id}
        isChecked={isChecked}
      />
      <TableRow getModals={getModals}>
        <Link
          pointerEvents={profile.avatar ? 'all' : 'none'}
          target="_blank"
          href={getImageUrl(profile.avatar)}
          onClick={(e) => e.stopPropagation()}
        >
          <ProfileImage
            sampleId={profile.avatar}
            size="50px"
            // проверка на анонимность профиля - нет аватара, все активности анонимные
            fallbackDarkSrc={isAnonymous ? anonymousDark : missingImageDark}
            fallbackLightSrc={isAnonymous ? anonymousLight : missingImageLight}
          />
        </Link>
        <Text noOfLines={1} wordBreak="break-all">
          {profile.info.name || '—'}
        </Text>
        <Text noOfLines={1} wordBreak="break-all">
          {profile.info.gender
            ? t(`Profiles.ProfileCard.Gender.${profile.info.gender}`)
            : '—'}
        </Text>
        <Text noOfLines={1} wordBreak="break-all">
          {getApproximateProfileAge(Number(profile.info.age)) ?? '—'}
        </Text>
        <GroupRounds groups={profile.profileGroups} />
        <Text>{profile.activitiesCount ? profile.activitiesCount : 0}</Text>
      </TableRow>
    </Box>
  );
}

export default ProfilesTableRow;
