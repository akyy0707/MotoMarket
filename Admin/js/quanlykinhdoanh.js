function hienxe(){
    document.getElementById("TKXe").classList.remove("hidden");
    document.getElementById("TKKH").classList.add("hidden");
}

function hienkh(){
    document.getElementById("TKKH").classList.remove("hidden");
    document.getElementById("TKXe").classList.add("hidden");
}

renderKDList();

function renderKDList() {
    let products = JSON.parse(localStorage.getItem('xeArr')) || [];
    let tableContent = ``;

    products.forEach((product, index) => {
        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td></td>
                <td></td>
            </tr>
        `;
    });

    document.getElementById('kdlist').innerHTML = tableContent;
}

