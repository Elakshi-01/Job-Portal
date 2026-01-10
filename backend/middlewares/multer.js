import multer from "multer";

// Memory storage
const storage = multer.memoryStorage();

export const singleUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
}).single("file"); // ✅ FIXED
