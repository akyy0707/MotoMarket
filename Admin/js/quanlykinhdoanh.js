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
    filterOrdersByDate();

    let acc = JSON.parse(localStorage.getItem('acc')) || [];
    let ds = JSON.parse(localStorage.getItem('dshoadon')) || [];
    let userRevenues = [];

    acc.forEach((acc, index) => {
        if (index !== 0) {
            let userRevenue = 0;

            if (ds[acc.gmail]) {
                ds[acc.gmail].forEach(order => {
                    userRevenue += order.gia;
                });
            }

            userRevenues.push({
                name: acc.name,
                gmail: acc.gmail,
                revenue: userRevenue
            });
        }
    });

    let table = ``;
    userRevenues.forEach((user, index) => {
        table += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.revenue.toLocaleString()} VND</td>
                <td><button onclick="viewUserOrders('${user.gmail}')">Xem Đơn Hàng</button></td>
            </tr>
        `;
    });
    document.getElementById('khlist').innerHTML = table;

    userRevenues.sort((a, b) => b.revenue - a.revenue);
    let top5Users = userRevenues.slice(0, 5);

    let top5Table = ``;
    top5Users.forEach(user => {
        top5Table += `
            <tr>
                <td>${user.name}</td>
                <td>${user.revenue.toLocaleString()} VND</td>
                <td><button onclick="viewUserOrders('${user.gmail}')">Xem Đơn Hàng</button></td>
            </tr>
        `;
    });
    document.getElementById('top5Customers').innerHTML = top5Table;
}

function viewUserOrders(email) {
    let ds = JSON.parse(localStorage.getItem('dshoadon')) || [];
    let orders = ds[email] || [];

    if (orders.length > 0) {
        let orderDetails = `<h3>Đơn hàng của ${email}:</h3>`;
        orderDetails += `<ul>`;

        orders.forEach(order => {
            orderDetails += `<li>
                <p>Ngày mua: ${order.ngaymua}</p>
                <p>Tổng tiền: ${order.gia.toLocaleString()} VND</p>
                <p>Chi tiết sản phẩm:</p>
                <ul>
                    ${order.sp.map(item => `
                        <li>${item.name} - Số lượng: ${item.sl} - Đơn giá: ${item.price.toLocaleString()} VND</li>
                    `).join('')}
                </ul>
            </li>`;
        });

        orderDetails += `</ul>`;

        document.getElementById('orderDetails').innerHTML = orderDetails;
    } else {
        alert('Không có đơn hàng nào cho khách hàng này.');
    }
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

function filterOrdersByDate() {
    let products = JSON.parse(localStorage.getItem('xeArr')) || [];
    let ds = JSON.parse(localStorage.getItem('dshoadon')) || [];
    let tableContent = ``;

    let tgMin = new Date(document.getElementById('tgmin').value);
    let tgMax = new Date(document.getElementById('tgmax').value);
    let currentDate = new Date();

    products.forEach((product, index) => {
        let totalSold = 0;
        let totalRevenue = 0;

        for (let email in ds) {
            ds[email].forEach(order => {
                let orderDate = new Date(order.ngaymua);

                // Kiểm tra điều kiện thời gian
                if (
                    (!isNaN(tgMin.getTime()) && !isNaN(tgMax.getTime()) && orderDate >= tgMin && orderDate <= tgMax) ||
                    (isNaN(tgMin.getTime()) && !isNaN(tgMax.getTime()) && orderDate <= tgMax) ||
                    (!isNaN(tgMin.getTime()) && isNaN(tgMax.getTime()) && orderDate >= tgMin) ||
                    (isNaN(tgMin.getTime()) && isNaN(tgMax.getTime()))
                ) {
                    order.sp.forEach(item => {
                        if (item.name === product.name) {
                            totalSold += item.sl;
                            totalRevenue += item.sl * item.price;
                        }
                    });
                }
            });
        }

        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${totalSold}</td>
                <td>${totalRevenue.toLocaleString()} VND</td>
                <td><button onclick="viewOrders('${product.name}')">Xem Đơn Hàng</button></td>
            </tr>
        `;
    });

    document.getElementById('kdlist').innerHTML = tableContent;

    // Cập nhật xe bán chạy nhất và ế nhất
    updateBestAndWorstSelling(products, ds, tgMin, tgMax);
}

function updateBestAndWorstSelling(products, ds, tgMin, tgMax) {
    let productStats = [];

    products.forEach(product => {
        let totalSold = 0;
        let totalRevenue = 0;

        for (let email in ds) {
            ds[email].forEach(order => {
                let orderDate = new Date(order.ngaymua);

                if (
                    (!isNaN(tgMin.getTime()) && !isNaN(tgMax.getTime()) && orderDate >= tgMin && orderDate <= tgMax) ||
                    (isNaN(tgMin.getTime()) && !isNaN(tgMax.getTime()) && orderDate <= tgMax) ||
                    (!isNaN(tgMin.getTime()) && isNaN(tgMax.getTime()) && orderDate >= tgMin) ||
                    (isNaN(tgMin.getTime()) && isNaN(tgMax.getTime()))
                ) {
                    order.sp.forEach(item => {
                        if (item.name === product.name) {
                            totalSold += item.sl;
                            totalRevenue += item.sl * item.price;
                        }
                    });
                }
            });
        }

        productStats.push({
            name: product.name,
            totalSold: totalSold,
            totalRevenue: totalRevenue
        });
    });

    if (productStats.length > 0) {
        let mostSoldProduct = productStats.reduce((max, p) => p.totalRevenue > max.totalRevenue ? p : max, productStats[0]);
        let leastSoldProduct = productStats.reduce((min, p) => p.totalRevenue < min.totalRevenue ? p : min, productStats[0]);

        document.getElementById('mostSold').innerHTML = `
            <tr>
                <td>${mostSoldProduct.name}</td>
                <td>${mostSoldProduct.totalSold}</td>
                <td>${mostSoldProduct.totalRevenue.toLocaleString()} VND</td>
                <td><button onclick="viewOrders('${mostSoldProduct.name}')">Xem Đơn Hàng</button></td>
            </tr>
        `;

        document.getElementById('leastSold').innerHTML = `
            <tr>
                <td>${leastSoldProduct.name}</td>
                <td>${leastSoldProduct.totalSold}</td>
                <td>${leastSoldProduct.totalRevenue.toLocaleString()} VND</td>
                <td><button onclick="viewOrders('${leastSoldProduct.name}')">Xem Đơn Hàng</button></td>
            </tr>
        `;
    }
}

// Gọi hàm filterOrdersByDate() khi người dùng thay đổi khoảng thời gian
document.getElementById('tgmin').addEventListener('change', filterOrdersByDate);
document.getElementById('tgmax').addEventListener('change', filterOrdersByDate);
