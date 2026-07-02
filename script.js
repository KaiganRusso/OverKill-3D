// Script compartilhado entre as páginas

document.addEventListener('DOMContentLoaded', function() {
    // Marcar página atual como ativa
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});
