import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
export const fileUpload=(fieldName)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          cb(null,uuidv4()+"-"+ file.originalname)
        }
      })
      function fileFilter (req, file, cb) {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else{
            cb(null, false)
        }
      }
      const upload = multer({ storage})
      return upload.single(fieldName)
}
