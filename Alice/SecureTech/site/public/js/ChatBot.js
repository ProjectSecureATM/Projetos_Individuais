const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotBody = document.getElementById('chatbot-body');

chatbotIcon.addEventListener('click', () => {
  chatbotBody.style.display = chatbotBody.style.display === 'none' ? 'block' : 'none';
});

var estadoAtual = 'inicio';

function opcao1() {
  divOpcoes.innerHTML = `
        <div id="perguntaBot">🤖 Bot: Qual sua dúvida?</div>
        <div class="opcoes">
          <button onclick="opcao1_1()" id="margin" class="opt">Quem pode contratar os serviços?</button>
          <button onclick="opcao2_1()" class="opt">Qual o benefício do monitoramento?</button>
          <button onclick="opcao3_1()" class="opt">Como funciona o monitoramento?</button>
        </div>
        </div>
        <button id="voltarChat" onclick="voltarBot()">Voltar</button>
          `
}

function opcao1_1() {
  divOpcoes.innerHTML = `
              <div id="ContainerResposta">
              <div id="perguntaBot">🤖 Bot: Aqui esta a resposta para sua dúvida:</div><br>
              <div id="RespostaFinalBot">
              <span id="spanResposta"> Dada a natureza de nossa solução, bancos com agências físicas são os que mais se beneficiam. </span>
              </div>
              </div><br>
              <div id="btBot">  
              <button id="btNaoRespondida" onclick="TireDuvida()">Não foi respondida?</button>
                <button id="voltarChat" onclick="voltarBot()">Voltar</button>
              </div>
                `
}

function opcao2_1() {
  divOpcoes.innerHTML = `
    <div id="ContainerResposta">
    <div id="perguntaBot">🤖 Bot: Aqui esta a resposta para sua dúvida:</div><br>
    <div id="RespostaFinalBot">
    <span id="spanResposta"> O monitoramento do equipamento permite a tomada de decisões preventivas que poupam custos. </span>
    </div>
    </div><br>
    <div id="btBot">  
    <button id="btNaoRespondida" onclick="TireDuvida()">Não foi respondida?</button>
      <button id="voltarChat" onclick="voltarBot()">Voltar</button>
    </div>
      `
}

function opcao3_1() {
  divOpcoes.innerHTML = `
    <div id="ContainerResposta">
    <div id="perguntaBot">🤖 Bot: Aqui esta a resposta para sua dúvida:</div><br>
    <div id="RespostaFinalBot">
    <span id="spanResposta"> É instalado em cada máquina um software feito para constantemente capturar e enviar informações ao nosso site. </span>
    </div>
    </div><br>
    <div id="btBot">  
    <button id="btNaoRespondida" onclick="TireDuvida()">Não foi respondida?</button>
      <button id="voltarChat" onclick="voltarBot()">Voltar</button>
    </div>
          `
}

function opcao2() {
  divOpcoes.innerHTML = `
          <div id="perguntaBot">🤖 Bot: No que posso ajudar?</div>
          <br>
          <div id="containerRelatarProblema">
      <div id="NomeSobrenome">
        <div><label for="inputProblema">Primeiro nome: </label></div>
        <div id="primeiroNome"><input id="inputProblemaNome" type="text"></div>
        <div><label for="inputProblema">Último nome: </label></div>
        <div id="ultimoNome"><input id="inputProblemaNome" type="text"></div>
      </div>
  
      <div id="emailTotal">
        <div><label for="inputProblema">Email: </div>
        <div id="email-relatarProblema"></label><input id="inputProblemaEmail" type="text"></div>
      </div>
  
      <div id="tituloTotal">
        <div><label for="inputProblema">Título do problema: </label></div>
        <div id="resumoProblema"><input id="inputProblemaTitulo" type="text"></div>
      </div>
  
      <div id="detalheTotal">
        <div><label for="inputProblema">Detalhes: </label></div>
        <div id="detalheProblema"><textarea id="inputProblemaDetalhes" cols="30" rows="3"></textarea></div>
      </div>
  
      <button id="btProblema" onclick="chamar()">Enviar Problema</button>
  
    
    </div>
        
        
        <button id="voltarChat" onclick="voltarBot()">Voltar</button>
          `
    }

    function chamar(){

      var nomeVar = inputProblemaNome.value ;
      var sobrenomeVar = inputProblemaNomeF.value;
      var emailVar = inputProblemaEmail.value;
      var tituloVar = inputProblemaTitulo.value;
      var detalheVar = inputProblemaDetalhes.value;

      enviarProblema(nomeVar, sobrenomeVar,emailVar,tituloVar,detalheVar)

    }

    function enviarProblema(nomeVar, sobrenomeVar, emailVar, tituloVar, detalheVar) {
      dataHoraProblemaVar = 'CURRENT_TIMESTAMP()'
      if (nomeVar == "" || sobrenomeVar == "" || emailVar == "" || tituloVar == "" || detalheVar == "") {
        alert("Preencha os campos vazios")
      }
    else if (nomeVar != "" || sobrenomeVar != "" || emailVar != "" || tituloVar != "" || detalheVar != ""){
      if (emailVar.indexOf("@") == -1 || emailVar.endsWith(".com") == false) {
    
      alert("email inválido")
    
    
      if (emailVar.indexOf("@") == -1) {
    
      alert(`Está faltando o @`)
      }
      else if (emailVar.endsWith(".com") == false) {
        alert(`Está faltando o ".com"`)
      }
        }
      }
    
    if (nomeVar != "" || sobrenomeVar != "" || emailVar != "" || tituloVar != "" || detalheVar != "") {
      fetch("/usuarios/relatarProblema", {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         nomeServer: nomeVar,
         sobrenomeServer: sobrenomeVar,
         emailServer: emailVar,
         tituloServer: tituloVar,
         detalheServer: detalheVar,
         dataHoraProblemaServer: dataHoraProblemaVar
        })
      })
    }
  }
  


function opcao3() {
  window.location.href = 'faleConosco.html';
}



function TireDuvida() {
  window.location.href = 'faleConosco.html';
}

function voltarBot() {
  divOpcoes.innerHTML = `
    <div id="perguntaBot">🤖 Bot: Olá! Como posso ajudar?</div>
    <div class="opcoes">
      <button onclick="opcao1()" id="margin" class="opt">1- Dúvidas frequentes</button>
      <button onclick="opcao2()" class="opt">2- Relatar problema</button>
      <button onclick="opcao3()" class="opt">3- Mudança de plano</button>
    </div>
  `;
}



let chatbotAberto = false;


function abrirChatbot() {
  chatbotBody.style.display = 'block';
  chatbotAberto = true;
}


function fecharChatbot() {
  chatbotBody.style.display = 'none';
  chatbotAberto = false;
}


chatbotIcon.addEventListener('click', function () {
  if (chatbotAberto) {
    fecharChatbot();
  } else {
    abrirChatbot();
  }
});


document.addEventListener('click', function (event) {
  if (chatbotAberto && event.target !== chatbotIcon && event.target !== chatbotBody && !chatbotBody.contains(event.target)) {
    fecharChatbot();
  }
});


chatbotBody.addEventListener('click', function (event) {
  event.stopPropagation();
});