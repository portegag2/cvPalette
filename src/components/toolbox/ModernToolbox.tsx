import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cvThemes } from "@/constants/themes";
import { useState, useEffect } from "react";

const fontOptions = [
  { value: "default", label: "Por defecto (Inter)" },
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "helvetica", label: "Helvetica" },
];

interface ModernToolboxProps {
  initialStyles: {
    font: string;
    fontSize: number;
    theme: typeof cvThemes.modern[0];
  };
  onStyleChange: (styles: {
    font: string;
    fontSize: number;
    theme: typeof cvThemes.modern[0];
  }) => void;
}

const ModernToolbox = ({ initialStyles, onStyleChange }: ModernToolboxProps) => {
  const [font, setFont] = useState(initialStyles.font);
  const [fontSize, setFontSize] = useState(initialStyles.fontSize);
  const [selectedTheme, setSelectedTheme] = useState(initialStyles.theme);

  // Ensure we have a valid theme
  const currentTheme = selectedTheme || cvThemes.modern[0];

  useEffect(() => {
    // Ensure we're passing the complete style object
    onStyleChange({
      font,
      fontSize,
      theme: currentTheme
    });
  }, [font, fontSize, currentTheme, onStyleChange]);

  const handleReset = () => {
    const defaultStyles = {
      font: "default",
      fontSize: 16,
      theme: cvThemes.modern[0]
    };
    setFont(defaultStyles.font);
    setFontSize(defaultStyles.fontSize);
    setSelectedTheme(defaultStyles.theme);
    onStyleChange(defaultStyles); // Directly call onStyleChange
  };

  // Update immediately when any value changes
  const handleFontChange = (value: string) => {
    setFont(value);
    onStyleChange({ font: value, fontSize, theme: currentTheme });
  };

  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
    onStyleChange({ font, fontSize: value, theme: currentTheme });
  };

  const handleThemeChange = (value: string) => {
    const theme = cvThemes.modern.find(t => t.id === value);
    if (theme) {
      setSelectedTheme(theme);
      onStyleChange({ font, fontSize, theme });
    }
  };

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
              onValueChange={handleThemeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tema" />
              </SelectTrigger>
              <SelectContent>
                {cvThemes.modern.map(theme => (
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
            <Select 
              value={font} 
              onValueChange={handleFontChange}
            >
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
              onValueChange={([value]) => handleFontSizeChange(value)}
              min={14}
              max={24}
              step={1}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernToolbox;
