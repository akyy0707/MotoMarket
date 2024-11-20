function hienxe(){
    document.getElementById("TKXe").classList.remove("hidden");
    document.getElementById("TKKH").classList.add("hidden");
}

function hienkh(){
    document.getElementById("TKKH").classList.remove("hidden");
    document.getElementById("TKXe").classList.add("hidden");
}

renderKDList();

function renderKDList() {
    let products = JSON.parse(localStorage.getItem('xeArr')) || [];
    let ds = JSON.parse(localStorage.getItem('dshoadon')) || [];
    let tableContent = ``;

    products.forEach((product, index) => {
        let totalSold = 0;
        let totalRevenue = 0;

        for (let email in ds) {
            ds[email].forEach(order => {
                order.sp.forEach(item => {
                    if (item.name === product.name) {
                        totalSold += item.sl;
                        totalRevenue += item.sl * item.price;
                    }
                });
            });
        }

        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${totalSold}</td>
                <td>${totalRevenue.toLocaleString()} VND</td>
                <td><button class="view" onclick="viewOrders('${product.name}')">Xem Đơn Hàng</button></td>
            </tr>
        `;
    });

    document.getElementById('kdlist').innerHTML = tableContent;

    let acc = JSON.parse(localStorage.getItem('acc')) || [];
    let table = ``;

    acc.forEach((acc, index) => {
        if(index !== 0){
            table += `
                <tr>
                    <td>${index}</td>
                    <td>${acc.name}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `;
        }
    });

    document.getElementById('khlist').innerHTML = table;
}

function viewOrders(productName) {
    let ds = JSON.parse(localStorage.getItem('dshoadon')) || [];
    let ordersDetail = '';

    for (let email in ds) {
        ds[email].forEach(order => {
            order.sp.forEach(item => {
                if (item.name === productName) {
                    ordersDetail += `
                        <div>
                            <h4>Đơn hàng của: ${order.ten}</h4>
                            <p>Email: ${order.email}</p>
                            <p>Số điện thoại: ${order.sodienthoai}</p>
                            <p>Ngày mua: ${order.ngaymua}</p>
                            <p>Số lượng: ${item.sl}</p>
                            <p>Thành tiền: ${(item.sl * item.price).toLocaleString()} VND</p>
                            <hr>
                        </div>
                    `;
                }
            });
        });
    }

    if (ordersDetail) {
        alert(`Thông tin đơn hàng cho sản phẩm: ${productName}\n\n${ordersDetail}`);
    } else {
        alert(`Không có đơn hàng nào cho sản phẩm: ${productName}`);
    }
}