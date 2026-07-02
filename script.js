// =============================================
// MakerFlow - Sistema de Gestão Financeira
// =============================================

let historico = JSON.parse(localStorage.getItem('makerflow_historico')) || [];

// =============================================
// Inicialização
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarTabs();
    atualizarDashboard();
});

// =============================================
// 1. Tabs
// =============================================
function inicializarTabs() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(this.getAttribute('data-tab')).classList.add('active');
        });
    });
}

// =============================================
// 2. Dashboard
// =============================================
function atualizarDashboard() {
    document.getElementById('saldo-atual').textContent = 'R$ 3.245,80';
    document.getElementById('lucro-mes').textContent = 'R$ 1.872,40';
    document.getElementById('total-impressoes').textContent = historico.length || 52;
}

// =============================================
// 3. Calculadora com Multiplicadores
// =============================================
const calcForm = document.getElementById('calcForm');
const resultadoCalc = document.getElementById('resultadoCalc');

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
        const custoHora = horas > 0 ? custoTotal / horas : 0;

        // Salvar no histórico
        const impressao = {
            id: Date.now(),
            nome,
            custoTotal: custoTotal.toFixed(2),
            custoHora: custoHora.toFixed(2),
            data: new Date().toLocaleDateString('pt-BR')
        };
        historico.unshift(impressao);
        localStorage.setItem('makerflow_historico', JSON.stringify(historico));

        // Mostrar resultado
        mostrarResultado(nome, custoTotal, custoHora);
    });
}

function mostrarResultado(nome, custoTotal, custoHora) {
    document.getElementById('nomeResultadoCalc').textContent = nome;
    document.getElementById('custoTotal').textContent = `R$ ${custoTotal.toFixed(2)}`;
    document.getElementById('custoHora').textContent = `R$ ${custoHora.toFixed(2)}`;

    // Multiplicadores
    document.getElementById('preco2').textContent = `R$ ${(custoTotal * 2).toFixed(2)}`;
    document.getElementById('preco3').textContent = `R$ ${(custoTotal * 3).toFixed(2)}`;
    document.getElementById('preco4').textContent = `R$ ${(custoTotal * 4).toFixed(2)}`;

    // Mostrar resultado e esconder formulário
    document.getElementById('calcForm').parentElement.classList.add('hidden');
    resultadoCalc.classList.remove('hidden');
}

// Nova Cálculo
document.getElementById('novaCalcBtn').addEventListener('click', function() {
    document.getElementById('calcForm').reset();
    document.getElementById('calcForm').parentElement.classList.remove('hidden');
    resultadoCalc.classList.add('hidden');
});

// =============================================
// Funções Auxiliares
// =============================================
function salvarDados() {
    localStorage.setItem('makerflow_historico', JSON.stringify(historico));
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
