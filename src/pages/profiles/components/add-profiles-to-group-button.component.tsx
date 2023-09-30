import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { UserPlus } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { TGroup } from '../../../domains/group';
import { useAddProfilesToGroup } from '../../../domains/profiles';

type TAddProfilesToGroupButton = {
  groupsList: TGroup[];
  selectedPersons: string[];
  resetSelectedItems: () => void;
  isDisabled: boolean;
  shouldRefetch?: boolean;
};

function AddProfilesToGroupMenu({
  groupsList,
  selectedPersons,
  resetSelectedItems,
  isDisabled,
  shouldRefetch = true,
}: TAddProfilesToGroupButton) {
  const { addProfilesToGroup, loading } = useAddProfilesToGroup(shouldRefetch);
  const { t } = useTranslation('pages');
  const color = useColorModeValue('black', 'white');
  const blueColor = useColorModeValue('blue.500', 'blue.200');

  const handleAddPersons = (id: string) => {
    addProfilesToGroup(id, selectedPersons);
    resetSelectedItems();
  };

  return (
    <Menu>
      <MenuButton
        pl={2}
        leftIcon={
          <Icon
            as={UserPlus}
            w={5}
            h={5}
            color={isDisabled ? color : blueColor}
          />
        }
        as={Button}
        size="sm"
        variant="outline"
        ml={6}
        fontWeight="normal"
        isDisabled={isDisabled || loading}
      >
        {t('Profiles.AddToGroup')}
      </MenuButton>
      <MenuList maxH={64} overflowY="auto">
        {groupsList.map((group) => (
          <MenuItem key={group.id} onClick={() => handleAddPersons(group.id)}>
            <Text maxW={48}>{group.title}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default AddProfilesToGroupMenu;
