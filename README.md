# BankSim - Simulador Bancário

Um simulador bancário que roda no terminal, feito com JavaScript e Node.js. Fiz esse projeto para praticar lógica de programação.

## Como cheguei até aqui

Fiz os cursos de JavaScript da Alura e, depois de estudar o conteúdo, senti que só os exercícios não bastavam. Eu queria juntar tudo em um projeto de verdade, com regras para resolver e erros para corrigir. Escolhi um simulador bancário porque ele me obriga a validar dados, tomar decisões e organizar informações.

O que eu estudei nos cursos:

- **Variáveis:** `var`, `let` e `const`
- **Tipos de dados:** `string`, `number`, `boolean`, `undefined`, `null`, `object`, `bigint` e `symbol`
- **Operadores:** aritméticos, de atribuição, de comparação e lógicos
- **Condicionais:** `if`, `else if`, `else`, `switch` e operador ternário
- **Laços:** `for`, `while`, `do...while`, `for...of` e `for...in`
- **Funções:** declaração, expressão e *arrow function*
- **Arrays e objetos:** criação, acesso e alteração
- **Métodos nativos:**
  - de array: `push`, `pop`, `shift`, `unshift`, `splice`, `slice`, `find`, `findIndex`, `filter`, `map`, `reduce`, `forEach`, `includes`, `sort` e `join`
  - de número e data: `toFixed`, `Number.isFinite` e `Date`

Durante o desenvolvimento eu errei bastante. Troquei `||` por `&&`, usei variável fora do escopo e comparei textos escritos de jeito diferente. Foi corrigindo cada um desses erros que os conceitos realmente fixaram.

## O que o projeto faz

- Consulta saldo e limite
- Deposita e saca (a conta corrente pode usar o limite)
- Mostra o extrato e filtra as movimentações por tipo
- Transfere dinheiro entre contas
- Cria e exclui contas, validando os dados

## Como rodar

Não precisa instalar nenhuma dependência, só ter o [Node.js](https://nodejs.org) (versão LTS) na máquina.

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

## Como o código está organizado

O arquivo `banksim.js` tem cinco partes:

1. **Dados:** o array de contas e a conta ativa
2. **Menu de operações:** o objeto com as opções
3. **Funções do sistema:** a regra de cada operação
4. **Processamento:** o `switch` que chama a função de cada opção
5. **Execução:** uma demonstração que roda as operações em sequência

## Regras que implementei

- O limite vale para saque e transferência (disponível = saldo + limite)
- Não dá para transferir para a mesma conta nem para uma conta que não existe
- Não dá para excluir uma conta com saldo diferente de zero ou que esteja em uso
- O número da conta não pode se repetir

## O que ainda falta

- Estudar Programação Orientada a Objetos (POO) de JavaScript
- Refatorar o código para um novo arquivo, para assim por em prática os meus conhecimentos de POO

## Autor

Henrique Yuji Yamada
