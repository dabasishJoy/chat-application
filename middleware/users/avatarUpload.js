const uploader = require("../../utilities/singleFileUploader");

function avatarUpload(req, res, next) {
  // upload object for multer
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    5000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  //   to get the form data also
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            message: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
