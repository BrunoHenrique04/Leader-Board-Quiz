//=====================on load event============================================
const players = [];

function listenerEvents() {
    const clearList = document.getElementById("clearList");
    const enviar = document.getElementById("buttonEnviar");
    const log = document.getElementById("buttonLog");
    const recarregarBackupWebButton = document.getElementById("recarregarBackupButton");
    const backup = document.getElementById("backup");

    clearList.addEventListener("click", () => {
        localStorage.setItem('backupKey', '[]')
    })
    // backup por arquivo
    const backupLocal = document.getElementById("fileInput"); // Substitua com o ID do seu input de arquivo


    enviar.addEventListener("click", createScoreBoard);
    log.addEventListener("click", logPlayer)
    recarregarBackupWebButton.addEventListener("click", backupLoad);
    backup.addEventListener("click", function (){createBackup('1')});
    backupLocal.addEventListener("change", function() {
        backupLoadFromFile(backupLocal);
    });


    backupLoad()

    createScoreBoard()

}

setInterval(listenerEvents, 1000)
//===================== area logica criação leaderboard =====================
function createScoreBoard(){
    let i;
    /*let nome = document.getElementById("nomePlayer").value;
    let pontuacao = document.getElementById("pontuacao").value
    let tempo = document.getElementById("tempo").value*/
    let nome = localStorage.getItem('playerName')
    let pontuacao = localStorage.getItem('playerScore')
    let tempo = localStorage.getItem('playerTime')

    //Verifica se existe algum campo vazio.
    if (nome === '' || nome === null) { // se estiver vazio ele define o nome como jorgin
        nome = "JORGIN";
        pontuacao = 0;
        tempo = 99;
    }

    //Verifica se o nome ja existe no Array;
    /*let nomeInLower = nome.toLowerCase();
    for (i = 0; i < players.length; i++) {
        if (players[i].nome.toLowerCase() === nomeInLower ) {
            alert("ESTE NOME JA EXISTE");
            return
        }
    }*/

    //multiplicador de pontuação por tempo
    // QUANTO MAIOR O NUMERO QUE DIVIRIRA O parseInt(tempo) MAIS PESO O TEMPO TERA SOBRE A PONTUAÇÃO.
    let pontuacaoCalc = parseInt(pontuacao) * (210 / parseInt(tempo))

    //Cria o objeto para o novo player e o campo que ira ficar os dados do player
    let player = new PlayerCreate(nome, pontuacaoCalc, tempo);
    debugPlayer = player; // TODO: APAGAR ESSA VARIAVEL POIS ERA APENAS PARA LOG

    // local que sera exibido o Scoreboard
    let divContent = document.getElementById("PrintName");

    //caso seja o jorgin 99 não dar push
    if (nome !== "JORGIN" && pontuacao !== 0 && tempo !== 99) {
        players.push(player);
    }

    //Organizar em Ordem Decrescente.
    players.sort(function(a, b) {
        return b.pontuacao - a.pontuacao;
    });

    //Limpar o Scoreboard antes de atualizar ele
    while (divContent.firstChild) {
        divContent.removeChild(divContent.firstChild);
    }

    //Criar o Leaderboard Percorrendo o Array
    for (i = 0; i < players.length; i++) {
        let a = 0;
        a += i + 1
        // Crie o elemento principal <div> com a classe "Item"
        let item = document.createElement("div");
        item.classList.add("Item");

        // Crie o elemento <div> para a posição e defina o conteúdo
        let position = document.createElement("div");
        position.classList.add("position");
        position.classList.add("ItemChild");
        position.textContent = a + '°' ; // Substitua [posicao] pelo valor apropriado
        //TODO: AGEITAR ESSE A QUE TA COMO NUMERO E NÃO STRING, LINGUAGEM NÃO TIPADA É UMA MERDA.

        // Crie o elemento <div> para o nome e defina o conteúdo
        let name = document.createElement("div");
        name.classList.add("name");
        name.classList.add("ItemChildName");
        name.textContent = players[i].nome;

        // Crie o elemento <div> para o tempo e defina o conteúdo
        let time = document.createElement("div");
        time.classList.add("time");
        time.classList.add("ItemChild");
        time.textContent = players[i].tempo + ' Segundos';

        // Crie o elemento <div> para os acertos e defina o conteúdo
        let points = document.createElement("div");
        points.classList.add("points");
        points.classList.add("ItemChild");
        if (players[i].pontuacao == null) {
            points.textContent = 0 + ' Pontos';

        } else {
            points.textContent = players[i].pontuacao.toFixed(1) + ' Pontos';
        }
        // Anexe os elementos filhos ao elemento principal <div> com a classe "Item"
        item.appendChild(position);
        item.appendChild(name);
        item.appendChild(time);
        item.appendChild(points);

        // Anexe o elemento principal <div> com a classe "Item" ao contêiner desejado       
        divContent.appendChild(item);

        //cria um backup no armazenamento local do site
        createBackup()
    }
    // reseta os dados do local storage
    localStorage.setItem('playerName', 'JORGIN')
    localStorage.setItem('playerScore', 0 )
    localStorage.setItem('playerTime', 99)
}

//Cria o Objeto Player Com o Nome, pontuação e tempo dele.
function PlayerCreate(nome, pontuacao, tempo) {
    return {
        nome: nome,
        pontuacao: pontuacao,
        tempo: tempo,
    };
}


/* ===================================LOG DE DEV=================================== */

let debugPlayer;
function Dev() { // abre ou fecha o painel para testes
        TestPanel();
        return 'PAINEL PARA TESTES EXECUTADO';
}
Dev(123);

//painel de testes
function TestPanel() {
    let areaTeste = document.getElementById("areaTeste")
    if (areaTeste.style.display === 'none') {
        areaTeste.style.display = 'block';
    } else {
        areaTeste.style.display = 'none';
    }
}

//Cria um log com algumas informações uteis do player
function logPlayer() {
    console.log('O ARRAY PLAYERS COMTEM' + players)
    if (debugPlayer) {
        console.log('O ULTIMO PLAYER CRIADO FOI: ');
        console.log('Nome: ' + debugPlayer.nome);
        console.log('Pontuação: ' + debugPlayer.pontuacao);
        console.log('Tempo: ' + debugPlayer.tempo + ' Segundos');
    } else {
        console.log('Nenhum player foi criado recentemente.');
    }

}


/* ===================================AREA PARA BACKUP========================================*/
//cria um backup dos players
function createBackup(downloadBackupCalled) {
    const backupData = JSON.stringify(players);
    if (players[0].nome == null ) {
        console.log("player.nome nao foi criado ainda")
        return;
    }
    if (backupData === '[]') {
        console.log('NÃO HÁ DADOS NOVOS PARA SALVAR');
        return
    } else {
        console.log('BACKUP FEITO COM SUCESSO');
    }

    //console.log(downloadBackupCalled)
    //console.log(backupData)
    localStorage.setItem('backupKey', backupData);
    if (downloadBackupCalled == 1) {
        DownloadBackup();
    }
    //BAIXA UM ARQUIVO JSON COM OS DADOS DE BACKUP
    function DownloadBackup() {// BAIXA O BACKUP
        console.log("FUNCAO DOWNLOAD CHAMADA")
        //Blob tera todos os dados de backup
        const blob = new Blob([backupData], {type: 'application/json'});

        // Crie um link de download para o Blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'backup.json'; // Nome do arquivo a ser baixado

        // Adicione o link de download à página e acione um clique para iniciar o download
        document.body.appendChild(a);
        a.click();

        // Remova o link após o download
        window.URL.revokeObjectURL(url);
    }
}

function backupLoad() {
    // Recarregar o backup e adicionar os dados a players
    const backupData = localStorage.getItem('backupKey');
    const backupArray = JSON.parse(backupData);
    console.log('OS DADOS DO BACKUP SÃO : \n' + backupArray)

    if (backupArray) {

        // Limpar o array players
        players.length = 0;

        // Adicionar os dados do backup diretamente ao array players
        for (const playerData of backupArray) {
            players.push(playerData);

        }

        console.log("Backup recuperado com sucesso");

    } else {
        console.log("NÃO EXISTE UM BACKUP PARA RECUPERAR");
    }
}
    //CARREGA OS DADOS DE BACKUP DE UM ARQUIVO LOCAL
    function backupLoadFromFile(fileInput) {
        const file = fileInput.files[0]; // verifica se existe algum arquivo em file
        if (!file) {
            console.log("Nenhum arquivo selecionado.");
            return;
        }

        const reader = new FileReader(); // executa a funcao para ler arquivos

        reader.onload = function(event) { // quando ler o arquivo
            try {
                const backupArray = JSON.parse(event.target.result); //passa as informacoes do array JSON para backupArray

                if (Array.isArray(backupArray)) {
                    // Limpar o array players
                    players.length = 0;
                    //limpar memoria
                    localStorage.setItem('backupKey', null)

                    // Adicionar os dados do backup diretamente ao array players
                    for (const playerData of backupArray) {
                        players.push(playerData);
                    }

                    console.log("Backup recuperado com sucesso.");
                } else {
                    console.log("O arquivo selecionado não contém um array JSON válido.");
                }
            } catch (error) {
                console.error("Erro ao analisar o arquivo JSON:", error);
            }
        };

        reader.readAsText(file);
    }

    // quando o JS terminar de carregar cria as variaveis do listenerEvent
    document.addEventListener("DOMContentLoaded", listenerEvents);