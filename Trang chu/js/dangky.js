const reoverlay = document.getElementById("register-overlay");

document.querySelector(".dangky").onclick = function() {
    reoverlay.classList.remove("hidden");
}

function closeRegister() {
    reoverlay.classList.add("hidden");
}

document.querySelector(".register-btn").onclick = function() {
    const name = document.getElementById("register-username").value;
    const gmail = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const phone = document.getElementById("register-sdt").value;

    if(!name){
        alert("Phải nhập đầy đủ thông tin trên!!!");
        document.getElementById("register-username").focus();
        return;
    }

    if(!gmail){
        alert("Phải nhập đầy đủ thông tin trên!!!");
        document.getElementById("register-email").focus();
        return;
    }

    if(!password){
        alert("Phải nhập đầy đủ thông tin trên!!!");
        document.getElementById("register-password").focus();
        return;
    }

    const accounts = JSON.parse(localStorage.getItem('acc')) || [];
    
    const newAcc = {
        gmail: gmail,
        name: name,
        phone: phone,
        password: password
    };

    accounts.push(newAcc);

    localStorage.setItem('acc', JSON.stringify(accounts));

    closeRegister();

    alert("Đăng ký thành công!");
};