import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const date = new Date();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "frontend/public/images/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${
        date.getMonth() + 1
      }_${date.getDate()}_${date.getFullYear()}-${date.getHours() + 1}_${
        date.getMinutes() + 1
      }_${date.getSeconds() + 1}_${date.getMilliseconds() + 1}${path.extname(
        file.originalname
      )}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /png|jpg|jpeg/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb({ message: "Images Only! Extensions Accepted: .png, .jpg, .jpeg" });
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded successfully!",
    image: `/images/${req.file.filename}`,
  });
});

export default router;
