import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

export default function Card(props: IProps) {
  const { children, className } = props;
  return (
    <div className={`bg-white rounded-3xl p-8 relative ${className}`}>
      {children}
    </div>
  );
}
