import { ConfigProvider as ConfigProviderANTD } from "antd";
import React from "react";

interface IProps {
  children: React.ReactNode;
  locale: any;
}

export default function ConfigProvider(props: IProps) {
  const { children, locale } = props;
  return (
    <ConfigProviderANTD
      locale={locale}
      theme={{ token: { colorPrimary: "#5932EA", fontFamily: "poppins" } }}
    >
      {children}
    </ConfigProviderANTD>
  );
}
