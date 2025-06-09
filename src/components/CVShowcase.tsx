import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Palette } from "lucide-react";
import CVClassic from "./CVClassic";
import CVModern from "./CVModern";
import { pedroData } from "../data/sampleData";

const CVShowcase = () => {
  const [selectedDesign, setSelectedDesign] = useState<"classic" | "modern">("classic");

  const handleExportPDF = () => {
    window.print();
  };

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

      <Card className="p-1">
        <div className="max-h-[800px] overflow-y-auto">
          {selectedDesign === "classic" ? (
            <CVClassic data={pedroData} />
          ) : (
            <CVModern data={pedroData} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default CVShowcase;
