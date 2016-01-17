
var renderer, scene, camera, container;
var controls;
var lastPos = 0;
var objectsInScene = [];

$(document).ready(function() {
    // Initial setup of scene
    container = $("#viewportContainer");
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(container.width(), container.height());
    console.log(container.width() + " " + container.height());
    container.append(renderer.domElement);

    // Display grid of 100x100 for simplicity
    var size = 500 / 2, step = 50;
    var gridGeometry = new THREE.Geometry();
    for (i = -size; i <= size; i+= step) {
        gridGeometry.vertices.push( new THREE.Vector3(-size, 0, i) );
        gridGeometry.vertices.push( new THREE.Vector3(size, 0, i) );
        gridGeometry.vertices.push( new THREE.Vector3(i, 0, -size) );
        gridGeometry.vertices.push( new THREE.Vector3(i, 0, size) );
    }
    var gridMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
    var gridMesh = new THREE.Line(gridGeometry, gridMaterial, THREE.LinePieces);
    scene.add(gridMesh);
    // objectsInScene.push(gridMesh);

    // Add camera
    camera = new THREE.PerspectiveCamera(45, container.width() / container.height(), 0.1, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    scene.add(camera);

    // Give option to add more lights
    // Add default lights
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);
    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var boundingBoxHelper, boxHelper, selectedObject;

    animate();

    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize() {
        // May need to adjust the camera/projection matrices
        renderer.setSize( container.width(), container.height() );
        camera.aspect   = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    container.on("click", function(event) {
        event.preventDefault();
        mouse.set( (event.offsetX / container.width()) * 2 - 1, -((event.offsetY / container.height()) * 2 - 1));
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(objectsInScene, true);
        if (intersects.length > 0) {
            currentObject = intersects[0].object;
            if (currentObject != selectedObject) {
                if (selectedObject != undefined)
                    scene.remove(boxHelper);
                boundingBoxHelper = new THREE.BoundingBoxHelper( currentObject, 0xff0000 );
                boundingBoxHelper.update();
                boxHelper = new THREE.BoxHelper(boundingBoxHelper);
                scene.add(boxHelper);
                selectedObject = currentObject;
            }
        }
    });

    loadMTLFile = function(objFilePath, mtlFilePath, onLoaded, onProgress, onError) {
        console.log('Load mtl file!');
        var objLoader = new THREE.OBJMTLLoader();
        objLoader.load( objFilePath, mtlFilePath, onLoaded, onProgress, onError );
    }

    $("#viewport").on("addToViewport", function(event, tool) {
        onLoaded = function(toolObject) {
                toolObject.position.x = 0;
                toolObject.position.z = 0;
                toolObject.position.y = 0;
                scene.add(toolObject);
                objectsInScene.push(toolObject);
        };
        onProgress = function() {
        };
        onError = function() {
        };
        loadMTLFile(tool + '/objfile.obj', tool + '/mtlfile.mtl', onLoaded, onProgress, onError);
    });

    function animate() {
        requestAnimationFrame( animate );
        render();
        update();
    }
    function render() {
        renderer.render(scene, camera);
    }
    function update() {
        controls.update();
        if (boundingBoxHelper != undefined)
            boundingBoxHelper.update();
    }
});