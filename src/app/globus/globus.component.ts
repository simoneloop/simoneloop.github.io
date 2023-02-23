import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Material } from 'three';
import { MeshPhongMaterial } from 'three';


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
  private radius=1.7;

  private mouseDown = false;
  private lastMouseX =0;
  private lastMouseY =0;

  private geometryText!: TextGeometry;
  private textMesh!:THREE.Mesh;
  private textMeshes: THREE.Mesh[] = [];
  private front= new THREE.Vector3(-0.28, -0.16, 0.95 )

  private words: string[] = [
    'Springboot',
    'Angular',
    'Spark',
    'Python',
    'ML',
    'THREE',
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
    'Cri',
    'DOGGO',
    'REST',
    'JSON',
    'NPM',
    'JQuery',
    'Pandas',
    'Pytorch',
    'BigData',
    'Selenium'

  ];

  ngOnInit() {
  }

 
  ngAfterViewInit() {
    const canvas=this.canvasRef.nativeElement
    this.renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true});
    this.renderer.setSize(this.width,this.height);
    this.scene=new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(95, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 3;
    const geometry = new THREE.BufferGeometry();
    const vertices: THREE.Vector3[] = [];
    

    const numVertices = this.words.length;

    const radius = 100;

    for (let i = 0; i < numVertices; i++) {
      const sphereCoord = new THREE.Spherical(
        radius,
        Math.acos(-1 + (2 * i + 1) / numVertices),
        Math.PI * (1 + 5 ** 0.5) * i
      );
      const vertex = new THREE.Vector3().setFromSpherical(sphereCoord);
      vertices.push(vertex);
    }
    const loader = new FontLoader();
    // Aggiungi i vertici alla geometria
    const positions = [];
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
      vertex.normalize();
      positions.push(vertex.x, vertex.y, vertex.z);
      loader.load( 'assets/font/helvetiker_regular.typeface.json',  ( font: any ) => {

        this.geometryText = new TextGeometry( this.words[i], {
          font: font,
          size: 0.15,
          height: 0.05,
          curveSegments: 30,
          
        } );
        this.geometryText.computeBoundingBox()
        const materials = [
          new THREE.MeshBasicMaterial( { color: 0xffffff} ), // front
          
        ];
        


        this.textMesh = new THREE.Mesh(this.geometryText, materials);
        this.textMesh.position.set(vertex.x*this.radius, vertex.y*this.radius, vertex.z*this.radius);
        this.textMeshes.push(this.textMesh)
        //this.textMesh.lookAt(this.camera.position);
        this.scene.add(this.textMesh);
        

        const wordPosition = new THREE.Vector3();
        this.textMesh.getWorldPosition(wordPosition);
        const distance = this.front.distanceTo(wordPosition).toFixed(2);
        const mappedDistance = this.mapRange(parseFloat(distance), 0, 2, 0, 1);
        const color = this.calculateColor(mappedDistance);
        //const material = this.textMeshes[i].material as MeshPhongMaterial[];
        materials[0].color.copy(color)
        let scale=this.calculateScale(mappedDistance)
        this.textMeshes[i].scale.set(scale,scale,scale)


        const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
        directionalLight.position.set( 10, 10, 10 );
        this.scene.add( directionalLight );
        
      } );
      
    }
    
    


    // Aumenta la dimensione del buffer di vertici
    const vertexBuffer = new Float32Array(positions.length * 3);
    vertexBuffer.set(positions);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertexBuffer, 3));
    
    const material = new THREE.MeshBasicMaterial({color: 0xffff00,wireframe:true});
    material.visible = false;

    this.sphere = new THREE.Mesh(geometry, material);

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
        this.textMeshes[i].position.set(vertex.x*this.radius-0.3,vertex.y*this.radius,vertex.z*this.radius);
      
        const wordPosition = new THREE.Vector3();
        this.textMeshes[i].getWorldPosition(wordPosition);
        const distance = this.front.distanceTo(wordPosition).toFixed(2);
        const mappedDistance = this.mapRange(parseFloat(distance), 0, 2, 0, 1);
        const color = this.calculateColor(mappedDistance);
        // Imposta il nuovo colore del materiale della parola
        if (Array.isArray(this.textMeshes[i].material)) {
          const materials = this.textMeshes[i].material as THREE.MeshBasicMaterial[];
          if (materials[0].color) {
            materials[0].color.copy(color)
            let scale=this.calculateScale(mappedDistance)
            this.textMeshes[i].scale.set(scale,scale,scale)
            if(this.textMeshes[i].id==55){
              //materials[0].color.copy(new THREE.Color(255,0,0));
              
            }        
          }
        }
        
        
      }
  
      positionAttribute.needsUpdate = true;
    }
  
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  /*private calculateColor(distance: number) {
    const color = new THREE.Color();
    color.r = (1-distance)*0.1;
    color.g = (1-distance)*0.1;
    color.b = (1-distance)*0.1;
    return color;
  }*/
  private calculateColor(distance: number) {
    const colorStart = new THREE.Color('#00FF7F');
    const colorEnd = new THREE.Color('#000080');
    const color = new THREE.Color();
  
    // calcola la percentuale di distanza
    const percentage = Math.max(0, Math.min(1, distance / 2));
  
    // calcola il valore tra 0 e 1 per lerpColors
    const t = percentage;
  
    // interpolazione lineare tra i due colori
    color.lerpColors(colorStart, colorEnd, t);
    color.offsetHSL(0, 0, 0.2);
    return color;
  }
  private calculateScale(distance: number) {
    // Esempio: la scala varia dal 2 al 1 al diminuire della distanza
    const maxDistance = 0.3; // distanza massima per la scala massima
    const maxScale = 1.6; // scala massima
    const minScale = 1; // scala minima
    const scale = maxScale - (maxScale - minScale) * Math.min(distance, maxDistance) / maxDistance;
    return scale;
  }
  private mapRange(value: number, from1: number, to1: number, from2: number, to2: number) {
    return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
  }
  



}


