
import { Mail, Phone, MapPin, User, Code, Briefcase, GraduationCap, Languages } from "lucide-react";

interface CVModernProps {
  data: any;
}

const CVModern = ({ data }: CVModernProps) => {
  return (
    <div className="bg-white text-black shadow-lg w-[210mm] min-h-[297mm] mx-auto print:shadow-none print:m-0" style={{ fontSize: '12px', lineHeight: '1.4' }}>
      <div className="flex">
        {/* Sidebar izquierda */}
        <div className="w-1/3 bg-gray-800 text-white p-6">
          {/* Foto y datos básicos */}
          <div className="text-center mb-6">
            <div className="w-32 h-40 bg-gray-600 mx-auto mb-4 rounded-lg flex items-center justify-center text-gray-300 text-xs">
              FOTO
            </div>
            <h1 className="text-xl font-bold mb-1">{data.datos_personales.nombre}</h1>
            <p className="text-sm text-gray-300">{data.datos_personales.rol_profesional}</p>
          </div>

          {/* Contacto */}
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-3 text-blue-300 uppercase tracking-wide flex items-center gap-2">
              <User className="w-4 h-4" />
              Contacto
            </h2>
            <div className="space-y-2 text-xs">
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
            <h2 className="text-sm font-bold mb-3 text-blue-300 uppercase tracking-wide flex items-center gap-2">
              <Code className="w-4 h-4" />
              Tecnologías
            </h2>
            <div className="space-y-3 text-xs">
              {data.habilidades_tecnicas.map((skill: any, index: number) => (
                <div key={index}>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-300 mb-1">Programación</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.lenguaje_programacion.split(', ').map((tech: string, i: number) => (
                        <span key={i} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-1">Herramientas</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.herramientas.split(', ').map((tool: string, i: number) => (
                        <span key={i} className="bg-gray-600 text-white px-2 py-1 rounded text-xs">
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
            <h2 className="text-sm font-bold mb-3 text-blue-300 uppercase tracking-wide flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Idiomas
            </h2>
            <div className="space-y-2 text-xs">
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
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600"></div>
              Perfil Profesional
            </h2>
            <p className="text-gray-700 text-justify leading-relaxed">
              {data.perfil_profesional}
            </p>
          </section>

          {/* Experiencia Laboral */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600"></div>
              <Briefcase className="w-5 h-5" />
              Experiencia Laboral
            </h2>
            <div className="space-y-4">
              {data.experiencia_laboral.map((exp: any, index: number) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-300"></div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{exp.titulo}</h3>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {exp.fecha}
                      </span>
                    </div>
                    <p className="text-gray-700 font-semibold mb-2">{exp.entidad}</p>
                    <p className="text-gray-700 text-sm text-justify">{exp.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Formación */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600"></div>
              <GraduationCap className="w-5 h-5" />
              Formación
            </h2>
            <div className="space-y-3">
              {data.formacion.map((edu: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{edu.titulo}</h3>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {edu.fecha}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold mb-1">{edu.entidad}</p>
                  <p className="text-gray-700 text-sm">{edu.descripcion}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CVModern;
