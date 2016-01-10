
var renderer, scene, camera, container;
var controls;
var lastPos = 0;

$(document).ready(function() {
    // Initial setup of scene
    container = $("#viewportContainer");
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(container.width(), container.height());
    console.log(container.width() + " " + container.height());
    container.append(renderer.domElement);

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
    var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    animate();

    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize() {
        // May need to adjust the camera/projection matrices
        renderer.setSize( container.width(), container.height() );
        camera.aspect   = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    $("#viewport").on("addToViewport", function() {
        var sphereGeometry = new THREE.SphereGeometry( 10, 10, 10 ); 
        var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} ); 
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        sphere.position.set(0, 0, lastPos);
        lastPos += 15;
        scene.add(sphere);
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
    }
});