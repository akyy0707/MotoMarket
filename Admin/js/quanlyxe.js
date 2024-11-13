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
    const name = document.getElementById('Name').value;
    const brand = document.getElementById('Hang').value;
    const type = document.getElementById('Loaixe').value;
    const description = document.getElementById('Mieuta').value;
    const price = parseFloat(document.getElementById('Gia').value.replace(/,/g, ''));
    const imageInput = document.getElementById('upload');
    const file = imageInput.files[0];

    if (file) {
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
            closeAddForm();
        };
        reader.readAsDataURL(file);
    } else {
        alert('Vui lòng chọn hình ảnh!');
    }
}

function renderListProducts() {
    let products = JSON.parse(localStorage.getItem('xeArr')) || [];
    let tableContent = ``;

    products.forEach((product, index) => {
        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.image}" width="50" height="50"/></td>
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>${product.type}</td>
                <td>${product.description}</td>
                <td>${product.price.toLocaleString()} VNĐ</td>
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

    document.getElementById("NameC").value = products[id].name;
    document.getElementById("HangC").value = products[id].brand;
    document.getElementById("LoaixeC").value = products[id].type;
    document.getElementById("MieutaC").value = products[id].description;
    document.getElementById("GiaC").value = products[id].price;
    document.getElementById("currentImage").src = products[id].image;

    document.getElementById("update-car-btn").onclick = function () {
        updateProduct(id);
    };
}

function updateProduct(id) {
    const name = document.getElementById('NameC').value;
    const brand = document.getElementById('HangC').value;
    const type = document.getElementById('LoaixeC').value;
    const description = document.getElementById('MieutaC').value;
    const price = parseFloat(document.getElementById('GiaC').value.replace(/,/g, ''));
    const imageInput = document.getElementById('uploadC');
    let products = JSON.parse(localStorage.getItem('xeArr')) || [];

    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (event) {
            products[id].image = event.target.result;
            saveUpdatedProduct(id, products, name, brand, type, description, price);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveUpdatedProduct(id, products, name, brand, type, description, price);
    }
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
