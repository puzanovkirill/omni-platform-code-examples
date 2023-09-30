import { Checkbox, Flex, useColorModeValue } from '@chakra-ui/react';
import { ChangeEvent, SetStateAction } from 'react';

type TProfileCheckbox = {
  setSelectedItems: (value: SetStateAction<string[]>) => void;
  id: string;
  isChecked: boolean;
};

function ProfileCheckbox({
  setSelectedItems,
  id,
  isChecked,
}: TProfileCheckbox) {
  const hoverBackground = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedItems((prevState) => [...prevState, id]);
    else
      setSelectedItems((prevState) => prevState.filter((item) => item !== id));
  };

  return (
    <Flex
      alignItems="center"
      pl="4"
      borderBottom="1px"
      borderColor={borderColor}
      _groupHover={{
        bg: hoverBackground,
      }}
    >
      <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} p={2} />
    </Flex>
  );
}

export default ProfileCheckbox;
