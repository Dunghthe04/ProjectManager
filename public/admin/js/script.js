const buttons = document.querySelectorAll("[button-status]"); // thuộc tính tự định nghĩa

//xử lý frontend , check xem nút nào ấn -> thêm status nút đó lên url backend lấy đc
if (buttons.length > 0) {
   //có hàm url, trong url có 1 số hàm có thể thêm param, xóa
   let url = new URL(window.location.href);

   buttons.forEach(button => {
      button.addEventListener("click", (e) => {
         const status = button.getAttribute("button-status");
         if (status) {
            url.searchParams.set("status", status);
         } else {
            url.searchParams.delete("status");
         }
         window.location.href = url.href;
      })
   })
}



// Form search//
const formSearch = document.querySelector("#form-search");
if (formSearch) {
   let url = new URL(window.location.href);
   formSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = e.target.elements.keyword.value
      if (keyword) {
         url.searchParams.set("keyword", keyword);
      } else {
         url.searchParams.delete("keyword");
      }
      window.location.href = url.href;
   })
}
//pagination
const buttonPage = document.querySelectorAll("[button-pagination]");
if (buttonPage.length > 0) {
   let url = new URL(window.location.href);
   buttonPage.forEach(button => {
      button.addEventListener("click", () => {
         //lấy ra tranng=gtri button
         const page = button.getAttribute("button-pagination");
         url.searchParams.set("page", page);
         window.location.href = url.href;
      })
   })
}

// checkbox-change-multi
const checkMulti = document.querySelector("[check-box-multi]");
if (checkMulti) {
   const checkAll = checkMulti.querySelector("input[name='checkall']");
   const inputIds = checkMulti.querySelectorAll("input[name='id']");

   checkAll.addEventListener("click", () => {
      // nếu chọn nút checkall
      if (checkAll.checked) {
         //check tất cả
         inputIds.forEach(inputId => {
            inputId.checked = true;
         })
      } else {
         //bỏ check all
         inputIds.forEach(inputId => {
            inputId.checked = false;
         })
      }
   })
   //nếu k click vào nút all, đếm xem số lượng nút checked==totalChecked?
   inputIds.forEach(input => {
      input.addEventListener("click", () => {
         //đếm xem có bnhieu ô click
         const countInputChecked = checkMulti.querySelectorAll("input[name='id']:checked").length;
         const totalInput = inputIds.length;
         //nếu số lượng click=total=> chọn nút checkedAll
         if (countInputChecked == totalInput) {
            checkAll.checked = true;
         } else {
            checkAll.checked = false;
         }
      })
   })

}

// form-change-multi
const formChangeMulti = document.querySelector("[form-multi-change]");
if (formChangeMulti) {
   formChangeMulti.addEventListener("submit", (e) => {
      e.preventDefault();
      //lấy id của các inputId checked -> ghép vào 1 chuỗi -> đưa lên input
      const checkMulti = document.querySelector("[check-box-multi]");
      const inputChecked = checkMulti.querySelectorAll("input[name='id']:checked");

      //kiểm tra xem có xóa các nút checked đó k, nếu ko -> return (ko thực hiện lấy id checked gửi form)
      const valueOption = e.target.elements.type.value;
      if (valueOption == "delete-multi") {
         const check = confirm("Bạn có chắc chắn muốn xóa")
         if (!check) {
            return;
         }
      }
      //nếu k return -> chạy xuống và gửi id checked đi bình thường
      if (inputChecked.length > 0) {
         let ids = [];
         inputChecked.forEach(input => {
            const id = input.value;
            //nếu là changepotion-> cần lấy thêm id-position->mảng ids lúc này chứa cả id và position
            if (valueOption == "change-position") {
               const position = input.closest("tr").querySelector("input[name='position']").value;
               const positionAndId = `${id}-${position}`;
               ids.push(positionAndId);
            } else {
               ids.push(id);
            }
         })
         //chuyển mảng thành chuỗi để chèn vào value của input trong form->gửi form -> chạy action trong form -> router-> backend (lấy thông qua req.body)-> thay đổi các document
         const inputIds = formChangeMulti.querySelector("input[name='ids']");
         inputIds.value = ids.join(", ");

         formChangeMulti.submit();
      } else {
         alert("Vui lòng chọn ít nhất 1 bản ghi");
      }
   })
}

//recover
const buttonRecovers = document.querySelectorAll("[button-recover]");

if (buttonRecovers.length > 0) {
   const formRecoverItem = document.querySelector("#form-recover-item");
   const path = formRecoverItem.getAttribute("data-path");
   buttonRecovers.forEach(button => {
      button.addEventListener("click", () => {
         const idRecover = button.getAttribute("data-id");
         const action = `${path}/${idRecover}?_method=PATCH`;
         formRecoverItem.action = action;
         formRecoverItem.submit();
      })
   })
}

//alerrt

//sau 1 khoảng thời gian -> ẩn thông báo
const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
   const dataTime = parseInt(showAlert.getAttribute("data-time"));
   const closeBtn = showAlert.querySelector("[colse-alert]");
   setTimeout(() => {
      showAlert.classList.add("alert-hidden")
   }, dataTime)

   closeBtn.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden")
   })
}


//preview-image
const uploadImage = document.querySelector('[upload-image]');

if (uploadImage) {
   const uploadImageInput = document.querySelector("[upload-image-input]");
   const uploadImagePreview = document.querySelector("[upload-image-preview]");
   const btnClose = document.querySelector(".closeBtn");
   //nếu có change => ng dùng chọn file ở input
   uploadImageInput.addEventListener("change", (e) => {
      btnClose.classList.add("open");
      const file = e.target.files[0]; // e.target=uploadInput, target.files[0]: lấy ra file mà ng dùng chọn
      if (file) {
         //gán src preview = file đó
         uploadImagePreview.src = URL.createObjectURL(file);
      }
   })
}

//resolve-image
const btnClose = document.querySelector(".closeBtn");
if (btnClose) {
   btnClose.addEventListener("click", () => {
      const uploadImageInput = document.querySelector("[upload-image-input]");
      const uploadImagePreview = document.querySelector("[upload-image-preview]");
      const btnClose = document.querySelector(".closeBtn");
      uploadImageInput.value = "";
      uploadImagePreview.src = "";
      btnClose.classList.remove("open");
   })

}

//Sort product
const sortPart = document.querySelector("[sort]");
if (sortPart) {
   console.log(sortPart);
   const sortSelect = sortPart.querySelector("[sort-select]");
   const sortBtn = sortPart.querySelector("[sort-clear]");
   let url = new URL(window.location.href);
   sortSelect.addEventListener("change", (e) => {
      //lấy giá trị ô select chọn -> tách ra 2 phần
      const value = (e.target.value).split("-");
      //dùng destructuring để lấy 2 giá trị đó vào 2 biến key và value
      const [sortKey, sortValue] = value;
      console.log(sortKey);
      console.log(sortValue);

      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);

      window.location.href = url.href;
   });
   //xóa sắp xếp
   sortBtn.addEventListener("click", () => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
      window.location.href = url.href;
   })

   //Gán selected =true cho option chọn
   const sortKey = url.searchParams.get("sortKey");
   const sortValue = url.searchParams.get("sortValue");
   if (sortKey && sortValue) {
      const stringUrl = `${sortKey}-${sortValue}`;
      const optionSelected = sortSelect.querySelector(`option[value=${stringUrl}]`);
      optionSelected.selected = true;
   }
}
// End Sort product
