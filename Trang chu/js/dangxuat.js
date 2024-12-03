document.getElementById("dangxuat").onclick = function() {
    document.getElementById("dangnhap").style = "display: flex";
    document.getElementById("dangky").style = "display: flex";
    document.getElementById("dangxuat").style = "display: none";
    document.getElementById("khname").innerHTML = ``;
    const currAcc = {};
    localStorage.setItem('currAcc', JSON.stringify(currAcc));
    giohang = false;
}