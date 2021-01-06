const multer = require("multer");

//MM-10

module.exports = multer({
  storage: multer.diskStorage({
    destination: "src/public",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});
