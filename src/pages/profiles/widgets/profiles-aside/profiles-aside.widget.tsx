import { Funnel, Info } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { Text, VStack, useDisclosure } from '@chakra-ui/react';
import { Aside } from '../../../../blocks';
import { TAsideElement } from '../../../../consts';
import { isAsideOpen } from '../../../../helpers';
import ProfileFilters from '../profile-filters/profile-filters.widget';

function ProfilesAside() {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: isAsideOpen(),
  });
  const { t } = useTranslation('pages');

  // Если группа только что создана и открывается впервые, то aside открывается вне
  // зависимости от того, какие настройки в куках. После открытия параметр удаляется

  const asideElements: TAsideElement[] = [
    {
      title: t('Profiles.RightMenu.Filters.title'),
      icon: Funnel,
      content: <ProfileFilters />,
    },
    {
      title: t('Profiles.RightMenu.Info.title'),
      icon: Info,
      content: (
        <VStack spacing="4" alignItems="flex-start">
          <Text>{t('Profiles.RightMenu.Info.description')}</Text>
        </VStack>
      ),
    },
  ];

  return (
    <Aside
      elements={asideElements}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    />
  );
}

export default ProfilesAside;
