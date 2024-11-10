const overlay = document.getElementById("login-overlay");

let giohang = false;

document.querySelector(".dangnhap").onclick = function() {
    overlay.classList.remove("hidden");
}

function closeLogin() {
    overlay.classList.add("hidden");
}

function successLogin(){
    document.getElementById("dangnhap").style = "display: none";
    document.getElementById("dangky").style = "display: none";
    document.getElementById("dangxuat").style = "display: flex";
}

document.querySelector(".login-btn").onclick = function() {
    const gmail = document.getElementById("gmail").value;
    const password = document.getElementById("password").value;

    if(!gmail){
        alert("Phải nhập đầy đủ thông tin trên!!!");
        document.getElementById("gmail").focus();
        return;
    }

    if(!password){
        alert("Phải nhập đầy đủ thông tin trên!!!");
        document.getElementById("password").focus();
        return;
    }

    const accounts = JSON.parse(localStorage.getItem('acc')) || [];

    const user = accounts.find(account => account.gmail === gmail && account.password === password);

    if (user) {
        alert("Đăng nhập thành công!");
        document.getElementById("khname").innerHTML = `
            <p onmouseenter="hienthongtinkh()" onmouseout="anthongtinkh()">
                Tài khoản: ${user.name}
            </p>
            <div class="noidung hidden" id="noidung">
                <h3>Thông tin khách hàng</h3>
                <p>Khách hàng: ${user.name}</p>
                <p>Điện thoại: ${user.phone}</p>
                <p>Email: ${user.gmail}</p>
            </div>`;

        successLogin();
        closeLogin();
        giohang = true;
        console.log(giohang);
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
};

function hienthongtinkh() {
    document.getElementById("noidung").classList.remove("hidden");
}

function anthongtinkh() {
    document.getElementById("noidung").classList.add("hidden");
}