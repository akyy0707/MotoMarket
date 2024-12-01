function renderListBills(startDate = null, endDate = null, selectedStatus = null) {
    let billsData = JSON.parse(localStorage.getItem('dshoadon')) || {};

    let allBills = [];
    for (const email in billsData) {
        allBills = allBills.concat(billsData[email]);
    }

    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        allBills = allBills.filter(bill => {
            const orderDate = new Date(bill.ngaymua);
            return orderDate >= start && orderDate <= end;
        });
    }

    if (selectedStatus) {
        allBills = allBills.filter(bill => bill.trangthai === selectedStatus);
    }

    allBills.sort((a, b) => new Date(b.ngaymua) - new Date(a.ngaymua));

    let tableContent = ``;
    allBills.forEach((bill, index) => {
        tableContent += `
            <tr>
                <td>${index+1}</td>
                <td>${bill.ten}</td>
                <td>${bill.ngaymua}</td>
                <td>${bill.diachi}</td>
                <td>${bill.gia.toLocaleString()} VND</td>
                <td>
                    <select 
                        name="orderStatus" 
                        data-email="${bill.email}" 
                        data-date="${bill.ngaymua}" 
                        data-address="${bill.diachi}" 
                        data-price="${bill.gia}" 
                        onchange="updateOrderStatus(this)">
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

    document.getElementById('hdlist').innerHTML = tableContent;
    document.getElementById('hd2list').innerHTML = tableContent;
}

function filterByDate() {
    document.getElementById('TTTDHang').classList.add("hidden")
    document.getElementById('TKTGian').classList.remove("hidden")
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    renderListBills(startDate, endDate);
}

function filterByStatus() {
    document.getElementById('TKTGian').classList.add("hidden")
    document.getElementById('TTTDHang').classList.remove("hidden")
    const selectedStatus = document.getElementById('status-selected').value;
    renderListBills(null, null, selectedStatus);
}

function updateOrderStatus(selectElement) {
    const email = selectElement.getAttribute('data-email');
    const newStatus = selectElement.value;

    let billsData = JSON.parse(localStorage.getItem('dshoadon')) || {};

    let bill = billsData[email]?.find(item => {
        return item.ngaymua === selectElement.getAttribute('data-date') &&
               item.diachi === selectElement.getAttribute('data-address') &&
               item.gia === parseInt(selectElement.getAttribute('data-price'));
    });

    if (bill) {
        bill.trangthai = newStatus;
        localStorage.setItem('dshoadon', JSON.stringify(billsData));
        alert("Cập nhật trạng thái thành công!");
    } else {
        alert("Không tìm thấy hóa đơn để cập nhật!");
    }
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

    let ordersDetail = `
        <div class="hoadon">
            <h3>Đơn hàng của: ${bill.ten}</h3>
            <p>Email: ${bill.email}</p>
            <p>Số điện thoại: ${bill.sodienthoai}</p>
            <p>Địa chỉ: ${bill.diachi}</p>
            <p>Ngày mua: ${bill.ngaymua}</p>
            <h4>Sản phẩm:</h4>
            <ul>
    `;

    bill.sp.forEach(item => {
        ordersDetail += `
            <li>
                <p>Tên sản phẩm: ${item.name}</p>
                <p>Loại: ${item.type}</p>
                <p>Giá: ${item.price.toLocaleString()} VND</p>
                <p>Số lượng: ${item.sl}</p>
                <p>Thành tiền: ${(item.sl * item.price).toLocaleString()} VND</p>
                <br>
            </li>
        `;
    });

    ordersDetail += `
            </ul>
            <p class="kdprice">Tổng tiền đơn hàng: ${bill.gia.toLocaleString()} VND</p>
            <button onclick="closeDetails()">Đóng</button>
        </div>
    `;

    const detailsContainer = document.getElementById('order-details');
    detailsContainer.innerHTML = ordersDetail;
    detailsContainer.style.display = 'block';
}

function closeDetails() {
    const detailsContainer = document.getElementById('order-details');
    detailsContainer.style.display = 'none';
    detailsContainer.innerHTML = '';
}

renderListBills();
