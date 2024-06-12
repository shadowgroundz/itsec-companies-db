import { Button, Form as FormANTD } from "antd";
import { Field, Form } from "react-final-form";
import { Login, Setting } from "iconsax-react";

import { ILoginDTO } from "modules/Login/DTO/login.dto";
import Input from "components/Input";
import LoginValidation from "modules/Login/Validation/LoginValidation";
import React from "react";
import ToCapitalize from "helper/toCapitalize";
import { useIntl } from "react-intl";

interface IProps {
  onSubmit: (val: ILoginDTO) => void;
}

export default function LoginComponent(props: IProps) {
  const { onSubmit } = props;
  const intl = useIntl();

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="mt-[30vh]">
        <Form
          onSubmit={onSubmit}
          validate={(val: ILoginDTO) => LoginValidation(val, intl)}
        >
          {(formProps) => {
            const { invalid, dirty, handleSubmit } = formProps;
            return (
              <div className="w-[30vw] m-auto">
                <div className="flex flex-wrap mt-6 mb-8">
                  <Setting size={46} />
                  <div className="font-poppinsSemiBold text-[26px] pt-2 ml-2 mr-1">
                    Dashboard
                  </div>
                  <div className="font-poppinsMedium text-[#838383] text-[10px] pt-5">
                    v.01
                  </div>
                </div>
                <FormANTD layout="vertical" onFinish={handleSubmit}>
                  <Field
                    name="username"
                    component={Input}
                    label={ToCapitalize(intl.formatMessage({ id: "USERNAME" }))}
                    isFormItem
                    showError={dirty}
                  />
                  <Button
                    className="capitalize mt-4"
                    type="primary"
                    htmlType="submit"
                    block
                    icon={<Login />}
                    disabled={invalid}
                  >
                    {intl.formatMessage({ id: "LOGIN" })}
                  </Button>
                </FormANTD>
              </div>
            );
          }}
        </Form>
      </div>
    </div>
  );
}
