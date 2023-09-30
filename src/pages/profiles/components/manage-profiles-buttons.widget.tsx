import { useReactiveVar } from '@apollo/client';
import { Flex, Spacer } from '@chakra-ui/react';
import { TGroup } from '../../../domains/group';
import { GET_PROFILES_LIST } from '../../../domains/profiles';
import { RefetchControl } from '../../../elements';
import { pollingDateVar } from '../../../providers/apollo-client';
import AddProfilesToGroupMenu from './add-profiles-to-group-button.component';
import DeletePersonsButton from './delete-persons-button.widget';

type TManageProfilesButtons = {
  selectedItems: string[];
  groupsList: TGroup[];
  resetSelectedItems: () => void;
};

function ManageProfilesButtons({
  selectedItems,
  groupsList,
  resetSelectedItems,
}: TManageProfilesButtons): JSX.Element {
  const pollingDate = useReactiveVar(pollingDateVar);
  const isDisabled = selectedItems.length === 0;

  return (
    <Flex align="center" py={2}>
      <AddProfilesToGroupMenu
        groupsList={groupsList}
        selectedPersons={selectedItems}
        resetSelectedItems={resetSelectedItems}
        isDisabled={isDisabled || groupsList.length === 0}
        shouldRefetch={!pollingDate.persons}
      />
      <DeletePersonsButton
        isDisabled={isDisabled}
        resetSelectedItems={resetSelectedItems}
        selectedItems={selectedItems}
      />
      <Spacer />
      <RefetchControl
        isPolling={!pollingDate.persons}
        entity="persons"
        queries={[GET_PROFILES_LIST]}
        pr={6}
      />
    </Flex>
  );
}

export default ManageProfilesButtons;
