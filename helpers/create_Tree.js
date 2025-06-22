//Đệ quy để nó hiện thị ra theo phân cấp
    function createTree(arr, parrent_id = "") {
        const tree = [];
        arr.forEach(item => {
            if (item.parrent_id == parrent_id) {
                const newItem = item;
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
   const array=createTree(arr, parrent_id = "");
   return array;
}