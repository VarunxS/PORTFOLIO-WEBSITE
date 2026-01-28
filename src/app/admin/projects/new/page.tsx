import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
    return (
        <div>
            <h1 className="font-heading text-3xl font-bold text-navy-900 mb-8">Create New Project</h1>
            <ProjectForm />
        </div>
    );
}
