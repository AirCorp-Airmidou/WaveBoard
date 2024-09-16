const socket = io.connect();

// Déclare le contexte à l'extérieur pour qu'il soit accessible partout
let context;

function drawLine(context, x1, y1, x2, y2, color) {
    context.beginPath(); // Ajout de beginPath() pour tracer correctement les lignes
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.lineWidth = 2; // Optionnel : ajuster la largeur de la ligne
    context.stroke();
}

document.addEventListener("DOMContentLoaded", function() {
    
    var color;
    document.getElementById("1").addEventListener("click", function() {
        color = "skyblue";
    });
    document.getElementById("2").addEventListener("click", function() {
        color = "mediumpurple";
    });
    document.getElementById("3").addEventListener("click", function() {
        color = "greenyellow";
    });
    document.getElementById("4").addEventListener("click", function() {
        color = "rosybrown";
    });

    const canvas = document.getElementById("canvas");
    context = canvas.getContext("2d"); // Initialisation du contexte ici
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
    var boolDraw = false;
    var x, y, oldX, oldY;

    canvas.onmousedown = function(e) {
        boolDraw = true;
        oldX = e.clientX;
        oldY = e.clientY + 18;
    };
    
    canvas.onmouseup = function() {
        boolDraw = false;
    };

    canvas.onmousemove = function(e) {
        x = e.clientX;
        y = e.clientY + 18; // Correction des coordonnées Y
        if (boolDraw) {
            socket.emit('dessin', {
                'x1': oldX,
                'y1': oldY,
                'x2': x,
                'y2': y,
                'color': color
            });
            drawLine(context, oldX, oldY, x, y, color);
            oldX = x;
            oldY = y;
        }
    };
});

socket.on("dessin", function(data) {
    // Utilisation du même contexte global
    drawLine(context, data.x1, data.y1, data.x2, data.y2, data.color);
});
