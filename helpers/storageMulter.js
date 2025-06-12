const multer=require('multer');
module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/')
        },
        //Tên file dạng time+originname
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now();
            cb(null,`${uniqueSuffix}-${file.originalname}`)// multer lưu file rồi, nên k cần truyền file vào hàm
        }
    })
    return ;storage// mục đích cuối trả về storage
}
