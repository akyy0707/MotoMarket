function sanpham(sp) {
    const item = JSON.parse(decodeURIComponent(sp));

    document.getElementById("sanphamoverlay").classList.remove("hidden");

    document.getElementById("mainImage").src = item.image;
    document.querySelector(".product-title").textContent = item.name;
    document.querySelector(".product-price").textContent = `${item.price.toLocaleString()} VNĐ`;
    document.querySelector(".product-description").textContent = item.description || "Thông tin chi tiết không có sẵn.";

    document.querySelector(".close-icon").addEventListener("click", function() {
        document.getElementById("sanphamoverlay").classList.add("hidden");
    });
}