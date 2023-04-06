const multer = require("multer");

function singFileUploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  // upload folder
  const UPLOADS_FOLDER = `${__dirname}/../../public/uploads/${subfolder_path}`;
  // storage
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      // file extenstion
      const fileExtension = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExtension, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      callback(null, fileName + fileExtension);
    },
  });

  //   final upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },

    // validation
    fileFilter: (req, file, callback) => {
      if (allowed_file_types.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(createError(error_msg));
      }
    },
  });

  return upload;
}

module.exports = singFileUploader;
