//file này để tạp ra token random
module.exports.genarateRandomString=(length)=>{
    const character=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstwxyz0123456789";
    let result="";
    for(let i=0;i<length;i++){
        result+=character.charAt(Math.floor(Math.random()*character.length));
    }
    return result;
};