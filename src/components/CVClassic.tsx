import { Mail, Phone, MapPin, User, Edit, Trash2, RotateCcw } from "lucide-react";
import InlineEdit from "@/components/ui/inline-edit";

interface CVClassicProps {
  data: any;
  onUpdate?: (field: string, value: string) => void;
  onDeleteExperience?: (index: number) => void;
  onRestoreExperiences?: () => void;
  editable?: boolean;
  styles?: {
    sectionOrder: "experience-first" | "education-first";
  };
}

const CVClassic = ({ data, onUpdate, onDeleteExperience, onRestoreExperiences, editable, styles = { sectionOrder: "experience-first" } }: CVClassicProps) => {
  const renderExperienceSection = () => (
    <section className="mb-6">
      <div className="flex justify-between items-center border-b pb-1 mb-3">
        <h2 className="text-lg font-bold uppercase"
          style={{ 
            color: 'var(--cv-primary, #1a1a1a)',
            borderColor: 'var(--cv-accent, #2563eb)'
          }}
        >
          Experiencia Laboral
        </h2>
        {editable && onRestoreExperiences && (
          <button
            onClick={onRestoreExperiences}
            className="flex items-center gap-1 text-sm transition-colors hover:text-[var(--cv-primary)]"
            style={{ color: 'var(--cv-accent, #2563eb)' }}
            title="Restaurar experiencias"
          >
            <RotateCcw className="w-4 h-4" />
            Restaurar experiencias
          </button>
        )}
      </div>
      <div className="space-y-4">
        {data.experiencia_laboral.map((exp: any, index: number) => (
          <div key={index} className="border-l-2 border-gray-300 pl-4 relative">
            {editable && onDeleteExperience && (
              <button
                onClick={() => onDeleteExperience(index)}
                className="absolute -right-8 top-0 text-red-500 hover:text-red-700 transition-colors"
                title="Eliminar experiencia"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-900">{exp.titulo}</h3>
              <span className="text-sm text-gray-600 font-medium">{exp.fecha}</span>
            </div>
            <p className="text-gray-700 font-semibold mb-1">{exp.entidad}</p>
            {editable ? (
              <InlineEdit
                value={exp.descripcion}
                onSave={(value) => onUpdate?.(`experiencia_laboral[${index}].descripcion`, value)}
                className="relative"
                textClassName="text-gray-700"
                multiline={true}
              />
            ) : (
              <p className="text-gray-700">{exp.descripcion}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderEducationSection = () => (
    <section className="mb-6">
      <h2 className="text-lg font-bold border-b pb-1 mb-3 uppercase"
        style={{ 
          color: 'var(--cv-primary, #1a1a1a)',
          borderColor: 'var(--cv-accent, #2563eb)'
        }}
      >
        Formación
      </h2>
      <div className="space-y-3">
        {data.formacion.map((edu: any, index: number) => (
          <div key={index} className="border-l-2 border-gray-300 pl-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-900">{edu.titulo}</h3>
              <span className="text-sm text-gray-600 font-medium">{edu.fecha}</span>
            </div>
            <p className="text-gray-700 font-semibold mb-1">{edu.entidad}</p>
            {editable ? (
              <InlineEdit
                value={edu.descripcion}
                onSave={(value) => onUpdate?.(`formacion[${index}].descripcion`, value)}
                className="relative"
                textClassName="text-gray-700"
              />
            ) : (
              <p className="text-gray-700">{edu.descripcion}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div 
      id="CvClassic"
      className="bg-white p-8 w-[210mm] mx-auto shadow-lg" 
      style={{ 
        lineHeight: '1.4',
        color: 'var(--cv-primary, #1a1a1a)'
      }}
    >
      {/* Header con datos personales */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: 'var(--cv-accent, #2563eb)' }}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--cv-primary, #1a1a1a)' }}>
              {data.datos_personales.nombre}
            </h1>
            <p className="text-xl mb-4 font-medium" style={{ color: 'var(--cv-secondary, #666666)' }}>
              {data.datos_personales.rol_profesional}
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm" style={{ color: 'var(--cv-secondary, #666666)' }}>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{data.datos_personales.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{data.datos_personales.telefono}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{data.datos_personales.ciudad}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{data.datos_personales.fecha_nacimiento}</span>
              </div>
            </div>
          </div>
          
          {/* Espacio para foto */}
          <div className="ml-6">
            <div className="w-24 h-32 bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-gray-500 text-xs">
              FOTO
            </div>
          </div>
        </div>
      </header>

      {/* Resumen Profesional */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-3 uppercase"
          style={{ 
            color: 'var(--cv-primary, #1a1a1a)',
            borderColor: 'var(--cv-accent, #2563eb)'
          }}
        >
          Resumen Profesional
        </h2>
        {editable ? (
          <InlineEdit
            value={data.perfil_profesional}
            onSave={(value) => onUpdate?.('perfil_profesional', value)}
            className="relative"
            textClassName="text-gray-700"
            multiline={true}
          />
        ) : (
          <p className="text-gray-700">{data.perfil_profesional}</p>
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

      {/* Habilidades Técnicas */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-3 uppercase"
          style={{ 
            color: 'var(--cv-primary, #1a1a1a)',
            borderColor: 'var(--cv-accent, #2563eb)'
          }}
        >
          Habilidades Técnicas
        </h2>
        {data.habilidades_tecnicas.map((skill: any, index: number) => (
          <div key={index} className="space-y-2">
            <p><strong>Lenguajes de Programación:</strong> {skill.lenguaje_programacion}</p>
            <p><strong>Herramientas:</strong> {skill.herramientas}</p>
          </div>
        ))}
      </section>

      {/* Idiomas */}
      <section>
        <h2 className="text-lg font-bold border-b pb-1 mb-3 uppercase"
          style={{ 
            color: 'var(--cv-primary, #1a1a1a)',
            borderColor: 'var(--cv-accent, #2563eb)'
          }}
        >
          Idiomas
        </h2>
        {data.idiomas.map((lang: any, index: number) => (
          <div key={index}>
            <p><strong>{lang.idioma}:</strong> {lang.nivel}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CVClassic;
