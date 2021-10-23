import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import AdminLayout from "../../components/AdminLayout";
import AdminTitle from "../../components/AdminTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  CREATE_MODAL_TOGGLE,
  PRODUCT_TYPE_REQUEST,
} from "../../reducers/productType";
import { Button, Table, Modal } from "antd";

const BtnWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ViewText = styled.div`
  font-size: 1.2rem;
`;

const ContentWrapper = styled.div`
  padding: 10px;
`;

const ProductType = () => {
  const { types, createModal } = useSelector((state) => state.productType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: PRODUCT_TYPE_REQUEST,
    });
  }, []);

  const createModalHandler = useCallback(() => {
    dispatch({
      type: CREATE_MODAL_TOGGLE,
    });
  }, [createModal]);

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
      render: (data) => <ViewText>{data}</ViewText>,
    },
    {
      title: "상품유형",
      dataIndex: "value",
      render: (data) => <ViewText>{data}</ViewText>,
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
      render: (data) => <ViewText>{String(data).split("T")[0]}</ViewText>,
    },
    {
      title: "수정",
      render: (data) => (
        <Button type="primary" size="small">
          수정
        </Button>
      ),
    },
    {
      title: "삭제",
      render: (data) => (
        <Button type="danger" size="small">
          삭제
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <AdminTitle title="상품유형 관리" />

      <ContentWrapper>
        <BtnWrapper>
          <Button type="primary" size="small" onClick={createModalHandler}>
            유형생성
          </Button>
        </BtnWrapper>

        <Table
          rowKey="id"
          columns={columns}
          size="small"
          dataSource={types}
          pagination={{
            position: ["bottomCenter"],
          }}
        />
      </ContentWrapper>

      <Modal
        visible={createModal}
        title="유형 생성"
        footer={null}
        onCancel={createModalHandler}
      >
        <h2>Hello Modal</h2>
      </Modal>
    </AdminLayout>
  );
};

export default ProductType;
