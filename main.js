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
    // Renderiza a imagem no canto superior esquerdo para mobile
    if (window.innerWidth > 768) { // Desktop
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

    // Limites para a movimentação

    // if (offsetX > 0) offsetX = 0; // Limite esquerdo
    // if (offsetY > 0) offsetY = 0; // Limite superior
    // if (offsetX < canvas.width - imageWidth) offsetX = canvas.width - imageWidth; // Limite direito
    // if (offsetY < canvas.height - imageHeight) offsetY = canvas.height - imageHeight; // Limite inferior

    if (window.innerWidth <= 768) { // Para mobile
        if (offsetX > 0) offsetX = 0; // Limite esquerdo
        if (offsetY > 0) offsetY = 0; // Limite superior
        if (offsetX < canvas.width - imageWidth) offsetX = canvas.width - imageWidth; // Limite direito
        if (offsetY < canvas.height - imageHeight) offsetY = canvas.height - imageHeight; // Limite inferior
    } else { // Para desktop
        if (offsetY > 0) offsetY = 0; // Limite superior
        if (offsetY < canvas.height - imageHeight) offsetY = canvas.height - imageHeight; // Limite inferior
        if (offsetX > 0) offsetX = 0; // Limite esquerdo
        if (offsetX < canvas.width - imageWidth) offsetX = canvas.width - imageWidth; // Limite direito
    }
}

// Eventos de touch para arrastar o mapa
canvas.addEventListener('mousedown', (e) => {
    dragging = true;
    dragStartX = e.clientX - offsetX;
    dragStartY = e.clientY - offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (dragging) {
        offsetX = e.clientX - dragStartX;
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
    dragStartX = e.touches[0].clientX - offsetX;
    dragStartY = e.touches[0].clientY - offsetY;
});

canvas.addEventListener('touchmove', (e) => {
    if (dragging) {
        offsetX = e.touches[0].clientX - dragStartX;
        offsetY = e.touches[0].clientY - dragStartY;
        limitMovement(); // Aplica os limites
        drawMap();
    }
});

canvas.addEventListener('touchend', () => {
    dragging = false;
});
