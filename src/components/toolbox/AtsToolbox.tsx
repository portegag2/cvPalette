import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const fontOptions = [
  { value: "arial", label: "Arial" },
  { value: "calibri", label: "Calibri" },
  { value: "times-new-roman", label: "Times New Roman" },
  { value: "georgia", label: "Georgia" },
  { value: "tahoma", label: "Tahoma" },
  { value: "verdana", label: "Verdana" },
];

interface AtsToolboxProps {
  initialStyles: {
    font: string;
    fontSize: number;
  };
  onStyleChange: (styles: {
    font: string;
    fontSize: number;
    headingSize: number;
  }) => void;
}

const AtsToolbox = ({ initialStyles, onStyleChange }: AtsToolboxProps) => {
  const [font, setFont] = useState(initialStyles.font);
  const [fontSize, setFontSize] = useState(initialStyles.fontSize);

  // Calculate heading size based on body text size (ratio 1.33)
  const getHeadingSize = (bodySize: number) => Math.round(bodySize * 1.33 * 10) / 10;

  useEffect(() => {
    onStyleChange({ 
      font, 
      fontSize,
      headingSize: getHeadingSize(fontSize)
    });
  }, [font, fontSize, onStyleChange]);

  const handleReset = () => {
    const defaultStyles = {
      font: "arial",
      fontSize: 11,
      headingSize: 14.6
    };
    setFont(defaultStyles.font);
    setFontSize(defaultStyles.fontSize);
    onStyleChange(defaultStyles);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Formato ATS</h3>
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
              Fuente ATS Compatible
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
                Tamaño del texto
              </label>
              <span className="text-sm text-muted-foreground">
                {fontSize}pt (títulos: {getHeadingSize(fontSize)}pt)
              </span>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={([value]) => setFontSize(value)}
              min={11}
              max={12}
              step={0.1}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtsToolbox;
