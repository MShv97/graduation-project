const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    destination: "src/assets",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});
