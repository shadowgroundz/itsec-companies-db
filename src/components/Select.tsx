import { Form, Select as SelectAntd } from "antd";

import { OptionProps } from "antd/lib/select";
import React from "react";
import handleFeedBack from "helper/handleFeedback";

interface IInput {
  className?: string;
  disabled?: boolean;
  input: any;
  inputRef?: any;
  isFormItem?: boolean;
  label?: string;
  meta: { error: string };
  mode?: string;
  onSelect?: any;
  optionData: OptionProps[];
  placeholder?: string;
  showError?: boolean;
  filterOption?: any;
  loading?: boolean;
  showSearch?: boolean;
  onSearch?: (_vals: string) => void;
}

export default function Select(props: IInput) {
  const {
    className,
    disabled,
    input,
    inputRef,
    isFormItem,
    label,
    meta: { error },
    mode,
    onSelect,
    optionData,
    placeholder,
    showError,
    filterOption,
    loading,
    showSearch,
    onSearch,
  } = props;

  const options =
    placeholder && mode !== "multiple"
      ? [{ value: "", label: placeholder }, ...optionData]
      : optionData;

  const combinedProps = {
    className,
    disabled,
    ...input,
    mode,
    value: mode && !input.value ? undefined : input.value,
    options,
    placeholder,
    onSelect,
    filterOption,
    loading,
    showSearch,
    onSearch,
  };

  function RenderInput() {
    return (
      <SelectAntd ref={inputRef} {...combinedProps} placeholder={placeholder} />
    );
  }

  if (isFormItem) {
    return (
      <Form.Item
        label={label && <b className="font-poppinsSemiBold">{label}</b>}
        validateStatus={handleFeedBack(error, "error", showError)}
        help={handleFeedBack(error, error, showError)}
        colon={false}
      >
        {RenderInput()}
      </Form.Item>
    );
  }
  return RenderInput();
}
