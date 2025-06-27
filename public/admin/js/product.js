//Change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
// const path=formChangeStatus.getAttribute("data-path");

// if(buttonChangeStatus.length>0){
//     buttonChangeStatus.forEach(button=>{
//         button.addEventListener("click",()=>{
//             //khi click ==> lấy ra status , id của nút ==> changg status sau đó ghép vào param thành 1 router động 
//             const status=button.getAttribute("data-status");
//             const id=button.getAttribute("data-id");
//             const statusChange=(status=="active"?"inactive":"active");

//             //sau khi change sttus của nút , lấy id sản phẩm ==> tạo 1 action từ dữ liệu đó => gán vào cho action của form ảo để gửi đi
//             const action=path + `/${statusChange}/${id}?_method=PATCH`;
//             formChangeStatus.action=action;// gán action vào action form
//             formChangeStatus.submit();// gửi form đi

//         })
//     })    
// }

//delete products
const buttonsDelete = document.querySelectorAll("[delete-item]");

if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const idButton = button.getAttribute("data-id");
            const check = confirm(`Bạn có chắc chẵn muốn xóa sản phẩm id=${idButton}??`);

            if (check) {
                const action = `${path}/${idButton}?_method=DELETE`;
                formDeleteItem.action = action;
                console.log(action);

                formDeleteItem.submit();
            }
        })
    })
}

//delete products-category
const buttonDeleteCategory = document.querySelectorAll("[delete-item-category]");
if (buttonDeleteCategory.length > 0) {
    const form = document.querySelector("#form-delete-item");
    const path = form.getAttribute("data-path");
    buttonDeleteCategory.forEach(button => {
        button.addEventListener("click", () => {
            const idButton = button.getAttribute("data-id");
            const check = confirm(`Bạn có chắc chắn muốn xóa Danh mục sản phẩm có id = ${idButton}`);
            if (check) {
                const action = `${path}/${idButton}?_method=DELETE`;
                form.action = action;
                form.submit();
            }
        })
    })
}

//delete-role-item
const buttonDeleteRole = document.querySelectorAll("[delete-item-role]");
if (buttonDeleteRole.length > 0) {
    const form = document.querySelector("#delete-role-item");
     const dataPath = form.getAttribute("data-path");
    buttonDeleteRole.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId=button.getAttribute("data-id");
            const check = confirm(`Bạn có chắc chắn muốn xóa Danh mục sản phẩm có id = ${buttonId}`);
            if(check){
                const action=`${dataPath}/${buttonId}?_method=DELETE`;
                form.action=action;
                form.submit();
            }
        })
    })
}