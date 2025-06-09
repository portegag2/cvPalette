
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, Edit } from "lucide-react";
import CVForm from "./CVForm";
import CVPreview from "./CVPreview";
import { CVData } from "../types/cv";

const CVEditor = () => {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: {
      technical: [],
      languages: []
    },
    projects: []
  });

  const [activeTab, setActiveTab] = useState("edit");

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Editor de Currículum Vitae
        </h1>
        <p className="text-muted-foreground">
          Crea un CV profesional y limpio para trabajos tecnológicos
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Editar
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Vista Previa
            </TabsTrigger>
          </TabsList>
          
          <Button onClick={handleExportPDF} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar PDF
          </Button>
        </div>

        <TabsContent value="edit">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <CVForm cvData={cvData} onUpdate={setCvData} />
            </div>
            <div className="hidden lg:block">
              <Card className="p-1">
                <CVPreview data={cvData} isPreview />
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <div className="flex justify-center">
            <CVPreview data={cvData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVEditor;
