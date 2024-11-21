function renderListBills() {
    // Lấy dữ liệu từ localStorage, mặc định là mảng rỗng nếu không có dữ liệu
    let billsData = JSON.parse(localStorage.getItem('dshoadon')) || {};

    // Khởi tạo nội dung bảng
    let tableContent = ``;

    // Duyệt qua từng email trong dshoadon
    for (const email in billsData) {
        // Lấy danh sách các đơn hàng của khách hàng
        let customerBills = billsData[email];

        customerBills.forEach((bill, index) => {
            // Truy xuất các thông tin cần thiết từ mỗi hóa đơn
            let customerName = bill.ten;
            let orderTime = bill.ngaymua;
            let address = bill.diachi;
            let totalAmount = bill.gia;

            // Tạo nội dung cho từng dòng bảng
            tableContent += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${customerName}</td>
                    <td>${orderTime}</td>
                    <td>${address}</td>
                    <td>${totalAmount}</td>
                    <td>
                        <div class="order-status"style="width:100%">
                            <select name="orderStatus">
                                <option value="unprocessed">Chưa xử lý</option>
                                <option value="confirmed">Đã xác nhận</option>
                                <option value="shipped">Đã Giao</option>
                                <option value="cancelled">Đã hủy</option>
                            </select>
                        </div>
                    </td>
                    <td><button onclick="handleAction(${index})">Click</button></td>
                </tr>
            `;
        });
    }

    // Đặt nội dung vào tbody của bảng
    document.getElementById('hdlist').innerHTML = tableContent;
}

// Hàm xử lý hành động cho mỗi đơn hàng
function handleAction(index) {
    console.log("Xử lý đơn hàng tại chỉ số: ", index);
    // Thực hiện các thao tác với đơn hàng tại index nếu c  ần
}

