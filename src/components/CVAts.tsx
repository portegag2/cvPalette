import { Mail, Phone, MapPin, User } from "lucide-react";

interface CVAtsProps {
  data: any;
  styles?: {
    font: string;
    fontSize: number;
    headingSize: number;
  };
}

const CVAts = ({ data, styles = { font: 'arial', fontSize: 11, headingSize: 14.6 } }: CVAtsProps) => {
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
        <h1 style={{ fontSize: `${styles.headingSize}pt` }} className="font-bold mb-2">
          {data.datos_personales.nombre}
        </h1>
        <p className="text-lg mb-4">{data.datos_personales.rol_profesional}</p>
        <div className="space-y-1">
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
        </div>
      </header>

      {/* Resumen Profesional */}
      <section className="mb-8">
        <h2 style={{ fontSize: `${styles.headingSize}pt` }} className="font-bold mb-4 uppercase">Resumen Profesional</h2>
        <p style={{ fontSize: `${styles.fontSize}pt` }}>
          {data.perfil_profesional}
        </p>
      </section>

      {/* Experiencia Laboral */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 uppercase">Experiencia Laboral</h2>
        <div className="space-y-6">
          {data.experiencia_laboral.map((exp: any, index: number) => (
            <div key={index}>
              <h3 className="font-bold">{exp.titulo}</h3>
              <p className="font-semibold">{exp.entidad}</p>
              <p className="text-sm mb-2">{exp.fecha}</p>
              <p>{exp.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formación */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 uppercase">Formación</h2>
        <div className="space-y-4">
          {data.formacion.map((edu: any, index: number) => (
            <div key={index}>
              <h3 className="font-bold">{edu.titulo}</h3>
              <p className="font-semibold">{edu.entidad}</p>
              <p className="text-sm">{edu.fecha}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Habilidades Técnicas */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 uppercase">Habilidades Técnicas</h2>
        {data.habilidades_tecnicas.map((skill: any, index: number) => (
          <div key={index} className="space-y-2">
            <p><strong>Lenguajes de Programación:</strong> {skill.lenguaje_programacion}</p>
            <p><strong>Herramientas:</strong> {skill.herramientas}</p>
          </div>
        ))}
      </section>

      {/* Idiomas */}
      <section>
        <h2 className="text-xl font-bold mb-4 uppercase">Idiomas</h2>
        {data.idiomas.map((lang: any, index: number) => (
          <div key={index}>
            <p><strong>{lang.idioma}:</strong> {lang.nivel}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CVAts;
