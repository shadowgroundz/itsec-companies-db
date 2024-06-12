import { Button, Grid, Space, TableProps } from "antd";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import {
  GetCompanyCategoryAPI,
  GetCompanyListAPI,
} from "services/companies.api";
import React, { ChangeEvent, useState } from "react";

import CompanyComponent from "../Component/CompanyComponent";
import ExportPDFCompanyContainer from "./ExportPDFCompanyContainer";
import { ICompanyDAO } from "../DAO/company.dao";
import Link from "next/link";
import ModalUpdateCompanyContainer from "./ModalUpdateCompanyContainer";
import TagStatus from "components/TagStatus";
import _ from "lodash";
import formatMoney from "helper/formatMoney";
import { matchSorter } from "match-sorter";
import { useIntl } from "react-intl";
import { useQuery } from "@tanstack/react-query";

export default function CompanyContainer() {
  const intl = useIntl();

  let listData: ICompanyDAO[] = [];
  let listCountryData = [];

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { xs, sm } = screens;

  const isMobile = xs && !sm;

  const [selectedTab, setSelectedTab] = useState("all");
  const [filterGlobal, setFilterGlobal] = useState("");
  const [dataCompany, setDataCompany] = useState<undefined | ICompanyDAO>();
  const [modalPDFIsShow, setModalPDFIsShow] = useState(false);

  const {
    data: dataListCompany,
    isFetching: isFetchingDataListCompany,
    refetch: refetchDataListCompany,
  } = useQuery({
    queryKey: ["Get company list"],
    queryFn: GetCompanyListAPI,
  });

  const {
    data: dataListCategoryCompany,
    isFetching: isFetchingListCategoryCompany,
  } = useQuery({
    queryKey: ["Get company category list"],
    queryFn: GetCompanyCategoryAPI,
  });

  const activeCompany =
    dataListCompany?.filter((item: any) => item.status === "active") || [];

  const inactiveCompany =
    dataListCompany?.filter((item: any) => item.status === "inactive") || [];

  const totalEmployees = _.sumBy(dataListCompany, "employees");
  const totalInactiveEmployees = _.sumBy(inactiveCompany, "employees");

  const handleChangeTab = (key: string) => {
    setSelectedTab(key);
  };

  const listCountry = _.groupBy(dataListCompany, "country");

  if (listCountry) {
    for (const key in listCountry) {
      if (Object.hasOwn(listCountry, key)) {
        listCountryData.push({
          text: key,
          value: key,
        });
      }
    }
  }

  const columns: TableProps<ICompanyDAO>["columns"] = [
    {
      title: (
        <span className="capitalize">
          {intl.formatMessage({ id: "COMPANY_NAME" })}
        </span>
      ),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    },
    {
      title: (
        <span className="capitalize">
          {intl.formatMessage({ id: "ADDRESS" })}
        </span>
      ),
      dataIndex: "address",
      key: "address",
      sorter: (a, b) =>
        a.address.toLowerCase().localeCompare(b.address.toLowerCase()),
      responsive: ["md"],
    },
    {
      title: (
        <span className="capitalize">
          {intl.formatMessage({ id: "EMPLOYEES_NUMBER" })}
        </span>
      ),
      dataIndex: "employees",
      key: "employees",
      render: (text) => formatMoney(text),
      sorter: (a, b) => a.employees - b.employees,
      responsive: ["md"],
    },
    {
      title: (
        <span className="capitalize">
          {intl.formatMessage({ id: "CATEGORY" })}
        </span>
      ),
      dataIndex: "category",
      key: "category",
      sorter: (a, b) =>
        a.category.toLowerCase().localeCompare(b.category.toLowerCase()),
      filters: dataListCategoryCompany?.map((item) => ({
        text: item,
        value: item,
      })),
      onFilter: (value, record) => record.category.startsWith(value as string),
      responsive: ["md"],
    },
    {
      title: (
        <span className="capitalize">
          {intl.formatMessage({ id: "COUNTRY" })}
        </span>
      ),
      dataIndex: "country",
      key: "country",
      sorter: (a, b) =>
        a.country.toLowerCase().localeCompare(b.country.toLowerCase()),
      filters: listCountryData,
      onFilter: (value, record) =>
        record.country.indexOf(value as string) === 0,
      responsive: ["md"],
    },
    {
      title: (
        <span className="capitalize">
          {intl.formatMessage({ id: "STATUS" })}
        </span>
      ),
      key: "status",
      dataIndex: "status",
      render: (text) => text && <TagStatus intl={intl} text={text} />,
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/companies/${record.id}`}>
            <Button
              icon={<MoreOutlined />}
              type="default"
              className="capitalize w-[100px]"
            >
              {!isMobile && intl.formatMessage({ id: "DETAIL" })}
            </Button>
          </Link>
          <Button
            icon={<EditOutlined />}
            type="primary"
            className="capitalize w-[100px]"
            onClick={() => {
              setDataCompany(record);
            }}
          >
            {!isMobile && intl.formatMessage({ id: "EDIT" })}
          </Button>
        </Space>
      ),
    },
  ];

  if (dataListCompany) {
    if (selectedTab === "all") {
      listData = dataListCompany;
    } else if (selectedTab === "active") {
      listData = activeCompany;
    } else if (selectedTab === "inactive") {
      listData = inactiveCompany;
    }
  }

  const handleOnChangeGlobalFilter = (e: ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  const debounceSearch = _.debounce((value) => {
    setFilterGlobal(value);
  }, 1000);

  const handleCreatePDF = () => {
    setModalPDFIsShow(true);
  };

  return (
    <>
      <CompanyComponent
        columns={columns}
        dataListCompany={matchSorter(listData, filterGlobal, {
          keys: ["name", "country"],
          threshold: matchSorter.rankings.CONTAINS,
        })}
        handleChangeTab={handleChangeTab}
        handleCreatePDF={handleCreatePDF}
        handleOnChangeGlobalFilter={handleOnChangeGlobalFilter}
        intl={intl}
        isFetchingDataListCompany={isFetchingDataListCompany}
        isFetchingListCategoryCompany={isFetchingListCategoryCompany}
        selectedTab={selectedTab}
        totalActiveCompanies={activeCompany.length}
        totalCompanies={dataListCompany?.length || 0}
        totalEmployees={totalEmployees}
        totalInactiveEmployees={totalInactiveEmployees}
      />
      {modalPDFIsShow && (
        <ExportPDFCompanyContainer
          dataListCompany={matchSorter(listData, filterGlobal, {
            keys: ["name", "country"],
            threshold: matchSorter.rankings.CONTAINS,
          })}
          onClose={() => {
            setModalPDFIsShow(false);
          }}
          selectedData={selectedTab}
        />
      )}
      {dataCompany && (
        <ModalUpdateCompanyContainer
          dataCompany={dataCompany}
          onClose={() => {
            setDataCompany(undefined);
            refetchDataListCompany();
          }}
          intl={intl}
        />
      )}
    </>
  );
}
