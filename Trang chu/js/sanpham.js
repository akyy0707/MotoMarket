document.addEventListener('DOMContentLoaded', function() {
    const link = document.querySelector('.shop a');

    link.addEventListener('click', function(event) {
        if (!giohang) {
            event.preventDefault();
            alert("Vui lòng đăng nhập để mua hàng!!!");
        }
    });
});

function sanpham(sp) {
    const item = JSON.parse(decodeURIComponent(sp));

    document.getElementById("sanphamoverlay").classList.remove("hidden");

    document.getElementById("sanphamoverlay").innerHTML = `<div class="product-container">
            <div class="close-icon"><i class="fa-regular fa-circle-xmark"></i></div>
            <div class="column">
                <div class="left">
                    <div class="product-image-container">
                        <img id="mainImage" src="${item.image}" class="main-image">
                    </div>
                </div>
                <div class="right">
                    <div class="product-title">${item.name}</div>
                    <div class="product-price">${item.price.toLocaleString()} VNĐ</div>
                    <div class="product">Thông tin:</div>
                    <div class="product-description">${item.description}</div>
                    <div>Số Lượng: </div>
                    <div class="quantily">
                        <button onclick="minus()">−</button> 
                        <input type="number" value= "1" min="1" id="soluong">
                        <button onclick="plus()">+</button>
                    </div>
                    <div>Đơn Vị: Chiếc</div>
                </div>
            </div>
            <div class="bott">
                <div class="share left">
                    <p>Chia sẽ:</p>
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-tiktok"></i>
                </div>
                <div class="product-actions right">
                    <button class="add-to-cart" id="mua">Thêm Vào Giỏ Hàng</button>
                </div>
            </div>
        </div>`

    document.querySelector(".close-icon").addEventListener("click", function() {
        document.getElementById("sanphamoverlay").classList.add("hidden");
        document.getElementById("soluong").value = 1;
    });

    document.querySelector("#mua").addEventListener("click", function(){
        if(giohang){
            themvaogiohang(item);
        }
        else{
            alert("Phải đăng nhập để mua hàng!!!");
        }
    })
}

function plus() {
    let input = document.getElementById("soluong");
    input.value = parseInt(input.value) + 1;
}

function minus() {
    let input = document.getElementById("soluong");
    if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function themvaogiohang(sanpham) {
    const currAcc = JSON.parse(localStorage.getItem("currAcc"));
    if (!currAcc) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
    }

    const sl = parseInt(document.getElementById("soluong").value);
    const giohangKey = `giohang_${currAcc.gmail}`;
    let giohang = JSON.parse(localStorage.getItem(giohangKey)) || [];

    const index = giohang.findIndex(item => item.name === sanpham.name);

    if (index !== -1) {
        giohang[index].sl += sl;
    } else {
        giohang.push({ ...sanpham, sl });
    }

    localStorage.setItem(giohangKey, JSON.stringify(giohang));
    alert("Sản phẩm đã được thêm vào giỏ hàng.");

    document.getElementById("sanphamoverlay").classList.add("hidden");
    document.getElementById("soluong").value = 1;
}
