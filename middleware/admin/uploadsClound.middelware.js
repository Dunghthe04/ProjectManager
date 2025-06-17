const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
module.exports.uploadClound = (req, res, next) => {
    //nếu ng dùng có chọn file
    if (req.file) {
        //hàm đẩy ảnh lên coundinary
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                //pthuc upload file lên cound
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
            //đợi upload xong -> trả về dữ liệu thông tin file upload
            let result = await streamUpload(req);
            //Thay vì gán url cho thumbnail ở controller, gán luôn ở middelware lun
            req.body[req.file.fieldname] = result.url; //lấy ra name của ô input file trong html -> lấy như này bao quất hơn , vd nếu name trong input là img -> req.body.img=url online ảnh
            console.log(result);
            next(); // gán data vào biến thumbnail xong ->next sang middelware tiếp theo
        }
        upload(req);

    } else {
        //nếu ko có req.file -> ko chọn ảnh -> next luôn
        next();
    }
}