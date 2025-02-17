let listaDeNumerosSorteados = [];
let limiteDaLista = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag , texto){
let campo = document.querySelector(tag);
campo.innerHTML = texto;
//responsiveVoice.speak(texto, 'UK English Male', {rate: 1.3}); (SÓ QUANDO FOR CHROME!)
if ('speechSynthesis' in window){
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
} else {
    console.log("Web Speech API não suportada neste navegador.");
}
}

function exibirMensagemInicial(){
exibirTexto('h1' , 'Jogo do Número Secreto');
exibirTexto('p' , 'Escolha um número de 1 a 50:');
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            exibirTexto('p', 'O número secreto é menor que este!');
        } else{
            if(chute < numeroSecreto){
            exibirTexto('p', 'O número secreto é maior que este!');
               } 
            } tentativas++;
              limparCampo()
        }
    }


function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random() * `${limiteDaLista}` + 1);
   let tamanhoDaLista = listaDeNumerosSorteados.length;
   if(tamanhoDaLista == `${limiteDaLista}`){
    listaDeNumerosSorteados = [];
   }


   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
