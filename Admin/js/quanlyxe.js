

const addForm = document.getElementById('add-form');


function showAddForm() {
    addForm.style.display = 'flex';
}

function closeAddForm() {
    addForm.style.display = 'none';
}

function addProducts() {
    event.preventDefault();
    let tenxe = document.getElementById('Name').value;
    const hang = document.getElementById('Hang').value;
    const loaixe = document.getElementById('Loaixe').value;
    let mieuta = document.getElementById('Mieuta').value;
    let gia = document.getElementById('Gia').value;
    let productId = document.getElementById('productId').value;

    // Validate fields
    if (_.isEmpty(tenxe)) {
        document.getElementById('nameError').innerHTML = 'Vui lòng nhập tên xe';
    } else {
        document.getElementById('nameError').innerHTML = '';
    }

    if (_.isEmpty(mieuta)) {
        document.getElementById('mieutaError').innerHTML = 'Vui lòng nhập miêu tả';
    } else {
        document.getElementById('mieutaError').innerHTML = '';
    }

    if (isNaN(gia) || gia.trim().length < 7) {
        document.getElementById('giaError').innerHTML = 'Vui lòng nhập đúng giá xe';
    } else {
        document.getElementById('giaError').innerHTML = '';
    }

    if (tenxe && hang && loaixe && mieuta && gia) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let imagesData = JSON.parse(localStorage.getItem('productImages')) || [];
        
        if (productId) {
            products[productId] = { tenxe, hang, loaixe, mieuta, gia, images: imagesData };
        } else {
            products.push({ tenxe, hang, loaixe, mieuta, gia, images: imagesData });
        }

        localStorage.setItem('products', JSON.stringify(products));
        localStorage.removeItem('productImages'); // Clear images after adding
        renderListProducts();
        document.getElementById('productId').value = '';
        closeAddForm();}

}

function renderListProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let tableContent = `
        
    `;

    products.forEach((product, index) => {
        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.images.map(img => `<img src="${img}" width="50" height="50"/>`).join(' ')}</td>
                <td>${product.tenxe}</td>
                <td>${product.hang}</td>
                <td>${product.loaixe}</td>
                <td>${product.mieuta}</td>
                <td>${parseFloat(product.gia).toLocaleString()} VNĐ</td>

                
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
    if(confirm("Bạn có muốn xóa sản phẩm?")){
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(id, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderListProducts();
    }
}

function editproducts(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    showAddForm();
    document.getElementById("Name").value = products[id].tenxe;
    document.getElementById("Hang").value = products[id].hang;
    document.getElementById("Loaixe").value = products[id].loaixe; // Corrected line
    document.getElementById("Mieuta").value = products[id].mieuta;
    document.getElementById("Gia").value = products[id].gia;
    document.getElementById("productId").value = id;
    document.getElementById("displayImg").innerHTML = products[id].images
    .map((img, index) => `
        <div style="display:inline-block; position:relative;">
            <img src="${img}" width="50" height="50" />
            <button onclick="removeImage(${id}, ${index})" 
                style="padding: 0px;position:absolute; top:-15px; right:2px;  color:black; border:none; cursor:pointer;width:10px;height:10px;font-size:10px">
                X
            </button>
        </div>
    `)
    .join(' ');
    
}

function removeImage(productId, imgIndex) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products[productId].images.splice(imgIndex, 1); // Xóa ảnh khỏi mảng
    localStorage.setItem('products', JSON.stringify(products)); // Cập nhật lại localStorage
    editproducts(productId); // Cập nhật lại giao diện
}

function ImagesFileAsURL() {
    var fileSelected = document.getElementById('upload').files;
    var imagesData = []; // Clear previous images
    document.getElementById('displayImg').innerHTML = ''; // Clear displayed images

    if (fileSelected.length > 0) {
        for (var i = 0; i < fileSelected.length; i++) {
            compressAndStoreImage(fileSelected[i]);
        }
    }
}

function compressAndStoreImage(file) {
    new Compressor(file, {
        quality: 0.2,
        success(result) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let compressedImageBase64 = e.target.result;
                let imagesData = JSON.parse(localStorage.getItem('productImages')) || [];
                imagesData.push(compressedImageBase64);
                localStorage.setItem('productImages', JSON.stringify(imagesData));

                var newImage = document.createElement('img');
                newImage.src = compressedImageBase64;
                document.getElementById('displayImg').appendChild(newImage);
            };
            reader.readAsDataURL(result);
        },
        error(err) {
            console.log(err.message);
        }
    });
}

