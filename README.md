# BankSim - Simulador Bancário

Simulador bancário em JavaScript, executado no terminal com Node.js, criado para praticar lógica de programação.

## Funcionalidades

- Consultar saldo e limite
- Depositar e sacar (a conta corrente pode usar o limite)
- Exibir extrato e filtrar movimentações por tipo
- Transferir entre contas
- Criar e excluir contas, com validação dos dados

## Tecnologias

JavaScript e Node.js, sem bibliotecas externas.

## Como executar

Não há dependências para instalar (sem `npm install`). É necessário apenas ter o [Node.js](https://nodejs.org) (versão LTS).

```bash
git clone <link-do-repositorio>
cd <nome-da-pasta>
node banksim.js
```

## Exemplo de saída

```
O seu saldo é de R$ 1500
O seu limite é de R$ 500
O seu novo saldo é de: R$ 2225
O novo saldo é de: R$ 2025

====== EXTRATO ======
21/10/2026, 20:36:24 | Depósito | R$ 725.00
21/10/2026, 20:36:24 | Saque | R$ 200.00
```

## Estrutura do código

O arquivo `banksim.js` é dividido em seções:

1. **Dados:** array de contas e conta ativa
2. **Menu de operações:** objeto com as opções disponíveis
3. **Funções do sistema:** regras de cada operação
4. **Processamento:** `switch` que direciona cada opção para sua função
5. **Execução:** demonstração que roda as operações em sequência

## Regras de negócio

- O limite vale para saques e transferências (disponível = saldo + limite)
- Não é possível transferir para a mesma conta nem para contas inexistentes
- Não é possível excluir uma conta com saldo diferente de zero ou que esteja em uso
- Números de conta não podem se repetir

## Conceitos praticados

- Variáveis (`const` e `let`), objetos e arrays
- Funções, parâmetros e retorno antecipado (*early return*)
- Condicionais e `switch`
- Métodos de array: `find`, `findIndex`, `filter`, `forEach`, `push` e `splice`
- Validação de dados (`Number.isFinite`, `trim`)
- Template strings e datas (`Date`, `toLocaleString`)

## Limitações e próximos passos

- Os valores das operações são fixos no código (sem entrada do usuário via `readline`)
- Desfazer última movimentação não foi implementado
- Poupança com limite maior que 0 ainda é aceita na criação de conta

## Autor

Henrique Yamada
