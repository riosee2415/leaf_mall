const express = require("express");
const { ProductType } = require("../models");

const router = express.Router();

router.get("/list", async (req, res, next) => {
  try {
    const productTypes = await ProductType.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).json(productTypes);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품유형을 가져올 수 없습니다.");
  }
});

// router.post("/create", (req, res, next) => {});

// router.patch("/update", (req, res, next) => {});

// router.patch("/delete", (req, res, next) => {});

module.exports = router;
