import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image?: string;
  link?: string;
  github?: string;
  featured?: boolean;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  message: string;
  image?: string;
  rating?: number;
  createdAt: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  createdAt: string;
}

async function readJSON<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

async function writeJSON<T>(filename: string, data: T[]): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

// Projects
export async function getProjects(): Promise<Project[]> {
  return readJSON<Project>("projects.json");
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id) || null;
}

export async function createProject(project: Omit<Project, "id" | "createdAt">): Promise<Project> {
  const projects = await getProjects();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  projects.push(newProject);
  await writeJSON("projects.json", projects);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  projects[index] = { ...projects[index], ...updates };
  await writeJSON("projects.json", projects);
  return projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;

  await writeJSON("projects.json", filtered);
  return true;
}

// Blogs
export async function getBlogs(): Promise<Blog[]> {
  return readJSON<Blog>("blogs.json");
}

export async function getBlogById(id: string): Promise<Blog | null> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.id === id) || null;
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.slug === slug) || null;
}

export async function createBlog(blog: Omit<Blog, "id" | "createdAt" | "updatedAt">): Promise<Blog> {
  const blogs = await getBlogs();
  const newBlog: Blog = {
    ...blog,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  blogs.push(newBlog);
  await writeJSON("blogs.json", blogs);
  return newBlog;
}

export async function updateBlog(id: string, updates: Partial<Blog>): Promise<Blog | null> {
  const blogs = await getBlogs();
  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) return null;

  blogs[index] = {
    ...blogs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await writeJSON("blogs.json", blogs);
  return blogs[index];
}

export async function deleteBlog(id: string): Promise<boolean> {
  const blogs = await getBlogs();
  const filtered = blogs.filter((b) => b.id !== id);
  if (filtered.length === blogs.length) return false;

  await writeJSON("blogs.json", filtered);
  return true;
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return readJSON<Testimonial>("testimonials.json");
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const testimonials = await getTestimonials();
  return testimonials.find((t) => t.id === id) || null;
}

export async function createTestimonial(testimonial: Omit<Testimonial, "id" | "createdAt">): Promise<Testimonial> {
  const testimonials = await getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  testimonials.push(newTestimonial);
  await writeJSON("testimonials.json", testimonials);
  return newTestimonial;
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  const testimonials = await getTestimonials();
  const index = testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;

  testimonials[index] = { ...testimonials[index], ...updates };
  await writeJSON("testimonials.json", testimonials);
  return testimonials[index];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const testimonials = await getTestimonials();
  const filtered = testimonials.filter((t) => t.id !== id);
  if (filtered.length === testimonials.length) return false;

  await writeJSON("testimonials.json", filtered);
  return true;
}

// Experiences
export async function getExperiences(): Promise<Experience[]> {
  return readJSON<Experience>("experiences.json");
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const experiences = await getExperiences();
  return experiences.find((e) => e.id === id) || null;
}

export async function createExperience(experience: Omit<Experience, "id" | "createdAt">): Promise<Experience> {
  const experiences = await getExperiences();
  const newExperience: Experience = {
    ...experience,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  experiences.push(newExperience);
  await writeJSON("experiences.json", experiences);
  return newExperience;
}

export async function updateExperience(id: string, updates: Partial<Experience>): Promise<Experience | null> {
  const experiences = await getExperiences();
  const index = experiences.findIndex((e) => e.id === id);
  if (index === -1) return null;

  experiences[index] = { ...experiences[index], ...updates };
  await writeJSON("experiences.json", experiences);
  return experiences[index];
}

export async function deleteExperience(id: string): Promise<boolean> {
  const experiences = await getExperiences();
  const filtered = experiences.filter((e) => e.id !== id);
  if (filtered.length === experiences.length) return false;

  await writeJSON("experiences.json", filtered);
  return true;
}
