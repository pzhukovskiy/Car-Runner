import Stats from "stats.js";

const stats = new Stats();

function statsInit() {
    stats.showPanel(0);
    document.body.appendChild( stats.dom );
    stats.begin();
    stats.end();
}

export {statsInit}