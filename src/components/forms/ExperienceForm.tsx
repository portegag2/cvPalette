
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Experience } from "../../types/cv";

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

const ExperienceForm = ({ data, onUpdate }: ExperienceFormProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      technologies: []
    };
    onUpdate([...data, newExperience]);
    setEditingIndex(data.length);
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const removeExperience = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onUpdate(updated);
    setEditingIndex(null);
  };

  const updateTechnologies = (index: number, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateExperience(index, 'technologies', technologies);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Experiencia Profesional</h3>
        <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Añadir Experiencia
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((exp, index) => (
          <Card key={exp.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex justify-between items-center">
                <span>{exp.position || "Nueva Experiencia"} {exp.company && `- ${exp.company}`}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Cargo/Posición *</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    placeholder="Desarrollador Frontend"
                  />
                </div>
                <div>
                  <Label>Empresa *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    placeholder="Tech Company S.L."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Inicio *</Label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    placeholder="Enero 2022"
                  />
                </div>
                <div>
                  <Label>Fecha de Fin</Label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    placeholder="Diciembre 2023"
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${index}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => {
                    updateExperience(index, 'current', checked);
                    if (checked) {
                      updateExperience(index, 'endDate', '');
                    }
                  }}
                />
                <Label htmlFor={`current-${index}`}>Trabajo actual</Label>
              </div>

              <div>
                <Label>Descripción *</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  placeholder="Describe tus responsabilidades principales y logros en este puesto..."
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label>Tecnologías utilizadas</Label>
                <Input
                  value={exp.technologies?.join(', ') || ''}
                  onChange={(e) => updateTechnologies(index, e.target.value)}
                  placeholder="React, TypeScript, Node.js, MongoDB"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separa las tecnologías con comas
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No hay experiencias añadidas</p>
          <p className="text-sm">Haz clic en "Añadir Experiencia" para comenzar</p>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
