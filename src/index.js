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
  console.log(
    `${characterName} jogou o 🎲 de ${block} e tirou ${resultDice} + ${attribute} = ${
      resultDice + attribute
    }\n`
  );
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

      console.log(
        `${character1.NOME} iniciou uma batalha contra ${character2.NOME} 🥊`
      );

      await logRollResult(
        character1.NOME,
        "Poder",
        resultDice1,
        character1.PODER
      );
      await logRollResult(
        character2.NOME,
        "Poder",
        resultDice2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
          character2.PONTOS--;
          console.log(`${character2.NOME} perdeu um ponto!`);
      }
      if (powerResult1 < powerResult2 && character1.PONTOS > 0) {
          character1.PONTOS--;
          console.log(`${character1.NOME} perdeu um ponto!`);
        }
      if (powerResult1 == powerResult2) {
        console.log("Empate! Ninguém perdeu ponto");
      }
    }
    // Verifica o vencedor
    if (resultSkill1 > resultSkill2) {
      console.log(`${character1.NOME} marcou um ponto 🎉`);
      character1.PONTOS++;
    } else if (resultSkill1 < resultSkill2) {
      console.log(`${character2.NOME} marcou um ponto 🎉`);
      character2.PONTOS++;
    }
    console.log(`--------------------------------------\n`);
  }
  console.log("VAMOS AO GRANDE VENCEDOR!🏆\n");
  console.log(`${character1.NOME} ficou com ${character1.PONTOS} pontos`);
  console.log(`${character2.NOME} ficou com ${character2.PONTOS} pontos`);
}

// Chaves no começo e no final tranformar a função em uma função auto invocável (auto invoke)
(async function main() {
  console.log(
    `\n🚗🏁 Confronto mortal entre ${player1.NOME} e ${player2.NOME} iniciando ...\n`
  );

  // AWAIT faz essa função esperar para ser executada
  await playRaceEngine(player1, player2);
})();
