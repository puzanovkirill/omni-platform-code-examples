import { Checkbox, Flex, useColorModeValue } from '@chakra-ui/react';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { TProfileMainInfo } from '../../../domains/profiles';
import { TableHeader } from '../../../elements/table';

type TProfilesTableHeader = {
  selectedItems: string[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
  profiles: TProfileMainInfo[];
  titles: string[];
};

function ProfilesTableHeader({
  selectedItems,
  setSelectedItems,
  profiles,
  titles,
}: TProfilesTableHeader) {
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked)
      setSelectedItems(() => profiles.map((profile) => profile.id));
    else setSelectedItems(() => []);
  };

  return (
    <>
      <Flex
        alignItems="center"
        pl="4"
        borderBottom="1px"
        borderColor={borderColor}
      >
        <Checkbox
          onChange={handleOnChange}
          isChecked={
            profiles?.length === 0
              ? false
              : selectedItems.length === profiles?.length
          }
          isIndeterminate={
            selectedItems.length > 0 &&
            selectedItems.length < (profiles?.length ?? 0)
          }
          p={2}
        />
      </Flex>
      <TableHeader titles={titles} />
    </>
  );
}

export default ProfilesTableHeader;
