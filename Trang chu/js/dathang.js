// Hiển thị hoặc ẩn form nhập địa chỉ mới
function toggleAddressForm(showNewAddressForm) {
    document.getElementById("new-address-form").style.display = showNewAddressForm ? "block" : "none";
}

// Lưu địa chỉ mới vào LocalStorage
function saveAddress() {
    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;
    const district = document.getElementById("district").value;
    const ward = document.getElementById("ward").value;
    const address = document.getElementById("address").value;

    if (!name || !city || !phone || !district || !ward || !address) {
        alert("Vui lòng điền đầy đủ tất cả các thông tin.");
        return;
    }

    const newAddress = { name, city, phone, district, ward, address };
    let addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    addresses.push(newAddress);
    localStorage.setItem("addresses", JSON.stringify(addresses));
    loadSavedAddresses();
    alert("Địa chỉ mới đã được lưu!");
}

function loadSavedAddresses() {
    const savedAddressesDropdown = document.getElementById("saved-addresses");
    savedAddressesDropdown.innerHTML = "<option value=''>-- Chọn địa chỉ đã lưu --</option>";

    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];


    addresses.forEach((address, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${address.name}, ${address.address}, ${address.city}`;
        savedAddressesDropdown.appendChild(option);
    });
}

// Sử dụng địa chỉ đã lưu khi được chọn
function useSavedAddress(event) {
    // Ngăn chặn hành vi mặc định của nút khi nhấn vào
    event.preventDefault();

    const savedAddressesDropdown = document.getElementById("saved-addresses");
    const selectedIndex = savedAddressesDropdown.value;

    if (selectedIndex === "") {
        alert("Vui lòng chọn một địa chỉ đã lưu!");
        return;
    }

    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const selectedAddress = addresses[selectedIndex];

    document.getElementById("name").value = selectedAddress.name;
    document.getElementById("city").value = selectedAddress.city;
    document.getElementById("phone").value = selectedAddress.phone;
    document.getElementById("district").value = selectedAddress.district;
    document.getElementById("ward").value = selectedAddress.ward;
    document.getElementById("address").value = selectedAddress.address;
}


// Thêm sự kiện cho các nút khi trang được tải
document.addEventListener("DOMContentLoaded", function() {
    loadSavedAddresses();

    document.getElementById("save-address-button").addEventListener("click", saveAddress);
    document.getElementById("use-saved-address-button").addEventListener("click", function(event) {
        useSavedAddress(event);
    });
});

const currAcc = JSON.parse(localStorage.getItem('currAcc')) || [];

document.getElementById("khname").innerHTML = 
            `<p onmouseenter="hienthongtinkh()" onmouseout="anthongtinkh()">
                Tài khoản: ${currAcc.name}
            </p>
            <div class="noidung hidden" id="noidung">
                <h3>Thông tin khách hàng</h3>
                <p>Khách hàng: ${currAcc.name}</p>
                <p>Điện thoại: ${currAcc.phone}</p>
                <p>Email: ${currAcc.gmail}</p>
            </div>`;

function hienthongtinkh() {
    document.getElementById("noidung").classList.remove("hidden");
}

function xoaCA(){
    const cA = {};
    localStorage.setItem('currAcc', JSON.stringify(cA));
}