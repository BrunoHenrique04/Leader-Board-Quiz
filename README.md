# LBQ
 Quiz da feira industrial 
Esse quiz foi feito para ser apresentado na feira industrial da na Etec Prof° Horacio Augusto da Silveira <br/>
Primeiro modulo iniciado em julho de 2023.
# Desenvolvimento
 No momento do desenvolvimento do quiz eu ainda não possuia conhecimentod sobre banco de dados ou manipulação de dados em desenvolvimento web. <br/>
 contudo eu ainda procurei por soluções que permitisse a criação de um quiz com um placar que se atualizasse em tempo real, 
 o funcionamento é bem simples pois o projeto foi feito muito no inicio do curso, todo o projeto foi separado em duas partes, <a href="https://github.com/AndrowDev/Leader-Board-Quiz#quiz">Quiz </a> e <a href="https://github.com/AndrowDev/Leader-Board-Quiz/#LeaderBoard">leaderboard</a> <br/>
 alêm disso foi feito uma <a href="https://github.com/AndrowDev/Leader-Board-Quiz#funções-do-console"> Area de Desenvolvedor </a> para testes e backup 
# Quiz 
O quiz foi feito com uso de Arrays, funções, e manipulação oe HTML pelo JavaScript.
# LeaderBoard 
O placar foi algo mais dificil pois como dito anteriormente eu não sabia muito de manipulação de dados, mas ainda sim através do LocalStorage consegui enviar informações entre os sites e armazenar os dados, para atualização constante do placar eu executei a função que carregar os dados a cada segundo, pois durante a apresentação nós matinhamos um site aberto em uma guia com o Quiz e em outra guia o placar no outro monitor, ambos em tela cheia.
# Funções do console
Caso você abra o console e digite ``Dev()`` você abrira uma area com algumas opções para desenvolvedor <br/>
<img src="https://github.com/AndrowDev/Leader-Board-Quiz/assets/87768787/ac032654-cccd-45ed-bec4-bca7e58e193e" width="75%" height="auto"> <br/>

caso você faça o mesmo com a area de desenvolvedor aberta ela ira se fechar <br/>
<img src="https://github.com/AndrowDev/Leader-Board-Quiz/assets/87768787/00493ebb-d67b-43e2-ba1b-2e6ab12bc6a5" width="75%" height="auto"> <br/>
na area de desenvolvedor os campos nome, tempo de conclusão, acertos e enviar não farao nada pois a linha de codigo correspondentes a eles foram comentadas ja que eles só eram necessarios para alguns testes especificos <br/>
``Download Backup`` faz download do arquivo .json com os dados de nomes, pontuação e tempo de cada pessoa. <br/>
``RECARREGAR BACKUP DA WEB`` carrega o arquivo de backup do Local Storage. <br/>
``Limpar Lista Placar`` apaga todo o placar, <strong> CUIDADO CASO VOCÊ NÃO TENHA UM BACKUP NÃO SERA POSSIVEL RECUPERAR ESSES DADOS <strong/> <br/>
``Escolher o Arquivo de Backup`` nessa opção você escolhe o arquivo .json com os dados de backup para carregar esses dados.

# Créditos 
<a href="https://github.com/AndrowDev"> Bruno Henrique </a> <br/>
<a href=""> Eduardo </a>
