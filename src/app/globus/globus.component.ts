import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';



@Component({
  selector: 'app-globus',
  templateUrl: './globus.component.html',
  styleUrls: ['./globus.component.css']
})
export class GlobusComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private sphere!: THREE.Mesh;

  private width=500;
  private height=500;
  private radius=3;

  private mouseDown = false;
  private lastMouseX =0;
  private lastMouseY =0;

  private geometryText!: TextGeometry;
  private textMesh!:THREE.Mesh;
  private textMeshes: THREE.Mesh[] = [];

  private words: string[] = [
    'Springboot',
    'Angular',
    'Spark',
    'Python',
    'IA',
    'THREE',
    'Canne',
    'Java',
    'Dart',
    'C#',
    'HTML',
    'JavaScript',
    'CSS',
    'Flutter',
    'TypeScript',
    'Unity',
    'Tensorflow',
    'Aton',

  ];

  ngOnInit() {
  }

 
  ngAfterViewInit() {
    const canvas=this.canvasRef.nativeElement
    this.renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true});
    this.renderer.setSize(this.width,this.height);
    this.scene=new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 5;
    const geometry = new THREE.BufferGeometry();
    const vertices: THREE.Vector3[] = [];
    

    const numVertices = this.words.length;

// Genera i vertici sulla sfera in modo che siano equidistanti uno dall'altro
    for (let i = 0; i < numVertices; i++) {
      const lat = Math.asin(-1 + 2 * i / (numVertices - 1));
      const lon = i % 2 === 0 ? Math.PI * ((1 + 5 ** 0.5) * (i / 2)) : Math.PI * ((2 + 5 ** 0.5) * (i / 2) - 1);
      let x = Math.cos(lon) * Math.cos(lat);
      let y = Math.sin(lon) * Math.cos(lat);
      let z = Math.sin(lat);
      x*=this.radius;
      y*=this.radius;
      z*=this.radius;
      vertices.push(new THREE.Vector3(x, y, z));
    }
    const loader = new FontLoader();
    // Aggiungi i vertici alla geometria
    const positions = [];
    const radius=1.1
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
      vertex.normalize();
      positions.push(vertex.x*radius, vertex.y*radius, vertex.z*radius);
      loader.load( 'assets/font/helvetiker_regular.typeface.json',  ( font: any ) => {

        this.geometryText = new TextGeometry( this.words[i], {
          font: font,
          size: 0.05,
          height: 0.05,
          curveSegments: 20,
          
        } );
        this.geometryText.computeBoundingBox()
        let centerOffset=0;
        if (this.geometryText && this.geometryText.boundingBox) {
          centerOffset= - 0.5 * (this.geometryText.boundingBox.max.x - this.geometryText.boundingBox.min.x);
          // Rest of the code that uses centerOffset
        } else {
          console.log("nullo")
          // Handle the case where geometryText or boundingBox is null
        }
        const materials = [
          new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
          new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
        ];
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        material.side = THREE.DoubleSide;
      
        this.textMesh = new THREE.Mesh(this.geometryText, materials);
        this.textMesh.position.set(vertex.x, vertex.y, vertex.z);
        this.textMeshes.push(this.textMesh)
        //this.textMesh.lookAt(this.camera.position);
        this.scene.add(this.textMesh);
        
        console.log(this.textMesh)
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set( 10, 10, 10 );
        this.scene.add( directionalLight );
        
      } );
      
    }
    
    
    console.log(this.scene)

    // Aumenta la dimensione del buffer di vertici
    const vertexBuffer = new Float32Array(positions.length * 3);
    vertexBuffer.set(positions);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertexBuffer, 3));
    
    const material = new THREE.MeshBasicMaterial({color: 0xffff00,wireframe:true});
    material.visible = false;

    this.sphere = new THREE.Mesh(geometry, material);

    this.sphere.position.set(0,0,0)
    this.scene.add(this.sphere);
    // Registra gli eventi del mouse
    canvas.addEventListener('mouseenter',this.onMouseEnter);
    canvas.addEventListener('mousemove', this.onMouseMove);
    
    this.animate();

  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    this.renderer.render(this.scene, this.camera);
  }

  
  private onMouseEnter=(event: MouseEvent)=>{
    this.lastMouseX=event.clientX;
    this.lastMouseY=event.clientY;
  }
  
  private onMouseMove = (event: MouseEvent) => {
    if (this.lastMouseX !== null && this.lastMouseY !== null) {
      const deltaX = event.clientX - this.lastMouseX;
      const deltaY = event.clientY - this.lastMouseY;
  
      const rotationSpeed = 0.01;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const axis = new THREE.Vector3(deltaY, deltaX, 0).normalize();
      const angle = distance * rotationSpeed;
  
      this.sphere.rotateOnWorldAxis(axis, angle);
  
      const positionAttribute = this.sphere.geometry.getAttribute('position') as THREE.BufferAttribute;
  
      for (let i = 0; i < this.textMeshes.length; i++) {
        const vertex = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
        vertex.applyQuaternion(this.sphere.quaternion);
        this.textMeshes[i].position.set(vertex.x,vertex.y,vertex.z);
      }
  
      positionAttribute.needsUpdate = true;
    }
  
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }
  



}


