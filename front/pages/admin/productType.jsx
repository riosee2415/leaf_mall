import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import AdminLayout from "../../components/AdminLayout";
import AdminTitle from "../../components/AdminTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  CREATE_MODAL_TOGGLE,
  PRODUCT_TYPE_REQUEST,
  PRODUCT_TYPE_CREATE_REQUEST,
} from "../../reducers/productType";
import { Button, Table, Modal, Form, Input, message } from "antd";

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
  const { types, createModal, st_typeCreateDone } = useSelector(
    (state) => state.productType
  );
  const dispatch = useDispatch();

  const [cForm] = Form.useForm();
  const cFormRef = useRef();

  useEffect(() => {
    dispatch({
      type: PRODUCT_TYPE_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_typeCreateDone) {
      message.success("새로운 상품유형이 등록되었습니다.");
      dispatch({
        type: PRODUCT_TYPE_REQUEST,
      });
    }
  }, [st_typeCreateDone]);

  const createModalHandler = useCallback(() => {
    dispatch({
      type: CREATE_MODAL_TOGGLE,
    });
  }, [createModal]);

  const formFinishHandler = useCallback((data) => {
    dispatch({
      type: PRODUCT_TYPE_CREATE_REQUEST,
      data: data,
    });
  }, []);

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
        <Form
          ref={cFormRef}
          form={cForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={formFinishHandler}
        >
          <Form.Item label="유형명" name="typeName">
            <Input allowClear={true} />
          </Form.Item>

          <BtnWrapper>
            <Button size="small" type="primary" htmlType="submit">
              생성
            </Button>
          </BtnWrapper>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default ProductType;
