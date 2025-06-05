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
//pagination
const buttonPage=document.querySelectorAll("[button-pagination]");
console.log(buttonPage);
if(buttonPage.length>0){
   let url=new URL(window.location.href);
   buttonPage.forEach(button => {
      button.addEventListener("click",()=>{
         //lấy ra tranng=gtri button
         const page=button.getAttribute("button-pagination");
         url.searchParams.set("page",page);
         window.location.href=url.href;
      })
   })
}

//checkbox-change-multi
const checkMulti =document.querySelector("[check-box-multi]");
if(checkMulti){
   const checkAll=checkMulti.querySelector("input[name='checkall']");
   const inputIds=checkMulti.querySelectorAll("input[name='id']");
   console.log(checkAll);
   
   checkAll.addEventListener("click",()=>{
      if(checkAll.checked){
         //check tất cả
         inputIds.forEach(inputId=>{
            inputId.checked=true;
         })
      }else{
         //bỏ check all
         inputIds.forEach(inputId=>{
            inputId.checked=false;
         })
      }
   })
   //nếu k click vào nút all, duyệt qua từng checkId-> dếm
   inputIds.forEach(input=>{
      input.addEventListener("click",()=>{
         //đếm xem có bnhieu ô click
         const countInputChecked=checkMulti.querySelectorAll("input[name='id']:checked").length;// số lượng nút click
         const totalInput=inputIds.length;

         //nếu số lượng click=total=> checkAll(click)
         if(countInputChecked==totalInput){
            checkAll.checked=true;
         }else{
            checkAll.checked=false;
         }
      })
   })
   
}

//form-change-multi
const formChangeMulti=document.querySelector("[form-multi-change]");
if(formChangeMulti){
   formChangeMulti.addEventListener("submit",(e)=>{
       e.preventDefault();

       //lấy id của các inputId checked -> ghép vào 1 chuỗi -> đưa lên input
      const checkMulti =document.querySelector("[check-box-multi]");
      const inputChecked=checkMulti.querySelectorAll("input[name='id']:checked");
      if(inputChecked.length>0){
          let ids=[];
          inputChecked.forEach(input =>{
             const id=input.value
             ids.push(id);
          })
          // gán vào ô input của form -> xíu ẩn đi mục đích để gửi input lên controller
          const inputIds=formChangeMulti.querySelector("input[name='ids']");
          inputIds.value=ids.join(", ");

          formChangeMulti.submit();
      }else{
         alert("Vui lòng chọn ít nhất 1 bản ghi")
      }

   })
}