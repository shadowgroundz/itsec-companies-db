import React, { useState } from "react";

import CompanyDetailComponent from "../Component/CompanyDetailComponent";
import { GetCompanyDetailAPI } from "services/companies.api";
import ModalUpdateCompanyContainer from "./ModalUpdateCompanyContainer";
import { useIntl } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function CompanyDetailContainer() {
  const intl = useIntl();
  const router = useRouter();

  const [modalIsShow, setModalIsShow] = useState(false);

  const {
    data: dataCompany,
    isFetching: isFetchingCompany,
    refetch: refetchCompany,
  } = useQuery({
    queryKey: ["Get company detail", router.query.id],
    queryFn: GetCompanyDetailAPI,
  });

  return (
    <>
      <CompanyDetailComponent
        dataCompany={dataCompany}
        handleUpdate={() => setModalIsShow(true)}
        intl={intl}
        isFetchingCompany={isFetchingCompany}
      />
      {dataCompany && modalIsShow && (
        <ModalUpdateCompanyContainer
          dataCompany={dataCompany}
          onClose={() => {
            setModalIsShow(false);
            refetchCompany();
          }}
          intl={intl}
        />
      )}
    </>
  );
}
