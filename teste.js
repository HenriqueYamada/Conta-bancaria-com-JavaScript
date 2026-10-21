/*
 * BANKSIM - SIMULADOR BANCÁRIO
 * Tecnologias: JavaScript + Node.js
 * Objetivo: praticar lógica de programação.
 */

// ========== 1. DADOS ==========

const contas = [
    { 
      numero: 1001, 
      titular: "Henrique Yamada", 
      tipo: "corrente", 
      saldo: 1500.00, 
      limite: 500.00, 
      historico: [] 
    },

    { 
      numero: 1002, 
      titular: "Fabiana Freitas", 
      tipo: "poupanca", 
      saldo: 3200.00, 
      limite: 0, 
      historico: [] 
    },

    { 
      numero: 1003, 
      titular: "Carlos Lima", 
      tipo: "corrente", 
      saldo: 800.00, 
      limite: 300.00, 
      historico: [] 
    }
];

let contaAtiva = contas[0];

// ========== 2. MENU DE OPERAÇÕES ==========

const operacoes = {
    CONSULTAR_SALDO: 1,
    DEPOSITAR: 2,
    SACAR: 3,
    EXTRATO: 4,
    FILTRAR: 5,
    TRANSFERIR: 6,
    CRIAR_CONTA: 7,
    EXCLUIR_CONTA: 8,
    ENCERRAR: 0
};

// ========== 3. FUNÇÕES DO SISTEMA ==========

function exibirMenu() {
    console.log("\n=================================");
    console.log("    BANKSIM - BANCO DIGITAL");
    console.log("=================================");
    console.log(`Conta: ${contaAtiva.numero}`);
    console.log(`Titular: ${contaAtiva.titular}`);
    console.log("---------------------------------");
    console.log(`${operacoes.CONSULTAR_SALDO} - Consultar saldo`);
    console.log(`${operacoes.DEPOSITAR} - Realizar depósito`);
    console.log(`${operacoes.SACAR} - Realizar saque`);
    console.log(`${operacoes.EXTRATO} - Exibir extrato`);
    console.log(`${operacoes.FILTRAR} - Filtrar movimentações`);
    console.log(`${operacoes.TRANSFERIR} - Transferir`);
    console.log(`${operacoes.CRIAR_CONTA} - Criar conta`);
    console.log(`${operacoes.EXCLUIR_CONTA} - Excluir conta`);
    console.log(`${operacoes.ENCERRAR} - Encerrar sistema`);
    console.log("=================================");
}

function buscarContaPorNumero(numero) {
    return contas.find(c => c.numero === numero);
}

function consultarSaldo() {
    console.log("O seu saldo é de R$", contaAtiva.saldo);
    console.log("O seu limite é de R$", contaAtiva.limite);
}

function realizarDeposito(valor) {
    if (Number.isFinite(valor) && valor > 0) {
        contaAtiva.saldo += valor;
        registrarMovimentacao(contaAtiva, "Depósito", valor);
        console.log("O seu novo saldo é de: R$", contaAtiva.saldo);
    } else {
        console.log("Você não pode depositar um valor igual a 0 ou menor.");
    }
}

function realizarSaque(valor) {
    if (!Number.isFinite(valor) || valor <= 0) {
        console.log("Valor de saque inválido.");
        return;
    }

    if (valor > contaAtiva.saldo + contaAtiva.limite) {
        console.log("Saldo e limite insuficientes.");
        return;
    }

    contaAtiva.saldo -= valor;
    registrarMovimentacao(contaAtiva, "Saque", valor);
    console.log("O novo saldo é de: R$", contaAtiva.saldo);
}

function exibirExtrato() {
    console.log("\n====== EXTRATO ======");

    if (contaAtiva.historico.length === 0) {
        console.log("Nenhuma movimentação registrada.");
        return;
    }

    contaAtiva.historico.forEach(item => {
        console.log(`${item.data} | ${item.tipo} | R$ ${item.valor.toFixed(2)}`);
    });
}

// Agora recebe a conta, pois a transferência registra em duas contas.
function registrarMovimentacao(conta, tipo, valor) {
    conta.historico.push({
        tipo: tipo,
        valor: valor,
        data: new Date().toLocaleString('pt-BR'),
    });
}

// Exibe só as movimentações da conta ativa que atendem ao critério (ex: tipo).
function filtrarMovimentacoes(conta, tipo) {
    const movimentacaoFiltrada = conta.historico.filter(n => n.tipo === tipo);

    if (movimentacaoFiltrada.length === 0) {
        console.log("Nenhuma movimentação do tipo", tipo, "encontrada.");
        return;
    }

    movimentacaoFiltrada.forEach(n => {
        console.log(`${n.data} | ${n.tipo} | R$ ${n.valor.toFixed(2)}`);
    });
}

// ========== 4. A IMPLEMENTAR ==========

// Move valor da conta de origem para a de destino e registra nas duas.
function transferir(numeroOrigem, numeroDestino, valor) {
    if (!Number.isFinite(valor) || valor <= 0) {
        console.log("O valor R$", valor, " não pode ser transferido");
        return;
    }

    const origem = buscarContaPorNumero(numeroOrigem);
    const destino = buscarContaPorNumero(numeroDestino);

    if (!origem) {
        console.log("A conta ", numeroOrigem," não existe");
        return;
    } else if (!destino) {
        console.log("A conta ", numeroDestino," não existe");
        return;
    }

    if (numeroOrigem === numeroDestino) {
        console.log("As contas ", numeroOrigem, " e ", numeroDestino, " são iguais");
        return;
    }

    if (valor > origem.saldo + origem.limite) {
        console.log("O saldo não é suficiente para a conta ", numeroOrigem);
        return;
    }

    origem.saldo -= valor;
    destino.saldo += valor;

    registrarMovimentacao(origem, "Transferência - enviada", valor);
    registrarMovimentacao(destino, "Transferência - recebida", valor);

    console.log("Transferência feita com sucesso! A conta ", origem.numero, " possui um saldo de R$", origem.saldo, ", e a conta ", destino.numero, " possui um saldo de R$", destino.saldo);
}

// Remove a última movimentação da conta ativa e reverte o saldo.
function desfazerUltimaMovimentacao() {
    // TODO
}

// Adiciona uma nova conta ao array "contas".
function criarConta(titular, tipo, saldoInicial) {
    // TODO
}

// Remove a conta do array "contas".
function excluirConta(numero) {
    // TODO
}

// ========== 5. PROCESSAMENTO DAS OPERAÇÕES ==========

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

        case operacoes.FILTRAR:
            filtrarMovimentacoes(contaAtiva, "Depósito");
            filtrarMovimentacoes(contaAtiva, "Saque");
            break;

        case operacoes.TRANSFERIR:
            transferir(1001, 1002, 250);
            transferir(9999, 1002, 100);
            transferir(1001, 9999, 100);
            transferir(1001, 1001, 100);
            transferir(1001, 1002, 5000);
            transferir(1001, 1002, 0);
            break;

        case operacoes.CRIAR_CONTA:
            
            break;

        case operacoes.EXCLUIR_CONTA:
            
            break;

        case operacoes.ENCERRAR:
            console.log("Encerrando o BankSim...");
            break;

        default:
            console.log("Opção inválida!");
    }
}

// ========== 6. EXECUÇÃO DO SISTEMA ==========

function iniciarSistema() {
    // processarOperacao(operacoes.DEPOSITAR);
    // processarOperacao(operacoes.SACAR);
    // processarOperacao(operacoes.EXTRATO);
    // processarOperacao(operacoes.FILTRAR)
    // processarOperacao(operacoes.TRANSFERIR);
    processarOperacao(operacoes.TRANSFERIR);
}   

iniciarSistema();