import React, { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminTitle from "../../components/AdminTitle";
import { Button, message, Switch, Table, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCT_TYPE_REQUEST } from "../../reducers/productType";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_TOP_TOGGLE_REQUEST,
  CREATE_MODAL_TOGGLE,
  PRODUCT_THUMBNAIL_REQUEST,
} from "../../reducers/product";
import styled from "styled-components";

const PreviewImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`;

const PreviewImageBox = styled.div`
  width: 250px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #999;
  font-size: 20px;

  border: 1px dashed #999;
`;
const PreviewImageInput = styled.div`
  width: calc(100% - 250px);
  height: 100%;
  padding: 15px;
`;

const SearchBtnWrapper = styled.div`
  width: 100%;
  margin: 5px 0px 10px 0px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ThumbnailBox = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 3px;
`;

const ThumbnailBox2 = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 3px;
`;

const Product = () => {
  const [selectType, setSelectType] = useState(null);

  const { types } = useSelector((state) => state.productType);
  const {
    products,
    st_productTopToggleDone,
    createModal,
    previewTh,
    st_productThumbnailLoading,
    st_productThumbnailDone,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const thImageRef = useRef();

  useEffect(() => {
    if (st_productThumbnailDone) {
      message.success("썸네일 이미지가 업로드 되었습니다.");
    }
  }, [st_productThumbnailDone]);

  useEffect(() => {
    if (st_productTopToggleDone) {
      message.success("상품 노출정보가 변경되었습니다.");

      dispatch({
        type: PRODUCT_TYPE_REQUEST,
      });

      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: { typeId: selectType },
      });
    }
  }, [st_productTopToggleDone]);

  useEffect(() => {
    dispatch({
      type: PRODUCT_TYPE_REQUEST,
    });

    dispatch({
      type: PRODUCT_LIST_REQUEST,
      data: { typeId: selectType },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
      data: { typeId: selectType },
    });
  }, [selectType]);

  const typeBtnClickHandler = useCallback(
    (value) => {
      setSelectType(value);
    },
    [selectType]
  );

  const isTopClickHandler = useCallback((data) => {
    const currentId = data.id;
    const nextIsTop = !data.isTop;

    dispatch({
      type: PRODUCT_TOP_TOGGLE_REQUEST,
      data: {
        id: currentId,
        nextTop: nextIsTop,
      },
    });
  });

  const th = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "썸네일",
      render: (data) => <ThumbnailBox src={data.thumbnail} />,
    },
    {
      title: "상품명",
      dataIndex: "title",
    },
    {
      title: "상품유형",
      render: (data) => <p>{data.ProductType.value}</p>,
    },
    {
      title: "판매가",
      dataIndex: "price",
    },
    {
      title: "할인율",
      render: (data) => <div>{data.discount}%</div>,
    },
    {
      title: "최종판매가",
      render: (data) => (
        <div>{data.price - (data.price / 100) * data.discount}원</div>
      ),
    },
    {
      title: "상위노출",
      render: (data) => (
        <Switch
          onChange={() => isTopClickHandler(data)}
          defaultChecked={data.isTop}
        />
      ),
    },
  ];

  const createModalToggleHandler = useCallback(() => {
    dispatch({
      type: CREATE_MODAL_TOGGLE,
    });
  }, [createModal]);

  const thImageClickHandler = useCallback(() => {
    thImageRef.current.click();
  }, [thImageRef.current]);

  const thImageChangeHandler = useCallback((e) => {
    const currentFile = e.target.files[0];

    const formData = new FormData();
    formData.append("image", currentFile);

    dispatch({
      type: PRODUCT_THUMBNAIL_REQUEST,
      data: formData,
    });
  }, []);

  return (
    <AdminLayout>
      <AdminTitle title="상품 관리" />

      <SearchBtnWrapper>
        <Button
          type={selectType === null ? "primary" : "default"}
          size="small"
          onClick={() => typeBtnClickHandler(null)}
        >
          전체
        </Button>
        {types.map((data) => {
          return (
            <Button
              key={data.id}
              type={selectType === data.id ? "primary" : "default"}
              size="small"
              onClick={() => typeBtnClickHandler(data.id)}
            >
              {data.value}
            </Button>
          );
        })}
        <Button type="link" size="small" onClick={createModalToggleHandler}>
          + 상품등록
        </Button>
      </SearchBtnWrapper>

      <Table rowKey="id" columns={th} size="small" dataSource={products} />

      <Modal
        visible={createModal}
        footer={null}
        title="새로운 상품 등록"
        onCancel={createModalToggleHandler}
        width={"800px"}
      >
        <PreviewImageWrapper>
          <PreviewImageBox>
            {previewTh ? (
              <ThumbnailBox2
                width={`100%`}
                height={`100%`}
                src={previewTh}
                alt="th"
              />
            ) : (
              `[250px x 250px]`
            )}
          </PreviewImageBox>
          <PreviewImageInput>
            <input
              type="file"
              hidden
              name="thImage"
              ref={thImageRef}
              onChange={thImageChangeHandler}
            />
            <Button
              loading={st_productThumbnailLoading}
              size="small"
              onClick={thImageClickHandler}
            >
              SELECT FILE
            </Button>
          </PreviewImageInput>
        </PreviewImageWrapper>
      </Modal>
    </AdminLayout>
  );
};

export default Product;
