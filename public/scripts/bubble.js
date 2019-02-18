/**
 * A Bubble object. This ellipse shape bubble represents a note and
 * determined by it's (x,y) postiion and by it's diameter representing
 * the amplitutde of the note (Bigger circles = more amp).
 */
function Bubble(x, y, d, p) {
    this.x = x;
    this.y = y;
    this.diam = d;
    this.degree = p;

    // Dtermines the distance from mouse location.
    this.distX = 0;
    this.distY = 0;
    this.isPressed = false;

    // Determines the coloring starting point.
    this.c = 40;
    this.col = color(this.c, 100);

    this.display = function() {
        stroke(255);
        fill(this.col);
        ellipse(this.x, this.y, this.diam);
    }

    this.pressed = function() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.diam / 2) {
            triggerAttack(this.degree);
            this.isPressed = true;
        }
    }

    this.released = function () {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.diam) {
            this.brighten();
            triggerRelease(this.degree);
            this.isPressed = false;
        }
    }

    this.brighten = function () {
        this.c += 10;
        this.col = color(this.c, 100);
    }

    this.move = function() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
    }
}
