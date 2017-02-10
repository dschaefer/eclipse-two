import customElements from 'ui/customElements';
import * as THREE from 'three';

export default class Demo3DPage extends HTMLElement {
    static tag = 'two-demo3d';

    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    raycaster: THREE.Raycaster;
    renderer: THREE.WebGLRenderer;
    mouse: THREE.Vector2;
    INTERSECTED: any;
    radius: number;
    theta: number;

    connectedCallback(): void {
        this.style.backgroundColor = '#f0f0f0';
        this.radius = 100;
        this.theta = 0;

        this.mouse = new THREE.Vector2();
		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
		this.scene = new THREE.Scene();
		this.raycaster = new THREE.Raycaster();

		const light = new THREE.DirectionalLight( 0xffffff, 1 );
		light.position.set( 1, 1, 1 ).normalize();
		this.scene.add( light );

		const geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
		for ( var i = 0; i < 2000; i ++ ) {
			var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
			object.position.x = Math.random() * 800 - 400;
			object.position.y = Math.random() * 800 - 400;
			object.position.z = Math.random() * 800 - 400;
			object.rotation.x = Math.random() * 2 * Math.PI;
			object.rotation.y = Math.random() * 2 * Math.PI;
			object.rotation.z = Math.random() * 2 * Math.PI;
			object.scale.x = Math.random() + 0.5;
			object.scale.y = Math.random() + 0.5;
			object.scale.z = Math.random() + 0.5;
			this.scene.add( object );
		}

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor( 0xf0f0f0 );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.sortObjects = false;
		this.appendChild(this.renderer.domElement);
        this.addEventListener( 'mousemove', (e) => this.onDocumentMouseMove(e), false );
        window.addEventListener( 'resize', () => this.onWindowResize(), false );

        this.animate();
    }

    onDocumentMouseMove(event: MouseEvent) {
        event.preventDefault();
		this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    animate() {
        window.requestAnimationFrame( () => this.animate() );
        if (this.style.display && this.style.display !== 'none') {
		    this.render();
        }
    }

    render() {
		this.theta += 0.1;
		this.camera.position.x = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
		this.camera.position.y = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
		this.camera.position.z = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
		this.camera.lookAt( this.scene.position );
		this.camera.updateMatrixWorld( false );
		// find intersections
		this.raycaster.setFromCamera( this.mouse, this.camera );
		const intersects = this.raycaster.intersectObjects( this.scene.children );
		if ( intersects.length > 0 ) {
			if ( this.INTERSECTED != intersects[ 0 ].object ) {
				if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
				this.INTERSECTED = intersects[ 0 ].object;
				this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
				this.INTERSECTED.material.emissive.setHex( 0xff0000 );
			}
		} else {
			if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
			this.INTERSECTED = null;
		}
		this.renderer.render( this.scene, this.camera );
    }
}

customElements.define(Demo3DPage.tag, Demo3DPage);
