import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';

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

  private width=350;
  private height=350;
  private radius=3;

  private mouseDown = false;
  private lastMouseX =0;
  private lastMouseY =0;

  private words: string[] = [
    'Alba',
    'Ambiente',
    'Amore',
    'Anima',
    'Aurora',
    'Avventura',
    'Bellezza',
    'Buonumore',
    'Calma',
    'Cambiamento',
    'Canto',
    'Capolavoro',
    'Carino',
    'Casa',
    'Cielo',
    'Colori',
    'Comprensione',
    'Concentrazione',
    'Coraggio',
    'Creatività',
    'Crescita',
    'Cura',
    'Curiosità',
    'Danza',
    'Dedizione',
    'Delizia',
    'Destino',
    'Dolcezza',
    'Eccitazione',
    'Educazione',
    'Eleganza',
    'Empatia',
    'Energia',
    'Entusiasmo',
    'Equilibrio',
    'Esplorazione',
    'Espressione',
    'Famiglia',
    'Fantasia',
    'Felicità',
    'Fiducia',
    'Flessibilità',
    'Forza',
    'Fortuna',
    'Gioia',
    'Giovinezza',
    'Glamour',
    'Grazia',
    'Gruppo',
    'Harmony',
    'Illuminazione',
    'Immaginazione',
    'Incanto',
    'Innovazione',
    'Intelligenza',
    'Intimità',
    'Introspezione',
    'Ironia',
    'Lavoro di squadra',
    'Libertà',
    'Luce',
    'Luminosità',
    'Magia',
    'Mente aperta',
    'Meraviglia',
    'Mistero',
    'Motivazione',
    'Musica',
    'Natura',
    'Nostalgia',
    'Ospitalità',
    'Pace',
    'Passione',
    'Perdono',
    'Poesia',
    'Potere',
    'Profondità',
    'Prospettiva',
    'Purazza',
    'Ragione',
    'Rallegrare',
    'Riconoscenza',
    'Riflessione',
    'Rigorosità',
    'Rilassamento',
    'Rinnovamento',
    'Rispetto',
    'Risveglio',
    'Romanticismo',
    'Saggezza',
    'Semplicità',
    'Serendipità',
    'Serenità',
    'Sfida',
    'Sincronicità',
    'Sofferenza',
    'Sogni',
    'Sorriso',
    'Speranza',
    'Spirito',
    'Stile',
    'Successo',
    'Sviluppo',
    'Talento',
    'Tenacia',
    'Tenerezza',
    'Tranquillità',
    'Trasformazione',
    'Umiltà',
    'Unione',
    'Virtù',
    'Visone',
    'Vitalità',
    'Vivacità',
    'Vivere'
  ];

  ngOnInit() {
  }

 
  ngAfterViewInit() {
    const canvas=this.canvasRef.nativeElement
    this.renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true});
    this.renderer.setSize(this.width,this.height);
    this.scene=new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(25, this.width / this.height, 0.1, 1000);
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
    // Aggiungi i vertici alla geometria
    const positions = [];
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
      vertex.normalize();
      positions.push(vertex.x, vertex.y, vertex.z);
      
    }

    // Aumenta la dimensione del buffer di vertici
    const vertexBuffer = new Float32Array(positions.length * 3);
    vertexBuffer.set(positions);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertexBuffer, 3));
    
    const material = new THREE.MeshBasicMaterial({color: 0xffff00,wireframe:true});
    
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
    if (this.lastMouseX && this.lastMouseY) {
        const deltaX = event.clientX - this.lastMouseX;
        const deltaY = event.clientY - this.lastMouseY;

        if (deltaX !== 0 || deltaY !== 0) {
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const axis = new THREE.Vector3(deltaY, deltaX, 0).normalize();
            const angle = distance * 0.01;

            this.sphere.rotateOnWorldAxis(axis, angle);
        }
    }

    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
}

}


