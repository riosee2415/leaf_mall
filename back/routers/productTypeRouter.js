const express = require("express");
const { ProductType } = require("../models");

const router = express.Router();

router.get("/list", async (req, res, next) => {
  try {
    const productTypes = await ProductType.findAll({
      where: { isDelete: false },
      order: [["id", "ASC"]],
    });

    return res.status(200).json(productTypes);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품유형을 가져올 수 없습니다.");
  }
});

router.post("/create", async (req, res, next) => {
  const { typeName } = req.body;

  try {
    await ProductType.create({
      value: typeName,
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품유형을 추가할 수 없습니다.");
  }
});

router.patch("/update", async (req, res, next) => {
  const { id, typeName } = req.body;

  try {
    await ProductType.update(
      {
        value: typeName,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품유형을 수정할 수 없습니다.");
  }
});

router.patch("/delete", async (req, res, next) => {
  const { id } = req.body;

  try {
    await ProductType.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품유형을 삭제할 수 없습니다.");
  }
});

module.exports = router;
