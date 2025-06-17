export interface CVVersion {
  id: string;
  name: string;
  description?: string;
  data: {
    datos_personales: any;
    perfil_profesional: string;
    experiencia_laboral: any[];
    formacion: any[];
    habilidades_tecnicas: any[];
    idiomas: any[];
  };
  createdAt: string;
  updatedAt: string;
}
