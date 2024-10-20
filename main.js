const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let zoomLevel = 1; // Zoom inicial
let offsetX = 0; // Posição inicial do mapa
let offsetY = 0;
let dragging = false;
let dragStartX, dragStartY;

const mapImage = new Image();
mapImage.src = 'assets/magico.jpg'; // Usar o arquivo certo do Tiled

mapImage.onload = function() {
    // Calcular offsets iniciais para centralizar a imagem em desktop
    if (window.innerWidth > 768) { // Assumindo que 768px é o limite entre mobile e desktop
        offsetX = (canvas.width - mapImage.width * zoomLevel) / 2;
    }
    drawMap();
};

// Função para desenhar o mapa
function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(zoomLevel, zoomLevel);
    ctx.drawImage(mapImage, 0, 0);
    ctx.restore();
}

// Função para limitar o movimento da imagem
function limitMovement() {
    const imageWidth = mapImage.width * zoomLevel;
    const imageHeight = mapImage.height * zoomLevel;

    // Limites apenas para o eixo Y (vertical)
    if (offsetY > 0) offsetY = 0; // Limite superior
    if (offsetY < canvas.height - imageHeight) offsetY = canvas.height - imageHeight; // Limite inferior
}

// Eventos de touch para arrastar o mapa
canvas.addEventListener('mousedown', (e) => {
    dragging = true;
    dragStartY = e.clientY - offsetY; // Apenas Y para movimentação
});

canvas.addEventListener('mousemove', (e) => {
    if (dragging) {
        offsetY = e.clientY - dragStartY;
        limitMovement(); // Aplica os limites
        drawMap();
    }
});

canvas.addEventListener('mouseup', () => {
    dragging = false;
});

canvas.addEventListener('touchstart', (e) => {
    dragging = true;
    dragStartY = e.touches[0].clientY - offsetY; // Apenas Y para movimentação
});

canvas.addEventListener('touchmove', (e) => {
    if (dragging) {
        offsetY = e.touches[0].clientY - dragStartY;
        limitMovement(); // Aplica os limites
        drawMap();
    }
});

canvas.addEventListener('touchend', () => {
    dragging = false;
});
