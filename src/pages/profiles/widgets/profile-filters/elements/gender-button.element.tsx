/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  useColorModeValue,
  useRadio,
  UseRadioProps,
} from '@chakra-ui/react';

type TGenderButton = {
  buttonProps: UseRadioProps;
  text: string;
  isChecked: boolean;
  mx?: string;
};

function GenderButton({ buttonProps, text, isChecked, mx }: TGenderButton) {
  const selectedButtonBackground = useColorModeValue('blue.500', 'blue.200');
  const selectedButtonTextColor = useColorModeValue('white', 'black');
  const { getInputProps, getCheckboxProps } = useRadio({
    ...buttonProps,
    isChecked,
  });

  return (
    <Button
      cursor="pointer"
      size="sm"
      as="label"
      mx={mx}
      {...getCheckboxProps()}
      fontWeight="normal"
      _checked={{
        bg: selectedButtonBackground,
        color: selectedButtonTextColor,
      }}
      _focus={{}}
    >
      {text}
      <input type="checkbox" {...getInputProps()} />
    </Button>
  );
}

export default GenderButton;
