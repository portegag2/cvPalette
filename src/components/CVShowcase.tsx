
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Propuesta de Diseños de CV
        </h1>
        <p className="text-muted-foreground">
          Dos estilos diferentes para currículums del sector tecnológico
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de control */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Seleccionar Diseño
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  variant={selectedDesign === "classic" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedDesign("classic")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Diseño Clásico
                </Button>
                <Button
                  variant={selectedDesign === "modern" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedDesign("modern")}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Diseño Moderno
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleExportPDF} className="w-full flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exportar PDF
                </Button>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm">Características del diseño seleccionado:</h3>
                {selectedDesign === "classic" ? (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Diseño tradicional y formal</p>
                    <p>• Tipografía serif clásica</p>
                    <p>• Layout en columna única</p>
                    <p>• Ideal para empresas tradicionales</p>
                    <p>• Énfasis en jerarquía clara</p>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Diseño contemporáneo</p>
                    <p>• Sidebar con información clave</p>
                    <p>• Uso de colores y badges</p>
                    <p>• Ideal para startups y tech</p>
                    <p>• Visual más dinámico</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vista previa */}
        <div className="lg:col-span-2">
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
      </div>
    </div>
  );
};

export default CVShowcase;
