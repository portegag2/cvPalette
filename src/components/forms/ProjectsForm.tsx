
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Project } from "../../types/cv";

interface ProjectsFormProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

const ProjectsForm = ({ data, onUpdate }: ProjectsFormProps) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      url: "",
      github: ""
    };
    onUpdate([...data, newProject]);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const removeProject = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  const updateTechnologies = (index: number, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(index, 'technologies', technologies);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Proyectos Destacados</h3>
        <Button onClick={addProject} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Añadir Proyecto
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((project, index) => (
          <Card key={project.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex justify-between items-center">
                <span>{project.name || "Nuevo Proyecto"}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nombre del Proyecto *</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  placeholder="Mi Aplicación Web"
                />
              </div>

              <div>
                <Label>Descripción *</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  placeholder="Describe el proyecto, su propósito y tus contribuciones..."
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label>Tecnologías utilizadas *</Label>
                <Input
                  value={project.technologies.join(', ')}
                  onChange={(e) => updateTechnologies(index, e.target.value)}
                  placeholder="React, Node.js, MongoDB, Docker"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separa las tecnologías con comas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>URL del Proyecto</Label>
                  <Input
                    value={project.url || ""}
                    onChange={(e) => updateProject(index, 'url', e.target.value)}
                    placeholder="https://mi-proyecto.com"
                  />
                </div>
                <div>
                  <Label>GitHub</Label>
                  <Input
                    value={project.github || ""}
                    onChange={(e) => updateProject(index, 'github', e.target.value)}
                    placeholder="https://github.com/usuario/proyecto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No hay proyectos añadidos</p>
          <p className="text-sm">Haz clic en "Añadir Proyecto" para comenzar</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
