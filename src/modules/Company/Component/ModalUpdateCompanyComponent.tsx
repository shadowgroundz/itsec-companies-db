import { Button, Col, Form as FormANTD, Modal, Row } from "antd";
import { Field, Form } from "react-final-form";

import Checkbox from "components/Checkbox";
import { ICompanyDAO } from "../DAO/company.dao";
import { ICompanyDTO } from "../DTO/company.dto";
import Input from "components/Input";
import { IntlShape } from "react-intl";
import React from "react";
import Select from "components/Select";

interface IProps {
  dataListCategoryCompany?: string[];
  initialValues: ICompanyDAO;
  intl: IntlShape;
  isFetchingListCategoryCompany: boolean;
  isLoadingMutate: boolean;
  onClose: () => void;
  onSubmit: (_vals: ICompanyDTO) => void;
}

export default function ModalUpdateCompanyComponent(props: IProps) {
  const {
    dataListCategoryCompany,
    initialValues,
    intl,
    isFetchingListCategoryCompany,
    isLoadingMutate,
    onClose,
    onSubmit,
  } = props;

  const { name } = initialValues;

  const { formatMessage } = intl;

  return (
    <Modal
      title={
        <span className="capitalize text-[#54595E] font-interSemiBold text-[20px]">
          {formatMessage({ id: "EDIT" })}
        </span>
      }
      open
      onCancel={onClose}
      maskClosable={false}
      footer={null}
      className="top-16"
    >
      <p className="font-poppinsBold text-[22px]">{name}</p>
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {(formProps) => {
          const { handleSubmit } = formProps;
          return (
            <FormANTD onFinish={handleSubmit}>
              <Field
                name="category"
                component={Select}
                className="bg-[#F9F9F9] w-full"
                isFormItem
                optionData={dataListCategoryCompany?.map((item) => ({
                  label: item,
                  value: item,
                }))}
                loading={isFetchingListCategoryCompany}
              />
              <Field
                name="employees"
                component={Input}
                inputNumber
                className="bg-[#F9F9F9] w-full"
                isFormItem
              />
              <Field
                name="description"
                component={Input}
                textArea
                className="bg-[#F9F9F9]"
                isFormItem
              />
              <div className="flex">
                <Field
                  name="status"
                  component={Checkbox}
                  textArea
                  className="bg-[#F9F9F9]"
                  isFormItem
                />
                <span className="ml-2 mt-[6px] capitalize">
                  {intl.formatMessage({ id: "ACTIVE" })}
                </span>
              </div>
              <Row gutter={20}>
                <Col span={12}>
                  <Button
                    block
                    className="capitalize"
                    size="large"
                    onClick={onClose}
                  >
                    {formatMessage({ id: "CANCEL" })}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    block
                    type="primary"
                    className="capitalize"
                    size="large"
                    htmlType="submit"
                    loading={isLoadingMutate}
                  >
                    {formatMessage({ id: "UPDATE" })}
                  </Button>
                </Col>
              </Row>
            </FormANTD>
          );
        }}
      </Form>
    </Modal>
  );
}
