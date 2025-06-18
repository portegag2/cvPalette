import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Palette, LogIn, LogOut, Edit2 } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
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
  sectionOrder: "experience-first" | "education-first";
};

const classicTheme = {
  "--background": "hsl(0 0% 100%)",
  "--foreground": "hsl(222.2 84% 4.9%)",
  "--muted": "hsl(210 40% 96.1%)",
  "--muted-foreground": "hsl(215.4 16.3% 46.9%)",
  "--border": "hsl(214.3 31.8% 91.4%)",
  "--input": "hsl(210 40% 98%)",
  "--primary": "hsl(222.2 47.4% 11.2%)",
  "--primary-foreground": "hsl(210 40% 98%)",
  "--secondary": "hsl(210 40% 96.1%)",
  "--secondary-foreground": "hsl(222.2 47.4% 11.2%)",
  "--accent": "hsl(263.4 70% 50.4%)",
  "--accent-foreground": "hsl(210 40% 98%)",
  "--destructive": "hsl(0 84.2% 60.2%)",
  "--destructive-foreground": "hsl(210 40% 98%)"
};

const cvPaletteTheme = {
  "--background": "#F9F9FB",
  "--foreground": "#2D2D2D",
  "--muted": "#E0F7FA",
  "--muted-foreground": "#607D8B",
  "--border": "#B0BEC5",
  "--input": "#F1F8FF",
  "--primary": "#00D4AA",
  "--primary-foreground": "#FFFFFF",
  "--secondary": "#E91E63",
  "--secondary-foreground": "#FFFFFF",
  "--accent": "#673AB7",
  "--accent-foreground": "#FFFFFF",
  "--destructive": "#FF5722",
  "--destructive-foreground": "#FFFFFF"
};

function hexToHSL(hex: string): string {
  // Remove the # if present
  hex = hex.replace("#", "");
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find greatest and smallest channel values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Convert to degrees and percentages
  h = Math.round(h * 360 * 10) / 10;
  s = Math.round(s * 1000) / 10;
  l = Math.round(l * 1000) / 10;

  return `${h} ${s}% ${l}%`;
}

function applyTheme(theme: Record<string, string>, isClassic = false) {
  Object.entries(theme).forEach(([key, value]) => {
    let valStr = String(value);
    if (isClassic && valStr.startsWith("hsl")) {
      // Si es el tema clásico y el valor es HSL, extrae solo los números
      valStr = valStr.match(/hsl\(([^)]+)\)/)?.[1] || valStr;
    } else if (!isClassic && valStr.startsWith("#")) {
      // Si es el tema cvPalette y el valor es HEX, conviértelo a HSL
      valStr = hexToHSL(valStr);
    }
    document.documentElement.style.setProperty(key, valStr);
  });
}

const CVShowcase = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isOriginalFormModalOpen, setIsOriginalFormModalOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"classic" | "cvpalette">("classic");

  // Aplicar tema por defecto al montar
  useEffect(() => {
    applyTheme(classicTheme, true);
  }, []);
  
  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  const [selectedDesign, setSelectedDesign] = useState<"classic" | "modern" | "ats">("classic");
  const [classicStyles, setClassicStyles] = useState<StyleConfig>({
    font: "default",
    fontSize: 16,
    theme: cvThemes.classic[0],
    sectionOrder: "experience-first" as const
  });
  const [modernStyles, setModernStyles] = useState<StyleConfig>({
    font: "default",
    fontSize: 16,
    theme: cvThemes.modern[0],
    sectionOrder: "experience-first" as const
  });
  const [atsStyles, setAtsStyles] = useState<{
    font: string;
    fontSize: number;
    headingSize: number;
    sectionOrder: "experience-first" | "education-first";
  }>({
    font: "arial",
    fontSize: 11,
    headingSize: 14.6,
    sectionOrder: "experience-first" as const
  });
  const [zoom, setZoom] = useState(100);
  const cvContainerRef = useRef<HTMLDivElement>(null);
  const [cvData, setCvData] = useState(pedroData);

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

  const handleCVUpdate = (field: string, value: string) => {
    const newData = { ...cvData };
    if (field.includes('[')) {
      // Handle array updates (e.g., experiencia_laboral[0].descripcion)
      const [arrayName, index, prop] = field.match(/(\w+)\[(\d+)\]\.(\w+)/)?.slice(1) || [];
      if (arrayName && index && prop) {
        newData[arrayName][parseInt(index)][prop] = value;
      }
    } else {
      // Handle direct property updates (e.g., perfil_profesional)
      newData[field] = value;
    }
    setCvData(newData);
  };

  const handleDeleteExperience = (index: number) => {
    const newData = { ...cvData };
    newData.experiencia_laboral = newData.experiencia_laboral.filter((_, i) => i !== index);
    setCvData(newData);
  };

  const handleRestoreExperiences = () => {
    setCvData(pedroData);
  };

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
        <div>            <div className="flex items-center gap-3 mb-2 overflow-hidden">
              <img src={Logo} alt="Logo CV Design Maker" className="h-8 w-auto flex-shrink-0" />
              <div className="flex items-center justify-between w-full">
                <img src={LogoWord} alt="CV Design Maker" className="h-[75px] w-auto min-w-0" />
                <div className="flex flex-col justify-center h-[75px] gap-1 items-start">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setActiveTheme("classic");
                      applyTheme(classicTheme, true);
                    }}
                    className={`h-[length:var(--btn-size,1.5rem)] min-h-0 px-[length:var(--btn-padding,0.5rem)] ${
                      activeTheme === "classic" ? "text-[#00D4AA]" : ""
                    }`}
                    style={{
                      ['--btn-size' as string]: window.innerWidth < 400 ? '1.25rem' : '1.5rem',
                      ['--btn-padding' as string]: window.innerWidth < 400 ? '0.25rem' : '0.5rem'
                    }}
                  >
                    <Palette className="w-[length:var(--icon-size,0.75rem)] h-[length:var(--icon-size,0.75rem)]" style={{['--icon-size' as string]: window.innerWidth < 370 ? '0.6rem' : '0.75rem'}} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setActiveTheme("cvpalette");
                      applyTheme(cvPaletteTheme, false);
                    }}
                    className={`h-[length:var(--btn-size,1.5rem)] min-h-0 px-[length:var(--btn-padding,0.5rem)] ${
                      activeTheme === "cvpalette" ? "text-[#673AB7]" : ""
                    }`}
                    style={{
                      ['--btn-size' as string]: window.innerWidth < 400 ? '1.25rem' : '1.5rem',
                      ['--btn-padding' as string]: window.innerWidth < 400 ? '0.25rem' : '0.5rem'
                    }}
                  >
                    <Palette className="w-[length:var(--icon-size,0.75rem)] h-[length:var(--icon-size,0.75rem)]" style={{['--icon-size' as string]: window.innerWidth < 370 ? '0.6rem' : '0.75rem'}} />
                  </Button>
                  <UserButton />
                </div>
              </div>
            </div>
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-muted-foreground header-description truncate">
              Estilos diferentes para ofertas diferentes.
            </p>
            <div className={`flex items-center gap-2 header-auth flex-shrink-0`}>
              {isAuthenticated && user && (
                <Link to="/myprofile">
                  <img 
                    src={user.picture} 
                    alt={user.name + ' perfil'}
                    title={user.name + ' perfil'}
                    className="w-[length:var(--icon-size,1.5rem)] h-[length:var(--icon-size,1.5rem)] rounded-full"
                    style={{ ['--icon-size' as string]: window.innerWidth < 400 ? '1.25rem' : '1.5rem' }}
                  />
                </Link>
              )}
              <Button
                onClick={() => isAuthenticated ? handleLogout() : loginWithRedirect()}
                variant="outline"
                size="sm"
                className="h-[length:var(--btn-size,1.5rem)] min-h-0 px-[length:var(--btn-padding,0.5rem)]"
                style={{ 
                  ['--btn-size' as string]: window.innerWidth < 400 ? '1.25rem' : '1.5rem',
                  ['--btn-padding' as string]: window.innerWidth < 400 ? '0.25rem' : '0.5rem'
                }}
              >
                {isAuthenticated ? 
                  <LogOut className="w-[length:var(--icon-size,0.75rem)] h-[length:var(--icon-size,0.75rem)]" style={{['--icon-size' as string]: window.innerWidth < 370 ? '0.6rem' : '0.75rem'}} /> : 
                  <LogIn className="w-[length:var(--icon-size,0.75rem)] h-[length:var(--icon-size,0.75rem)]" style={{['--icon-size' as string]: window.innerWidth < 370 ? '0.6rem' : '0.75rem'}} />
                }
              </Button>
            </div>
          </div>
        </div>
        
        <Card className="w-full lg:w-auto self-start">
          <CardContent className="py-3">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
              <div className="col-span-full lg:col-span-3 flex flex-col lg:flex-row gap-2">
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
              {calculateOptimalZoom() < 100 && (
                <div className="flex items-center mb-2">
                  <div className="flex items-center gap-2">
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
                </div>
              )}
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
                >                {selectedDesign === "ats" ? (
                  <CVAts 
                    data={cvData} 
                    styles={atsStyles}
                    onUpdate={handleCVUpdate} 
                    onDeleteExperience={handleDeleteExperience}
                    onRestoreExperiences={handleRestoreExperiences}
                    editable={true}
                  />
                ) : selectedDesign === "modern" ? (
                  <CVModern 
                    data={cvData}
                    onUpdate={handleCVUpdate} 
                    onDeleteExperience={handleDeleteExperience}
                    onRestoreExperiences={handleRestoreExperiences}
                    editable={true}
                    styles={{ sectionOrder: modernStyles.sectionOrder }}
                  />
                ) : (
                  <CVClassic 
                    data={cvData} 
                    onUpdate={handleCVUpdate} 
                    onDeleteExperience={handleDeleteExperience}
                    onRestoreExperiences={handleRestoreExperiences}
                    editable={true}
                    styles={{ sectionOrder: classicStyles.sectionOrder }}
                  />
                )}
                </div>
              </div>
            </div>
            {/* Versión para imprimir - se ocultará en pantalla pero será visible al imprimir */}
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
                  <CVAts 
                    data={cvData} 
                    styles={atsStyles}
                    editable={false}
                  />
                ) : selectedDesign === "modern" ? (
                  <CVModern 
                    data={cvData}
                    editable={false}
                    styles={{ sectionOrder: modernStyles.sectionOrder }}
                  />
                ) : (
                  <CVClassic 
                    data={cvData}
                    editable={false}
                    styles={{ sectionOrder: classicStyles.sectionOrder }}
                  />
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
