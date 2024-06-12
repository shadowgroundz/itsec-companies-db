/* eslint-disable @next/next/no-img-element */
import { ArrowUpOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Grid,
  Input,
  Row,
  Table,
  Tabs,
  TabsProps,
} from "antd";
import { Monitor, UserTick } from "iconsax-react";
import React, { ChangeEvent, ReactNode } from "react";

import Card from "components/Card";
import { ColumnsType } from "antd/es/table";
import { ICompanyDAO } from "../DAO/company.dao";
import ImgHome from "assets/icons/home.svg";
import { IntlShape } from "react-intl";
import StringFormatter from "helper/stringFormatter";
import ToCapitalize from "helper/toCapitalize";
import formatMoney from "helper/formatMoney";

interface IProps {
  columns: ColumnsType<ICompanyDAO>;
  dataListCompany?: ICompanyDAO[];
  handleChangeTab: (_key: string) => void;
  handleCreatePDF: () => void;
  handleOnChangeGlobalFilter: (_val: ChangeEvent<HTMLInputElement>) => void;
  intl: IntlShape;
  isFetchingDataListCompany: boolean;
  isFetchingListCategoryCompany: boolean;
  selectedTab: string;
  totalActiveCompanies: number;
  totalCompanies: number;
  totalEmployees: number;
  totalInactiveEmployees: number;
}

interface IMatrix {
  name: string;
  value?: number | string;
  desc: ReactNode;
  icon?: ReactNode;
  noBorder?: boolean;
}

function MatrixData(props: IMatrix) {
  const { name, value, desc, icon, noBorder } = props;
  return (
    <Col
      xs={24}
      md={8}
      className={
        noBorder
          ? ""
          : `border-r-2 border-y-0 border-l-0 border-solid border-r-[#F0F0F0]`
      }
    >
      <div className="flex gap-5 py-4 md:py-0">
        {icon}
        <div>
          <p className="text-[#ACACAC] text-[14px] capitalize mb-0">{name}</p>
          <p className="font-poppinsSemiBold text-[33px] text-[#333333] mb-0">
            {value || 0}
          </p>
          {desc}
        </div>
      </div>
    </Col>
  );
}

export default function CompanyComponent(props: IProps) {
  const {
    columns,
    dataListCompany,
    handleChangeTab,
    handleCreatePDF,
    handleOnChangeGlobalFilter,
    intl,
    isFetchingDataListCompany,
    isFetchingListCategoryCompany,
    selectedTab,
    totalActiveCompanies,
    totalCompanies,
    totalEmployees,
    totalInactiveEmployees,
  } = props;

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { xs, sm, md } = screens;

  const isMobile = xs && !sm;

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: (
        <span className="font-poppinsSemiBold text-[18px] text-[#9197B3] capitalize">
          {intl.formatMessage({ id: "ALL" })} ({totalCompanies})
        </span>
      ),
    },
    {
      key: "active",
      label: (
        <span className="font-poppinsSemiBold text-[18px] text-[#9197B3] capitalize">
          {intl.formatMessage({ id: "ACTIVE" })} ({totalActiveCompanies})
        </span>
      ),
    },
    {
      key: "inactive",
      label: (
        <span className="font-poppinsSemiBold text-[18px] text-[#9197B3] capitalize">
          {intl.formatMessage({ id: "INACTIVE" })} (
          {totalCompanies - totalActiveCompanies})
        </span>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Row gutter={40}>
          <MatrixData
            noBorder={isMobile}
            name={intl.formatMessage({ id: "TOTAL_COMPANY" })}
            value={totalCompanies}
            desc={
              <p className="text-[#292D32] text-[12px] mb-0">
                <ArrowUpOutlined className="text-[#00AC4F] font-poppinsBold text-[16px]" />
                <span className="text-[#00AC4F] font-poppinsBold">16%</span>{" "}
                {intl.formatMessage({ id: "THIS_MONTH" })}
              </p>
            }
            icon={
              <Avatar
                size={64}
                src={<img src={ImgHome.src} alt="" className="!h-7 !w-7" />}
                className="bg-gradient-to-b from-[#D3FFE7] to-[#EFFFF6]"
              />
            }
          />
          <MatrixData
            noBorder={isMobile}
            name={intl.formatMessage({ id: "TOTAL_EMPLOYEES" })}
            value={formatMoney(totalEmployees)}
            desc={
              <p className="text-[#292D32] text-[12px] mb-0">
                <span className="font-poppinsBold">
                  {totalInactiveEmployees}
                </span>{" "}
                {intl.formatMessage({ id: "ARE_IN_INACTIVE_COMPANIES" })}
              </p>
            }
            icon={
              <Avatar
                size={64}
                icon={<UserTick color="#00AC4F" />}
                alt=""
                className="bg-gradient-to-b from-[#D3FFE7] to-[#EFFFF6]"
              />
            }
          />
          <MatrixData
            noBorder
            name={intl.formatMessage({ id: "ACTIVE_COMPANIES" })}
            value={totalActiveCompanies}
            desc={
              <p className="text-[#292D32] text-[12px] mb-0">
                <span className="font-poppinsBold">
                  {((totalActiveCompanies / totalCompanies) * 100).toFixed(2)}%
                </span>{" "}
                {intl.formatMessage({ id: "FROM_TOTAL" })}
              </p>
            }
            icon={
              <Avatar
                size={64}
                icon={<Monitor color="#00AC4F" />}
                alt=""
                className="bg-gradient-to-b from-[#D3FFE7] to-[#EFFFF6]"
              />
            }
          />
        </Row>
      </Card>
      <Card className="mt-5">
        <div className="md:flex md:flex-wrap w-full">
          <p className="font-poppinsSemiBold text-[26px] capitalize flex-grow">
            {intl.formatMessage({ id: "COMPANIES" })}
          </p>
          <div className="w-[200px] filterTable">
            <Input
              addonBefore={<SearchOutlined />}
              placeholder={ToCapitalize(intl.formatMessage({ id: "FILTER" }))}
              onChange={handleOnChangeGlobalFilter}
            />
          </div>
        </div>
        <div className="md:flex gap-6">
          <Tabs
            defaultActiveKey="all"
            items={items}
            onChange={handleChangeTab}
            activeKey={selectedTab}
            className="tableCompanies flex-grow"
          />
          <Button
            type="primary"
            className="capitalize mt-4"
            onClick={handleCreatePDF}
          >
            {intl.formatMessage({ id: "CREATE_PDF" })}
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataListCompany}
          rowKey="id"
          className="tblBrand"
          loading={isFetchingDataListCompany || isFetchingListCategoryCompany}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <p className="capitalize font-poppinsBold mb-0">
                  {intl.formatMessage({ id: "ADDRESS" })}
                </p>
                <p>{record.address}</p>
                <p className="capitalize font-poppinsBold mb-0">
                  {intl.formatMessage({ id: "EMPLOYEES_NUMBER" })}
                </p>
                <p>{record.employees}</p>
                <p className="capitalize font-poppinsBold mb-0">
                  {intl.formatMessage({ id: "CATEGORY" })}
                </p>
                <p>{record.category}</p>
                <p className="capitalize font-poppinsBold mb-0">
                  {intl.formatMessage({ id: "COUNTRY" })}
                </p>
                <p>{record.category}</p>
                <p className="capitalize font-poppinsBold mb-0">
                  {intl.formatMessage({ id: "STATUS" })}
                </p>
                <p>{record.status}</p>
              </div>
            ),
            rowExpandable: () => isMobile || false,
          }}
          pagination={{
            showTotal: (total, range) =>
              ToCapitalize(
                StringFormatter(
                  intl.formatMessage({ id: "PAGINATION_TABLE_DETAIL" }),
                  range[0],
                  range[1],
                  total
                )
              ),
          }}
        />
      </Card>
    </div>
  );
}
