const itemsPerPage = 8;
let currentPage = 1;
let items = [];
let filteredItems = []; // Mảng để lưu các kết quả tìm kiếm

function setItem() {
    const xe = JSON.parse(localStorage.getItem('xeArr')) || [];

    xe.forEach(item => {
        const i = `<div class="contentitem">
                      <img src="${item.image}" alt="${item.name}">
                      <p class="tenxe">${item.name}</p>
                      <p class="giaxe">Giá tiền: ${item.price} VNĐ</p>
                   </div>`;
        items.push(i);
    });
    filteredItems = [...items]; // Khởi tạo giá trị ban đầu cho mảng filteredItems
}

function renderItems() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = filteredItems.slice(start, end);

    document.getElementById("items-container").innerHTML = itemsToDisplay.join('');
}

function renderPagination() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    document.getElementById("pagination").innerHTML = paginationHTML;
}

function changePage(pageNumber) {
    currentPage = pageNumber;
    renderItems();
    renderPagination();
}

function searchItems() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));
    currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
    renderItems();
    renderPagination();
}

setItem();
renderItems();
renderPagination();
