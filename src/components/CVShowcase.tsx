import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Palette } from "lucide-react";
import CVClassic from "./CVClassic";
import CVModern from "./CVModern";
import CVAts from "./CVAts";
import { pedroData } from "../data/sampleData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cvThemes } from "@/constants/themes";
import ClassicToolbox from "./toolbox/ClassicToolbox";
import ModernToolbox from "./toolbox/ModernToolbox";
import AtsToolbox from "./toolbox/AtsToolbox";

type StyleConfig = {
  font: string;
  fontSize: number;
  theme: typeof cvThemes.classic[0] | typeof cvThemes.modern[0];
};

const CVShowcase = () => {
  const [selectedDesign, setSelectedDesign] = useState<"classic" | "modern" | "ats">("classic");
  const [classicStyles, setClassicStyles] = useState<StyleConfig>({
    font: "default",
    fontSize: 16,
    theme: cvThemes.classic[0]
  });
  const [modernStyles, setModernStyles] = useState<StyleConfig>({
    font: "default",
    fontSize: 16,
    theme: cvThemes.modern[0]
  });
  const [atsStyles, setAtsStyles] = useState({
    font: "arial",
    fontSize: 11,
    headingSize: 14.6
  });

  const handleExportPDF = () => {
    const originalTitle = document.title;
    document.title = `CV_${pedroData.datos_personales.nombre}.pdf`;
    window.print();
    document.title = originalTitle;
  };

  const currentStyles = selectedDesign === "classic" ? classicStyles : modernStyles;

  const designs = [
    { value: "classic", label: "Clásico" },
    { value: "modern", label: "Moderno" },
    { value: "ats", label: "ATS" }
  ];

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
              <Button
                variant={selectedDesign === "ats" ? "default" : "outline"}
                className="flex-1 sm:flex-initial justify-start"
                onClick={() => setSelectedDesign("ats")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Diseño ATS
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
                fontFamily: selectedDesign === "classic" ? classicStyles.font : modernStyles.font,
                fontSize: `${selectedDesign === "classic" ? classicStyles.fontSize : modernStyles.fontSize}px`,
                '--cv-primary': selectedDesign === "modern" ? modernStyles.theme.primary : classicStyles.theme.primary,
                '--cv-secondary': selectedDesign === "modern" ? modernStyles.theme.secondary : classicStyles.theme.secondary,
                '--cv-accent': selectedDesign === "modern" ? modernStyles.theme.accent : classicStyles.theme.accent,
              } as React.CSSProperties}
            >
              {selectedDesign === "ats" ? (
                <CVAts data={pedroData} styles={atsStyles} />
              ) : selectedDesign === "modern" ? (
                <CVModern data={pedroData} />
              ) : (
                <CVClassic data={pedroData} />
              )}
            </div>
          </Card>
        </div>

        {/* Toolbox section */}
        <div className="lg:col-span-1">
          {selectedDesign === "ats" ? (
            <AtsToolbox
              initialStyles={atsStyles}
              onStyleChange={setAtsStyles}
            />
          ) : selectedDesign === "classic" ? (
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
