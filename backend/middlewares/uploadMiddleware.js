import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ✅ Use /tmp because Vercel allows writing only there
const uploadPath = '/tmp/uploads';

// Create /tmp/uploads if it doesn’t exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer for temporary file storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Validate image file types
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, jpeg, png, webp).'));
  }
}

// Initialize Multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => checkFileType(file, cb),
});

export default upload;
