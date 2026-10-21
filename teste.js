/*
 * BANKSIM - SIMULADOR BANCÁRIO
 * Tecnologias: JavaScript + Node.js
 * Objetivo: praticar lógica de programação.
 */

// ========== 1. DADOS DA CONTA ==========

const conta = {
    numero: 1001,
    titular: "Henrique Yamada",
    tipo: "corrente",
    saldo: 1500.00,
    limite: 500.00,
    historico: []
};

// ========== 2. MENU DE OPERAÇÕES ==========

const operacoes = {
    CONSULTAR_SALDO: 1,
    DEPOSITAR: 2,
    SACAR: 3,
    EXTRATO: 4,
    FILTRAR: 5,
    TRANSFERIR: 6,
    DESFAZER_ULTIMA_MOVIMENTACAO: 7,
    CRIAR_CONTA: 8,
    EXCLUIR_CONTA: 9,
    ENCERRAR: 0
};

// ========== 3. FUNÇÕES DO SISTEMA ==========

function exibirMenu() {
    console.log("\n=================================");
    console.log("    BANKSIM - BANCO DIGITAL");
    console.log("===================================");
    console.log(`Conta: ${conta.numero}`);
    console.log(`Titular: ${conta.titular}`);
    console.log("---------------------------------");
    console.log(`${operacoes.CONSULTAR_SALDO} - Consultar saldo`);
    console.log(`${operacoes.DEPOSITAR} - Realizar depósito`);
    console.log(`${operacoes.SACAR} - Realizar saque`);
    console.log(`${operacoes.EXTRATO} - Exibir extrato`);
    console.log(`${operacoes.ENCERRAR} - Encerrar sistema`);
    console.log("=================================");
}

function consultarSaldo() {
    // IMPLEMENTAR:
    // Exibir saldo e limite disponível.

    console.log("O seu saldo é de R$", conta.saldo);
    console.log("O seu limite é de R$", conta.limite);
}

function realizarDeposito(valor) {
    if (Number.isFinite(valor) && valor > 0) {
        conta.saldo += valor;
        registrarMovimentacao("Depósito", valor);
        console.log("O seu novo saldo é de: R$", conta.saldo);
    } else {
        console.log("Você não pode depositar um valor igual a 0 ou menor.");
    }
}

function realizarSaque(valor) {
    if (!Number.isFinite(valor) || valor <= 0) {
        console.log("Valor de saque inválido.");
        return;
    }

    if (valor > conta.saldo + conta.limite) {
        console.log("Saldo e limite insuficientes.");
        return;
    }

    conta.saldo -= valor;
    registrarMovimentacao("Saque", valor);
    console.log("O novo saldo é de: R$", conta.saldo);
}

function exibirExtrato() {
    // IMPLEMENTAR:
    // Percorrer o histórico e exibir as movimentações.

    console.log("\n====== EXTRATO ======");

    if (conta.historico.length === 0) {
        console.log("Nenhuma movimentação registrada.");
        return;
    }

    conta.historico.forEach(item => {
        console.log(`${item.data} | ${item.tipo} | R$ ${item.valor.toFixed(2)}`);
    });
}

function registrarMovimentacao(tipo, valor) {
    // IMPLEMENTAR:
    // Criar um objeto com tipo, valor e data.
    // Adicionar o objeto ao histórico.

    const movimentacao = {
        tipo: tipo,
        valor: valor,
        data: new Date().toLocaleString('pt-BR'),
    }

    conta.historico.push(movimentacao);
}

function processarOperacao(opcao) {
    switch (opcao) {
        case operacoes.CONSULTAR_SALDO:
            consultarSaldo();
            break;

        case operacoes.DEPOSITAR:
            realizarDeposito(725);
            break;

        case operacoes.SACAR:
            realizarSaque(200);
            break;

        case operacoes.EXTRATO:
            exibirExtrato();
            break;

        case operacoes.ENCERRAR:
            console.log("Encerrando o BankSim...");
            break;

        default:
            console.log("Opção inválida!");
    }
}

// ========== 4. EXECUÇÃO DO SISTEMA ==========

function iniciarSistema() {
    // processarOperacao(0);
    // processarOperacao(1);
    // processarOperacao(2);
    // processarOperacao(3);
    // processarOperacao(4);
}

// ========== 5. INICIALIZAÇÃO ==========

iniciarSistema();