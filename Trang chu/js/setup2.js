window.onload = function(){
    let currAcc = JSON.parse(localStorage.getItem('currAcc'));
    
    if(currAcc.role === 'Admin'){
        currAcc = {};
        localStorage.setItem('currAcc', JSON.stringify(currAcc));
        giohang = false;
    }

    if(currAcc && Object.keys(currAcc).length > 0 && currAcc.name !== 'admin'){
        document.getElementById("khname").innerHTML = `
            <p onmouseenter="hienthongtinkh()" onmouseout="anthongtinkh()">
                Tài khoản: ${currAcc.name}
            </p>
            <div class="noidung hidden" id="noidung">
                <h3>Thông tin khách hàng</h3>
                <p>Khách hàng: ${currAcc.name}</p>
                <p>Điện thoại: ${currAcc.phone}</p>
                <p>Email: ${currAcc.gmail}</p>
            </div>`;
        successLogin();
        
        giohang = true;
    }
};