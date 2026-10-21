/*
 * BANKSIM - SIMULADOR BANCÁRIO
 * Tecnologias: JavaScript + Node.js
 * Objetivo: praticar lógica de programação.
 */

// ==========================================
// 1. DADOS DA CONTA
// ==========================================

const conta = {
    numero: 1001,
    titular: "Henrique Yamada",
    tipo: "corrente",
    saldo: 1500.00,
    limite: 500.00,
    historico: []
};

// ==========================================
// 2. MENU DE OPERAÇÕES
// ==========================================

const operacoes = {
    CONSULTAR_SALDO: 1,
    DEPOSITAR: 2,
    SACAR: 3,
    EXTRATO: 4,
    ENCERRAR: 0
};

// ==========================================
// 3. FUNÇÕES DO SISTEMA
// ==========================================

function exibirMenu() {
    console.log("\n=================================");
    console.log("       BANKSIM - BANCO DIGITAL");
    console.log("=================================");
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
}

function realizarDeposito(valor) {
    // IMPLEMENTAR:
    // Validar o valor.
    // Atualizar o saldo.
    // Registrar a movimentação no histórico.
}

function realizarSaque(valor) {
    // IMPLEMENTAR:
    // Validar o valor.
    // Verificar saldo e limite disponível.
    // Atualizar os valores.
    // Registrar a movimentação no histórico.
}

function exibirExtrato() {
    // IMPLEMENTAR:
    // Percorrer o histórico e exibir as movimentações.
}

function registrarMovimentacao(tipo, valor) {
    // IMPLEMENTAR:
    // Criar um objeto com tipo, valor e data.
    // Adicionar o objeto ao histórico.
}

function processarOperacao(opcao) {
    switch (opcao) {
        case operacoes.CONSULTAR_SALDO:
            consultarSaldo();
            break;

        case operacoes.DEPOSITAR:
            // IMPLEMENTAR: obter o valor do depósito.
            break;

        case operacoes.SACAR:
            // IMPLEMENTAR: obter o valor do saque.
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

// ==========================================
// 4. EXECUÇÃO DO SISTEMA
// ==========================================

function iniciarSistema() {
    // IMPLEMENTAR:
    // 1. Repetir o menu enquanto necessário.
    // 2. Obter a opção escolhida pelo usuário.
    // 3. Converter a entrada para número.
    // 4. Chamar processarOperacao(opcao).
    // 5. Encerrar quando a opção for 0.
}

// ==========================================
// 5. INICIALIZAÇÃO
// ==========================================

// IMPLEMENTAR: iniciar o sistema.
