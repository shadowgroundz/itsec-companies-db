import { Form, Input as InputANTD, InputNumber, InputProps } from "antd";

import { ChangeEvent } from "react";
import handleFeedBack from "helper/handleFeedback";

interface IInput extends InputProps {
  colon?: boolean;
  disabled?: boolean;
  enterButton?: any;
  formatter: any;
  input: any;
  inputNumber?: boolean;
  inputRef?: any;
  isFormItem?: boolean;
  isPassword?: boolean;
  isSearch?: boolean;
  label?: string;
  meta: { error: string; touched: boolean };
  onSearch?: (vals: string) => void;
  parser: any;
  preventCharacter?: boolean;
  showError?: boolean;
  textArea?: boolean;
  useTrim?: boolean;
  showCount?: boolean;
  min?: number;
  max?: number;
  rows?: number;
  autoSize?: { minRows: number; maxRows: number };
}

export default function Input(props: IInput) {
  const {
    colon,
    addonAfter,
    autoComplete,
    className,
    disabled,
    enterButton,
    formatter,
    input,
    inputNumber,
    inputRef,
    isFormItem,
    isPassword,
    isSearch,
    label,
    max,
    maxLength,
    meta: { error },
    min,
    onChange,
    onSearch,
    parser,
    placeholder,
    preventCharacter,
    showError,
    size,
    textArea,
    useTrim,
    showCount,
    rows,
    autoSize,
  } = props;

  const combinedProps = {
    placeholder,
    className,
    disabled,
    min,
    max,
    size,
    autoComplete: autoComplete,
    maxLength,
    showCount,
    ...input,
    ...props,
    onChange: (val: ChangeEvent<HTMLInputElement>) => {
      input.onChange(
        useTrim ? val?.target.value.trimStart() : val?.target?.value || val
      );
      if (onChange) {
        onChange(val);
      }
    },
  };

  delete combinedProps.isFormItem;
  delete combinedProps.showError;
  delete combinedProps.textArea;

  function RenderInput() {
    if (isPassword) {
      return <InputANTD.Password ref={inputRef} {...combinedProps} />;
    } else if (textArea) {
      return (
        <InputANTD.TextArea
          ref={inputRef}
          {...combinedProps}
          rows={rows || 5}
          autoSize={autoSize}
        />
      );
    } else if (isSearch) {
      return (
        <InputANTD.Search
          ref={inputRef}
          {...combinedProps}
          enterButton={enterButton}
          onSearch={onSearch}
        />
      );
    } else if (inputNumber && preventCharacter) {
      return (
        <input
          type="number"
          ref={inputRef}
          {...combinedProps}
          addonAfter={addonAfter}
        />
      );
    } else if (inputNumber) {
      return (
        <InputNumber
          ref={inputRef}
          {...combinedProps}
          formatter={formatter}
          parser={parser}
          addonAfter={addonAfter}
        />
      );
    }
    return (
      <InputANTD ref={inputRef} {...combinedProps} addonAfter={addonAfter} />
    );
  }

  if (isFormItem) {
    return (
      <Form.Item
        label={label}
        colon={colon || false}
        validateStatus={handleFeedBack(error, "error", showError)}
        help={handleFeedBack(error, error, showError)}
      >
        {RenderInput()}
      </Form.Item>
    );
  }
  return RenderInput();
}
