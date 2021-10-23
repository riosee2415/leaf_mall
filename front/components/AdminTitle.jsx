import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  width: 100%;
  padding: 10px;

  border-bottom: 1px solid #999;
  color: #444;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const AdminTitle = ({ title }) => {
  return (
    <TitleWrapper>
      <Title>{title}</Title>
    </TitleWrapper>
  );
};

export default AdminTitle;
