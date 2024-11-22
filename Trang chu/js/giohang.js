

document.addEventListener('DOMContentLoaded', function() {
    hienthigiohang();
});

// document.getElementById("shopping").onclick = function(){
//     hienthigiohang();
// }

function hienthigiohang() {

    const giohangKey = `giohang_${currAcc.gmail}`;
    const giohang = JSON.parse(localStorage.getItem(giohangKey)) || [];
    let tongtien = 0;
    let lsp = '';

    if (giohang.length === 0) {
        document.getElementById("lsp").innerHTML = "<p>Giỏ hàng trống.</p>";
        document.getElementById("tongthanhtoan").innerText = "0 VNĐ";
        return;
    }

    giohang.forEach((sanpham, index) => {
        const thanhtien = sanpham.price * sanpham.sl;
        tongtien += thanhtien;

        lsp += `
            <div class="cart-item product price">
                <img src="${sanpham.image}" alt="${sanpham.name}">
                <div class="cart-item-info">
                    <strong>${sanpham.name}</strong>
                    <p>Giá: ${sanpham.price.toLocaleString()} VNĐ</p>
                    <p>Số lượng:</p>
                    <div class="quantily">
                        <button onclick="giamsoluong(${index})">−</button> 
                        <input type="number" value="${sanpham.sl}" min="1" id="soluong">
                        <button onclick="tangsoluong(${index})">+</button>
                    </div>
                    <p style="color: #ff4400">Thành tiền: ${thanhtien.toLocaleString()} VNĐ</p>
                    <button onclick="xoa(${index})" class="delete-btn">Xóa</button>
                </div>
            </div>
        `;
    });

    document.getElementById("lsp").innerHTML = lsp;
    document.getElementById("tongthanhtoan").innerText = `${tongtien.toLocaleString()} VNĐ`;
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

function tangsoluong(index) {
    const currAcc = JSON.parse(localStorage.getItem("currAcc"));
    if (!currAcc) return;

    const giohangKey = `giohang_${currAcc.gmail}`;
    let tangsoluong = JSON.parse(localStorage.getItem(giohangKey)) || [];

    if(tangsoluong[index]){
        tangsoluong[index].sl +=1;    
        localStorage.setItem(giohangKey, JSON.stringify(tangsoluong));
        hienthigiohang(); 
    }
}

function giamsoluong(index) {
    const currAcc = JSON.parse(localStorage.getItem("currAcc"));
    if (!currAcc) return;

    const giohangKey = `giohang_${currAcc.gmail}`;
    let giamsoluong = JSON.parse(localStorage.getItem(giohangKey)) || [];

    if (giamsoluong[index] && giamsoluong[index].sl > 1) {
        giamsoluong[index].sl -= 1;
        localStorage.setItem(giohangKey, JSON.stringify(giamsoluong));
        hienthigiohang();
    }
}

function xoa(index) {
    const currAcc = JSON.parse(localStorage.getItem("currAcc"));
    if (!currAcc) return;

    const giohangKey = `giohang_${currAcc.gmail}`;
    let xoa = JSON.parse(localStorage.getItem(giohangKey)) || [];

    if(xoa[index]){
        xoa.splice(index, 1);
        localStorage.setItem(giohangKey, JSON.stringify(xoa));
        hienthigiohang();
    }
}

document.querySelector('.order-button').addEventListener('click', function () {
    const currAcc = JSON.parse(localStorage.getItem("currAcc"));
    if (!currAcc) {
        alert("Vui lòng đăng nhập để đặt hàng.");
        return;
    }

    const giohangKey = `giohang_${currAcc.gmail}`;
    const giohang = JSON.parse(localStorage.getItem(giohangKey)) || [];

    if (giohang.length === 0) {
        alert("Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.");
        return;
    }

    const ten = document.getElementById("name").value.trim();
    const thanhpho = document.getElementById("city").value.trim();
    const sodienthoai = document.getElementById("phone").value.trim();
    const quanhuyen = document.getElementById("district").value.trim();
    const xaphuong = document.getElementById("ward").value.trim();
    const diachi = document.getElementById("address").value.trim();

    if (!ten || !thanhpho || !sodienthoai || !quanhuyen || !xaphuong || !diachi) {
        alert("Vui lòng điền đầy đủ thông tin địa chỉ nhận hàng.");
        return;
    }

    const diachidaydu = `${diachi}, ${xaphuong}, ${quanhuyen}, ${thanhpho}`;

    const homnay = new Date();
    const hoadon = {
        ten: ten,
        email: currAcc.gmail,
        sodienthoai: sodienthoai,
        diachi: diachidaydu,
        ngaymua: homnay.toLocaleDateString() + " " + homnay.toLocaleTimeString(),
        sp: giohang,
        gia: giohang.reduce((total, item) => total + (item.price * item.sl), 0)
    };

    let dshoadon = JSON.parse(localStorage.getItem("dshoadon")) || {};
    if (!dshoadon[currAcc.gmail]) {
        dshoadon[currAcc.gmail] = [];
    }
    dshoadon[currAcc.gmail].push(hoadon);
    localStorage.setItem("dshoadon", JSON.stringify(dshoadon));

    alert("Đặt hàng thành công!");

    localStorage.removeItem(giohangKey);

    hienthigiohang();
});


function xemtatcahoadon() {
    const currAcc = JSON.parse(localStorage.getItem("currAcc"));
    if (!currAcc) {
        alert("Vui lòng đăng nhập để xem hóa đơn.");
        return;
    }


    const dshoadon = JSON.parse(localStorage.getItem("dshoadon")) || {};
    const hoadons = dshoadon[currAcc.gmail] || [];

    if (hoadons.length === 0) {
        alert("Không có hóa đơn nào.");
        return;
    }

    const danhsachhoadon = hoadons.map((hoadon, index) => `
        <div class="order-card">
            <h4>Hóa đơn #${index + 1}</h4>
            <p><strong>Ngày đặt:</strong> ${hoadon.ngaymua}</p>
            <p><strong>Tên:</strong> ${hoadon.ten}</p>
            <p><strong>Email:</strong> ${hoadon.email}</p>
            <p><strong>Số điện thoại:</strong> ${hoadon.sodienthoai}</p>
            <p><strong>Địa chỉ:</strong> ${hoadon.diachi}</p>
            <p><strong>Chi tiết sản phẩm:</strong></p>
            ${hoadon.sp.map(item => `
                <div class="order-item">
                    <p>${item.name}</p>
                    <p>Giá: ${item.price.toLocaleString()} VNĐ</p>
                    <p>Số lượng: ${item.sl}</p>
                    <p>Thành tiền: ${(item.price * item.sl).toLocaleString()} VNĐ</p>
                </div>
            `).join("")}
            <i style="color: #ff4400"><strong>Tổng tiền:</strong> ${hoadon.gia.toLocaleString()} VNĐ</i>
        </div>
    `).join("");

    document.getElementById("danhsachhoadon").innerHTML = danhsachhoadon;
    document.getElementById("donhang").classList.remove("hidden");
}

function dongdanhsachhoadon() {
    document.getElementById("donhang").classList.add("hidden");
}

function taigiohang() {
    const currAcc = JSON.parse(localStorage.getItem("currAcc"));
    if (!currAcc) return;

    const giohangKey = `giohang_${currAcc.gmail}`;
    const giohang = JSON.parse(localStorage.getItem(giohangKey)) || [];

    localStorage.setItem("giohang", JSON.stringify(giohang));
    hienthigiohang();
}

document.addEventListener('DOMContentLoaded', function() {
    taigiohang();
});
function goToHomePage() {
    window.location.href = "/Trang chu/html/trangchu.html";
}
