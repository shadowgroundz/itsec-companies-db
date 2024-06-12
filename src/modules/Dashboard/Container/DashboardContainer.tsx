import DashboardComponent from "../Component/DashboardComponent";
import { GetCompanyListAPI } from "services/companies.api";
import React from "react";
import ToCapitalize from "helper/toCapitalize";
import _ from "lodash";
import { useIntl } from "react-intl";
import { useQuery } from "@tanstack/react-query";

export default function DashboardContainer() {
  const intl = useIntl();

  let dataActive;
  let dataCategories;
  let dataCountry;
  let dataTopActive;

  const { data: dataListCompany, isFetching: isFetchingDataListCompany } =
    useQuery({
      queryKey: ["Get company list"],
      queryFn: GetCompanyListAPI,
    });

  if (dataListCompany) {
    let tempActive = 0;
    let tempInactive = 0;

    dataListCompany.map((item: any) => {
      if (item.status === "active") {
        tempActive += 1;
      } else {
        tempInactive += 1;
      }
    });

    dataActive = [
      { name: ToCapitalize(intl.formatMessage({ id: "ACTIVE" })), value: 100 },
      { name: ToCapitalize(intl.formatMessage({ id: "INACTIVE" })), value: 5 },
    ];
    dataCategories = [];
    dataTopActive = _.take(
      _.orderBy(
        dataListCompany.filter((item: any) => item.status === "active"),
        "employees",
        "desc"
      ),
      6
    );

    const tempGroup = _.groupBy(dataListCompany, "category");

    for (const key in tempGroup) {
      if (Object.hasOwn(tempGroup, key)) {
        const element = tempGroup[key];
        dataCategories.push({
          name: ToCapitalize(key),
          value: element.length,
        });
      }
    }

    dataCountry = {
      indonesia: dataListCompany.filter(
        (item: any) => item.country === "Indonesia"
      ).length,
      other: dataListCompany.length,
    };
  }

  return (
    <DashboardComponent
      dataActive={dataActive}
      dataCategories={dataCategories}
      dataCountry={dataCountry}
      dataTopActive={dataTopActive}
      intl={intl}
      isFetchingDataListCompany={isFetchingDataListCompany}
    />
  );
}
