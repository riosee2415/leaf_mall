import React from "react";
import "antd/dist/antd.css";

const ClientLayout = ({ children }) => {
  return (
    <section>
      HEADER!!!!
      {children}
      FOOTER!!!
    </section>
  );
};

export default ClientLayout;
