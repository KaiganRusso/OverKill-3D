// =============================================
// MakerFlow - Sistema de Gestão Financeira
// Script Principal - Organizado por módulos
// =============================================

let historico = JSON.parse(localStorage.getItem('makerflow_historico')) || [];
let produtos = JSON.parse(localStorage.getItem('makerflow_produtos')) || [];

// =============================================
// 1. Inicialização do Sistema
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarTabs();
    atualizarDashboard();
    console.log('MakerFlow iniciado com sucesso!');
});

// =============================================
// 2. Sistema de Navegação (Tabs)
// =============================================
function inicializarTabs() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active de todos
            menuItems.forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            
            // Ativa o selecionado
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// =============================================
// 3. Dashboard
// =============================================
function atualizarDashboard() {
    // Valores fictícios por enquanto (serão calculados depois)
    document.getElementById('saldo-atual').textContent = 'R$ 3.245,80';
    document.getElementById('lucro-mes').textContent = 'R$ 1.872,40';
    document.getElementById('total-impressoes').textContent = historico.length || 52;
}

// =============================================
// 4. Calculadora
// =============================================
const calcForm = document.getElementById('calcForm');

if (calcForm) {
    calcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim() || "Impressão sem nome";
        const peso = parseFloat(document.getElementById('filamento').value) || 0;
        const precoFil = parseFloat(document.getElementById('precoFilamento').value) || 0;
        const horas = parseFloat(document.getElementById('horas').value) || 0;
        const potencia = parseFloat(document.getElementById('potencia').value) || 0;
        const precoEnergia = parseFloat(document.getElementById('precoEnergia').value) || 0;

        const custoFilamento = (peso / 1000) * precoFil;
        const custoEnergia = (potencia / 1000) * horas * precoEnergia;
        const custoTotal = custoFilamento + custoEnergia;
        const custoHora = custoTotal / horas;

        const impressao = {
            id: Date.now(),
            nome,
            peso,
            precoFil,
            horas,
            potencia,
            precoEnergia,
            custoTotal: custoTotal.toFixed(2),
            custoHora: custoHora.toFixed(2),
            data: new Date().toLocaleDateString('pt-BR')
        };

        historico.unshift(impressao);
        localStorage.setItem('makerflow_historico', JSON.stringify(historico));

        alert(`✅ Cálculo realizado!\nCusto Total: R$ ${custoTotal.toFixed(2)}`);
        calcForm.reset();
        atualizarDashboard();
    });
}

// =============================================
// 5. Vendas
// =============================================
function registrarVenda() {
    // Será implementado
    console.log("Registrar venda chamado");
}

// =============================================
// 6. Produtos
// =============================================
function cadastrarProduto() {
    // Será implementado
    console.log("Cadastrar produto chamado");
}

// =============================================
// 7. Relatórios
// =============================================
function gerarRelatorio() {
    // Será implementado
    console.log("Gerar relatório chamado");
}

// =============================================
// 8. Funções Auxiliares
// =============================================
function salvarDados() {
    localStorage.setItem('makerflow_historico', JSON.stringify(historico));
    localStorage.setItem('makerflow_produtos', JSON.stringify(produtos));
}

function limparDados() {
    if (confirm("Tem certeza que deseja limpar todos os dados?")) {
        localStorage.clear();
        location.reload();
    }
}

// =============================================
// Fim do Script
// =============================================
