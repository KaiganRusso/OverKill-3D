// Sistema de Tabs
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active de todos
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

        // Ativa o selecionado
        this.classList.add('active');
        
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Dados iniciais (será expandido depois)
function atualizarDashboard() {
    // Valores fictícios por enquanto
    document.getElementById('saldo-atual').textContent = "R$ 2.847,50";
    document.getElementById('lucro-mes').textContent = "R$ 1.392,80";
    document.getElementById('total-impressoes').textContent = "47";
}

atualizarDashboard();
