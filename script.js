// Dados globais
let historico = JSON.parse(localStorage.getItem('makerflow_historico')) || [];
let editandoId = null;

// Sistema de Tabs
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ====================== CALCULADORA ======================
const form = document.getElementById('calcForm');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim() || "Impressão sem nome";
        const peso = parseFloat(document.getElementById('filamento').value);
        const precoFil = parseFloat(document.getElementById('precoFilamento').value);
        const horas = parseFloat(document.getElementById('horas').value);
        const potencia = parseFloat(document.getElementById('potencia').value);
        const precoEnergia = parseFloat(document.getElementById('precoEnergia').value);

        const custoFilamento = (peso / 1000) * precoFil;
        const custoEnergia = (potencia / 1000) * horas * precoEnergia;
        const custoTotal = custoFilamento + custoEnergia;
        const porHora = custoTotal / horas;

        const impressao = {
            id: editandoId || Date.now(),
            nome,
            peso,
            precoFil,
            horas,
            potencia,
            precoEnergia,
            custoTotal: custoTotal.toFixed(2),
            porHora: porHora.toFixed(2),
            data: new Date().toLocaleDateString('pt-BR')
        };

        if (editandoId) {
            historico = historico.map(item => item.id === editandoId ? impressao : item);
        } else {
            historico.unshift(impressao);
        }

        localStorage.setItem('makerflow_historico', JSON.stringify(historico));
        editandoId = null;

        alert(`✅ Cálculo salvo!\nCusto Total: R$ ${custoTotal.toFixed(2)}`);
        atualizarHistorico();
        form.reset();
    });
}

// Funções de Histórico (será expandido)
function atualizarHistorico() {
    console.log("Histórico atualizado:", historico.length, "itens");
    // Vamos expandir isso na próxima etapa
}

// Inicialização
atualizarHistorico();
