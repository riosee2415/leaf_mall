const express = require("express");
const { Product, ProductType } = require("../models");

const router = express.Router();

router.get("/list/:typeId", async (req, res, next) => {
  const { typeId } = req.params;

  try {
    if (typeId !== "null") {
      const products = await Product.findAll({
        where: {
          isDelete: false,
          ProductTypeId: parseInt(typeId),
        },
        include: [
          {
            model: ProductType,
          },
        ],
      });

      return res.status(200).json(products);
    } else {
      const products = await Product.findAll({
        where: { isDelete: false },
        include: [
          {
            model: ProductType,
          },
        ],
      });

      return res.status(200).json(products);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품을 조회할 수 없습니다.");
  }
});

router.patch("/update/top", async (req, res, next) => {
  const { id, nextTop } = req.body;

  try {
    const resultUpdate = await Product.update(
      { isTop: Boolean(nextTop) },
      { where: { id: parseInt(id) } }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 제어할 수 없습니다.");
  }
});

module.exports = router;
