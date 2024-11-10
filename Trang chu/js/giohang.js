
document.addEventListener('DOMContentLoaded', function() {
    const link = document.querySelector('.shop a');
    
    link.addEventListener('click', function(event) {        
        if (!giohang) {
            event.preventDefault();
            alert("Vui lòng đăng nhập để mua hàng!!!");
        }
    });
});
