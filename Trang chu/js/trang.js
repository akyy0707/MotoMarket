const itemsPerPage = 8;
let currentPage = 1;
let items = [];
let filteredItems = [];

const xe = JSON.parse(localStorage.getItem('xeArr')) || [];

document.getElementById("tatca").classList.add('active');

function advancedSearch(index) {
    console.log(index);
    filteredItems = [];
    items = [];

    document.querySelectorAll('.danhmuc li').forEach(li => li.classList.remove('active'));

    switch(index) {
        case 1:
            setItem1();
            // document.getElementById("search-box").value = '';
            document.getElementById("tatca").classList.add('active');
            break;
        case 2:
            setItem2("tay ga");
            searchItems();
            document.getElementById("tayga").classList.add('active');
            break;
        case 3:
            setItem2("xe so");
            searchItems();
            document.getElementById("xeso").classList.add('active');
            break;
        case 4:
            setItem3("YAMAHA");
            searchItems();
            document.getElementById("yamaha").classList.add('active');
            break;
        case 5:
            setItem3("HONDA");
            searchItems();
            document.getElementById("honda").classList.add('active');
            break;
    }

    currentPage = 1;
    showItems();
    showTrang();
}

function setItem1(){
    xe.forEach(item => {
        const itemJSON = encodeURIComponent(JSON.stringify(item));
        const i = `<div class="contentitem" onclick="sanpham('${itemJSON}')">
                      <img src="${item.image}" alt="${item.name}">
                      <p class="tenxe">${item.name}</p>
                      <p class="giaxe">Giá tiền: ${item.price.toLocaleString()} VNĐ</p>
                   </div>`;
        items.push(i);
    });
    filteredItems = [...items];
    searchItems();
}

function setItem2(type){
    xe.forEach(item => {
        if(item.type === type){
            const itemJSON = encodeURIComponent(JSON.stringify(item));
            const i = `<div class="contentitem" onclick="sanpham('${itemJSON}')">
                          <img src="${item.image}" alt="${item.name}">
                          <p class="tenxe">${item.name}</p>
                          <p class="giaxe">Giá tiền: ${item.price.toLocaleString()} VNĐ</p>
                       </div>`;
            items.push(i);
        }
    });
    filteredItems = [...items];
}

function setItem3(hang){
    xe.forEach(item => {
        if(item.brand === hang){
            const itemJSON = encodeURIComponent(JSON.stringify(item));
            const i = `<div class="contentitem" onclick="sanpham('${itemJSON}')">
                          <img src="${item.image}" alt="${item.name}">
                          <p class="tenxe">${item.name}</p>
                          <p class="giaxe">Giá tiền: ${item.price.toLocaleString()} VNĐ</p>
                       </div>`;
            items.push(i);
        }
    });
    filteredItems = [...items];
}

function showItems(){
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = filteredItems.slice(start, end);

    document.getElementById("items-container").innerHTML = itemsToDisplay.join('');
}

function showTrang(){
    const tongsotrang = Math.ceil(filteredItems.length / itemsPerPage);
    let sotrang = '';

    for (let i = 1; i <= tongsotrang; i++) {
        sotrang += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    document.getElementById("sotrang").innerHTML = sotrang;
}

function doiTrang(pageNumber){
    currentPage = pageNumber;
    showItems();
    showTrang();
}

document.getElementById('giamin').addEventListener('input', searchItems);
document.getElementById('giamax').addEventListener('input', searchItems);
document.getElementById('search-box').addEventListener('input', searchItems);

function searchItems() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('giamin').value) || 0;
    const maxPrice = parseFloat(document.getElementById('giamax').value) || Infinity;

    filteredItems = items.filter(item => {
        const priceMatch = item.match(/Giá tiền: (\d[\d,\.]*) VNĐ/);
        let price = 0;
        
        if (priceMatch) {
            price = parseFloat(priceMatch[1].replace(/[,\.]/g, ''));
        }

        return (
            item.toLowerCase().includes(searchTerm) &&
            price >= minPrice &&
            price <= maxPrice
        );
    });

    currentPage = 1;
    showItems();
    showTrang();
}

setItem1();
showItems();
showTrang();
