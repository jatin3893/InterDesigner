
var renderer, scene;

$(document).ready(function() {
    // Initial setup of scene
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize($("#viewportContainer").width(), $("#viewportContainer").height());
    console.log($("#viewportContainer").width() + " " + $("#viewportContainer").height());
    $("#viewportContainer").append(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize() {
        // May need to adjust the camera/projection matrices
        renderer.setSize( $("#viewportContainer").width(), $("#viewportContainer").height() );
    }
});