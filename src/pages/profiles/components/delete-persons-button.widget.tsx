import {
  Button,
  Icon,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Trash } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { useDeleteProfiles } from '../../../domains/profiles';
import { DeleteModal } from '../../../modals';

type TDeletePersonsButton = {
  isDisabled: boolean;
  resetSelectedItems: () => void;
  selectedItems: string[];
};

function DeletePersonsButton({
  isDisabled,
  resetSelectedItems,
  selectedItems,
}: TDeletePersonsButton) {
  const { t } = useTranslation('components');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProfiles, loading: deleteLoading } = useDeleteProfiles(
    t(`Modal.DeleteProfile.ErrorDeleteProfiles`),
    t(`Modal.DeleteProfile.SuccessDeleteProfiles`),
    undefined
  );
  const color = useColorModeValue('black', 'white');
  const redColor = useColorModeValue('red', 'red.200');

  const handleDeleteProfiles = () => {
    deleteProfiles(selectedItems);
    resetSelectedItems();
    onClose();
  };

  return (
    <>
      <Button
        pl={2}
        leftIcon={
          <Icon as={Trash} w={5} h={5} color={isDisabled ? color : redColor} />
        }
        onClick={onOpen}
        size="sm"
        ml={4}
        variant="outline"
        fontWeight="normal"
        isDisabled={isDisabled || deleteLoading}
      >
        {t('common:Delete')}
      </Button>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        bodyText={t(
          `Modal.DeleteProfile.${
            selectedItems.length > 1
              ? 'DeleteSelectedProfiles'
              : 'DeleteSelectedProfile'
          }`
        )}
        callback={handleDeleteProfiles}
        headerText={t(
          `Modal.DeleteProfile.${
            selectedItems.length > 1 ? 'SelectedTitleMany' : 'SelectedTitleOne'
          }`
        )}
        loading={deleteLoading}
      />
    </>
  );
}

export default DeletePersonsButton;
