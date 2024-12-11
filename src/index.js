const player1 = {
  NOME: "Mário",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

// Função onde realiza o solteio dos dados
async function rollDice() {
  // MATH é uma função do Node, FLOOR para tornar a soma ao valor aproximado e RANDOM já sabe né
  return Math.floor(Math.random() * 6) + 1;
}

// Função da seleção de pistas (SORTEIO DE BLOCOS)
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
      break;
  }

  return result;
}

async function playRaceEngine(character1, character2) {
  console.log(`--------------------------------------`);
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}\n`);

    // Sortear Bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}\n`);

    // Sorteio dos dados
    let resultDice1 = await rollDice();
    let resultDice2 = await rollDice();

    console.log(resultDice1, resultDice2);

    console.log(`\n--------------------------------------\n`);
  }
}

// Chaves no começo e no final tranformar a função em uma função auto invocável (auto invoke)
(async function main() {
  console.log(
    `🚗🏁 Confronto mortal entre ${player1.NOME} e ${player2.NOME} iniciando ...\n`
  );

  // AWAIT faz essa função esperar para ser executada
  await playRaceEngine(player1, player2);
})();
