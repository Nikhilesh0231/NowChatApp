import multer from 'multer';

export const multerUpload = multer({limits:{
  fileSize: 5*1000000, // 5MB
},
});

const singleAvatar = multerUpload.single("avatar");

export {singleAvatar};