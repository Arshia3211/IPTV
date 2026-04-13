import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload directory exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => 
    cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Support both images and videos for IPTV
  const imageTypes = /jpeg|jpg|png|gif/;
  const videoTypes = /mp4|avi|mkv|mov|wmv/;
  const extName = imageTypes.test(path.extname(file.originalname).toLowerCase()) || videoTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = imageTypes.test(file.mimetype) || videoTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg,jpg,png,gif) or videos (mp4,avi,mkv,mov,wmv) allowed"));
  }
};

export const uploadImage = multer({ 
  storage, 
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB for images
  fileFilter 
});

export const uploadVideo = multer({ 
  storage, 
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB for videos
  fileFilter 
});

export const uploadFile = multer({ 
  storage, 
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB general
  fileFilter 
});

export default { uploadImage, uploadVideo, uploadFile };
