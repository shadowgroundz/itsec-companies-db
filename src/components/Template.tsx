import { Avatar, Dropdown, Grid, Layout, Menu, Modal, Switch } from "antd";
import {
  DiscountShape,
  I3DSquare,
  KeySquare,
  LogoutCurve,
  MessageQuestion,
  Setting,
  UserSquare,
  WalletMoney,
} from "iconsax-react";
import { DownOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import React, { ReactNode, useEffect, useState } from "react";
import useStore, { IStore } from "store";

import ImgUser from "assets/icons/user.png";
import Link from "next/link";
import { slide as MenuBurger } from "react-burger-menu";
import type { MenuProps } from "antd";
import ToCapitalize from "helper/toCapitalize";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

type MenuItem = Required<MenuProps>["items"][number];

const { Content, Footer, Sider } = Layout;

interface IProps {
  children?: ReactNode;
}
export default function Template(props: IProps) {
  const { children } = props;

  const store: IStore = useStore();
  const router = useRouter();
  const intl = useIntl();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { xs, sm, md } = screens;

  const isMobile = xs && !sm;
  const isTablet = !xs && sm && !md;

  const pathName = router.pathname;

  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const { userProfile, lang, setLang, setProfile } = store;

  const handleLogout = () => {
    Modal.confirm({
      title: ToCapitalize(intl.formatMessage({ id: "CONFIRM_LOGOUT" })),
      icon: <ExclamationCircleFilled />,
      okButtonProps: { style: { background: "#5932EA" } },
      onOk() {
        setProfile(null);
        router.push("/login");
      },
    });
  };

  useEffect(() => {
    if (!userProfile) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label: !children ? (
        <Link href={key as any} onClick={() => setMobileMenuIsOpen(false)}>
          {label}
        </Link>
      ) : (
        label
      ),
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      ToCapitalize(intl.formatMessage({ id: "DASHBOARD" })),
      "/",
      <KeySquare />
    ),
    getItem(
      ToCapitalize(intl.formatMessage({ id: "PRODUCTS" })),
      "/products",
      <I3DSquare />,
      [
        getItem(
          ToCapitalize(intl.formatMessage({ id: "LIST" })),
          "/products/item"
        ),
        getItem(
          ToCapitalize(intl.formatMessage({ id: "CATEGORIES" })),
          "/products/categories"
        ),
      ]
    ),
    getItem(
      ToCapitalize(intl.formatMessage({ id: "COMPANIES" })),
      "/companies",
      <UserSquare />,
      [
        getItem(
          ToCapitalize(intl.formatMessage({ id: "LIST" })),
          "/companies/list"
        ),
        getItem(
          ToCapitalize(intl.formatMessage({ id: "REPORT" })),
          "/companies/report"
        ),
      ]
    ),
    getItem(
      ToCapitalize(intl.formatMessage({ id: "INCOME" })),
      "/income",
      <WalletMoney />,
      [
        getItem(
          ToCapitalize(intl.formatMessage({ id: "TRANSACTION" })),
          "/income/transaction"
        ),
        getItem(
          ToCapitalize(intl.formatMessage({ id: "REPORT" })),
          "/income/report"
        ),
      ]
    ),
    getItem(
      ToCapitalize(intl.formatMessage({ id: "PROMOTE" })),
      "/promote",
      <DiscountShape />,
      [
        getItem(
          ToCapitalize(intl.formatMessage({ id: "LIST" })),
          "/promote/list"
        ),
        getItem(
          ToCapitalize(intl.formatMessage({ id: "REPORT" })),
          "/promote/report"
        ),
      ]
    ),
    getItem(
      ToCapitalize(intl.formatMessage({ id: "HELP" })),
      "/help",
      <MessageQuestion />,
      [
        getItem(ToCapitalize(intl.formatMessage({ id: "USER" })), "/help/user"),
        getItem(
          ToCapitalize(intl.formatMessage({ id: "APPLICATION" })),
          "/help/application"
        ),
      ]
    ),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider id="wrapperLayout">
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="siderBrand relative"
          width={300}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="flex flex-wrap mt-6 mb-8 ml-4">
            <Setting size={46} />
            {!collapsed && (
              <>
                <div className="font-poppinsSemiBold text-[26px] pt-1 ml-2 mr-1">
                  Dashboard
                </div>
                <div className="font-poppinsMedium text-[#838383] text-[10px] pt-5">
                  v.01
                </div>
              </>
            )}
          </div>
          <Menu
            mode="inline"
            items={items}
            selectedKeys={[pathName]}
            className={`${collapsed ? "menuBrandCollapsed" : ""}`}
          />
        </Sider>
      )}
      <Layout
        className="bg-[#FAFBFF]"
        style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 300 }}
      >
        <div className="bg-[#FAFBFF] pt-4 flex px-5 md:px-16 sticky top-0 z-10 w-full justify-end md:justify-normal">
          {isMobile && (
            <div className="relative">
              <MenuBurger
                right
                pageWrapId="wrapperLayout"
                noOverlay
                itemListElement="div"
                width="100vw"
                isOpen={mobileMenuIsOpen}
                onOpen={() => setMobileMenuIsOpen(true)}
                onClose={() => setMobileMenuIsOpen(false)}
              >
                <Menu mode="inline" items={items} selectedKeys={[pathName]} />
              </MenuBurger>
            </div>
          )}
          {!isMobile && (
            <div className="w-full pt-4">
              <p className="font-poppinsMedium text-[24px]">
                {ToCapitalize(intl.formatMessage({ id: "HELLO" }))}{" "}
                {userProfile?.username}
              </p>
            </div>
          )}
          <div className="mr-4 mt-5">
            <Switch
              checkedChildren="EN"
              unCheckedChildren="ID"
              checked={lang === "en"}
              onChange={() => {
                setLang(lang === "en" ? "id" : "en");
              }}
            />
          </div>
          <Dropdown
            menu={{
              items: [
                {
                  key: "logout",
                  icon: <LogoutCurve />,
                  onClick: handleLogout,
                  label: (
                    <span className="capitalize">
                      {intl.formatMessage({ id: "LOGOUT" })}
                    </span>
                  ),
                },
              ],
            }}
            className="w-[200px] justify-end"
          >
            <div className="flex h-min">
              <Avatar size={64} src={ImgUser.src} />
              <div className="ml-4 relative flex flex-col align-middle w-[100px] self-center">
                <p className="mb-0 font-poppinsMedium text-[14px]">
                  {userProfile?.username}
                </p>
                <p className="mb-0 text-[12px] text-[#757575] mt-1">Editor</p>
              </div>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
        <Content className="mx-4 md:mx-16 overflow-x-hidden">
          <div className="my-9">{children}</div>
        </Content>
        <Footer className="bg-[#FAFBFF] text-right text-[#B5B7C0]">
          Companies DB App ©{new Date().getFullYear()} Created by Alvin Johanes
          Lee
        </Footer>
      </Layout>
    </Layout>
  );
}
