import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { cvThemes } from "@/constants/themes";

interface ClassicToolboxProps {
  initialStyles: {
    font: string;
    fontSize: number;
    theme: typeof cvThemes.classic[0];
    sectionOrder: "experience-first" | "education-first";
  };
  onStyleChange: (styles: {
    font: string;
    fontSize: number;
    theme: typeof cvThemes.classic[0];
    sectionOrder: "experience-first" | "education-first";
  }) => void;
}

const ClassicToolbox = ({ initialStyles, onStyleChange }: ClassicToolboxProps) => {
  const [font, setFont] = useState(initialStyles.font);
  const [fontSize, setFontSize] = useState(initialStyles.fontSize);
  const [selectedTheme, setSelectedTheme] = useState(initialStyles.theme);
  const [sectionOrder, setSectionOrder] = useState(initialStyles.sectionOrder);

  useEffect(() => {
    onStyleChange({ font, fontSize, theme: selectedTheme, sectionOrder });
  }, [font, fontSize, selectedTheme, sectionOrder]);

  const handleReset = () => {
    const defaultStyles = {
      font: "default",
      fontSize: 16,
      theme: cvThemes.classic[0],
      sectionOrder: "experience-first" as const
    };
    setFont(defaultStyles.font);
    setFontSize(defaultStyles.fontSize);
    setSelectedTheme(defaultStyles.theme);
    setSectionOrder(defaultStyles.sectionOrder);
    onStyleChange(defaultStyles);
  };

  const fontOptions = [
    { value: "default", label: "Por defecto (Times New Roman)" },
    { value: "times-new-roman", label: "Times New Roman" },
    { value: "georgia", label: "Georgia" },
    { value: "garamond", label: "Garamond" },
  ];

  // Ensure we have a valid theme
  const currentTheme = selectedTheme || cvThemes.classic[0];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Personalización</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            className="h-8 px-2 text-xs"
          >
            <RotateCcw className="w-3 h-3 mr-2" />
            Restaurar
          </Button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Tema de Color
            </label>
            <Select 
              value={currentTheme.id} 
              onValueChange={(value) => {
                const theme = cvThemes.classic.find(t => t.id === value) || cvThemes.classic[0];
                setSelectedTheme(theme);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tema" />
              </SelectTrigger>
              <SelectContent>
                {cvThemes.classic.map(theme => (
                  <SelectItem key={theme.id} value={theme.id}>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.secondary }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
                      </div>
                      {theme.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Tipografía
            </label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar fuente" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-muted-foreground">
                Tamaño
              </label>
              <span className="text-sm text-muted-foreground">
                {fontSize}px
              </span>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={([value]) => setFontSize(value)}
              min={12}
              max={20}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Orden de Secciones
            </label>
            <Select 
              value={sectionOrder} 
              onValueChange={(value: "experience-first" | "education-first") => setSectionOrder(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar orden" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="experience-first">
                  Experiencia → Formación
                </SelectItem>
                <SelectItem value="education-first">
                  Formación → Experiencia
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassicToolbox;
