module.exports = (query) => {
    //mặc định phải có keyword để trả về form  k tìm gì -> ko hiển thị gì ô input
    const objectSearch={
        keyword:""
    }
    
    //nếu có nhập -> cập nhập keyword(render gd) regex để lọc
    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        //tạo ra 1 regex tìm kiếm chứa chuỗi, và ko kp hoa thường
        const regrex = new RegExp(objectSearch.keyword, "i");
        //add regex vào bộ lọc/, lọc các pu có title chứa regex
        objectSearch.regrex=regrex;
    }

    return objectSearch;
}