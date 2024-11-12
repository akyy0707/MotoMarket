document.addEventListener('DOMContentLoaded', function() {
    const link = document.querySelector('.shop a');
    
    link.addEventListener('click', function(event) {        
        if (!giohang) {
            event.preventDefault();
            alert("Vui lòng đăng nhập để mua hàng!!!");
        }
    });
});

// function hienthigiohang() {
//     const giohang = JSON.parse(localStorage.getItem("giohang")) || [];
//     const khungsanpham = document.querySelector(".product-section");

//     khungsanpham.innerHTML = "<h3>Sản phẩm trong giỏ hàng</h3>";

//     if(giohang.length === 0){
//         khungsanpham.innerHTML = "<p>Sản phẩm trống.</p>"
//         return;
//     }
//     gioHang.forEach(sanPham => {
//         const sanPhamHTML = `
//             <div class="product">
//                 <img src="${sanPham.image}" alt="${sanPham.name}">
//                 <div class="product-details">
//                     <p>${sanPham.name}</p>
//                     <p style="color: #ff4500;">${sanPham.price.toLocaleString()} VNĐ</p>
//                     <div class="quantity">
//                         <span>So luong: ${sanPham.soLuong}</span>
//                     </div>
//                 </div>
//             </div>
//         `;
//         khungSanPham.innerHTML += sanPhamHTML;
//     });

//     const tongCong = gioHang.reduce((sum, sanPham) => sum + sanPham.price * sanPham.soLuong, 0);
//     khungSanPham.innerHTML += `<p>Tong cong tam tinh: <strong>${tongCong.toLocaleString()} VNĐ</strong></p>`;
// }

// document.addEventListener("DOMContentLoaded", hienthigiohang());