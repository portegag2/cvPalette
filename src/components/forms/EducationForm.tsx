
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "../../types/cv";

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

const EducationForm = ({ data, onUpdate }: EducationFormProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false
    };
    onUpdate([...data, newEducation]);
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const removeEducation = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Educación</h3>
        <Button onClick={addEducation} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Añadir Educación
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((edu, index) => (
          <Card key={edu.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex justify-between items-center">
                <span>{edu.degree || "Nueva Educación"} {edu.field && `en ${edu.field}`}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Institución *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder="Universidad Politécnica de Madrid"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Título/Grado *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    placeholder="Grado"
                  />
                </div>
                <div>
                  <Label>Campo de Estudio *</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(index, 'field', e.target.value)}
                    placeholder="Ingeniería Informática"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Inicio *</Label>
                  <Input
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    placeholder="Septiembre 2018"
                  />
                </div>
                <div>
                  <Label>Fecha de Fin</Label>
                  <Input
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    placeholder="Junio 2022"
                    disabled={edu.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-edu-${index}`}
                  checked={edu.current}
                  onCheckedChange={(checked) => {
                    updateEducation(index, 'current', checked);
                    if (checked) {
                      updateEducation(index, 'endDate', '');
                    }
                  }}
                />
                <Label htmlFor={`current-edu-${index}`}>Estudiando actualmente</Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No hay educación añadida</p>
          <p className="text-sm">Haz clic en "Añadir Educación" para comenzar</p>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
