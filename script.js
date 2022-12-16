let JogoEmAndamento = true;
let TurnoJogador = "X"
let pontuacaoX = 0
let pontuacaoO = 0
let numJogadasX = 0
let numJogadasO = 0
let numJogadas = 0
let algumVencedor = false
let TemporizadorEmAndamento = false
let ResetarTemporizador = false
let primeiraRodada = false
let horas = 0
let minutos = 0
let segundos = 0
let menorHr = 0
let menorMin = 0
let menorSeg = 0

function temporizador() {
  segundos++;
  if (segundos > 59) {
    segundos = 0;
    minutos++;
  }
  if (minutos > 59) {
    minutos = 0;
    horas++;
  }
  document.getElementById("tempo").innerText = ('0' + horas).substr(-2) + ":" + ('0' + minutos).substr(-2) + ":" + ('0' + segundos).substr(-2)
}
function iniciarTemporizador() {
  if (!TemporizadorEmAndamento) {
    controle = setInterval("temporizador()", 1000);
    TemporizadorEmAndamento = true;
  }
}
function pararTemporizador() {
  clearInterval(controle);
}
function reiniciarTemporizador() {
  if (ResetarTemporizador) {
    horas = 0
    minutos = 0
    segundos = 0
    controle = setInterval("temporizador()", 1000);
    ResetarTemporizador = false;
  }
}

function tempoRodadaUm() {
  if (!primeiraRodada) {
    menorHr = horas;
    menorMin = minutos;
    menorSeg = segundos;
    primeiraRodada = true;
  }
}

function escolhaUsuario(event, numCasa) {
  if (JogoEmAndamento) {
    const tile = event.currentTarget;
    iniciarTemporizador();
    reiniciarTemporizador();
    if (TurnoJogador === "X") {
      turnoJogadorX(tile);

    } else if (TurnoJogador === "O") {
      turnoJogadorO(tile);
    }
    /* alert("Você clicou na casa " + numCasa) */
  }
}

function AlterarJogador() {
  if (TurnoJogador === "X") { TurnoJogador = "O" }
  else TurnoJogador = "X"
  AlterarTurno();
}
function AlterarTurno() {
  let turno = document.getElementById("JogadorDaVez")
  turno.innerText = `${TurnoJogador}`;
}

function turnoJogadorX(tile) {
  tile.innerText = "X"
  tile.disabled = true
  numJogadasX++
  numJogadas++
  verificarVelha();
  verificarVitoria();
  AlterarJogador();
}
function VitoriaJogadorX() {
  JogoEmAndamento = false;
  algumVencedor = true;
  document.getElementById("vencedorRodada").innerText = "Jogador X venceu!"
  tempoRodadaUm();
  verificarJogadasX();
  verificarMelhorTempoX();
  pararTemporizador();
  pontuacaoPlacarX();
}
function pontuacaoPlacarX() {
  pontuacaoX++;
  let placarX = document.getElementById("placarX");
  placarX.innerText = `${pontuacaoX}`;
}
function verificarJogadasX() {
  if (numJogadasX <= 4) { pontuacaoX++ }
}
function verificarMelhorTempoX() {
  if (segundos <= menorSeg && minutos <= menorMin && horas <= menorHr) {
    menorHr = horas;
    menorMin = minutos;
    menorSeg = segundos;
    document.getElementById("melhorTempoX").innerText = ('0' + menorHr).substr(-2) + ":" + ('0' + menorMin).substr(-2) + ":" + ('0' + menorSeg).substr(-2);
  }
}

function turnoJogadorO(tile) {
  tile.innerText = "O"
  tile.disabled = true;
  numJogadasO++
  numJogadas++
  verificarVelha();
  verificarVitoria();
  AlterarJogador();
}
function VitoriaJogadorO() {
  JogoEmAndamento = false;
  algumVencedor = true;
  document.getElementById("vencedorRodada").innerText = "Jogador O venceu!"
  tempoRodadaUm();
  verificarJogadasO();
  verificarMelhorTempoO();
  pararTemporizador();
  pontuacaoPlacarO();
}
function pontuacaoPlacarO() {
  pontuacaoO++;
  let placarO = document.getElementById("placarO");
  placarO.innerText = `${pontuacaoO}`;
}
function verificarJogadasO() {
  if (numJogadasO <= 4) { pontuacaoO++ }
}
function verificarMelhorTempoO() {
  if (segundos <= menorSeg && minutos <= menorMin && horas <= menorHr) {
    menorHr = horas;
    menorMin = minutos;
    menorSeg = segundos;
    document.getElementById("melhorTempoO").innerText = ('0' + menorHr).substr(-2) + ":" + ('0' + menorMin).substr(-2) + ":" + ('0' + menorSeg).substr(-2);
  }
}

function verificarVelha() {
  if (numJogadas === 9 && algumVencedor === false) {
    document.getElementById("vencedorRodada").innerText = "Velha!"
    pararTemporizador();
  }
}

function verificarVitoria() {
  verificarPrimeiraFileira();
  verificarSegundaFileira();
  verificarTerceiraFileira();
  verificarPrimeiraColuna();
  verificarSegundaColuna();
  verificarTerceiraColuna();
  verificarPrimeiraDiagonal();
  verificarSegundaDiagonal();
}
function verificarPrimeiraFileira() {
  if (document.getElementById("quadrado1").innerText === "X" && document.getElementById("quadrado2").innerText === "X" && document.getElementById("quadrado3").innerText === "X") { VitoriaJogadorX() } else if (document.getElementById("quadrado1").innerText === "O" && document.getElementById("quadrado2").innerText === "O" && document.getElementById("quadrado3").innerText === "O") { VitoriaJogadorO(); }
}
function verificarSegundaFileira() {
  if (document.getElementById("quadrado4").innerText === "X" && document.getElementById("quadrado5").innerText === "X" && document.getElementById("quadrado6").innerText === "X") { VitoriaJogadorX(); }
  else if (document.getElementById("quadrado4").innerText === "O" && document.getElementById("quadrado5").innerText === "O" && document.getElementById("quadrado6").innerText === "O") { VitoriaJogadorO(); }
}
function verificarTerceiraFileira() {
  if (document.getElementById("quadrado7").innerText === "X" && document.getElementById("quadrado8").innerText === "X" && document.getElementById("quadrado9").innerText === "X") { VitoriaJogadorX(); }
  else if (document.getElementById("quadrado7").innerText === "O" && document.getElementById("quadrado8").innerText === "O" && document.getElementById("quadrado9").innerText === "O") { VitoriaJogadorO(); }
}
function verificarPrimeiraColuna() {
  if (document.getElementById("quadrado1").innerText === "X" && document.getElementById("quadrado4").innerText === "X" && document.getElementById("quadrado7").innerText === "X") { VitoriaJogadorX(); }
  else if (document.getElementById("quadrado1").innerText === "O" && document.getElementById("quadrado4").innerText === "O" && document.getElementById("quadrado7").innerText === "O") { VitoriaJogadorO(); }
}
function verificarSegundaColuna() {
  if (document.getElementById("quadrado2").innerText === "X" && document.getElementById("quadrado5").innerText === "X" && document.getElementById("quadrado8").innerText === "X") { VitoriaJogadorX(); }
  else if (document.getElementById("quadrado2").innerText === "O" && document.getElementById("quadrado5").innerText === "O" && document.getElementById("quadrado8").innerText === "O") { VitoriaJogadorO(); }
}
function verificarTerceiraColuna() {
  if (document.getElementById("quadrado3").innerText === "X" && document.getElementById("quadrado6").innerText === "X" && document.getElementById("quadrado9").innerText === "X") { VitoriaJogadorX(); }
  else if (document.getElementById("quadrado3").innerText === "O" && document.getElementById("quadrado6").innerText === "O" && document.getElementById("quadrado9").innerText === "O") { VitoriaJogadorO(); }
}
function verificarPrimeiraDiagonal() {
  if (document.getElementById("quadrado1").innerText === "X" && document.getElementById("quadrado5").innerText === "X" && document.getElementById("quadrado9").innerText === "X") { VitoriaJogadorX(); }
  else if (document.getElementById("quadrado1").innerText === "O" && document.getElementById("quadrado5").innerText === "O" && document.getElementById("quadrado9").innerText === "O") { VitoriaJogadorO(); }
}
function verificarSegundaDiagonal() {
  if (document.getElementById("quadrado3").innerText === "X" && document.getElementById("quadrado5").innerText === "X" && document.getElementById("quadrado7").innerText === "X") { VitoriaJogadorX(); }
  else if (document.getElementById("quadrado3").innerText === "O" && document.getElementById("quadrado5").innerText === "O" && document.getElementById("quadrado7").innerText === "O") { VitoriaJogadorO(); }
}

function reiniciarJogo() {
  TurnoJogador = "O"
  document.getElementById("vencedorRodada").innerText = ""
  AlterarJogador();
  resetarJogadas();
  resetarBoolean();
  limparTemporizador();
  limparTabuleiro();
  ativarCasasTabuleiro();
}
function resetarJogadas() {
  numJogadasO = 0;
  numJogadasX = 0;
  numJogadas = 0;
}
function limparTabuleiro() {
  document.getElementById("quadrado1").innerText = ""
  document.getElementById("quadrado2").innerText = ""
  document.getElementById("quadrado3").innerText = ""
  document.getElementById("quadrado4").innerText = ""
  document.getElementById("quadrado5").innerText = ""
  document.getElementById("quadrado6").innerText = ""
  document.getElementById("quadrado7").innerText = ""
  document.getElementById("quadrado8").innerText = ""
  document.getElementById("quadrado9").innerText = ""
  document.getElementsByClassName("tile").disabled = false;
}
function ativarCasasTabuleiro() {
  document.getElementById("quadrado1").disabled = false;
  document.getElementById("quadrado2").disabled = false;
  document.getElementById("quadrado3").disabled = false;
  document.getElementById("quadrado4").disabled = false;
  document.getElementById("quadrado5").disabled = false;
  document.getElementById("quadrado6").disabled = false;
  document.getElementById("quadrado7").disabled = false;
  document.getElementById("quadrado8").disabled = false;
  document.getElementById("quadrado9").disabled = false;
}
function limparTemporizador() {
  document.getElementById("tempo").innerText = "00:00:00";
  pararTemporizador();
}
function resetarBoolean() {
  JogoEmAndamento = true;
  algumVencedor = false;
  ResetarTemporizador = true;
}