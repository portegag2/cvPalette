import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Palette } from "lucide-react";
import CVClassic from "./CVClassic";
import CVModern from "./CVModern";
import { pedroData } from "../data/sampleData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CVShowcase = () => {
  const [selectedDesign, setSelectedDesign] = useState<"classic" | "modern">("classic");
  const [font, setFont] = useState<string>("default");

  const handleExportPDF = () => {
    window.print();
  };

  const defaultFont = selectedDesign === "classic" ? "Times New Roman" : "Inter";
  const fontOptions = selectedDesign === "classic" 
    ? [
        { value: "default", label: `Por defecto (${defaultFont})` },
        { value: "times-new-roman", label: "Times New Roman" },
        { value: "georgia", label: "Georgia" },
        { value: "garamond", label: "Garamond" },
      ]
    : [
        { value: "default", label: `Por defecto (${defaultFont})` },
        { value: "inter", label: "Inter" },
        { value: "roboto", label: "Roboto" },
        { value: "helvetica", label: "Helvetica" },
      ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Propuesta de Diseños de CV
          </h1>
          <p className="text-muted-foreground">
            Dos estilos diferentes para currículums del sector tecnológico
          </p>
        </div>
        
        <Card className="w-full md:w-auto">
          <CardContent className="py-3 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant={selectedDesign === "classic" ? "default" : "outline"}
                className="flex-1 sm:flex-initial justify-start"
                onClick={() => setSelectedDesign("classic")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Diseño Clásico
              </Button>
              <Button
                variant={selectedDesign === "modern" ? "default" : "outline"}
                className="flex-1 sm:flex-initial justify-start"
                onClick={() => setSelectedDesign("modern")}
              >
                <Palette className="w-4 h-4 mr-2" />
                Diseño Moderno
              </Button>
            </div>
            <Button onClick={handleExportPDF} className="w-full sm:w-auto flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="p-1">
            <div 
              className="max-h-[800px] overflow-y-auto"
              style={{ 
                fontFamily: font === "default" ? "inherit" : font 
              }}
            >
              {selectedDesign === "classic" ? (
                <CVClassic data={pedroData} />
              ) : (
                <CVModern data={pedroData} />
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Personalización</h3>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CVShowcase;
