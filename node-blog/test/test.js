



// 阶乘
// function np(n){
//     if(n==0){
//         return 1;
//     }
//
//     return n * np(n-1);
// }
//
// // 次方计算
// function nn(x,y){
//     if(x==0){
//         return 1;
//     }
//     if(y==0){
//         return 1;
//     }
//     let ax =x;
//     for (let i=0;i<y-1;i++){
//         x = parseInt(x) * parseInt(ax);
//     }
//
//     return x;
// }
//
// // 与0比较返回布尔值
// function b0(a){
//     if(a>0){
//         return true;
//     }else{
//         return false;
//     }
// }
//
// // 开方计算
// function kn(x,y){
//     if(x==0){
//         return 0;
//     }
//     if(y==0){
//         return x;
//     }
//
//     // 得到函数为 A^y-x=0求值范围在(0,x);
//
//     let arr1 = [0,x/2];
//     let arr2 = [x/2,x];
//
//     // 组织循环(每增加一位小数就增加一次循环)
//     for(let i=0;i<10;i++){
//
//         if(b0(nn(arr1[0],y)-x)!=b0(nn(arr1[1],y)-x)){
//
//             arr1[0]=arr1[0];
//             arr2[1]=arr1[1];
//             arr1[1]=(arr1[1]+arr1[0])/2;
//             arr2[0]=(arr1[1]+arr1[0])/2;
//
//             console.log('小于平均值 '+arr1)
//             console.log(arr1)
//             console.log('小于平均值 '+arr2)
//             console.log(arr2)
//         }
//
//         if(b0(nn(arr2[0],y)-x)!=b0(nn(arr2[1],y)-x)){
//             arr1 = [arr2[0],(arr2[1]+arr2[0])/2];
//             arr2 = [(arr2[1]+arr2[0])/2,arr2[1]];
//             console.log('大于平均值 '+arr1)
//             console.log('大于平均值 '+arr2)
//         }
//
//     }
//     // console.log(arr1)
//     // console.log(arr2)
// }


{
    // 排序
    let a = [123, 12, 546, 58465, 5212, 12, 0, 456, 654,0,654];

    for (let i = 0; i < a.length; i++) {
        aaa();
    }

    function aaa(){
        for (let i = 0; i < a.length; i++) {
            if(parseInt(a[i])>parseInt(a[i+1])){
                let tmp = a[i+1];
                a[i+1]=a[i];
                a[i]=tmp;
            }
        }
    }

    console.log(a);
}