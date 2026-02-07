import { Mail, Phone, MapPin, User, Code, Briefcase, GraduationCap, Languages, EyeOff, RotateCcw } from "lucide-react";
import InlineEdit from "@/components/ui/inline-edit";
import { useAuth0 } from "@auth0/auth0-react";
import { getPhotoUrl } from "@/utils/photoImports";

interface CVModernProps {
  data: any;
  onUpdate?: (field: string, value: string) => void;
  onDeleteExperience?: (index: number) => void;
  onRestoreExperiences?: () => void;
  editable?: boolean;
  styles?: {
    sectionOrder: "experience-first" | "education-first";
  };
}

const CVModern = ({ data, onUpdate, onDeleteExperience, onRestoreExperiences, editable, styles = { sectionOrder: "experience-first" } }: CVModernProps) => {
  const { isAuthenticated } = useAuth0();
  
  const renderExperienceSection = () => (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[1.125em] font-bold text-gray-800 flex items-center gap-2">
          <div className="w-1 h-6" style={{ backgroundColor: 'var(--accent-color)' }}></div>
          <Briefcase className="w-5 h-5" />
          Experiencia Laboral
        </h2>
        {editable && onRestoreExperiences && (
          <button
            onClick={onRestoreExperiences}
            className="flex items-center gap-1 text-sm transition-colors hover:text-[var(--cv-primary)]"
            style={{ color: 'var(--accent-color)' }}
            title="Restaurar experiencias"
          >
            <RotateCcw className="w-4 h-4" />
            Restaurar experiencias
          </button>
        )}
      </div>
      <div className="space-y-4">
        {data.experiencia_laboral.map((exp: any, index: number) => (
          <>
            <div key={index} className="relative pl-6">
              <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
              <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-300"></div>
              
              <div className="bg-gray-50 p-4 rounded-lg relative">
                {editable && onDeleteExperience && (
                  <button
                    onClick={() => onDeleteExperience(index)}
                    className="absolute -right-8 top-0 text-red-500 hover:text-red-700 transition-colors"
                    title="Ocultar experiencia"
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>
                )}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[1em] font-bold text-gray-900">{exp.titulo}</h3>
                  <span className="text-[0.75em] px-2 py-1 rounded" 
                    style={{ 
                      backgroundColor: 'var(--accent-color)',
                      color: '#fff' 
                    }}>
                    {exp.fecha}
                  </span>
                </div>
                <p className="text-[0.875em] text-gray-700 font-semibold mb-2">{exp.entidad}</p>
                {editable ? (
                  <InlineEdit
                    value={exp.descripcion}
                    onSave={(value) => onUpdate?.(`experiencia_laboral[${index}].descripcion`, value)}
                    className="relative"
                    textClassName="text-[0.875em] text-gray-700 text-justify"
                    multiline={true}
                  />
                ) : (
                  <p className="text-[0.875em] text-gray-700 text-justify whitespace-pre-line">{exp.descripcion}</p>
                )}
              </div>
            </div>
            {index === 2 && <div className="page-break"></div>}
          </>
        ))}
      </div>
    </section>
  );

  const renderEducationSection = () => (
    <section>
      <h2 className="text-[1.125em] font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="w-1 h-6" style={{ backgroundColor: 'var(--accent-color)' }}></div>
        <GraduationCap className="w-5 h-5" />
        Formación
      </h2>
      <div className="space-y-3">
        {data.formacion.map((edu: any, index: number) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[1em] font-bold text-gray-900">{edu.titulo}</h3>
              <span className="text-[0.75em] text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {edu.fecha}
              </span>
            </div>
            <p className="text-[0.875em] text-gray-700 font-semibold mb-1">{edu.entidad}</p>
            <p className="text-[0.875em] text-gray-700 whitespace-pre-line">{edu.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div 
      id="CvModern"
      className="bg-white p-8 w-[210mm] mx-auto shadow-lg" 
      style={{ 
        lineHeight: '1.4',
        color: 'var(--cv-primary)',
        '--sidebar-bg': 'var(--cv-primary)',
        '--accent-color': 'var(--cv-accent)',
      } as React.CSSProperties}
    >
      <div className="flex">
        {/* Sidebar izquierda */}
        <div id='sidebar' className="w-1/3 p-6 rounded-2xl print:bg-[var(--sidebar-bg)] text-[var(--cv-secondary)]" 
          style={{ backgroundColor: 'var(--sidebar-bg)' }}>
          {/* Foto y datos básicos */}
          <div className="text-center mb-6">
            {isAuthenticated && data.datos_personales.foto ? (
              <img 
                src={getPhotoUrl(data.datos_personales.foto)}
                alt={data.datos_personales.nombre}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.className = 'w-32 h-40 bg-gray-600 mx-auto mb-4 rounded-lg flex items-center justify-center text-[var(--cv-secondary)] text-[0.75em]';
                  placeholder.textContent = 'FOTO';
                  img.parentElement?.appendChild(placeholder);
                }}
                className="w-32 h-40 mx-auto mb-4 rounded-lg object-cover"
              />
            ) : (
              <div className="w-32 h-40 bg-gray-600 mx-auto mb-4 rounded-lg flex items-center justify-center text-[var(--cv-secondary)] text-[0.75em]">
                FOTO
              </div>
            )}
            <h1 className="text-[1.25em] font-bold mb-1 text-[var(--cv-secondary)]">{data.datos_personales.nombre}</h1>
            <p className="text-[0.875em] text-[var(--cv-secondary)]">{data.datos_personales.rol_profesional}</p>
          </div>

          {/* Contacto */}
          <div className="mb-6">
            <h2 className="text-[0.875em] font-bold mb-3 uppercase tracking-wide flex items-center gap-2" style={{ color: 'var(--accent-color)' }}>
              <User className="w-4 h-4" />
              Contacto
            </h2>
            <div className="space-y-2 text-[0.75em] text-[var(--cv-secondary)]">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-blue-300" />
                <span className="break-all">{data.datos_personales.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-blue-300" />
                <span>{data.datos_personales.telefono}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-blue-300" />
                <span>{data.datos_personales.ciudad}</span>
              </div>
            </div>
          </div>

          {/* Habilidades Técnicas */}
          <div className="mb-6">
            <h2 className="text-[0.875em] font-bold mb-3 text-blue-300 uppercase tracking-wide flex items-center gap-2">
              <Code className="w-4 h-4" />
              Tecnologías
            </h2>
            <div className="space-y-3 text-[0.75em]">
              {data.habilidades_tecnicas.map((skill: any, index: number) => (
                <div key={index}>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-300 mb-1">Programación</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.lenguaje_programacion.split(', ').map((tech: string, i: number) => (
                        <span key={i} className="bg-blue-600 text-white px-2 py-1 rounded">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-1">Herramientas</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.herramientas.split(', ').map((tool: string, i: number) => (
                        <span key={i} className="bg-gray-600 text-white px-2 py-1 rounded">
                          {tool.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Idiomas */}
          <div>
            <h2 className="text-[0.875em] font-bold mb-3 text-blue-300 uppercase tracking-wide flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Idiomas
            </h2>
            <div className="space-y-2 text-[0.75em]">
              {data.idiomas.map((lang: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{lang.idioma}</span>
                  </div>
                  <p className="text-gray-300">{lang.nivel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="w-2/3 p-6">
          {/* Perfil Profesional */}
          <section className="mb-6">
            <h2 className="text-[1.125em] font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-6" style={{ backgroundColor: 'var(--accent-color)' }}></div>
              Perfil Profesional
            </h2>
            {editable ? (
              <InlineEdit
                value={data.perfil_profesional}
                onSave={(value) => onUpdate?.('perfil_profesional', value)}
                className="relative"
                textClassName="text-[0.875em] text-gray-700 text-justify leading-relaxed"
                multiline={true}
              />
            ) : (
              <p className="text-[0.875em] text-gray-700 text-justify leading-relaxed whitespace-pre-line">
                {data.perfil_profesional}
              </p>
            )}
          </section>

          {/* Experiencia y Formación en el orden especificado */}
          {styles.sectionOrder === "experience-first" ? (
            <>
              {renderExperienceSection()}
              {renderEducationSection()}
            </>
          ) : (
            <>
              {renderEducationSection()}
              {renderExperienceSection()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVModern;
