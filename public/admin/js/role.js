const table = document.querySelector("[table-permission]");
if (table) {
    //lấy nút ấn
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        //tạo ra mảng lưu trữ id và các permisssion của các quyền
        let permission = [];

        //lấy ra các dòng
        const rows = table.querySelectorAll("[data-name]");

        //duyệt qua từng dòng
        rows.forEach(item => {
            const nameRow = item.getAttribute("data-name");
            let inputs = item.querySelectorAll("input");
            //nếu là dòng id ==>lấy id các quyền, tạo ra từng ý ptu trong mảng permission
            if (nameRow == "products-category_id") {
                inputs.forEach(input => { // duyệt qua từng o input để lấy id của nó
                    const inputId = input.value;
                    permission.push({
                        id: inputId,
                        permission: []
                    }) // thêm các ptu vào mảng (id và các permission tương ứng của nó)
                })
            } else { // nghĩa là các dòng quyền
                inputs.forEach((input, index) => {
                    const check = input.checked; // ktra xem ô checkbox được check k
                    if (check) { // nếu check -> lưu vào permission của ptu đó(lần lượt thứ tự các ptu 0-1-2)
                        //thêm tên ròng(các quyền vào permission, của perrmission tương ứng)
                        permission[index].permission.push(nameRow);
                    }
                })
            }
        })

        //sau khi lấy xong -> ném vào form -> gửi sang backend
        const formChangePermission = document.querySelector("#form-change-permission");
        const inputPermission = formChangePermission.querySelector("[name='permissions']");
        inputPermission.value = JSON.stringify(permission);
        formChangePermission.submit();
    })
}

// xử lý checkbox permission
const dataRecord = document.querySelector("[data-record]");
if (dataRecord) {
    const data = dataRecord.getAttribute("data-record");
    const RecorData = JSON.parse(data);
    const table = document.querySelector("[table-permission]");
    //duyệt từng record , (duyệt từng ptu mảng permission)
    RecorData.forEach((RecorData, index) => {
        const permission = RecorData.permission;
        //duyệt từng mảng permission ptu
        permission.forEach(permission => {
            const row = table.querySelector(`[data-name="${permission}"]`);// lấy ra các dòng mà có tên nằm trong permission
            const input = row.querySelectorAll("input")[index];
            input.checked = true
        })
    })
}
