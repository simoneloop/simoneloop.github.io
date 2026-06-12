import { Component } from '@angular/core';
import { LoadingService } from '../loading-service.service';
import { UtiService } from '../uti.service';
import { Project } from './project-card/project-card.component';

interface SkillCategory {
  key: string;
  chips: string[];
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  categories: SkillCategory[] = [
    { key: 'genai', chips: ['LangGraph', 'Hugging Face', 'RAG', 'FAISS', 'Embeddings', 'Claude API', 'Claude Code'] },
    { key: 'ml', chips: ['PyTorch', 'scikit-learn', 'pandas', 'NumPy', 'PySpark', 'YOLO'] },
    { key: 'fullstack', chips: ['Angular', 'Spring Boot', '.NET', 'Flutter', '.NET MAUI'] },
    { key: 'languages', chips: ['Python', 'Java', 'TypeScript', 'C#', 'Dart'] },
    { key: 'gamedev', chips: ['Unity'] },
  ];

  projects: Project[] = [
    { name: 'LUMIA Studio', descKey: 'lumia', tags: ['LLM agents', 'BDI', 'RAG'], url: 'https://github.com/manant74/unical' },
    { name: 'skills', descKey: 'skills_mp', tags: ['Claude Code', 'AI workflows'], url: 'https://github.com/simoneloop/skills' },
    { name: 'Deep Learning — Images & Text', descKey: 'dl', tags: ['CNN', 'LSTM', 'Autoencoder'], url: 'https://github.com/simoneloop/machine_deep_learning_image_text' },
    { name: 'E-TREND', descKey: 'etrend', tags: ['PySpark', 'Big Data'], url: 'https://github.com/simoneloop/BigData' },
    { name: 'SpaceX Capstone', descKey: 'spacex', tags: ['IBM DS', 'ML'], url: 'https://github.com/simoneloop/IBM-Data-Science-Capstone-SpaceX' },
    { name: 'e-archeo / Codex4D', descKey: 'live', tags: ['three.js', 'WebGL'], url: 'https://e-archeo.it' },
  ];

  constructor(public loadingService:LoadingService, public uti:UtiService){}
}
