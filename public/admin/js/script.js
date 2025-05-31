const buttons = document.querySelectorAll("[button-status]"); // thuộc tính tự định nghĩa
console.log(buttons);

//xử lý frontend , check xem nút nào ấn -> thêm status nút đó lên url backend lấy đc
if (buttons.length > 0) {
   //có hàm url, trong url có 1 số hàm có thể thêm param, xóa
   let url = new URL(window.location.href);
   console.log(url);

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
         url.searchParams.set("keyword",keyword );
      } else {
         url.searchParams.delete("keyword");
      }
      window.location.href=url.href;
   })
}