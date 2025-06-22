//Đệ quy để nó hiện thị ra theo phân cấp
    let count=0;//index của các ptu
    function createTree(arr, parrent_id = "") {
        const tree = [];
        arr.forEach(item => {
            if (item.parrent_id == parrent_id) {
                count+=1;
                const newItem = item;
                newItem.index=count;//gán cho các ptu index
                const children = createTree(arr, newItem.id); // tìm các con của ptu htai -> nó sẽ trả về mảng ptu con
                if (children.length > 0) { //nếu có ptu con-> nối vào
                    newItem.children = children;
                }
                //đẩy ptu gốc cao nhất vào mảng
                tree.push(newItem);
            }
        });
        return tree; // rả về mảng (những thg cấp cao nhất , những thg cấp cao nhất này chứa những thg con bên trong)
    }

//Do là để gọi lại hàm create -> dùng imporrt => ta k gọi lại hàm đc trong export -> tạo riêng 1 hàm và gọi
//mục tieu trả về 1 hàm chứa các gốc
module.exports.tree=(arr, parrent_id = "")=>{
   count=0;// mỗi lần gọi -> reset thành 0 
   const array=createTree(arr, parrent_id = "");
   return array;
}