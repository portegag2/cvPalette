
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import { CVData } from "../types/cv";

interface CVFormProps {
  cvData: CVData;
  onUpdate: (data: CVData) => void;
}

const CVForm = ({ cvData, onUpdate }: CVFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del CV</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="summary">Resumen</TabsTrigger>
            <TabsTrigger value="experience">Experiencia</TabsTrigger>
            <TabsTrigger value="education">Educación</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="mt-4">
            <PersonalInfoForm data={cvData.personalInfo} onUpdate={(personalInfo) => 
              onUpdate({ ...cvData, personalInfo })
            } />
          </TabsContent>
          
          <TabsContent value="summary" className="mt-4">
            <SummaryForm data={cvData.summary} onUpdate={(summary) => 
              onUpdate({ ...cvData, summary })
            } />
          </TabsContent>
          
          <TabsContent value="experience" className="mt-4">
            <ExperienceForm data={cvData.experience} onUpdate={(experience) => 
              onUpdate({ ...cvData, experience })
            } />
          </TabsContent>
          
          <TabsContent value="education" className="mt-4">
            <EducationForm data={cvData.education} onUpdate={(education) => 
              onUpdate({ ...cvData, education })
            } />
          </TabsContent>
          
          <TabsContent value="skills" className="mt-4">
            <SkillsForm data={cvData.skills} onUpdate={(skills) => 
              onUpdate({ ...cvData, skills })
            } />
          </TabsContent>
          
          <TabsContent value="projects" className="mt-4">
            <ProjectsForm data={cvData.projects} onUpdate={(projects) => 
              onUpdate({ ...cvData, projects })
            } />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CVForm;
