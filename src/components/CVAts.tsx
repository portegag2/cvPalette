import { Mail, Phone, MapPin, User, Trash2, RotateCcw } from "lucide-react";
import InlineEdit from "@/components/ui/inline-edit";
import { useAuth0 } from "@auth0/auth0-react";

interface CVAtsProps {
  data: any;
  onUpdate?: (field: string, value: string) => void;
  onDeleteExperience?: (index: number) => void;
  onRestoreExperiences?: () => void;
  editable?: boolean;
  styles?: {
    font: string;
    fontSize: number;
    headingSize: number;
    sectionOrder: "experience-first" | "education-first";
  };
}

const CVAts = ({ data, onUpdate, onDeleteExperience, onRestoreExperiences, editable, styles = { font: 'arial', fontSize: 11, headingSize: 14.6, sectionOrder: "experience-first" } }: CVAtsProps) => {
  const { isAuthenticated } = useAuth0();
  
  const renderExperienceSection = () => (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 style={{ fontSize: `${styles.headingSize}pt` }} className="font-bold uppercase">Experiencia Laboral</h2>
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
      <div className="space-y-6">
        {data.experiencia_laboral.map((exp: any, index: number) => (
          <>
            <div key={index} className="relative border-b pb-2">
              {editable && onDeleteExperience && (
                <button
                  onClick={() => onDeleteExperience(index)}
                  className="absolute -right-8 top-0 text-red-500 hover:text-red-700 transition-colors"
                  title="Eliminar experiencia"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="flex flex-wrap gap-2 items-center mb-1">
                <span className="font-bold">
                  {editable ? (
                    <InlineEdit value={exp.titulo} onSave={value => onUpdate?.(`experiencia_laboral[${index}].titulo`, value)} className="inline-block" textClassName="font-bold" />
                  ) : exp.titulo}
                </span>
                <span className="text-sm text-gray-500">
                  {editable ? (
                    <InlineEdit value={exp.fecha} onSave={value => onUpdate?.(`experiencia_laboral[${index}].fecha`, value)} className="inline-block" textClassName="text-sm text-gray-500" />
                  ) : exp.fecha}
                </span>
              </div>
              <div className="mb-1">
                <span className="font-semibold">
                  {editable ? (
                    <InlineEdit value={exp.entidad} onSave={value => onUpdate?.(`experiencia_laboral[${index}].entidad`, value)} className="inline-block" textClassName="font-semibold" />
                  ) : exp.entidad}
                </span>
              </div>
              {editable ? (
                <InlineEdit
                  value={exp.descripcion}
                  onSave={value => onUpdate?.(`experiencia_laboral[${index}].descripcion`, value)}
                  className="relative"
                  textClassName="text-gray-700 text-justify"
                  multiline={true}
                />
              ) : (
                <p className="text-justify whitespace-pre-line">{exp.descripcion}</p>
              )}
            </div>
            {index === 2 && <div className="page-break"></div>}
          </>
        ))}
      </div>
    </section>
  );

  const renderEducationSection = () => (
    <section className="mb-8">
      <h2 style={{ fontSize: `${styles.headingSize}pt` }} className="font-bold mb-4 uppercase">Formación</h2>
      <div className="space-y-4">
        {data.formacion.map((edu: any, index: number) => (
          <div key={index} className="border-b pb-2">
            <div className="flex flex-wrap gap-2 items-center mb-1">
              <span className="font-bold">
                {editable ? (
                  <InlineEdit value={edu.titulo} onSave={value => onUpdate?.(`formacion[${index}].titulo`, value)} className="inline-block" textClassName="font-bold" />
                ) : edu.titulo}
              </span>
              <span className="text-sm text-gray-500">
                {editable ? (
                  <InlineEdit value={edu.fecha} onSave={value => onUpdate?.(`formacion[${index}].fecha`, value)} className="inline-block" textClassName="text-sm text-gray-500" />
                ) : edu.fecha}
              </span>
            </div>
            <div className="mb-1">
              <span className="font-semibold">
                {editable ? (
                  <InlineEdit value={edu.entidad} onSave={value => onUpdate?.(`formacion[${index}].entidad`, value)} className="inline-block" textClassName="font-semibold" />
                ) : edu.entidad}
              </span>
            </div>
            {editable ? (
              <InlineEdit
                value={edu.descripcion}
                onSave={value => onUpdate?.(`formacion[${index}].descripcion`, value)}
                className="relative"
                textClassName="text-gray-700"
                multiline={true}
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-line">{edu.descripcion}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div 
      id="CvAts"
      className="bg-white p-8 w-[210mm] mx-auto print:p-[20mm] print:w-auto print:m-0" 
      style={{ 
        lineHeight: '1.6',
        fontFamily: styles.font,
        fontSize: `${styles.fontSize}pt`,
      }}
    >
      {/* Información de contacto */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            {isAuthenticated && data.datos_personales.foto ? (
              <img 
                src={`/src/assets/profile_photo/${data.datos_personales.foto}`}
                alt={data.datos_personales.nombre}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.className = 'w-24 h-32 bg-gray-300 rounded border border-gray-300 mb-2 flex items-center justify-center text-gray-500 text-xs';
                  placeholder.textContent = 'FOTO';
                  img.parentElement?.appendChild(placeholder);
                }}
                className="w-24 h-32 object-cover rounded border border-gray-300 mb-2"
              />
            ) : (
              <div className="w-24 h-32 bg-gray-300 rounded border border-gray-300 mb-2 flex items-center justify-center text-gray-500 text-xs">
                FOTO
              </div>
            )}
          </div>
          <h1 style={{ fontSize: `${styles.headingSize}pt` }} className="font-bold mb-2">
            {editable ? (
              <InlineEdit
                value={data.datos_personales.nombre}
                onSave={value => onUpdate?.('datos_personales.nombre', value)}
                className="inline-block"
                textClassName="text-2xl font-bold"
              />
            ) : (
              data.datos_personales.nombre
            )}
          </h1>
          {editable && (
            <span className="text-xs text-gray-400">Fecha de nacimiento: <InlineEdit value={data.datos_personales.fecha_nacimiento} onSave={value => onUpdate?.('datos_personales.fecha_nacimiento', value)} className="inline-block" textClassName="text-xs text-gray-500" /></span>
          )}
        </div>
        <p className="text-lg mb-4">
          {editable ? (
            <InlineEdit
              value={data.datos_personales.rol_profesional}
              onSave={value => onUpdate?.('datos_personales.rol_profesional', value)}
              className="inline-block"
              textClassName="text-lg font-medium"
            />
          ) : (
            data.datos_personales.rol_profesional
          )}
        </p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {editable ? (
              <InlineEdit value={data.datos_personales.email} onSave={value => onUpdate?.('datos_personales.email', value)} className="inline-block" textClassName="" />
            ) : (
              <span>{data.datos_personales.email}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {editable ? (
              <InlineEdit value={data.datos_personales.telefono} onSave={value => onUpdate?.('datos_personales.telefono', value)} className="inline-block" textClassName="" />
            ) : (
              <span>{data.datos_personales.telefono}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {editable ? (
              <InlineEdit value={data.datos_personales.ciudad} onSave={value => onUpdate?.('datos_personales.ciudad', value)} className="inline-block" textClassName="" />
            ) : (
              <span>{data.datos_personales.ciudad}</span>
            )}
          </div>
        </div>
      </header>

      {/* Resumen Profesional */}
      <section className="mb-8">
        <h2 style={{ fontSize: `${styles.headingSize}pt` }} className="font-bold mb-4 uppercase">Resumen Profesional</h2>
        {editable ? (
          <InlineEdit
            value={data.perfil_profesional}
            onSave={(value) => onUpdate?.('perfil_profesional', value)}
            className="relative"
            textClassName="text-gray-700 text-justify"
            multiline={true}
          />
        ) : (
          <p style={{ fontSize: `${styles.fontSize}pt` }} className="text-justify whitespace-pre-line">
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

      {/* Habilidades Técnicas */}
      <section className="mb-8">
        <h2 style={{ fontSize: `${styles.headingSize}pt` }} className="font-bold mb-4 uppercase">Habilidades Técnicas</h2>
        {data.habilidades_tecnicas.map((skill: any, index: number) => (
          <div key={index} className="space-y-2">
            <p><strong>Lenguajes de Programación:</strong> {editable ? (
              <InlineEdit value={skill.lenguaje_programacion} onSave={value => onUpdate?.(`habilidades_tecnicas[${index}].lenguaje_programacion`, value)} className="inline-block" textClassName="" />
            ) : skill.lenguaje_programacion}</p>
            <p><strong>Herramientas:</strong> {editable ? (
              <InlineEdit value={skill.herramientas} onSave={value => onUpdate?.(`habilidades_tecnicas[${index}].herramientas`, value)} className="inline-block" textClassName="" />
            ) : skill.herramientas}</p>
          </div>
        ))}
      </section>

      {/* Idiomas */}
      <section>
        <h2 style={{ fontSize: `${styles.headingSize}pt` }} className="font-bold mb-4 uppercase">Idiomas</h2>
        {data.idiomas.map((lang: any, index: number) => (
          <div key={index}>
            <p>
              <strong>{editable ? (
                <InlineEdit value={lang.idioma} onSave={value => onUpdate?.(`idiomas[${index}].idioma`, value)} className="inline-block" textClassName="font-bold" />
              ) : lang.idioma}:</strong> {editable ? (
                <InlineEdit value={lang.nivel} onSave={value => onUpdate?.(`idiomas[${index}].nivel`, value)} className="inline-block" textClassName="" />
              ) : lang.nivel}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CVAts;
