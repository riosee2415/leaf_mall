import React, { useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { ACTIVE_MENU_MODIFY } from "../reducers/user";

const AdminWhole = styled.div`
  display: 100%;
  height: 100vh;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const AdminMenuWrapper = styled.div`
  width: 220px;
  height: 100%;
`;

const AdminContentWrapper = styled.div`
  width: calc(100% - 220px);
  height: 100%;
  padding: 20px;
`;

const AdminLayout = ({ children }) => {
  const { activeMenu } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  const movePage = ({ item, key, keyPath, domEvent }) => {
    switch (String(key)) {
      case "1":
        router.push("/admin");
        dispatch({
          type: ACTIVE_MENU_MODIFY,
          data: String(key),
        });
        break;
      case "2":
        router.push("/admin/productType");
        dispatch({
          type: ACTIVE_MENU_MODIFY,
          data: String(key),
        });
        break;
      case "3":
        router.push("/admin/product");
        dispatch({
          type: ACTIVE_MENU_MODIFY,
          data: String(key),
        });
        break;
      case "4":
        router.push("/admin/order");
        dispatch({
          type: ACTIVE_MENU_MODIFY,
          data: String(key),
        });
        break;
      case "5":
        router.push("/admin/user");
        dispatch({
          type: ACTIVE_MENU_MODIFY,
          data: String(key),
        });
        break;

      default:
        break;
    }
  };

  return (
    <AdminWhole>
      <AdminMenuWrapper>
        <Menu
          defaultSelectedKeys={activeMenu}
          mode="inline"
          theme="dark"
          inlineCollapsed={false}
          onClick={movePage}
        >
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            관리자 메인페이지
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            상품유형 관리
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            상품 관리
          </Menu.Item>
          <Menu.Item key="4" icon={<ContainerOutlined />}>
            주문 관리
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            회원 관리
          </Menu.Item>
        </Menu>
      </AdminMenuWrapper>
      <AdminContentWrapper>{children}</AdminContentWrapper>
    </AdminWhole>
  );
};

export default AdminLayout;
