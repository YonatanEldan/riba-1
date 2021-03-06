/**
 * A processing (p5) js script file for the choose a scale view.
 */
const RADIUS = 150;
const KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

var canvas;
var xCenter;
var yCenter;

function centerCanvas() {
    // var x = (windowWidth - width) / 2;
    // var y = (windowHeight - height) / 2;
    // canvas.position(x, y);
    canvas.parent('sketch-holder');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    centerCanvas();

    xCenter = windowWidth / 2;
    yCenter = windowHeight / 2;

    let angle = 360 / KEYS.length;
    let form = document.getElementById('scale-form');
    let input = form['scale'];

    let keyDivs = [];

    for (let i = 0; i < KEYS.length; i++) {
        let x = (RADIUS * Math.cos(angle * 0.0174532925 * i)) + xCenter;
        let y = (RADIUS * Math.sin(angle * 0.0174532925 * i)) + yCenter;

        let t = createDiv(KEYS[i]);
        keyDivs[i] = t;

        t.position(x, y);
        t.mousePressed(function () {
            input.value = KEYS[i];
            t.style('color', 'blue');
            for (let j = 0; j < KEYS.length; j++) {
                if (j != i) keyDivs[j].style('color', 'black');
            }
        });
    }

    let isMinorCheckbox = createCheckbox(" Make it minor");
    isMinorCheckbox.position(xCenter - 63, yCenter - 20);

    createSpan("Dièse").position(xCenter - 40, yCenter + 30);
    let dieseSelect = createSelect("Choose diese");
    dieseSelect.option("0");
    dieseSelect.option("1")
    dieseSelect.option("-1");
    dieseSelect.position(xCenter + 20, yCenter + 30);

    let submitBtn = createButton('Continue');
    submitBtn.position(xCenter - (0.028 * screen.width), yCenter + 240)
    submitBtn.mousePressed(function () {
        form.submit();
    })

    dieseSelect.changed(function () {
        form['diese'].value = dieseSelect.value();
    })

    isMinorCheckbox.changed(function () {
        form['isMinor'].checked = this.checked();
    })
}

// function draw() {
//     let angle = 360 / KEYS.length;
//
//     for (let i = 0; i < KEYS.length; i++) {
//         let x = (RADIUS * Math.cos(angle * 0.0174532925 * i)) + xCenter;
//         let y = (RADIUS * Math.sin(angle * 0.0174532925 * i)) + yCenter;
//
//         ellipse(x, y, 50, 50)
//     }
// }

function windowResized() {
    centerCanvas();
}
