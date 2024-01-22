import multer, { diskStorage } from "multer"
import path from 'path'
const configPicture = diskStorage({    
    destination(req, file, callback) {
        callback(null, 'Uplouds-image-profile/' )        
    },
    filename(req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname))
    },
})

export const  uploudPicture = multer({storage: configPicture})