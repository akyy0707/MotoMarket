

document.addEventListener('DOMContentLoaded', function() {
    hienthigiohang();
});

function hienthigiohang() {
    const giohang = JSON.parse(localStorage.getItem("giohang")) || [];
    let tongtien = 0;
    let lsp = '';

    giohang.forEach(sanpham => {
        const thanhtien = sanpham.price * sanpham.sl;
        tongtien += thanhtien;

        lsp += `
            <div class="cart-item">
                <img src="${sanpham.image}" alt="${sanpham.name}">
                <div class="cart-item-info">
                    <p>${sanpham.name}</p>
                    <p>Giá: ${sanpham.price.toLocaleString()} VNĐ</p>
                    <p>Số lượng: ${sanpham.sl}</p> 
                    <p>Thành tiền: ${thanhtien.toLocaleString()} VNĐ</p>
                </div>
            </div>
        `;
    });

    document.getElementById("lsp").innerHTML = lsp;

    tinhtongthanhtoan(tongtien);
}

function tinhtongthanhtoan(tongtien = null) {
    const phuongthucthanhtoan = document.getElementById("phuongthucthanhtoan").value;
    let phivanchuyen = 0;

    if (tongtien === null) {
        tongtien = JSON.parse(localStorage.getItem("giohang")).reduce((total, sanpham) => {
            return total + (sanpham.price * sanpham.sl);
        }, 0);
    }

    document.getElementById("tongthanhtoan").innerText = `${tongtien.toLocaleString()} VNĐ`;
}
