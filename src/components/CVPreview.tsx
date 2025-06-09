
import { CVData } from "../types/cv";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface CVPreviewProps {
  data: CVData;
  isPreview?: boolean;
}

const CVPreview = ({ data, isPreview = false }: CVPreviewProps) => {
  const containerClass = isPreview 
    ? "bg-white text-black p-6 shadow-lg rounded-lg max-h-[600px] overflow-y-auto" 
    : "bg-white text-black p-8 shadow-lg w-[210mm] min-h-[297mm] mx-auto print:shadow-none print:m-0";

  return (
    <div className={containerClass} style={{ fontSize: '14px', lineHeight: '1.4' }}>
      {/* Header */}
      <header className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {data.personalInfo.fullName || "Tu Nombre"}
        </h1>
        <p className="text-lg text-gray-700 mb-3">
          {data.personalInfo.title || "Tu Título Profesional"}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-3 h-3" />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Resumen Profesional
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Experiencia Profesional
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                <p className="text-gray-700 mb-2">{exp.description}</p>
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Educación
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree} en {edu.field}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.current ? "Presente" : edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.languages.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Habilidades
          </h2>
          
          {data.skills.technical.length > 0 && (
            <div className="mb-3">
              <h3 className="font-medium text-gray-900 mb-2">Habilidades Técnicas</h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.technical.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {data.skills.languages.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Idiomas</h3>
              <div className="space-y-1">
                {data.skills.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-600 text-sm">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Proyectos Destacados
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-1">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.url || project.github) && (
                  <div className="flex gap-4 text-xs text-gray-600">
                    {project.url && <span>Web: {project.url}</span>}
                    {project.github && <span>GitHub: {project.github}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CVPreview;
