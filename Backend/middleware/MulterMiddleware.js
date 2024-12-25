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