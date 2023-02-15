function structure() {
    return {
        title: "LéMagnéto",
        website: "https://www.npmjs.com/package/magneteffect",
        github: "https://github.com/SuneQuist/Magnet-Effect",
        size: Math.floor(Math.random() * (250 - 100 + 1) + 100),
        svg: "lemagneto.svg",
        src: "/pages/code/le-magneto",
        thumbnail: "/images/programming/chip-01.png",
        rotate: false,
        layout: [
            {
                type: "quote",
                title: "lé magnéto",
                body: `This project is getting a little bit of special treatment since it was my first one (hence the title is in blackletter typeface, and also it's actually called magnet-effect and not lé magnéto).

                Anyway, the project is in essence a proximity effect written in plain ECMA, that makes it so, that when your mouse hovers near some text or a selected element for that matter, it snaps onto it (with an animation of course), and you can then proceed to move it around as you like (you can enable or disable draggable).`
            },
            {
                type: "code",
                language: "js",
                code: `
import { Direction } from "magneteffect";

// Call for class
const direction = new Direction();

window.addEventListener("mousemove", (e) => {
    // Set Direction
    direction.calculateDirectionX(e.screenX);
    direction.calculateDirectionY(e.screenY);

    // Will log direction
    console.log(direction.directionX, direction.directionY);
});
                `
            },
            {
                type: "quote",
                title: "Why it doesn't work anymore",
                body: `The function/property that makes this possible is quite simple as it marks the center of an element and gets us the distance from the middle of an element to any of its edges. Hence why the script actually doesn't work anymore either (the reason is that now pageX and pageY do that exact thing for you and intersect with the script).`
            },
            {
                type: "code",
                language: "js",
                code: `
moveTarget() {
    this.target.onmousemove = (e) => {
        let bounding = e.target.getBoundingClientRect();

        // Create new surrounding area
        let x = e.clientX - e.target.offsetLeft + window.pageXOffset;
        let y = e.clientY - e.target.offsetTop + window.pageYOffset;

        // New coordinate system for element (when going out in any direction from the element, it will count from 0 - 10, 0 being the element)
        this.coordsX = ((x - 0) * (10 - -10)) / (bounding.width - 0) + -10;
        this.coordsY = ((y - 0) * (10 - -10)) / (bounding.height - 0) + -10;

        e.target.style.transform = 'translate($%{this.coordsX}px, $%this.coordsY}px)';
    };

    if (this.reset) {
        this.target.onmouseleave = (e) => {
        e.target.style.transform = "translate(0px, 0px)";
        };
    }
    }
                `
            },
            {
                type: "quote-additional",
                body: `The direction is quite easy to get and the class for it is right below if you'd like to see how it's implemented.`
            },
            {
                type: "code",
                language: "js",
                code: `
class Direction {
    constructor() {
        this.directionX = "";
        this.directionY = "";
    
        this.oldX = 0;
        this.oldY = 0;
    }
    
    /**
     *
     * @param {nunber} x - Pass e.pageX (e === event)
     */
    
    calculateDirectionX(x) {
        if (x < this.oldX) {
        this.directionX = "left";
        } else {
        this.directionX = "right";
        }
    
        this.oldX = x;
    }
    
    /**
     *
     * @param {nunber} y - Pass e.pageY (e === event)
     */
    
    calculateDirectionY(y) {
        if (y < Number(this.oldY)) {
        this.directionY = "Up";
        } else {
        this.directionY = "Down";
        }
    
        this.oldY = y;
    }
    }
    
    module.exports = Direction;
                `
            },
        ]
    }
}

export default defineEventHandler(() => {
    return structure();
})