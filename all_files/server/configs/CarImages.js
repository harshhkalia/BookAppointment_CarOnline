import multer from "multer";
import fs from "fs";

const uploadDir = "CarImages";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadCarImages = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    if (!allowedTypes.test(file.mimetype)) {
      return cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
    }
    cb(null, true);
  },
});

export default uploadCarImages;
