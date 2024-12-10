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

    const admin = accounts.find(account => account.gmail === gmail && account.password === password);

    if (admin) {
        if(admin.block === "no"){
            if (admin.role === "Admin") {
                window.location.href = '../../Admin/html/admin.html'
            }
            
            alert("Đăng nhập thành công!");
            
            const currAcc = admin;
            localStorage.setItem('currAcc', JSON.stringify(currAcc));
            
        }else if(admin.block==="yes"){
            alert("Tài khoản của bạn đã bị khóa!!");
        }
    } 
    else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
};