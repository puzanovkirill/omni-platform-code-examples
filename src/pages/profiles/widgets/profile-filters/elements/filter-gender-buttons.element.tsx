/* eslint-disable react/jsx-props-no-spreading */
import { useLocalStorage } from '@3divi/shared-components';
import {
  ButtonGroup,
  Flex,
  FormControl,
  useColorModeValue,
  useRadioGroup,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiltersSearchParamsNames } from '../../../../../consts';
import { ClearFilterButton, CustomFormLabel } from '../../../../../elements';
import { getUrlPageName } from '../../../../../helpers';
import GenderButton from './gender-button.element';

function FilterGenderButtons() {
  const { t } = useTranslation('pages');

  const id = FiltersSearchParamsNames.GENDER;
  const buttonsGroupColor = useColorModeValue('white', 'gray.800');
  const [externalValue, setExternalValue] = useLocalStorage(
    `${getUrlPageName()}${id}`,
    'all'
  );

  const buttonValues = {
    ALL: 'all',
    MALE: 'MALE',
    FEMALE: 'FEMALE',
  };

  const {
    getRootProps,
    getRadioProps,
    setValue,
    value: genderValue,
  } = useRadioGroup({
    name: id,
    defaultValue: externalValue,
  });

  const buttonGroup = getRootProps();

  useEffect(() => {
    if (genderValue === 'all') setExternalValue('');
    else setExternalValue(genderValue.toString());
  }, [genderValue]);

  const handleReset = () => {
    setValue('all');
  };

  return (
    <FormControl>
      <Flex align="center" justifyContent="space-between" pb={1.5}>
        <CustomFormLabel label={t('Profiles.Filters.Gender.Title')} />
        {externalValue !== 'all' && <ClearFilterButton onClick={handleReset} />}
      </Flex>
      <ButtonGroup
        bg={buttonsGroupColor}
        borderRadius="md"
        {...buttonGroup}
        size="sm"
        isAttached
        variant="outline"
      >
        {(Object.keys(buttonValues) as Array<keyof typeof buttonValues>).map(
          (value) => {
            const buttonProps = getRadioProps({
              value: buttonValues[value],
            });
            return (
              <GenderButton
                isChecked={externalValue === buttonValues[value]}
                key={value}
                mx={value === buttonValues.MALE ? '-1px' : undefined}
                buttonProps={buttonProps}
                text={t(`Profiles.Filters.Gender.${value}`)}
              />
            );
          }
        )}
      </ButtonGroup>
    </FormControl>
  );
}

export default FilterGenderButtons;
