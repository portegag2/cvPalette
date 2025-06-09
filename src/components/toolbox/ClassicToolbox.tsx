import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { cvThemes } from "@/constants/themes";

interface ClassicToolboxProps {
  font: string;
  setFont: (value: string) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  selectedTheme: typeof cvThemes.classic[0];
  setSelectedTheme: (theme: typeof cvThemes.classic[0]) => void;
  fontOptions: Array<{ value: string; label: string; }>;
}

const ClassicToolbox = ({
  font,
  setFont,
  fontSize,
  setFontSize,
  selectedTheme,
  setSelectedTheme,
  fontOptions,
}: ClassicToolboxProps) => {
  const handleReset = () => {
    setFont("default");
    setFontSize(16);
    setSelectedTheme(cvThemes.classic[0]);
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
              value={selectedTheme.id} 
              onValueChange={(value) => {
                const theme = cvThemes.classic.find(t => t.id === value);
                if (theme) setSelectedTheme(theme);
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassicToolbox;
