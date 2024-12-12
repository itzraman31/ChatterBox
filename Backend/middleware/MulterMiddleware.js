import multer from 'multer'

const storeFile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage:storeFile })

export default upload






// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log(__filename)
// const storeFile = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath = path.join(__dirname, "../public/temp");

//         fs.mkdir(uploadPath, { recursive: true }, (err) => {
//             if (err) {
//                 return cb(err);
//             }
//             cb(null, uploadPath);
//         });
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); 
//     }
// });

// const upload = multer({ storage: storeFile });

// export default upload;
