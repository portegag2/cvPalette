import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cvThemes } from "@/constants/themes";

interface ModernToolboxProps {
  font: string;
  setFont: (value: string) => void;
  selectedTheme: typeof cvThemes.modern[0];
  setSelectedTheme: (theme: typeof cvThemes.modern[0]) => void;
  fontOptions: Array<{ value: string; label: string; }>;
}

const ModernToolbox = ({
  font,
  setFont,
  selectedTheme,
  setSelectedTheme,
  fontOptions,
}: ModernToolboxProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-2">Personalización</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Tema de Color
            </label>
            <Select 
              value={selectedTheme.id} 
              onValueChange={(value) => {
                const theme = cvThemes.modern.find(t => t.id === value);
                if (theme) setSelectedTheme(theme);
              }}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernToolbox;
