import fs from 'fs';
import path from 'path';

// Define data directory path
const dataDir = path.join(process.cwd(), 'src/data');

/**
 * Generic function to read data from a JSON file
 */
export function readData<T>(filename: string): T[] {
    // Handle both dev and prod environments where file location might shift
    // but strictly following the src/data convention for now
    const filePath = path.join(dataDir, filename);

    if (!fs.existsSync(filePath)) {
        console.warn(`File ${filename} does not exist at ${filePath}, returning empty array.`);
        return [];
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
}

/**
 * Generic function to write data to a JSON file
 */
export function writeData<T>(filename: string, data: T[]): void {
    const filePath = path.join(dataDir, filename);

    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing to ${filename}:`, error);
        throw new Error(`Failed to write data to ${filename}`);
    }
}

// -- Projects Type Definitions & Helpers --

export interface Project {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    longDescription?: string;
    imageUrl: string;
    tags: string[];
    metrics: Record<string, string>;
    date: string;
    featured: boolean;
    orderIndex: number;
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
    updatedAt: string;
}

export function getProjects(filters?: {
    category?: string;
    status?: string;
    featured?: boolean;
}): Project[] {
    let projects = readData<Project>('projects.json');

    if (filters?.category) {
        projects = projects.filter(p => p.category === filters.category);
    }
    if (filters?.status) {
        projects = projects.filter(p => p.status === filters.status);
    }
    if (filters?.featured !== undefined) {
        projects = projects.filter(p => p.featured === filters.featured);
    }

    return projects.sort((a, b) => {
        // Sort by orderIndex first (if exists), then by date
        if (a.orderIndex !== undefined && b.orderIndex !== undefined && a.orderIndex !== b.orderIndex) {
            return a.orderIndex - b.orderIndex;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getProjectBySlug(slug: string): Project | undefined {
    const projects = readData<Project>('projects.json');
    return projects.find(p => p.slug === slug);
}

export function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const projects = readData<Project>('projects.json');
    const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    projects.push(newProject);
    writeData('projects.json', projects);
    return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = readData<Project>('projects.json');
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) return null;

    projects[index] = {
        ...projects[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    writeData('projects.json', projects);
    return projects[index];
}

export function deleteProject(id: string): { success: boolean } {
    let projects = readData<Project>('projects.json');
    const count = projects.length;
    projects = projects.filter(p => p.id !== id);

    if (projects.length === count) return { success: false };

    writeData('projects.json', projects);
    return { success: true };
}

// -- Case Studies Type Definitions & Helpers --

export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    client?: string;
    industry?: string;
    coverImage: string;
    thumbnail?: string;
    context?: string;
    challenge?: string;
    approach?: string;
    solution?: string;
    outcome?: string;
    metrics: Record<string, string>;
    timeline?: string;
    tools: string[];
    pdfUrl?: string | null;
    featured: boolean;
    orderIndex: number;
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
    updatedAt: string;
}

export function getCaseStudies(filters?: {
    featured?: boolean;
    status?: string;
}): CaseStudy[] {
    let caseStudies = readData<CaseStudy>('case-studies.json');

    if (filters?.status) {
        caseStudies = caseStudies.filter(cs => cs.status === filters.status);
    }
    if (filters?.featured !== undefined) {
        caseStudies = caseStudies.filter(cs => cs.featured === filters.featured);
    }

    return caseStudies.sort((a, b) => {
        if (a.orderIndex !== undefined && b.orderIndex !== undefined && a.orderIndex !== b.orderIndex) {
            return a.orderIndex - b.orderIndex;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    const caseStudies = readData<CaseStudy>('case-studies.json');
    return caseStudies.find(cs => cs.slug === slug);
}

export function createCaseStudy(caseStudy: Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>): CaseStudy {
    const caseStudies = readData<CaseStudy>('case-studies.json');
    const newCaseStudy: CaseStudy = {
        ...caseStudy,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    caseStudies.push(newCaseStudy);
    writeData('case-studies.json', caseStudies);
    return newCaseStudy;
}

export function updateCaseStudy(id: string, updates: Partial<CaseStudy>): CaseStudy | null {
    const caseStudies = readData<CaseStudy>('case-studies.json');
    const index = caseStudies.findIndex(cs => cs.id === id);

    if (index === -1) return null;

    caseStudies[index] = {
        ...caseStudies[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    writeData('case-studies.json', caseStudies);
    return caseStudies[index];
}

export function deleteCaseStudy(id: string): { success: boolean } {
    let caseStudies = readData<CaseStudy>('case-studies.json');
    const initialLength = caseStudies.length;
    caseStudies = caseStudies.filter(cs => cs.id !== id);

    if (caseStudies.length === initialLength) return { success: false };

    writeData('case-studies.json', caseStudies);
    return { success: true };
}

// -- Leadership --

export interface LeadershipPosition {
    id: string;
    title: string;
    organization: string;
    type: string;
    startDate: string;
    endDate?: string | null;
    current: boolean;
    description: string;
    achievements: { text: string; metric?: string | null }[];
    orderIndex: number;
    createdAt: string;
}

export function getLeadership(): LeadershipPosition[] {
    const leadership = readData<LeadershipPosition>('leadership.json');
    return leadership.sort((a, b) => a.orderIndex - b.orderIndex);
}

export function saveLeadership(leadership: LeadershipPosition[]): void {
    writeData('leadership.json', leadership);
}

// -- Contacts --

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    company?: string | null;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'responded';
    createdAt: string;
}

export function getContacts(): ContactSubmission[] {
    return readData<ContactSubmission>('contacts.json')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function updateContactStatus(id: string, status: ContactSubmission['status']): ContactSubmission | null {
    const contacts = readData<ContactSubmission>('contacts.json');
    const index = contacts.findIndex(c => c.id === id);

    if (index === -1) return null;

    contacts[index].status = status;
    writeData('contacts.json', contacts);
    return contacts[index];
}

export function deleteContact(id: string): { success: boolean } {
    let contacts = readData<ContactSubmission>('contacts.json');
    const initialLength = contacts.length;
    contacts = contacts.filter(c => c.id !== id);

    if (contacts.length === initialLength) return { success: false };

    writeData('contacts.json', contacts);
    return { success: true };
}
