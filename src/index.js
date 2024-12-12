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

async function logRollResult(characterName, block, resultDice, attribute) {
  console.log(`${characterName} jogou o 🎲 de ${block} e tirou ${resultDice} + ${attribute} = ${resultDice + attribute}\n`);
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

    // Teste de skills
    let resultSkill1 = 0;
    let resultSkill2 = 0;

    if (block == "RETA") {
      resultSkill1 = character1.VELOCIDADE + resultDice1;
      resultSkill2 = character2.VELOCIDADE + resultDice2;

      // Utilizando da função logRoll para refatoramento de Logs repetitivas
      await logRollResult(
        character1.NOME,
        "Velocidade",
        resultDice1,
        character1.VELOCIDADE
      );
      await logRollResult(
        character2.NOME,
        "Velocidade",
        resultDice2,
        character2.VELOCIDADE
      );
    }
    if (block == "CURVA") {
      resultSkill1 = character1.MANOBRABILIDADE + resultDice1;
      resultSkill2 = character2.MANOBRABILIDADE + resultDice2;

      await logRollResult(
        character1.NOME,
        "Manobrabilidade",
        resultDice1,
        character1.MANOBRABILIDADE
      );
      await logRollResult(
        character2.NOME,
        "Manobrabilidade",
        resultDice2,
        character2.MANOBRABILIDADE
      );
    }
    if (block == "CONFRONTO") {
      let powerResult1 = character1.PODER + resultDice1;
      let powerResult2 = character2.PODER + resultDice2;
    }

    console.log(`--------------------------------------\n`);
  }
}

// Chaves no começo e no final tranformar a função em uma função auto invocável (auto invoke)
(async function main() {
  console.log(
    `\n🚗🏁 Confronto mortal entre ${player1.NOME} e ${player2.NOME} iniciando ...\n`
  );

  // AWAIT faz essa função esperar para ser executada
  await playRaceEngine(player1, player2);
})();
