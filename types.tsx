// src/types.ts
export interface ProjectTechnology {
    name: string;
    category: "frontend" | "backend" | "database" | "devops" | "other";
  }
  
  export interface ProjectImage {
    url: string;
    alt: string;
    caption?: string;
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    type: string;
    content: string;
    imageUrl: string;
    features: string[];
    technologies: ProjectTechnology[];
    images: ProjectImage[];
    challenges: string[];
    solutions: string[];
    learnings: string[];
  }
  