function renderListBills(startDate = null, endDate = null, selectedStatus = null) {
    // Lấy dữ liệu hóa đơn từ localStorage
    let billsData = JSON.parse(localStorage.getItem('dshoadon')) || {};

    // Tạo một mảng chứa tất cả hóa đơn
    let allBills = [];
    for (const email in billsData) {
        // console.log(email)
        allBills = allBills.concat(billsData[email]);
    }

    // console.log(allBills)

    // Nếu có khoảng thời gian, lọc hóa đơn theo thời gian
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        allBills = allBills.filter(bill => {
            const orderDate = new Date(bill.ngaymua);
            return orderDate >= start && orderDate <= end;
        });
    }

    // Nếu có trạng thái, lọc hóa đơn theo trạng thái
    if (selectedStatus) {
        allBills = allBills.filter(bill => bill.trangthai === selectedStatus);
    }

    // Sắp xếp hóa đơn theo ngày (mới nhất -> cũ nhất)
    allBills.sort((a, b) => new Date(b.ngaymua) - new Date(a.ngaymua));

    // Khởi tạo nội dung bảng
    let tableContent = ``;
    allBills.forEach((bill, index) => {
        // console.log(index + bill.trangthai);
        tableContent += `
            <tr>
                <td>${bill.id}</td>
                <td>${bill.ten}</td>
                <td>${bill.ngaymua}</td>
                <td>${bill.diachi}</td>
                <td>${bill.gia.toLocaleString()} VND</td>
                <td>
                    <select name="orderStatus" data-id="${bill.id}" data-email="${bill.email}" onchange="updateOrderStatus(this)">
                        <option value="Chưa xử lý" ${bill.trangthai === "Chưa xử lý" ? "selected" : ""}>Chưa xử lý</option>
                        <option value="Đã xác nhận" ${bill.trangthai === "Đã xác nhận" ? "selected" : ""}>Đã xác nhận</option>
                        <option value="Đã giao" ${bill.trangthai === "Đã giao" ? "selected" : ""}>Đã giao</option>
                        <option value="Đã hủy" ${bill.trangthai === "Đã hủy" ? "selected" : ""}>Đã hủy</option>
                    </select>
                </td>
                <td><button onclick="viewOrderDetails(${bill.id})">Xem đơn hàng</button></td>
            </tr>
        `;
    });

    // Đặt nội dung vào bảng
    document.getElementById('hdlist').innerHTML = tableContent;
}

function filterByDate() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    renderListBills(startDate, endDate);
}

function filterByStatus() {
    const selectedStatus = document.getElementById('status-selected').value;
    renderListBills(null, null, selectedStatus);
}

function updateOrderStatus(selectElement) {
    const id = parseInt(selectElement.getAttribute('data-id'));
    const email = selectElement.getAttribute('data-email');
    const newStatus = selectElement.value;

    // Lấy dữ liệu từ localStorage
    let billsData = JSON.parse(localStorage.getItem('dshoadon')) || {};
    let bill = billsData[email].find(item => item.id === id)

    bill.trangthai = newStatus;

    localStorage.setItem('dshoadon', JSON.stringify(billsData));
    alert("Cập nhật trạng thái thành công!");
}

function viewOrderDetails(index) {
    let billsData = JSON.parse(localStorage.getItem('dshoadon')) || {};
    let allBills = [];
    for (const email in billsData) {
        allBills = allBills.concat(billsData[email]);
    }
    const bill = allBills.find(item => item.id === index);
    if (!bill) {
        alert("Không tìm thấy hóa đơn!");
        return;
    }

    const detailsContent = `
        <h3>Chi tiết hóa đơn</h3>
        <p><strong>Tên khách hàng:</strong> ${bill.ten}</p>
        <p><strong>Ngày mua:</strong> ${bill.ngaymua}</p>
        <p><strong>Địa chỉ:</strong> ${bill.diachi}</p>
        <p><strong>Tổng tiền:</strong> ${bill.gia.toLocaleString()} VND</p>
        <p><strong>Trạng thái:</strong> ${bill.trangthai}</p>
        <button onclick="closeDetails()">Đóng</button>
    `;
    const detailsContainer = document.getElementById('order-details');
    detailsContainer.innerHTML = detailsContent;
    detailsContainer.style.display = 'block';
}

function closeDetails() {
    const detailsContainer = document.getElementById('order-details');
    detailsContainer.style.display = 'none';
    detailsContainer.innerHTML = '';
}

// Khởi chạy hiển thị danh sách hóa đơn ban đầu
renderListBills();
