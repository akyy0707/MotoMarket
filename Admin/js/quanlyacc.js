

const addFormUser = document.getElementById('add-form-user');
const changeFormUser = document.getElementById('change-form-user');

function showAddFormUsers() {
    addFormUser.style.display = 'flex';
}

function closeAddFormUsers() {
    addFormUser.style.display = 'none';
    document.getElementById("update-user-btn").classList.add("hidden");
    document.getElementById("add-user-btn").classList.remove("hidden");
    document.getElementById("Email").value = '';
        document.getElementById("Sdt").value = '';
        document.getElementById("Tendangnhap").value = '';
        document.getElementById("Matkhau").value = '';
        document.getElementById("userId").value = '';
        document.getElementById('Emaillerror').innerHTML = '';
        document.getElementById('Sdterror').innerHTML = '';
        document.getElementById('Tendangnhaperror').innerHTML = '';
        document.getElementById('Matkhauerror').innerHTML = '';
}


function emailTest(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function regAdmin(){
    let users = localStorage.getItem('acc') ? JSON.parse(localStorage.getItem('acc')) : [];
        users.push({ 
            gmail: "admin@gmail.com",
            name: "admin",
            phone: "0914100004",
            password: "admin"
        
        });    
        
        localStorage.setItem('acc',JSON.stringify(users));
        
}

function addUsers() {
    event.preventDefault(); 
    let email = document.getElementById('Email').value;
    let sdt = document.getElementById('Sdt').value;
    let tenuser = document.getElementById('Tendangnhap').value;
    let matkhau = document.getElementById('Matkhau').value;
    let userId = document.getElementById('userId').value;

    // Kiểm tra các thông tin nhập vào
    if ((email)==='') {
        email = '';
        document.getElementById('Emaillerror').innerHTML = 'Vui lòng nhập Email';
    } else if (!emailTest(email)) {
        email = '';
        document.getElementById('Emaillerror').innerHTML = 'Vui lòng nhập đúng định dạng Email';
    } else {
        document.getElementById('Emaillerror').innerHTML = '';
    }

    if (isNaN(sdt)) {
        sdt = '';
        document.getElementById('Sdterror').innerHTML = 'Vui lòng nhập số';
    } else if ((sdt.trim().length) != 10) {
        sdt = '';
        document.getElementById('Sdterror').innerHTML = 'Không đúng định dạng 10 số';
    } else {
        document.getElementById('Sdterror').innerHTML = ''
    }

    if ((tenuser)==='') {
        tenuser = '';
        document.getElementById('Tendangnhaperror').innerHTML = 'Vui lòng nhập Tên đăng nhập';
    } else {
        document.getElementById('Tendangnhaperror').innerHTML = '';
    }

    if ((matkhau)==='') {
        matkhau = '';
        document.getElementById('Matkhauerror').innerHTML = 'Vui lòng nhập Mật khẩu';
    } else {
        document.getElementById('Matkhauerror').innerHTML = '';
    }

    if(tenuser&&email&&sdt&&matkhau){
        let users = localStorage.getItem('acc') ? JSON.parse(localStorage.getItem('acc')) : [];

        if (users.some((u, i) => u.gmail === email && i !== parseInt(userId))) {
            alert("Email đã tồn tại, vui lòng nhập email khác!");
            return;
        }
    
        if (users.some((u, i) => u.phone === sdt && i !== parseInt(userId))) {
            alert("Số điện thoại đã tồn tại, vui lòng nhập số điện thoại khác!");
            return;
        }
    
        if (users.some((u, i) => u.name === tenuser && i !== parseInt(userId))) {
            alert("Tên đã tồn tại, vui lòng nhập tên khác!");
            return;
        }    
if(users.length===0){
    users.push({ 
        gmail: "admin@gmail.com",
        name: "admin",
        phone: "0914100004",
        password: "admin"
    
    });    
};
        
        if (userId) {
            users[userId] = { 
                gmail: email,
                name: tenuser,
                phone: sdt,
                password: matkhau,
             };
        } else {
            users.push({
                gmail: email,
                name: tenuser,
                phone: sdt,
                password: matkhau,
            });
        }

        localStorage.setItem('acc', JSON.stringify(users));
        renderListUsers();
        closeAddFormUsers();
    }
        document.getElementById("Email").value = '';
        document.getElementById("Sdt").value = '';
        document.getElementById("Tendangnhap").value = '';
        document.getElementById("Matkhau").value = '';

    }


function renderListUsers() {
    let users = JSON.parse(localStorage.getItem('acc')) || [];
    let tableContent = ``;



    users.slice(1).forEach((user, index) => {
        tableContent += `
            <tr>
                <td style="padding: 0; ">${index+1 }</td>
                <td style="padding: 0; ">${user.gmail}</td>
                <td style="padding: 0; ">${user.phone}</td>
                <td style="padding: 0; ">${user.name}</td>
                <td style="padding: 0; ">${user.password}</td>
                <td>
                    <button href='#' id="delete-btn" onclick='deleteUsers(${index+1})'>Xóa</button>
                    <button href='#' id="edit-btn" onclick='editUsers(${index=1})'>Sửa</button>
                </td>
            </tr>
        `;
    });

    document.getElementById('users-list').innerHTML = tableContent;

    renderKDList();
}

function deleteUsers(id) {
    if (confirm("Bạn có muốn xóa người dùng này?")) {
        let users = localStorage.getItem('acc') ? JSON.parse(localStorage.getItem('acc')) : [];
        users.splice(id, 1);
        localStorage.setItem('acc', JSON.stringify(users));
        renderListUsers();
    }
}

function editUsers(id) {
    let users = localStorage.getItem('acc') ? JSON.parse(localStorage.getItem('acc')) : [];
    showAddFormUsers();
    document.getElementById("Email").value = users[id].gmail;
    document.getElementById("Tendangnhap").value = users[id].name;
    document.getElementById("Sdt").value = users[id].phone;
    document.getElementById("Matkhau").value = users[id].password;
    document.getElementById("userId").value = id;


    document.getElementById("update-user-btn").classList.remove("hidden");
    document.getElementById("add-user-btn").classList.add("hidden");
}
