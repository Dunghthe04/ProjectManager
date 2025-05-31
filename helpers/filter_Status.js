module.exports = (query) => {
    let filterStatus = [{
            name: "Tất Cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Ngừng hoạt động",
            status: "deactive",
            class: ""
        }
    ];

    //xử lý backend, lấy querystatus trên url -> check xem nút nào có status giống => thêm class active(xanh nút), nếu ko có -> 
    if (query.status) {
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == ""); // nếu k mặc định thằng đầu xanh
        console.log(index);

        filterStatus[index].class = "active";
    }

    //sau khi sử lý backend trả về mảng kia để render giao diện
    return filterStatus;
}