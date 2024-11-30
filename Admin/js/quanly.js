function qlxe(){
    document.getElementById("qlxe").classList.remove("hidden");
    document.getElementById("qlkd").classList.add("hidden");
    document.getElementById("qldh").classList.add("hidden");
    document.getElementById("qlkh").classList.add("hidden");
    window.onload(renderListProducts());
}

function qlkh(){
    document.getElementById("qlkh").classList.remove("hidden");
    document.getElementById("qlxe").classList.add("hidden");
    document.getElementById("qldh").classList.add("hidden");
    document.getElementById("qlkd").classList.add("hidden");
    window.onload(renderListUsers());
}

function qlkd(){
    document.getElementById("qlkd").classList.remove("hidden");
    document.getElementById("qlxe").classList.add("hidden");
    document.getElementById("qldh").classList.add("hidden");
    document.getElementById("qlkh").classList.add("hidden");
    window.onload(renderKDList());
}

function qldh(){
    document.getElementById("qldh").classList.remove("hidden");
    document.getElementById("qlxe").classList.add("hidden");
    document.getElementById("qlkd").classList.add("hidden");
    document.getElementById("qlkh").classList.add("hidden");
    window.onload(renderListBills());
}