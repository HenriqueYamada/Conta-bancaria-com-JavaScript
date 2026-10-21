// SISTEMA BANCÁRIO COM MENU  |  node conta-bancaria.js
// Fluxo: roteiro -> executarRoteiro() -> executarOperacao(item) -> switch -> funções
// Conta: numero, titular, tipo ("corrente"|"poupanca"), saldo, limite, dataAbertura, historico
// Movimentação: tipo ("deposito"|"saque"|"transferencia-enviada"|"transferencia-recebida"),
//               valor, data (Date), saldoApos
// Funções que mexem em contas recebem o NÚMERO da conta (ex.: depositar(1001, 100)).

// ---------- DADOS (não altere) ----------
let contas = [ 
  // Conta 01:
  { numero: 1001, titular: "Ana Souza", tipo: "corrente", saldo: 2300.5, limite: 500, dataAbertura: new Date(2021, 2, 15),
    historico: [
      { tipo: "deposito", valor: 1000, data: new Date(2021, 2, 15), saldoApos: 1000 },
      { tipo: "saque", valor: 200, data: new Date(2026, 8, 2), saldoApos: 800 },
      { tipo: "deposito", valor: 1500.5, data: new Date(2026, 9, 10), saldoApos: 2300.5 },
    ] },

  // Conta 02:  
  { numero: 1002, titular: "Bruno Lima", tipo: "poupanca", saldo: 6500, limite: 0, dataAbertura: new Date(2022, 6, 1),
    historico: [
      { tipo: "deposito", valor: 5000, data: new Date(2022, 6, 1), saldoApos: 5000 },
      { tipo: "deposito", valor: 2500, data: new Date(2026, 7, 20), saldoApos: 7500 },
      { tipo: "saque", valor: 1000, data: new Date(2026, 9, 5), saldoApos: 6500 },
    ] },

  // Conta 03:
  { numero: 1003, titular: "Carla Mendes", tipo: "corrente", saldo: 200, limite: 1000, dataAbertura: new Date(2023, 0, 10),
    historico: [
      { tipo: "deposito", valor: 300, data: new Date(2023, 0, 10), saldoApos: 300 },
      { tipo: "saque", valor: 100, data: new Date(2026, 9, 12), saldoApos: 200 },
    ] },

  // Conta 04:
  { numero: 1004, titular: "Diego Rocha", tipo: "poupanca", saldo: 0, limite: 0, dataAbertura: new Date(2024, 4, 20),
    historico: [
      { tipo: "deposito", valor: 50, data: new Date(2024, 4, 20), saldoApos: 50 },
      { tipo: "saque", valor: 50, data: new Date(2024, 5, 3), saldoApos: 0 },
    ] },

  // Conta 05:
  { numero: 1005, titular: "Elisa Tanaka", tipo: "corrente", saldo: 10250.75, limite: 800, dataAbertura: new Date(2020, 10, 5),
    historico: [
      { tipo: "deposito", valor: 12000, data: new Date(2020, 10, 5), saldoApos: 12000 },
      { tipo: "saque", valor: 2500, data: new Date(2026, 5, 18), saldoApos: 9500 },
      { tipo: "deposito", valor: 750.75, data: new Date(2026, 9, 10), saldoApos: 10250.75 },
    ] },
];

const opcoesDoMenu = [
  { opcao: 0, texto: "Sair" }, 
  { opcao: 1, texto: "Imprimir todas as contas" },
  { opcao: 2, texto: "Consultar conta por número" }, 
  { opcao: 3, texto: "Filtrar contas (por tipo ou por saldo)" },
  { opcao: 4, texto: "Depositar" }, 
  { opcao: 5, texto: "Sacar" }, 
  { opcao: 6, texto: "Transferir" },
  { opcao: 7, texto: "Ver extrato" }, 
  { opcao: 8, texto: "Criar conta" }, 
  { opcao: 9, texto: "Encerrar conta" },
  { opcao: 10, texto: "Relatório do banco" },
];

// ---------- ROTEIRO (não alterar) ----------
// Cada item simula uma escolha no menu. "ex" = exercício em que o passo passa a valer.
let EXERCICIO_ATUAL = 1; // suba de 1 até 8 conforme avançar

const roteiro = [
  { ex: 1, opcao: 1 },
  { ex: 1, opcao: 2, numero: 1003 },
  { ex: 1, opcao: 99 },
  { ex: 1, opcao: "abc" },
  { ex: 2, opcao: 2, numero: 9999 },
  { ex: 3, opcao: 3, criterio: "tipo", valor: "poupanca" },
  { ex: 3, opcao: 3, criterio: "saldoAcimaDe", valor: 5000 },
  { ex: 3, opcao: 3, criterio: "cor", valor: "azul" },
  { ex: 4, opcao: 4, numero: 1001, valor: 199.5 },
  { ex: 4, opcao: 4, numero: 1001, valor: -50 },
  { ex: 4, opcao: 4, numero: 1001, valor: "abc" },
  { ex: 4, opcao: 4, numero: 9999, valor: 100 },
  { ex: 4, opcao: 5, numero: 1002, valor: 500 },
  { ex: 4, opcao: 5, numero: 1002, valor: 7000 },
  { ex: 4, opcao: 5, numero: 1003, valor: 1000 },
  { ex: 4, opcao: 5, numero: 1003, valor: 500 },
  { ex: 5, opcao: 6, origem: 1005, destino: 1004, valor: 250.25 },
  { ex: 5, opcao: 6, origem: 1002, destino: 1001, valor: 6000 },
  { ex: 5, opcao: 6, origem: 1004, destino: 1003, valor: 300 },
  { ex: 5, opcao: 6, origem: 1001, destino: 1001, valor: 100 },
  { ex: 5, opcao: 6, origem: 1001, destino: 9999, valor: 100 },
  { ex: 6, opcao: 7, numero: 1001 },
  { ex: 6, opcao: 7, numero: 1004 },
  { ex: 6, opcao: 7, numero: 9999 },
  { ex: 7, opcao: 8, titular: "Felipe Alves", tipo: "corrente", depositoInicial: 1500 },
  { ex: 7, opcao: 8, titular: "Gabriela Costa", tipo: "poupanca", depositoInicial: 0 },
  { ex: 7, opcao: 8, titular: "Hugo Pires", tipo: "investimento", depositoInicial: 100 },
  { ex: 7, opcao: 9, numero: 1001 },
  { ex: 7, opcao: 9, numero: 1002 },
  { ex: 7, opcao: 9, numero: 9999 },
  { ex: 7, opcao: 7, numero: 1007 },
  { ex: 8, opcao: 10 },
  { ex: 4, opcao: 1 }, // conferência final: lista as contas (entra a partir do Ex. 4)
  { ex: 0, opcao: 0 }, // sair: sempre entra e TEM que ser o último
];

// ============ EXERCÍCIOS (é com você!) ============

// Ex. 1 (~20 min): o menu
function exibirMenu() {}        // TODO: título + uma linha por opção ("0 - Sair"), percorrendo opcoesDoMenu
function executarOperacao(item) {} // TODO: switch em item.opcao; cada case imprime ">> título" e chama a função; default: "Opção inválida"
function executarRoteiro() {}   // TODO: exibirMenu() 1x; filtrar passos com ex <= EXERCICIO_ATUAL; do...while até opcao 0; separador "--- Passo N | Opção X ---"

// Ex. 2 (~12 min): imprimir e consultar
function exibirConta(conta) {}          // TODO: "Conta 1001 | Ana Souza | corrente | Saldo: R$ 2300.50 | Aberta em 2021"
function exibirTodasAsContas() {}       // TODO: uma linha por conta (laço)
function buscarContaPorNumero(numero) {} // TODO: devolve a conta ou null (não imprime nada)
function consultarConta(numero) {}      // TODO: exibe a conta ou "Conta não encontrada"

// Ex. 3 (~10 min): filtros e callback
function paraCadaConta(lista, callback) {} // TODO: chama o callback para cada conta da lista
function filtrarContas(criterio, valor) {} // TODO: "tipo" | "saldoAcimaDe" (maior que); senão "Critério inválido". Imprime "N conta(s) encontrada(s)" e as contas

// Ex. 4 (~15 min): devolvem true/false e imprimem mensagem. Valor válido = number > 0
function depositar(numero, valor) {} // TODO
function sacar(numero, valor) {}     // TODO: permite se valor <= saldo + limite

// Ex. 5 (~15 min)
function transferir(numeroOrigem, numeroDestino, valor) {} // TODO: valide tudo antes de mexer em saldos; contas diferentes; tipos "transferencia-enviada"/"-recebida"

// Ex. 6 (~8 min)
function formatarData(data) {}    // TODO: Date -> "dd/mm/aaaa"
function exibirExtrato(numero) {} // TODO: cabeçalho, "15/03/2021 | deposito | R$ 1000.00 | Saldo: R$ 1000.00", "Saldo atual: R$ ..."; vazio: "Nenhuma movimentação"

// Ex. 7 (~10 min)
function criarConta(titular, tipo, depositoInicial) {} // TODO: número = último + 1; limite 500 (corrente) ou 0; deposito > 0 vira movimentação; devolve a conta ou null
function encerrarConta(numero) {}                       // TODO: só se saldo === 0; devolve true/false

// Ex. 8 (~15 min)
function totalDoBanco() {}        // TODO: soma dos saldos
function contarContasPorTipo() {} // TODO: objeto { corrente: n, poupanca: n }
function totalMovimentado() {}    // TODO: { depositos, saques } (só "deposito" e "saque")
function relatorioDoBanco() {}    // TODO: usa as 3 acima + Object.entries, Object.keys e Object.values

// Bônus
function contaComMaiorSaldo() {}
function desfazerUltimaMovimentacao(numero) {}

executarRoteiro(); // não apague