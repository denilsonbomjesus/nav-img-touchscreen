const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

<<<<<<< HEAD
let zoomLevel = 1; // Zoom inicial
let offsetX = 0; // Posição inicial do mapa
let offsetY = 0;
=======
let zoomLevel = 5; // Zoom inicial
let offsetX = 200; // Posição inicial do mapa
let offsetY = 5;
>>>>>>> parent of ce2b3ea (zoom adequado)
let dragging = false;
let dragStartX, dragStartY;

const mapImage = new Image();
mapImage.src = 'assets/magico.jpg'; // Usar o arquivo certo do Tiled

mapImage.onload = function() {
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
        limitMapMovement(); // Limitar a movimentação
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
        limitMapMovement(); // Limitar a movimentação
        drawMap();
    }
});

canvas.addEventListener('touchend', () => {
    dragging = false;
});

// Função para limitar a movimentação do mapa
function limitMapMovement() {
    const maxX = 0;
    const maxY = 0;
    const minX = canvas.width - mapImage.width * scale;
    const minY = canvas.height - mapImage.height * scale;
  
    // Limitar o offsetX e offsetY aos limites do mapa
    if (offsetX > maxX) offsetX = maxX;
    if (offsetY > maxY) offsetY = maxY;
    if (offsetX < minX) offsetX = minX;
    if (offsetY < minY) offsetY = minY;
  }
