/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Document,
  Font,
  Image,
  PDFViewer,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import useStore, { IStore } from "store";

import { ICompanyDAO } from "../DAO/company.dao";
import { Modal } from "antd";
import PdfLogo from "assets/icons/pdflogo.png";
import React from "react";
import ToCapitalize from "helper/toCapitalize";
import dayjs from "dayjs";

interface IProps {
  dataListCompany: ICompanyDAO[];
  onClose: () => void;
  selectedData: string;
}

export default function ExportPDFCompanyComponent(props: IProps) {
  const { onClose, dataListCompany, selectedData } = props;

  const { userProfile }: IStore = useStore();

  Font.register({
    family: "NunitoSans",
    src: "/fonts/NunitoSans/NunitoSans_7pt-Regular.ttf",
  });
  Font.register({
    family: "NunitoSansBold",
    src: "/fonts/NunitoSans/NunitoSans_7pt-Bold.ttf",
  });
  Font.register({
    family: "NunitoSansExtraBold",
    src: "/fonts/NunitoSans/NunitoSans_7pt-ExtraBold.ttf",
  });
  Font.register({
    family: "PoppinsSemiBold",
    src: "/fonts/Poppins/Poppins-SemiBold.ttf",
  });
  Font.register({
    family: "PoppinsMedium",
    src: "/fonts/Poppins/Poppins-Medium.ttf",
  });
  Font.register({
    family: "QuickSandBold",
    src: "/fonts/Quicksand/Quicksand-Bold.ttf",
  });
  Font.register({
    family: "Inter",
    src: "/fonts/Inter/Inter-Regular.otf",
  });

  console.log("dataListCompany", dataListCompany);

  return (
    <Modal
      open={true}
      footer={null}
      onCancel={onClose}
      className="top-6 !w-[90vw] !h-[90vh] "
    >
      <PDFViewer className="w-full !h-[90vh] mt-6">
        <Document title="Companies List DB" subject="Companies List DB">
          <Page size="A4" style={{ flexDirection: "row" }}>
            <View style={{ flexBasis: "150px" }}>
              <Image
                src={PdfLogo.src}
                style={{
                  height: "100vh",
                  width: "100%",
                }}
              />
            </View>
            <View style={{ flexGrow: 1, marginLeft: "50px" }}>
              <Text
                style={{
                  marginTop: "40%",
                  fontFamily: "NunitoSansBold",
                  fontSize: "20px",
                }}
              >
                Companies List DB
              </Text>
              <Text
                style={{
                  fontSize: "32px",
                  fontFamily: "NunitoSansExtraBold",
                  marginBottom: "-10px",
                }}
              >
                {ToCapitalize(selectedData)}
              </Text>
              <Text
                style={{
                  fontSize: "32px",
                  fontFamily: "NunitoSansExtraBold",
                  marginBottom: "-10px",
                }}
              >
                Companies
              </Text>
              <Text
                style={{
                  fontSize: "32px",
                  fontFamily: "NunitoSansExtraBold",
                  marginBottom: "-10px",
                }}
              >
                In Database
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#9B51E0",
                  marginTop: "10vh",
                  paddingLeft: "30px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  width: "90%",
                  color: "white",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  borderTopRightRadius: "80px",
                }}
              >
                <Text
                  style={{
                    fontFamily: "NunitoSans",
                  }}
                >
                  Prepared by{" "}
                </Text>
                <Text style={{ fontFamily: "NunitoSansBold" }}>
                  {userProfile?.username}
                </Text>
              </View>
              <View style={{ marginTop: "10vh" }}>
                <Text
                  style={{
                    fontFamily: "NunitoSans",
                    color: "#7A7A7A",
                    fontSize: "12px",
                  }}
                >
                  Created at:
                </Text>
                <Text style={{ fontFamily: "NunitoSans", fontSize: "12px" }}>
                  {dayjs().format("DD MMMM YYYY")}
                </Text>
              </View>
              <View style={{ marginTop: "10vh" }}>
                <Text
                  style={{
                    fontFamily: "NunitoSans",
                    color: "#7A7A7A",
                    fontSize: "12px",
                  }}
                >
                  Powered by
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    src="/images/setting.png"
                    style={{
                      height: "30px",
                      width: "30px",
                      marginTop: "3px",
                    }}
                  />
                  <Text
                    style={{ fontFamily: "PoppinsSemiBold", fontSize: "26px" }}
                  >
                    Dashboard
                  </Text>
                </View>
              </View>
            </View>
          </Page>
          <Page
            size="A4"
            style={{
              paddingTop: "80px",
              borderBottom: "2px",
            }}
          >
            {dataListCompany.map((data, index) => {
              return (
                <View
                  key={index}
                  style={{ flexDirection: "row", gap: "30px", padding: "20px" }}
                >
                  <View style={{ flexBasis: "180px" }}>
                    <Image
                      src={data.image}
                      style={{
                        height: "120px",
                        width: "180px",
                        borderRadius: "10px",
                      }}
                    />
                  </View>
                  <View style={{ flexGrow: 1 }}>
                    <Text
                      style={{ fontSize: "16px", fontFamily: "QuickSandBold" }}
                    >
                      {data.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        color: "#FF5B19",
                        marginVertical: "10px",
                      }}
                    >
                      {data.employees}
                    </Text>
                    <Text
                      style={{
                        fontSize: "12px",
                        fontFamily: "Inter",
                        color: "#7F7F7F",
                      }}
                    >{`${data.address}, ${data.country}`}</Text>
                  </View>
                  <View
                    style={{
                      width: "100px",
                      height: "30px",
                      backgroundColor:
                        data.status == "active" ? "#16C098" : "#FFC5C5",
                      paddingTop: "3px",
                      textAlign: "center",
                      borderRadius: "5px",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor:
                        data.status == "active" ? "#008767" : "#DF0404",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily: "PoppinsMedium",
                        color: data.status == "active" ? "#008767" : "#DF0404",
                      }}
                    >
                      {ToCapitalize(data.status as string)}
                    </Text>
                  </View>
                </View>
              );
            })}
            <View
              style={{
                position: "absolute",
                fontSize: 12,
                bottom: 50,
                right: 0,
                left: 30,
                textAlign: "center",
                color: "grey",
                width: "90%",
                borderBottom: "1px solid grey",
              }}
              fixed
            />
            <Text
              style={{
                position: "absolute",
                fontSize: 12,
                bottom: 30,
                right: 30,
                textAlign: "center",
                color: "grey",
              }}
              render={({ pageNumber }) => `${pageNumber - 1} `}
              fixed
            />
            <Text
              style={{
                position: "absolute",
                fontSize: 10,
                bottom: 30,
                left: 30,
                textAlign: "center",
                color: "grey",
                fontFamily: "NunitoSans",
              }}
              render={() => `Copyright © 2024 Dashboard.`}
              fixed
            />
          </Page>
        </Document>
      </PDFViewer>
    </Modal>
  );
}
