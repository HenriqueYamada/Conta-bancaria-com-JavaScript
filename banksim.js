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

//Retorna a conta com o número informado, ou undefined se ela não existir.
function buscarContaPorNumero(numero) {
    return contas.find(c => c.numero === numero);
}

// Exibe o saldo e o limite da conta ativa.
function consultarSaldo() {
    console.log("O seu saldo é de R$", contaAtiva.saldo);
    console.log("O seu limite é de R$", contaAtiva.limite);
}

// Soma o valor ao saldo da conta ativa e registra no histórico. Recusa valores inválidos (zero, negativos ou não numéricos).
function realizarDeposito(valor) {
    if (Number.isFinite(valor) && valor > 0) {
        contaAtiva.saldo += valor;
        registrarMovimentacao(contaAtiva, "Depósito", valor);
        console.log("O seu novo saldo é de: R$", contaAtiva.saldo);
    } else {
        console.log("Você não pode depositar um valor igual a 0 ou menor.");
    }
}

// Subtrai o valor do saldo da conta ativa e registra no histórico. Permite usar o limite, mas recusa valores inválidos ou acima de saldo + limite.
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

// Exibe todas as movimentações da conta ativa, ou avisa se o histórico estiver vazio.
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

// Adiciona ao histórico da conta informada uma movimentação com tipo, valor e data.
function registrarMovimentacao(conta, tipo, valor) {
    conta.historico.push({
        tipo: tipo,
        valor: valor,
        data: new Date().toLocaleString("pt-BR")
    });
}

// Exibe as movimentações de uma conta que sejam do tipo informado.
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

// Move valor da conta de origem para a de destino e registra nas duas.
function transferir(numeroOrigem, numeroDestino, valor) {
    if (!Number.isFinite(valor) || valor <= 0) {
        console.log("O valor R$", valor, "não pode ser transferido");
        return;
    }

    const origem = buscarContaPorNumero(numeroOrigem);
    const destino = buscarContaPorNumero(numeroDestino);

    if (!origem) {
        console.log("A conta", numeroOrigem, "não existe");
        return;
    } else if (!destino) {
        console.log("A conta", numeroDestino, "não existe");
        return;
    }

    if (numeroOrigem === numeroDestino) {
        console.log("As contas", numeroOrigem, "e", numeroDestino, "são iguais");
        return;
    }

    if (valor > origem.saldo + origem.limite) {
        console.log("O saldo não é suficiente para a conta", numeroOrigem);
        return;
    }

    origem.saldo -= valor;
    destino.saldo += valor;

    registrarMovimentacao(origem, "Transferência - enviada", valor);
    registrarMovimentacao(destino, "Transferência - recebida", valor);

    console.log("Transferência feita com sucesso! A conta", origem.numero, "possui um saldo de R$", origem.saldo + ", e a conta", destino.numero, "possui um saldo de R$", destino.saldo);
}

// Valida os dados e adiciona uma nova conta ao array "contas".
function criarConta(numero, titular, tipo, saldoInicial, limite) {
    if (!Number.isFinite(numero)) {
        console.log("O número", numero, "não é válido.");
        return;
    } else if (buscarContaPorNumero(numero)) {
        console.log("O número", numero, "já está sendo utilizado.");
        return;
    }

    if (titular.trim() === "") {
        console.log("O titular está vazio.");
        return;
    }

    if (tipo !== "corrente" && tipo !== "poupanca") {
        console.log("O tipo", tipo, "é inválido.");
        return;
    }

    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
        console.log("O saldo R$", saldoInicial, "é inválido.");
        return;
    }

    if (!Number.isFinite(limite) || limite < 0) {
        console.log("O limite R$", limite, "é inválido.");
        return;
    }

    const novaConta = {
        numero: numero,
        titular: titular,
        tipo: tipo,
        saldo: saldoInicial,
        limite: limite,
        historico: []
    };

    contas.push(novaConta);
    console.log("Conta criada com sucesso!");
}

// Remove uma conta do array "contas" (só com saldo zerado e fora de uso).
function excluirConta(numero) {
    const conta = buscarContaPorNumero(numero);

    if (!conta) {
        console.log("A conta não existe");
        return;
    }

    if (conta.saldo > 0) {
        console.log("Não é possível excluir a conta, pois você ainda possui dinheiro");
        return;
    } else if (conta.saldo < 0) {
        console.log("Não é possível excluir a conta, pois você está com a conta negativada");
        return;
    }

    if (conta === contaAtiva) {
        console.log("Não é possível excluir a conta que está em uso.");
        return;
    }

    const posicao = contas.findIndex(c => c.numero === numero);
    contas.splice(posicao, 1);

    console.log("Conta", numero, "excluída com sucesso!");
}

// ========== 4. PROCESSAMENTO DAS OPERAÇÕES ==========

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
            break;

        case operacoes.TRANSFERIR:
            transferir(1001, 1002, 250);
            break;

        case operacoes.CRIAR_CONTA:
            criarConta(1004, "Ana Costa", "corrente", 0, 300);
            break;

        case operacoes.EXCLUIR_CONTA:
            excluirConta(1004);
            break;

        case operacoes.ENCERRAR:
            console.log("Encerrando o BankSim...");
            break;

        default:
            console.log("Opção inválida!");
    }
}

// ========== 5. EXECUÇÃO DO SISTEMA ==========

// Demonstração: executa cada operação uma vez, em sequência.
function iniciarSistema() {
    processarOperacao(operacoes.CONSULTAR_SALDO);
    processarOperacao(operacoes.DEPOSITAR);
    processarOperacao(operacoes.SACAR);
    processarOperacao(operacoes.EXTRATO);
    processarOperacao(operacoes.FILTRAR);
    processarOperacao(operacoes.TRANSFERIR);
    processarOperacao(operacoes.CRIAR_CONTA);
    processarOperacao(operacoes.EXCLUIR_CONTA);
    processarOperacao(operacoes.ENCERRAR);
}

iniciarSistema();