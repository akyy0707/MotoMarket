
const addForm = document.getElementById('add-form');
const changeForm = document.getElementById('change-form');

function showAddForm() {
    addForm.style.display = 'flex';
}

function closeAddForm() {
    addForm.style.display = 'none';
}

function showChangeForm() {
    changeForm.style.display = 'flex';
}

function closeChangeForm() {
    changeForm.style.display = 'none';
}

function addProducts() {
    event.preventDefault();
    const name = document.getElementById('Name').value;
    const brand = document.getElementById('Hang').value;
    const type = document.getElementById('Loaixe').value;
    const description = document.getElementById('Mieuta').value;
    const price = parseFloat(document.getElementById('Gia').value.replace(/,/g, ''));
    const imageInput = document.getElementById('upload');
    const file = imageInput.files[0];
    if ((name)==='') {
        document.getElementById('nameError').innerHTML = 'Vui lòng nhập tên xe';
    } else {
        document.getElementById('nameError').innerHTML = '';
    }
    if (description==='') {
        document.getElementById('mieutaError').innerHTML = 'Vui lòng nhập miêu tả';
    } else {
        document.getElementById('mieutaError').innerHTML = '';
    }

    if (isNaN(price) || price<1000000) {
        document.getElementById('giaError').innerHTML = 'Vui lòng nhập đúng giá xe';
    } else {
        document.getElementById('giaError').innerHTML = '';
    }

    if(!file){
        alert("Vui lòng nhập hình ảnh!!!")
    }

    if (file&&name&&brand&&type&&description&&price) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;
            const newProduct = {
                image: imageSrc,
                name: name,
                brand: brand,
                type: type,
                description: description,
                price: price
            };

            let products = JSON.parse(localStorage.getItem('xeArr')) || [];
            products.push(newProduct);
            localStorage.setItem('xeArr', JSON.stringify(products));

            alert('Thêm xe thành công!');
            renderListProducts();

            document.getElementById("Name").value = '';
            document.getElementById("Hang").value = '';    
            document.getElementById("Loaixe").value = '';
            document.getElementById("Mieuta").value = '';
            document.getElementById("Gia").value = '';
            document.getElementById("displayImg").innerHTML =''; 
            closeAddForm();
        };
        reader.readAsDataURL(file);
    }else{
        alert("Vui lòng nhập đầy đủ thông tin!!!");    }
}

function renderListProducts() {
    let products = JSON.parse(localStorage.getItem('xeArr')) || [];
    let tableContent = ``;

    products.forEach((product, index) => {
        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.image || '/image/logo.png'}" width="50" height="50" /></td>
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>${product.type}</td>
                <td>${product.description}</td>
                <td>${parseFloat(product.price).toLocaleString('vi-VN')} VNĐ</td>
                <td>
                    <button id="delete-btn" onclick="deleteproducts(${index})">Xóa</button>
                    <button id="edit-btn" onclick="editproducts(${index})">Sửa</button>
                </td>
            </tr>
        `;
    });

    document.getElementById('products-list').innerHTML = tableContent;
}

function deleteproducts(id) {
    if (confirm("Bạn có muốn xóa sản phẩm?")) {
        let products = JSON.parse(localStorage.getItem('xeArr')) || [];
        products.splice(id, 1);
        localStorage.setItem('xeArr', JSON.stringify(products));
        renderListProducts();
    }
}

function editproducts(id) {
    let products = JSON.parse(localStorage.getItem('xeArr')) || [];
    showChangeForm();

    const product = products[id];
    document.getElementById("NameC").value = product.name;
    document.getElementById("HangC").value = product.brand;
    document.getElementById("LoaixeC").value = product.type;
    document.getElementById("MieutaC").value = product.description;
    document.getElementById("GiaC").value = product.price.toLocaleString();

    const currentImage = document.getElementById("currentImage");

    // Hiển thị ảnh hiện tại, nếu không có ảnh, hiển thị ảnh mặc định
    if (product.image && product.image !== "/image/logo.png") {
        currentImage.src = product.image;
    } else {
        currentImage.src = "/image/logo.png";  // Đặt ảnh mặc định nếu không có ảnh
    }

    currentImage.setAttribute("data-deleted", "false");

    // Gán sự kiện cập nhật cho nút
    document.getElementById("update-car-btn").onclick = function () {
        updateProduct(id);
    };

    // Xử lý sự kiện khi chọn ảnh mới
    const imageInput = document.getElementById("uploadC");
    imageInput.addEventListener('change', function(event) {
        const reader = new FileReader();
        reader.onload = function (e) {
            currentImage.src = e.target.result; // Cập nhật ảnh ngay trên giao diện
        };
        reader.readAsDataURL(imageInput.files[0]); // Đọc ảnh người dùng chọn
    });
}




function updateProduct(id) {
    const name = document.getElementById('NameC').value;
    const brand = document.getElementById('HangC').value;
    const type = document.getElementById('LoaixeC').value;
    const description = document.getElementById('MieutaC').value;
    const price = parseFloat(document.getElementById('GiaC').value.replace(/,/g, ''));
    const imageInput = document.getElementById('uploadC');
    const currentImage = document.getElementById('currentImage');
    let products = JSON.parse(localStorage.getItem('xeArr')) || [];

    const product = products[id];

    // Kiểm tra trạng thái ảnh hiện tại
    if (currentImage.getAttribute("data-deleted") === "true") {
        product.image = "/image/logo.png"; // Xóa ảnh thì đặt ảnh mặc định
    }

    // Kiểm tra nếu có ảnh mới được tải lên
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (event) {
            product.image = event.target.result; // Lưu ảnh mới vào sản phẩm
            saveUpdatedProduct(id, products, name, brand, type, description, price);
        };
        reader.readAsDataURL(imageInput.files[0]); // Đọc file ảnh mới
        return; // Kết thúc hàm nếu có ảnh mới
    }

    // Nếu không có ảnh mới và không bị xóa ảnh, giữ ảnh cũ
    saveUpdatedProduct(id, products, name, brand, type, description, price);
}

function saveUpdatedProduct(id, products, name, brand, type, description, price) {
    products[id].name = name;
    products[id].brand = brand;
    products[id].type = type;
    products[id].description = description;
    products[id].price = price;

    localStorage.setItem('xeArr', JSON.stringify(products));
    alert('Cập nhật xe thành công!');
    renderListProducts();
    closeChangeForm();
}

function deleteImage() {
    const currentImage = document.getElementById('currentImage');
    currentImage.src = '/image/logo.png'; // Xóa ảnh khỏi giao diện
    currentImage.setAttribute("data-deleted", "true"); // Đánh dấu rằng ảnh đã bị xóa
}

function previewImage() {
    const fileInput = document.getElementById('upload'); // Lấy input file
    const displayImg = document.getElementById('displayImg'); // Lấy phần tử chứa ảnh
    const file = fileInput.files[0]; // Lấy tệp ảnh người dùng chọn

    // Kiểm tra xem người dùng đã chọn ảnh chưa
    if (file) {
        const reader = new FileReader(); // Tạo đối tượng FileReader để đọc tệp ảnh

        // Khi ảnh đã được đọc
        reader.onload = function(event) {
            // Tạo thẻ img để hiển thị ảnh
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result; // Gán đường dẫn ảnh đã đọc được
            imgElement.style.width = "100px"; // Đặt kích thước cho ảnh hiển thị

            // Xóa ảnh cũ nếu có trước khi thêm ảnh mới
            displayImg.innerHTML = '';
            displayImg.appendChild(imgElement); // Thêm ảnh vào phần tử displayImg
        };

        // Đọc tệp ảnh dưới dạng URL (Data URL)
        reader.readAsDataURL(file);
    }
}
