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
import Logo from "@/assets/logo.svg"; // Add this import at the top
import LogoWord from "@/assets/logo_word_palette.svg";

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
    <div className="container mx-auto pt-4 px-4">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img src={Logo} alt="Logo CV Design Maker" className="h-8 w-auto" />
            <img src={LogoWord} alt="CV Design Maker" className="h-[75px] w-auto" />
          </div>
          <p className="text-muted-foreground">
            Estilos diferentes para ofertas diferentes.
          </p>
        </div>
        
        <Card className="w-full lg:w-auto">
          <CardContent className="py-3">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
              <div className="col-span-3 flex flex-col lg:flex-row gap-2">
                <Button
                  variant={selectedDesign === "classic" ? "default" : "outline"}
                  className="w-full lg:flex-1 justify-start"
                  onClick={() => setSelectedDesign("classic")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Clásico
                </Button>
                <Button
                  variant={selectedDesign === "modern" ? "default" : "outline"}
                  className="w-full lg:flex-1 justify-start"
                  onClick={() => setSelectedDesign("modern")}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Moderno
                </Button>
                <Button
                  variant={selectedDesign === "ats" ? "default" : "outline"}
                  className="w-full lg:flex-1 justify-start"
                  onClick={() => setSelectedDesign("ats")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  ATS
                </Button>
              </div>
              <Button 
                onClick={handleExportPDF} 
                className="w-full flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="p-1">
            <div 
              className="max-h-[800px] overflow-y-auto"
              style={{ 
                fontFamily: selectedDesign === "ats" ? atsStyles.font : 
                          selectedDesign === "classic" ? classicStyles.font : modernStyles.font,
                fontSize: selectedDesign === "ats" ? `${atsStyles.fontSize}pt` :
                         `${selectedDesign === "classic" ? classicStyles.fontSize : modernStyles.fontSize}px`,
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
