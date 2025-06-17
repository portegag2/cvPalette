import { Mail, Phone, MapPin, User, Edit } from "lucide-react";
import InlineEdit from "@/components/ui/inline-edit";

interface CVClassicProps {
  data: any;
  onUpdate?: (field: string, value: string) => void;
  editable?: boolean;
}

const CVClassic = ({ data, onUpdate, editable }: CVClassicProps) => {
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

      {/* Perfil Profesional */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-3 uppercase"
          style={{ 
            color: 'var(--cv-primary, #1a1a1a)',
            borderColor: 'var(--cv-accent, #2563eb)'
          }}
        >
          Perfil Profesional
        </h2>
        {editable ? (
          <InlineEdit
            value={data.perfil_profesional}
            onSave={(value) => onUpdate?.('perfil_profesional', value)}
            className="relative"
            textClassName="text-justify leading-relaxed"
            multiline={true}
          />
        ) : (
          <p style={{ color: 'var(--cv-secondary, #666666)' }} className="text-justify leading-relaxed">
            {data.perfil_profesional}
          </p>
        )}
      </section>

      {/* Experiencia Laboral */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-3 uppercase"
          style={{ 
            color: 'var(--cv-primary, #1a1a1a)',
            borderColor: 'var(--cv-accent, #2563eb)'
          }}
        >
          Experiencia Laboral
        </h2>
        <div className="space-y-4">
          {data.experiencia_laboral.map((exp: any, index: number) => (
            <div key={index} className="group relative border-l-2 border-gray-300 pl-4">
              
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900">{exp.titulo}</h3>
                <span className="text-sm text-gray-600 font-medium">{exp.fecha}</span>
              </div>
              <p className="text-gray-700 font-semibold mb-2">{exp.entidad}</p>
              {editable ? (
                <InlineEdit
                  value={exp.descripcion}
                  onSave={(value) => onUpdate?.(`experiencia_laboral[${index}].descripcion`, value)}
                  className="relative"
                  textClassName="text-gray-700 text-justify"
                  multiline={true}
                />
              ) : (
                <p className="text-gray-700 text-justify">{exp.descripcion}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Formación */}
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

      {/* Habilidades Técnicas */}
      <section className="mb-4">
        <h2 className="text-lg font-bold border-b pb-1 mb-3 uppercase"
          style={{ 
            color: 'var(--cv-primary, #1a1a1a)',
            borderColor: 'var(--cv-accent, #2563eb)'
          }}
        >
          Habilidades Técnicas
        </h2>
        <div className="space-y-2">
          {data.habilidades_tecnicas.map((skill: any, index: number) => (
            <div key={index}>
              <div className="mb-2">
                <h3 className="font-semibold text-gray-900 mb-1">Lenguajes de Programación:</h3>
                <p className="text-gray-700">{skill.lenguaje_programacion}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Herramientas:</h3>
                <p className="text-gray-700">{skill.herramientas}</p>
              </div>
            </div>
          ))}
        </div>
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
        <div className="space-y-2">
          {data.idiomas.map((lang: any, index: number) => (
            <div key={index} className="flex justify-between">
              <span className="font-semibold text-gray-900">{lang.idioma}:</span>
              <span className="text-gray-700">{lang.nivel}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CVClassic;
