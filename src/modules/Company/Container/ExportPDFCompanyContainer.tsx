import ExportPDFCompanyComponent from "../Component/ExportPDFCompanyComponent";
import { ICompanyDAO } from "../DAO/company.dao";
import React from "react";

interface IProps {
  dataListCompany: ICompanyDAO[];
  onClose: () => void;
  selectedData: string;
}

export default function ExportPDFCompanyContainer(props: IProps) {
  const { dataListCompany, onClose, selectedData } = props;

  return (
    <ExportPDFCompanyComponent
      dataListCompany={dataListCompany}
      onClose={onClose}
      selectedData={selectedData}
    />
  );
}
