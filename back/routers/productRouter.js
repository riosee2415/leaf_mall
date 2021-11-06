const express = require("express");
const { Product, ProductType } = require("../models");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/image", upload.single("image"), (req, res, next) => {
  return res.status(200).json({ path: req.file.location });
});

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
