import { Breadcrumb, Button, Skeleton } from "antd";

import Card from "components/Card";
import { ICompanyDAO } from "../DAO/company.dao";
import Image from "next/image";
import { IntlShape } from "react-intl";
import React from "react";
import TagStatus from "components/TagStatus";

interface IProps {
  dataCompany?: ICompanyDAO;
  handleUpdate: () => void;
  intl: IntlShape;
  isFetchingCompany: boolean;
}

export default function CompanyDetailComponent(props: IProps) {
  const { dataCompany, handleUpdate, intl, isFetchingCompany } = props;

  const {
    name,
    image,
    address,
    country,
    category,
    employees,
    description,
    status,
  } = dataCompany || { image: "", status: "active" };

  return (
    <div>
      {dataCompany && (
        <Breadcrumb
          separator=">"
          items={[
            {
              title: (
                <span className="text-[#B5B7C0] text-[14px] capitalize">
                  {intl.formatMessage({ id: "COMPANIES" })}
                </span>
              ),
            },
            {
              title: (
                <span className="text-[#B5B7C0] text-[14px] capitalize">
                  {name}
                </span>
              ),
            },
          ]}
        />
      )}
      <Card className="mt-6">
        <Skeleton active loading={isFetchingCompany}>
          {dataCompany ? (
            <>
              <div className="md:flex gap-10">
                <div className="h-[150px] w-[150px] relative">
                  <Image
                    src={image}
                    alt="company image"
                    fill
                    className="rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-poppinsMedium text-[28px] mb-2">{name}</p>
                  <p className="text-[16px] mb-4">{`${category} (${employees} ${intl.formatMessage(
                    {
                      id: "EMPLOYEES",
                    }
                  )})`}</p>
                  <p>{`${address}, ${country}`}</p>
                  <TagStatus text={status} intl={intl} />
                </div>
                <Button
                  type="primary"
                  className="mt-4 md:mt-0 capitalize"
                  onClick={handleUpdate}
                >
                  {intl.formatMessage({ id: "EDIT" })}
                </Button>
              </div>
              <p className="mt-6">{description}</p>
            </>
          ) : (
            <></>
          )}
        </Skeleton>
      </Card>
    </div>
  );
}
