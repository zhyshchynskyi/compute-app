import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import BaseDropdown from 'share-ui/components/Dropdown/Dropdown';

import TypographyPrimary from 'components/Typography/Primary';
import { Field } from 'formik';
import { StyledTitle } from 'components/TextFieldFormik/TextFieldFormik';

type DropdownProps = {
  label?: string;
  fieldName: string;
  fieldValue: string | string[];
  options: any;
  setFieldValue: any;
  onChange?: (option: any) => void;
  optionSize?: 'large' | 'medium' | 'small';
  isMulti?: boolean;
  size?: 'large' | 'medium' | 'small';
  labelGap?: number;
  disabled?: boolean;
};

const Dropdown = ({
  fieldValue,
  fieldName,
  options,
  setFieldValue,
  onChange = () => {},
  label,
  isMulti,
  optionSize = 'medium',
  size = 'medium',
  labelGap = 10,
  disabled = false,
}: DropdownProps) => {
  const { t } = useTranslation();
  let value = fieldValue;

  let onChangeFunction = (option: any) => {
    onChange(option);
    setFieldValue(fieldName, option?.value || '');
  };

  if (isMulti) {
    value = options?.filter((option: any) => fieldValue?.includes(option.value));

    onChangeFunction = (option: any) => {
      onChange(option);
      if (option === null) {
        setFieldValue(fieldName, []);
      } else {
        const values = option?.map((option: any) => {
          return option.value;
        });
        setFieldValue(fieldName, [...values]);
      }
    };
  } else {
    value = options?.find((option: any) => option.value === fieldValue);
  }

  const onOptionRemove = (removedValue: any) => {
    if (Array.isArray(fieldValue)) {
      const newValues = fieldValue?.filter((oldValues: any) => oldValues !== removedValue.value);
      setFieldValue(fieldName, [...newValues]);
    }
  };

  const OptionRenderer = ({ label }: { label: string }) => {
    return <TypographyPrimary value={label} size={optionSize} />;
  };

  return (
    <Field name={fieldName}>
      {(formik: any) => {
        const { meta } = formik;

        return (
          <StyledWrapper isValidationError={meta?.error} labelGap={labelGap} disabled={disabled}>
            {label && <StyledTitle>{label}</StyledTitle>}
            <BaseDropdown
              multi={isMulti}
              // menuPlacement={'top'}
              insideOverflow
              multiline
              size={size}
              value={value || ''}
              placeholder={`${t('please-enter-value')}`}
              options={options}
              onChange={onChangeFunction}
              onOptionRemove={onOptionRemove}
              OptionRenderer={OptionRenderer}
              disabled={disabled}
              // menuIsOpen={true}
            />

            {meta?.error && <StyledError>{meta?.error}</StyledError>}
          </StyledWrapper>
        );
      }}
    </Field>
  );
};

export default Dropdown;

//todo update dropdown styles in storybook
const StyledWrapper = styled.div<{
  isValidationError: boolean;
  labelGap?: number;
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ labelGap }) => labelGap || 10}px;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  width: 100%;

  position: relative;

  ${(p) =>
    p.isValidationError &&
    css`
      .dropdown-wrapper {
        /* box-shadow: 0 0 0 4px #ef5533; */
      }
    `};
`;

//todo we need dropdown validation styles in storybook
const StyledError = styled.div`
  color: #ef5533;
  font-size: 16px;
`;
