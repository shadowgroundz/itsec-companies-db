import {
  GetCompanyCategoryAPI,
  UpdateCompanyCategoryAPI,
} from "services/companies.api";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ICompanyDAO } from "../DAO/company.dao";
import { ICompanyDTO } from "../DTO/company.dto";
import { IntlShape } from "react-intl";
import ModalUpdateCompanyComponent from "../Component/ModalUpdateCompanyComponent";
import React from "react";
import ToCapitalize from "helper/toCapitalize";
import { toast } from "react-toastify";

interface IProps {
  dataCompany: ICompanyDAO;
  intl: IntlShape;
  onClose: () => void;
}

export default function ModalUpdateCompanyContainer(props: IProps) {
  const { dataCompany, intl, onClose } = props;

  const {
    data: dataListCategoryCompany,
    isFetching: isFetchingListCategoryCompany,
  } = useQuery({
    queryKey: ["Get company category list"],
    queryFn: GetCompanyCategoryAPI,
  });

  const mutateCompany = useMutation({
    mutationFn: UpdateCompanyCategoryAPI,
    onSuccess: () => {
      toast.success(
        ToCapitalize(
          intl.formatMessage({ id: "NOTIFICATION_SUCCESS_UPDATE_COMPANY" })
        )
      );
      onClose();
    },
  });

  const initialValues = { ...dataCompany };
  if (initialValues) {
    if (initialValues.status === "active") {
      initialValues.status = true;
    } else {
      initialValues.status = false;
    }
  }

  const onSubmit = (vals: ICompanyDTO) => {
    mutateCompany.mutate({ ...vals, id: dataCompany.id });
  };

  return (
    <ModalUpdateCompanyComponent
      dataListCategoryCompany={dataListCategoryCompany}
      initialValues={initialValues}
      intl={intl}
      isFetchingListCategoryCompany={isFetchingListCategoryCompany}
      isLoadingMutate={mutateCompany.isPending}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
