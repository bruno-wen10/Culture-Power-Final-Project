import multer, { Multer, diskStorage } from "multer";
import path from 'path'

export const configPictureProduct = diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Uplouds-image-products")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

export const uploudPictureProduct: Multer = multer({ storage: configPictureProduct })