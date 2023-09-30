import {
  FormControl,
  FormErrorMessage,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { CustomFormLabel } from '../../../../../elements';

type TFilterTextInput = {
  label: string;
  name: string;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
  value: string;
};

function FilterTextInput({
  label,
  name,
  handleChangeInput,
  errorText,
  value,
}: TFilterTextInput) {
  const inputColor = useColorModeValue('white', 'gray.800');

  return (
    <FormControl isInvalid={!!errorText}>
      <CustomFormLabel label={label} />
      <Input
        value={value}
        autoComplete="off"
        borderRadius="md"
        size="sm"
        bg={inputColor}
        type="text"
        name={name}
        onChange={handleChangeInput}
      />
      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );
}

export default FilterTextInput;
