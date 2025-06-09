
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Skills } from "../../types/cv";

interface SkillsFormProps {
  data: Skills;
  onUpdate: (data: Skills) => void;
}

const SkillsForm = ({ data, onUpdate }: SkillsFormProps) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState({ name: "", level: "" });

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onUpdate({
        ...data,
        technical: [...data.technical, newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill("");
    }
  };

  const removeTechnicalSkill = (index: number) => {
    const updated = data.technical.filter((_, i) => i !== index);
    onUpdate({ ...data, technical: updated });
  };

  const addLanguage = () => {
    if (newLanguage.name.trim() && newLanguage.level) {
      onUpdate({
        ...data,
        languages: [...data.languages, { ...newLanguage, name: newLanguage.name.trim() }]
      });
      setNewLanguage({ name: "", level: "" });
    }
  };

  const removeLanguage = (index: number) => {
    const updated = data.languages.filter((_, i) => i !== index);
    onUpdate({ ...data, languages: updated });
  };

  const languageLevels = [
    { value: "Básico", label: "Básico" },
    { value: "Intermedio", label: "Intermedio" },
    { value: "Avanzado", label: "Avanzado" },
    { value: "Nativo", label: "Nativo" }
  ];

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Habilidades Técnicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              placeholder="React, TypeScript, Python..."
              onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
            />
            <Button onClick={addTechnicalSkill} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.technical.map((skill, index) => (
              <div key={index} className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-md">
                <span className="text-sm">{skill}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTechnicalSkill(index)}
                  className="h-auto p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
          
          {data.technical.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No hay habilidades técnicas añadidas
            </p>
          )}
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Idiomas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              placeholder="Nombre del idioma"
            />
            <Select
              value={newLanguage.level}
              onValueChange={(value) => setNewLanguage({ ...newLanguage, level: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Nivel" />
              </SelectTrigger>
              <SelectContent>
                {languageLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addLanguage} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center bg-secondary px-3 py-2 rounded-md">
                <div>
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">- {lang.level}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLanguage(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          {data.languages.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No hay idiomas añadidos
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsForm;
