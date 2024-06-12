import { IntlShape } from "react-intl";
import React from "react";
import { Tag } from "antd";

interface IProps {
  intl: IntlShape;
  text: "active" | "inactive" | boolean;
}

export default function TagStatus(props: IProps) {
  const { intl, text } = props;

  return (
    <Tag
      className={`capitalize border-solid border-2 w-[80px] text-center font-poppinsMedium text-[14px] p-1 ${
        text === "active"
          ? "!border-[#008767] !text-[#008767]"
          : "!border-[#DF0404] !text-[#DF0404]"
      }`}
      color={text === "active" ? "#A6E7D8" : "#FFC5C5"}
    >
      {text &&
        typeof text === "string" &&
        intl.formatMessage({ id: text.toUpperCase() })}
    </Tag>
  );
}
