module.exports = (pagination,query,countProducts) => {
    //nếu trên url có param page -> thêm 1 key current page vào, value là trang htai
    if (query.page) {
        const currentPage = parseInt(query.page);
        pagination.currentPage = currentPage;
    }

    //tính toán số lượng skip(ptu bắt đầu lấy)
    pagination.skip = (pagination.currentPage - 1) * pagination.limit;
    //tính xem cần có bnhiue trang
    
    const totalPage = Math.ceil(countProducts / pagination.limit);
    pagination.totalPage = totalPage;

    //mục đích nhận vào object sử lý rồi thêm các key vào object
    return pagination;
}