// const xeArr = [
//     {
//       image: '/image/YAMAHA/YAMAHA NVX/NVXden.png',
//       name: 'YAMAHA NVX Đen',
//       description: 'A reliable and fuel-efficient sedan',
//       type: 'tay ga',
//       brand: 'YAMAHA',
//       price: 20000
//     },
//     {
//       image: '/image/YAMAHA/Janus/Janusden.png',
//       name: 'YAMAHA Janus Đen',
//       description: 'A powerful and stylish sports car',
//       type: 'tay ga',
//       brand: 'YAMAHA',
//       price: 35000
//     },
//     {
//         image: '/image/YAMAHA/Grande/Grandedo.png',
//         name: 'YAMAHA Grande Đỏ',
//         description: 'A powerful and stylish sports car',
//         type: 'tay ga',
//         brand: 'YAMAHA',
//         price: 45000
//     },
//     {
//         image: '/image/YAMAHA/Latte/latteden.png',
//         name: 'YAMAHA Latte Đen',
//         description: 'A powerful and stylish sports car',
//         type: 'tay ga',
//         brand: 'YAMAHA',
//         price: 30000
//     },
//     {
//         image: '/image/HONDA/RSX FI/rsxdo.png',
//         name: 'HONDA RSX FI Đỏ',
//         description: 'A powerful and stylish sports car',
//         type: 'xe so',
//         brand: 'HONDA',
//         price: 33000
//     },
//     {
//         image: '/image/HONDA/RSX FI/rsxtrang.png',
//         name: 'HONDA RSX FI Trắng',
//         description: 'A powerful and stylish sports car',
//         type: 'xe so',
//         brand: 'HONDA',
//         price: 33000
//     },
//     {
//         image: '/image/YAMAHA/Janus/Janustrang.png',
//         name: 'YAMAHA Janus Trắng',
//         description: 'A powerful and stylish sports car',
//         type: 'tay ga',
//         brand: 'YAMAHA',
//         price: 35000
//     },
//     {
//         image: '/image/YAMAHA/Janus/Janusxanh.png',
//         name: 'YAMAHA Janus Xanh',
//         description: 'A powerful and stylish sports car',
//         type: 'tay ga',
//         brand: 'YAMAHA',
//         price: 35000
//     },
//     {
//         image: '/image/HONDA/RSX FI/rsxxanh.png',
//         name: 'HONDA RSX FI Xanh',
//         description: 'A powerful and stylish sports car',
//         type: 'xe so',
//         brand: 'HONDA',
//         price: 33000
//     },
//     {
//         image: '/image/HONDA/SHMODE/shden.png',
//         name: 'HONDA SH Đen',
//         description: 'A powerful and stylish sports car',
//         type: 'tay ga',
//         brand: 'HONDA',
//         price: 50000
//     },
//     {
//         image: '/image/HONDA/SHMODE/shtrang.png',
//         name: 'HONDA SH Trắng',
//         description: 'A powerful and stylish sports car',
//         type: 'tay ga',
//         brand: 'HONDA',
//         price: 50000
//     },
//     {
//         image: '/image/HONDA/Vision/vision.png',
//         name: 'HONDA Vision',
//         description: 'A powerful and stylish sports car',
//         type: 'tay ga',
//         brand: 'HONDA',
//         price: 40000
//     },
//     {
//         image: '/image/YAMAHA/Sirius/siriusden.png',
//         name: 'YAMAHA Sirius Đen',
//         description: 'A powerful and stylish sports car',
//         type: 'xe so',
//         brand: 'YAMAHA',
//         price: 30000
//     },
//     {
//         image: '/image/YAMAHA/Sirius/siriusdo.png',
//         name: 'YAMAHA Sirius Đỏ',
//         description: 'A powerful and stylish sports car',
//         type: 'xe so',
//         brand: 'YAMAHA',
//         price: 30000
//     },
//     {
//         image: '/image/YAMAHA/Sirius/siriustrang.png',
//         name: 'YAMAHA Sirius Trắng',
//         description: 'A powerful and stylish sports car',
//         type: 'xe so',
//         brand: 'YAMAHA',
//         price: 30000
//     },
// ];

// localStorage.setItem('xeArr', JSON.stringify(xeArr));

// const acc = [
//     {
//         makhachhang: 1,
//         gmail: "admin@gmail.com",
//         name: "admin",
//         phone: "0914100004",
//         password: "admin"
//     }
// ];

// localStorage.setItem('acc', JSON.stringify(acc));
// localStorage.setItem('giohang', JSON.stringify([]));

window.onload = function(){
    const currAcc = JSON.parse(localStorage.getItem('currAcc'));
    
    if(currAcc.name === 'admin'){
        currAcc = {};
        localStorage.setItem('currAcc', JSON.stringify(currAcc));
        giohang = false;
    }

    if(currAcc && Object.keys(currAcc).length > 0 && currAcc.name !== 'admin'){
        document.getElementById("khname").innerHTML = `
            <p onmouseenter="hienthongtinkh()" onmouseout="anthongtinkh()">
                Tài khoản: ${currAcc.name}
            </p>
            <div class="noidung hidden" id="noidung">
                <h3>Thông tin khách hàng</h3>
                <p>Khách hàng: ${currAcc.name}</p>
                <p>Điện thoại: ${currAcc.phone}</p>
                <p>Email: ${currAcc.gmail}</p>
            </div>`;
        successLogin();
        
        giohang = true;
        
    }
};
