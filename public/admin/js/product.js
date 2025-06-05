//Change-status
const buttonChangeStatus=document.querySelectorAll("[button-change-status]");
const formChangeStatus=document.querySelector("#form-change-status");
const path=formChangeStatus.getAttribute("data-path");
console.log(path);

if(buttonChangeStatus.length>0){
    buttonChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            //khi click ==> lấy ra status , id của nút ==> changg status sau đó ghép vào param thành 1 router động 
            const status=button.getAttribute("data-status");
            const id=button.getAttribute("data-id");
            const statusChange=(status=="active"?"inactive":"active");

            //sau khi change sttus của nút , lấy id sản phẩm ==> tạo 1 action từ dữ liệu đó => gán vào cho action của form ảo để gửi đi
            const action=path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action=action;// gán action vào action form
            formChangeStatus.submit();// gửi form đi
             
        })
    })    
}
