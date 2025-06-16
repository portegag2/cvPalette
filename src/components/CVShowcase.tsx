import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Palette } from "lucide-react";
import CVClassic from "./CVClassic";
import CVModern from "./CVModern";
import CVAts from "./CVAts";
import { pedroData } from "../data/sampleData";
import { Slider } from "@/components/ui/slider";
import { cvThemes } from "@/constants/themes";
import ClassicToolbox from "./toolbox/ClassicToolbox";
import ModernToolbox from "./toolbox/ModernToolbox";
import AtsToolbox from "./toolbox/AtsToolbox";
import Logo from "@/assets/logo.svg";
import LogoWord from "@/assets/logo_word_palette.svg";
import FormModal from "./forms/Satisfaccion/FormModal";
import OriginalFormModal from "./forms/Satisfaccion/OriginalFormModal";
import UserButton from "./forms/Satisfaccion/UserButton";

type StyleConfig = {
  font: string;
  fontSize: number;
  theme: typeof cvThemes.classic[0] | typeof cvThemes.modern[0];
};

const CVShowcase = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isOriginalFormModalOpen, setIsOriginalFormModalOpen] = useState(false);
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
  const [zoom, setZoom] = useState(100);
  const cvContainerRef = useRef<HTMLDivElement>(null);

  const calculateOptimalZoom = () => {
    if (!cvContainerRef.current) return 100;
    
    const containerWidth = cvContainerRef.current.offsetWidth - 40;
    const cvWidth = 210 * 3.7795275591; // A4 width in pixels
    
    // Calculate zoom based primarily on width
    const widthZoom = (containerWidth / cvWidth) * 100;
    
    // Clamp between 25 and 100
    return Math.min(Math.max(Math.floor(widthZoom), 25), 100);
  };

  useEffect(() => {
    // Initial zoom calculation with delay to ensure proper rendering
    const timer = setTimeout(() => {
      setZoom(calculateOptimalZoom());
    }, 100);

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newZoom = calculateOptimalZoom();
        setZoom(newZoom);
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      <FormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
      />
      <OriginalFormModal 
        isOpen={isOriginalFormModalOpen} 
        onClose={() => setIsOriginalFormModalOpen(false)} 
      />
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2 overflow-hidden">
            <img src={Logo} alt="Logo CV Design Maker" className="h-8 w-auto flex-shrink-0" />
            <div className="flex items-center justify-between w-full">
              <img src={LogoWord} alt="CV Design Maker" className="h-[75px] w-auto min-w-0" />
              <UserButton />
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-muted-foreground header-description truncate">
              Estilos diferentes para ofertas diferentes.
            </p>
          </div>
        </div>
        
        <Card className="w-full lg:w-auto self-start">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 print:block print:m-0">
        <div id='cv' className="lg:col-span-3 print:w-full">
          <Card className="p-1 print:p-0 print:shadow-none print:border-0">
            <div className="flex flex-col gap-2 print:hidden">
              <div className="flex items-center gap-2 lg:hidden">
                <span className="text-sm text-muted-foreground w-14">Zoom: {zoom}%</span>
                <Slider
                  value={[zoom]}
                  onValueChange={([value]) => setZoom(value)}
                  min={25}
                  max={Math.max(calculateOptimalZoom(), 100)}
                  step={1}
                  className="w-48"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(calculateOptimalZoom())}
                  className="ml-2 text-xs"
                  title="Adjust zoom to fit the CV in the viewport"
                >
                  Fit
                </Button>
              </div>
              <div 
                ref={cvContainerRef}
                className="overflow-auto flex justify-center"
                // style={{
                //   height: 'calc(100vh - 300px)',
                // }}
              >
                <div className="print:m-0 print:p-0 print:[transform:none]"
                  style={{ 
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top center',
                    width: 'fit-content',
                    padding: '20px',
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
              </div>
            </div>
            <div className="hidden print:block">
              <div
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
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 print:hidden">
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
