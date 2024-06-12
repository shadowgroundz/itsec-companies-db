import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Col, Row, Skeleton } from "antd";
import React, { ReactNode } from "react";

import Card from "components/Card";
import { EnvironmentOutlined } from "@ant-design/icons";
import { ICompanyDAO } from "modules/Company/DAO/company.dao";
import Image from "next/image";
import { IntlShape } from "react-intl";
import StringFormatter from "helper/stringFormatter";
import ToCapitalize from "helper/toCapitalize";

interface IProps {
  dataActive?: {
    name: string;
    value: number;
  }[];
  dataCategories?: {
    name: string;
    value: number;
  }[];
  dataCountry:
    | {
        indonesia: number;
        other: number;
      }
    | undefined;
  dataTopActive?: ICompanyDAO[];
  intl: IntlShape;
  isFetchingDataListCompany: boolean;
}

interface IPropsDashboardMatrix {
  children: ReactNode;
  title: string;
  isLoading: boolean;
}

function DashboardMatrix(props: IPropsDashboardMatrix) {
  const { children, title, isLoading } = props;

  return (
    <Col xs={24} md={8} className="mt-4">
      <Card className="text-center h-[300px] border-[#DAE3F8] border-2 border-solid">
        <Skeleton active loading={isLoading}>
          <p className="uppercase text-[16px] text-[#0B1C33] opacity-70">
            {title}
          </p>
          {children}
        </Skeleton>
      </Card>
    </Col>
  );
}

export default function DashboardComponent(props: IProps) {
  const {
    dataActive,
    dataCategories,
    dataCountry,
    dataTopActive,
    intl,
    isFetchingDataListCompany,
  } = props;

  const COLORS = ["#E36E85", "#F1CE6C"];
  const COLORS2 = ["#E1526C", "#67A1E5", "#F1CE6C", "#5E8029"];

  return (
    <div>
      <Row gutter={40}>
        <DashboardMatrix
          title={intl.formatMessage({ id: "ACTIVE_VS_INACTIVE" })}
          isLoading={isFetchingDataListCompany}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={dataActive}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {dataActive?.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </DashboardMatrix>
        <DashboardMatrix
          title={intl.formatMessage({ id: "CATEGORIES" })}
          isLoading={isFetchingDataListCompany}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                data={dataCategories}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {dataCategories?.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS2[index] ||
                      "#" +
                        ((Math.random() * 0xffffff) << 0)
                          .toString(16)
                          .padStart(6, "0")
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </DashboardMatrix>
        <DashboardMatrix
          title={intl.formatMessage({ id: "INDONESIAN_COMPANIES" })}
          isLoading={isFetchingDataListCompany}
        >
          <p className="text-[#0B1C33] font-poppinsSemiBold text-[48px] mb-4 mt-16">
            {dataCountry
              ? ((dataCountry.indonesia / dataCountry.other) * 100).toFixed(2)
              : 0}
            %
          </p>
          <p className="text-[#0B1C33] font-poppinsMedium text-[18px]">
            ({dataCountry?.indonesia || 0} {intl.formatMessage({ id: "OF" })}{" "}
            {dataCountry?.other || 0})
          </p>
        </DashboardMatrix>
      </Row>
      <Card className="mt-6 p-4 md:p-8">
        <Skeleton active loading={isFetchingDataListCompany}>
          <p className="font-poppinsSemiBold text-[26px]">
            {ToCapitalize(
              StringFormatter(
                intl.formatMessage({ id: "BIG_ACTIVE_COMPANIES" }),
                6
              )
            )}
          </p>
          <Row gutter={20}>
            {dataTopActive?.map((item, index) => (
              <Col xs={24} md={8} key={index} className="mt-5">
                <Card className="border-b-[1px] border-solid border-[#F4F4F4] pb-4">
                  <div className="h-[250px] w-full relative mb-8 ">
                    <Image
                      src={item.image}
                      fill
                      alt={item.name}
                      className="rounded-2xl"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="font-quicksandBold text-[16px]">
                      {item.name}
                    </p>
                    <p className="font-inter text-[14px] text-[#FF5B19]">
                      {item.employees} {intl.formatMessage({ id: "EMPLOYEES" })}
                    </p>
                    <p className="text-[#7F7F7F] font-inter text-[12px]">
                      <EnvironmentOutlined className="mr-2" />
                      {(item.address, item.country)}
                    </p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Skeleton>
      </Card>
    </div>
  );
}
