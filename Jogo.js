var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

// Efeitos sonoros
let musica = new Audio("Stasis.mp3");
let colorSound = new Audio("Color.mp3")

// Variável que guarda as teclas sendo pressionadas
var teclas = {

}

// Tela de gameover
let img_gameOver = new Image();
img_gameOver = "GameOverScreen.png";

// Tempo para a troca das cores
var temp = 3000;

// Código da cor
var cod = 0;

// Pontuação
var score = 0;

// Imagem sapo
let img_sapo = new Image();
img_sapo.src = "sapo.png";
// Imagem background canvas
let img_canvas = new Image();
img_canvas.src = "BackgroundCanvas.png";

// Objeto sapo
let sapo = {
    x: canvas.width / 2,
    y: canvas.height / 2+50,
    largura: 110,
    altura: 65,
    velocidade: 15
}

// Objeto texto das cores
let txt = {
    cor: "white",
    texto: "Prepare-se!"
}

// Função que escolhe as cores aleatoriamente
function colorChange() {
    // Código aleatório que determina a cor
    cod = Math.floor((Math.random() * 4) + 1);
    colorSound.play();

    // Diminui o tempo a cada iteração
    if(temp > 1000) {
        temp = temp - 100;
    }

    // Verificação do código gerado
    if (cod === 1){
        txt.cor = "royalblue";
        txt.texto = "Verde";
    }
    else if(cod === 2){
        txt.cor = "firebrick";
        txt.texto = "Azul";
    }
    else if(cod === 3){
        txt.cor = "yellow";
        txt.texto = "Vermelho";
    }
    else{
        txt.cor = "lawngreen";
        txt.texto = "Amarelo";
    }

    // Função que faz o loop
    updateColorChange();
}

// Função que checa a posição de acordo com a cor determinada no momento e atribui pontuação
function checkPosition(){
    // Verde
    if(cod === 1){
        if(sapo.x + sapo.largura / 2 < 380 && sapo.y + sapo.altura / 2 < 330){
            score +=10;
            console.log("dentro do verde")
        }
        else{
            score -=10;
        }
    }
    // Azul
    else if(cod === 2){
        if(sapo.x - sapo.largura / 2 > 420 && sapo.y - sapo.altura / 2 > 370){
            score += 10;
            console.log("dentro do azul")
        }
        else{
            score -=10;
        }
    }
    // Vermelho
    else if(cod === 3) {
        if (sapo.x + sapo.largura / 2 < 380 && sapo.y - sapo.altura / 2 > 370) {
            score += 10;
            console.log("dentro do vermelho")
        }
        else{
            score -=10;
        }
    }
    // Amarelo
    else if(cod === 4){
        if(sapo.x - sapo.largura / 2 > 420 && sapo.y - sapo.altura / 2 < 330){
            score += 10;
            console.log("dentro do amarelo")
        }
        else {
            score -= 10;
        }
    }
}

// Função que faz o loop e chama a colorChange e checkPosition em um tempo determinado
function updateColorChange(){
    if(score < 0){
        return;
    }
    setTimeout(colorChange, temp);
    setTimeout(checkPosition, temp-100);
}

// Renderiza o canvas
function render(){
    move();

    // Fundo do canvas
    ctx.drawImage(img_canvas, 0, 100, canvas.width, 600);

    // Quadrados
    // Verde
    ctx.fillStyle = "lawngreen"
    ctx.fillRect(0,100,380,230)
    // Amarelo
    ctx.fillStyle = "yellow"
    ctx.fillRect(420,100,800,230)
    // Vermelho
    ctx.fillStyle = "firebrick"
    ctx.fillRect(0,370,380,600)
    // Azul
    ctx.fillStyle = "royalblue"
    ctx.fillRect(420,370,800,600)

    // Sapo
    ctx.drawImage(img_sapo, sapo.x - sapo.largura / 2, sapo.y - sapo.altura / 2, sapo.largura, sapo.altura);

    // Texto das cores e fundo
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, 100);
    ctx.fillStyle = txt.cor;
    ctx.font = "70px Bebas Neue";
    ctx.fillText(txt.texto, 10, 70);

    // Texto da pontuação
    ctx.fillStyle = "white";
    ctx.font = "50px Bebas Neue";
    ctx.fillText("Pontuação: " + score, 500, 70);
}

// Detecta as teclas que estão sendo pressionadas
document.addEventListener("keydown", function (e){
    teclas[e.keyCode] = true;
});

// Deleta objeto para parar o movimento
document.addEventListener("keyup", function (e){
    delete teclas[e.keyCode];
});

// Função que movimenta o sapo
function move(){
    if((87 in teclas) && sapo.y - sapo.altura/2 > 100){
        sapo.y -= sapo.velocidade;
    }
    else if((83 in teclas) && sapo.y + sapo.altura/2 < canvas.height){
        sapo.y += sapo.velocidade;
    }
    else if((65 in teclas) && sapo.x - sapo.largura/2 > 0){
        sapo.x -= sapo.velocidade;
    }
    else if((68 in teclas) && sapo.x + sapo.largura/2 < canvas.width){
        sapo.x += sapo.velocidade;
    }
}

// Atualiza o canvas
function update() {
    render();
    // Caso a pontuação seja menor que zero:
    if(score < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.backgroundImage = "url('GameOverScreen.png')";
        ctx.fillStyle = "darkred"
        ctx.font = " 80px Bebas Neue";
        ctx.fillText("GameOver", canvas.width/2, canvas.height/2);
        ctx.fillStyle = "white"
        ctx.font = " 25px Bebas Neue";
        ctx.fillText("Pressione F5 para recarregar a página e jogar novamente", 310, 450);
        musica.pause();
        return;
    }
    window.requestAnimationFrame(update);
}

// Função principal
function main() {
    musica.play();
    musica.loop = true;
    update();
    updateColorChange();
}
