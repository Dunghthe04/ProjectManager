const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

module.exports.uploadClound = (req, res, next) => {
    //nếu ng dùng có chọn file
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req); // nó trả về dữ liệu url online
            //Thay vì gán url cho thumbnail ở controller, gán luôn ở middelware lun
            req.body[req.file.fieldname] = result.url; //lấy ra name của ô input file trong html -> lấy như này bao quất hơn , vd nếu name trong input là img -> req.body.img=url online ảnh
            console.log(result);
            next(); // gán data vào biến thumbnail xong ->next sang controller để lưu vào database
        }
        upload(req);

    } else {
        //nếu ko có req.file -> ko chọn ảnh -> next luôn
        next();
    }
}