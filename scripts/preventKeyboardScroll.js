// Prevents keyboard scrolling
window.addEventListener("keydown", function(e) {
    // space and arrow keys 32
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);