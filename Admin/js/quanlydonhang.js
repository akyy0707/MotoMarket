// Hiển thị danh sách hóa đơn
function renderListBills() {
    // Lấy dữ liệu hóa đơn từ localStorage
    let billsData = JSON.parse(localStorage.getItem('dshoadon')) || {};

    // Khởi tạo nội dung bảng
    let tableContent = ``;

    // Duyệt qua từng email trong dshoadon
    for (const email in billsData) {
        let customerBills = billsData[email]; // Lấy danh sách hóa đơn của khách hàng

        customerBills.forEach((bill, index) => {
            // Truy xuất thông tin cần thiết
            let customerName = bill.ten;
            let orderTime = bill.ngaymua;
            let address = bill.diachi;
            let totalAmount = bill.gia;

            // Tạo nội dung dòng bảng
            tableContent += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${customerName}</td>
                    <td>${orderTime}</td>
                    <td>${address}</td>
                    <td>${totalAmount.toLocaleString()} VND</td>
                    <td>
                        <select name="orderStatus">
                            <option value="unprocessed" ${bill.status === "unprocessed" ? "selected" : ""}>Chưa xử lý</option>
                            <option value="confirmed" ${bill.status === "confirmed" ? "selected" : ""}>Đã xác nhận</option>
                            <option value="shipped" ${bill.status === "shipped" ? "selected" : ""}>Đã giao</option>
                            <option value="cancelled" ${bill.status === "cancelled" ? "selected" : ""}>Đã hủy</option>
                        </select>
                    </td>
                    <td><button onclick="viewOrderDetails(${index}, '${email}')">Xem đơn hàng</button></td>
                </tr>
            `;
        });
    }

    // Đặt nội dung vào bảng
    document.getElementById('hdlist').innerHTML = tableContent;
}

// Hàm xem chi tiết đơn hàng dựa trên index và email khách hàng
function viewOrderDetails(index, email) {
    // Lấy dữ liệu hóa đơn từ localStorage
    let billsData = JSON.parse(localStorage.getItem('dshoadon')) || {};
    let customerBills = billsData[email]; // Lấy danh sách hóa đơn của khách hàng
    const statusSelect = document.querySelectorAll('select[name="orderStatus"]')[index];
    const currentStatus = statusSelect ? statusSelect.value : "Chưa xác định";
    // Lấy thông tin chi tiết của đơn hàng
    let bill = customerBills[index];

    // Tạo nội dung HTML cho thông tin chi tiết hóa đơn
    const orderDetailsHTML = `
        <div class="order-details-container">
            <h3>Thông tin khách hàng</h3>
            <p><strong>Tên:</strong> ${bill.ten}</p>
            <p><strong>Email:</strong> ${bill.email}</p>
            <p><strong>Số điện thoại:</strong> ${bill.sodienthoai}</p>
            
            <h3>Chi tiết hóa đơn</h3>
            <p><strong>Ngày mua:</strong> ${bill.ngaymua}</p>
            <p><strong>Địa chỉ:</strong> ${bill.diachi}</p>
            <p><strong>Tổng tiền:</strong> ${bill.gia.toLocaleString()} VND</p>
            <p><strong>Trạng thái:</strong> ${currentStatus}</p>

            <button onclick="closeOrderDetails()">Đóng</button>
        </div>
    `;

    // Chèn nội dung vào div hiển thị
    const detailsContainer = document.getElementById('order-details');
    detailsContainer.innerHTML = orderDetailsHTML;

    // Hiển thị thẻ div
    detailsContainer.style.display = 'block';
}

// Hàm đóng chi tiết hóa đơn
function closeOrderDetails() {
    const detailsContainer = document.getElementById('order-details');
    detailsContainer.style.display = 'none';
    detailsContainer.innerHTML = ''; // Xóa nội dung
}

// Hiển thị danh sách hóa đơn của một sản phẩm cụ thể
function viewOrders(productName) {
    // Lấy dữ liệu hóa đơn từ localStorage
    let billsData = JSON.parse(localStorage.getItem('dshoadon')) || {};
    let ordersDetail = '';

    // Kiểm tra từng hóa đơn và sản phẩm
    for (let email in billsData) {
        billsData[email].forEach(order => {
            order.sp.forEach(item => {
                if (item.name === productName) {
                    ordersDetail += `
                        <div class="hoadon">
                            <h3>Đơn hàng của: ${order.ten}</h3>
                            <p>Email: ${order.email}</p>
                            <p>Số điện thoại: ${order.sodienthoai}</p>
                            <p>Ngày mua: ${order.ngaymua}</p>
                            <p>Số lượng: ${item.sl}</p>
                            <p class="kdprice">Thành tiền: ${(item.sl * item.price).toLocaleString()} VND</p>
                        </div>
                    `;
                }
            });
        });
    }

    // Hiển thị kết quả
    if (ordersDetail) {
        document.getElementById("kdmain-content").innerHTML = ordersDetail;
        document.getElementById("kdmain-container").style = "display: flex";
    } else {
        alert(`Không có đơn hàng nào cho sản phẩm: ${productName}`);
    }
}

// Khởi chạy hàm hiển thị danh sách hóa đơn
renderListBills();
