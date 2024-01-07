// Select the element's on the page: canvas, context, shake button
const canvas = document.querySelector('#etch-a-sketch');
// Select context
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
// Variable for amount for line to move
const MOVE_AMOUNT = 15;

// Choose a random starting point - take width & height, and generate a random number between 0 and the width & 0 and the height
// Make a variable called width & height from the same properties on canvas
const { width, height } = canvas;

// create random x & y starting points on canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Set up our canvas for drawing & place initial point
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;
let hue = 0; // set h in hsl to 0
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // change snake color

// Put our first point somewhere
ctx.beginPath(); // starts the drawing
ctx.moveTo(x, y); // Put it somewhere
ctx.lineTo(x, y); // invisible line to end point
ctx.stroke(); // draws line between where you started & where you stopped


// Write a draw function. Pass destructured object that creates key variable
function draw({ key }) {
    // console.log(key);
    hue += 1; // increment hue
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // update stroke style each time

    ctx.beginPath(); // start path
    ctx.moveTo(x, y); // move to correct spot
    // move x and y values depending on what the user did
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        default:
            break;
    }
    ctx.lineTo(x, y); // create line to new values
    ctx.stroke(); // draw line
};

// Write a handler for the keys - this is just a handler. We will pass off the main work to the draw function (above)
function handleKey(e) {
    // Check if an arrow key was pressed
    if (e.key.includes('Arrow')) {
        e.preventDefault(); // prevent arrows from scrolling
        draw({ key: e.key }); // pass just what we need, rather than entire e
        // console.log(e.key);
        // console.log('handling key');
    };

}

// Clear or shake function
function clearCanvas() {
    canvas.classList.add('shake'); // Add shake first
    ctx.clearRect(0, 0, width, height); // clears canvas
    canvas.addEventListener('animationend', function() {
        console.log('Done the shake');
        canvas.classList.remove('shake');
    }, 
    { once: true }
    );
}


// Listen for arrow keys on window object
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);