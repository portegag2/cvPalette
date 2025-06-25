# Plataforma de curriculums - Proyecto Personal
Proyecto Personal de curriculums hecho con Vite+React y con la IA

Se quiere tener una plataforma que genere varios diseños de curriculum teniendo los datos del curriculum ya guardados en un JSON. Se parte de un JSON de prueba y hasta que no se diga no se desarrollará en backend para gestionar los datos de los usuarios y curriculums. La funcionalidad última es que el usuario pueda obtener un PDF en A4 del diseño que quiera, es decir, lo que se visualiza en la pantalla tiene que ser como si fuese para un PDF en A4. Así que este es el marco de diseño, A4, para que luego al obtener el PDF sea lo más fiel posible. Que sea responsive, pero la idea es que el usuario al final obtenga un PDF en A4.

Se quiere que sea con GitHub + VITE + React + JavaScript + Tailwind + Axios + Zunstand + Test pryebas unitarias y componentes (testing-library)  + Test E2E Playwright y que haya test de pruebas (aunque ahora mismo no tengo claro qué habría que probar ya que es muy visual)

La hoja de ruta será:
  1 Ofrecer un diseño clásico y un diseño moderno con los datos esenciales
    - Si puede ser fácil dejar elegir entre dos o tres "Theme color"
    - Determinar o bien por el usuario o bien por el contenido del JSON si dar prioridad a la experiencia o a la formación. El JSON de prueba está centrado en la experiencia pero puede ser que el usuario apenas tenga experiencia, con lo que sería más importante la formación.
  2 Añadir en ambos caracteristicas más llamativas, como habilidades transversales, niveles de los conocimientos técnicos
  3 A partir de aquí las opciones son:
    a Generar otros diseños
    b Hacer toda la lógica de backend para que el usuario guarde y maneje sus datos, ya que empezaremos con un JSON de prueba.

A falta de sugerencias se entiende que un curriculum se conforma de estas secciones:
  - Datos personales
      - Foto
      - Datos contacto
      - Datos a resaltar
  - Perfil Profesional
  - Experiencia: una serie de fichas y cada una con
      - Ficha Experiencia:
          - Cabecera
              - Titulo
              - Entidad
              - Fechas
          - Descripcion
  - Formacion:
      - Ficha formacion:
          - Cabecera
              - Titulo
              - Entidad
              - Fechas
          - Descripcion
  - Habilidades Varias
      - Ficha Habilidad
          - Cabecera
          - Descripcion
       
Estas secciones se entiende deberían ser componentes y lo que cambiese para cada plantilla sería principalmente el CSS y el lugar dónde van.          

Enunciado proyecto: https://github.com/jercilla-at-penascal/front-act10-proyecto-personal
Bocetos: /src/assets/bocetos
TAIGA: https://tree.taiga.io/project/portegag2-cvitae-palette/timeline
Publicación: https://a4-cv-design-maker.vercel.app/