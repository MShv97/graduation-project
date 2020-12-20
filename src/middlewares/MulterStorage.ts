import multer from "multer";

//MM-10

export default multer({
  storage: multer.diskStorage({
    destination: "src/public",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});
