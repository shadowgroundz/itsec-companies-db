import { Button, Result } from "antd";

import Link from "next/link";
import React from "react";
import ToCapitalize from "helper/toCapitalize";
import { useIntl } from "react-intl";

export default function UnderConstruction() {
  const { formatMessage } = useIntl();
  return (
    <Result
      status="500"
      subTitle={ToCapitalize(formatMessage({ id: "UNDER_CONSTRUCTION" }))}
      extra={
        <Link href="/">
          <Button type="primary" className="capitalize">
            {formatMessage({ id: "BACK_TO_DASHBOARD" })}
          </Button>
        </Link>
      }
    />
  );
}
