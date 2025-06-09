import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Palette } from "lucide-react";
import CVClassic from "./CVClassic";
import CVModern from "./CVModern";
import { pedroData } from "../data/sampleData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cvThemes } from "@/constants/themes";
import ClassicToolbox from "./toolbox/ClassicToolbox";
import ModernToolbox from "./toolbox/ModernToolbox";

const CVShowcase = () => {
  const [selectedDesign, setSelectedDesign] = useState<"classic" | "modern">("classic");
  const [classicStyles, setClassicStyles] = useState({
    font: "default",
    fontSize: 16,
    theme: cvThemes.classic[0]
  });
  const [modernStyles, setModernStyles] = useState({
    font: "default",
    fontSize: 16,
    theme: cvThemes.modern[0]
  });

  useEffect(() => {
    // Reset theme when switching designs
    if (selectedDesign === "classic") {
      setClassicStyles((prev) => ({
        ...prev,
        theme: cvThemes.classic[0]
      }));
    } else {
      setModernStyles((prev) => ({
        ...prev,
        theme: cvThemes.modern[0]
      }));
    }
  }, [selectedDesign]);

  const handleExportPDF = () => {
    window.print();
  };

  const defaultFont = selectedDesign === "classic" ? "Times New Roman" : "Inter";

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header section */}
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
              style={
                selectedDesign === "classic" 
                ? {
                    fontFamily: classicStyles.font === "default" ? "inherit" : classicStyles.font,
                    fontSize: `${classicStyles.fontSize}px`,
                    '--cv-primary': classicStyles.theme.primary,
                    '--cv-secondary': classicStyles.theme.secondary,
                    '--cv-accent': classicStyles.theme.accent,
                  }
                : {
                    fontFamily: modernStyles.font === "default" ? "inherit" : modernStyles.font,
                    fontSize: `${modernStyles.fontSize}px`,
                    '--cv-primary': modernStyles.theme.primary,
                    '--cv-secondary': modernStyles.theme.secondary,
                    '--cv-accent': modernStyles.theme.accent,
                  }
              }
            >
              {selectedDesign === "classic" ? (
                <CVClassic data={pedroData} />
              ) : (
                <CVModern data={pedroData} />
              )}
            </div>
          </Card>
        </div>

        {/* Toolbox section */}
        <div className="lg:col-span-1">
          {selectedDesign === "classic" ? (
            <ClassicToolbox
              initialStyles={classicStyles}
              onStyleChange={setClassicStyles}
            />
          ) : (
            <ModernToolbox
              initialStyles={modernStyles}
              onStyleChange={setModernStyles}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CVShowcase;
