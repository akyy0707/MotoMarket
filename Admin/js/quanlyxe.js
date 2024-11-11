const carList = document.getElementById('car-list');
const addForm = document.getElementById('add-form');
const addCarForm = document.getElementById('add-car-form');

let cars = [];

function renderCarList() {
    carList.innerHTML = '';
    cars.forEach((car, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${car.image}" alt="${car.name}" style="width: 50px; height: 50px;"></td>
            <td>${car.name}</td>
            <td>${car.type}</td>
            <td>${car.price.toLocaleString()} VND</td>
            <td>
                <button id="delete-btn" onclick="deleteCar(${index})">Xóa</button>
                <button id="edit-btn" onclick="editCar(${index})">Sửa</button>
            </td>
        `;
        carList.appendChild(tr);
    });
}

function showAddForm() {
    addForm.style.display = 'flex';
}

function closeAddForm() {
    addForm.style.display = 'none';
}
const fileInput = document.getElementById("car-image");
const fileName = document.getElementById("fileName")
fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
    } else {
        fileName.textContent = "No file chosen";
    }
});
function addCar(event) {
    event.preventDefault();
    const name = document.getElementById('car-name').value;
    const type = document.getElementById('car-type').value;
    const price = parseFloat(document.getElementById('car-price').value);
    const image = URL.createObjectURL(document.getElementById('car-image').files[0]);


    const newCar = {
        name,
        type,
        price,
        image
    };

    cars.push(newCar);
    renderCarList();
    closeAddForm();
}

function deleteCar(index) {
    cars.splice(index, 1);
    renderCarList();
}

function editCar(index) {
    alert('Chức năng sửa chưa được thực hiện!');
}

addCarForm.addEventListener('submit', addCar);
renderCarList();