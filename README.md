<<<<<<< HEAD
 Movies Manager — Frontend React

Interfaz de usuario construida con React para gestionar directores y películas.
Se conecta al backend de Django REST API mediante peticiones HTTP con axios.


📋 Tabla de contenidos

Tecnologías
Estructura del proyecto
Instalación
Configuración de la API
Rutas de la aplicación
Componentes
Servicios (conexión con Django)
Cómo funciona la conexión con Django
Requisitos previos


🛠️ Tecnologías
TecnologíaFunciónReact 18Biblioteca principal de interfaz de usuarioReact Router DOMGestión de rutas y navegaciónAxiosPeticiones HTTP hacia la API de DjangoCSS (vanilla)Estilos de la aplicación

📂 Estructura del proyecto
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/                # Componentes de la interfaz
│   │   ├── Navbar.js              # Barra de navegación
│   │   ├── Home.js                # Página de inicio
│   │   ├── DirectorList.js        # Lista de directores
│   │   ├── DirectorForm.js        # Crear / Editar director
│   │   ├── DirectorDetail.js      # Detalle de un director
│   │   ├── MovieList.js           # Lista de películas
│   │   ├── MovieForm.js           # Crear / Editar película
│   │   └── MovieDetail.js         # Detalle de una película
│   │
│   ├── services/                  # Funciones que hablan con la API
│   │   ├── api.js                 # Configuración de axios (URL base)
│   │   ├── directorService.js     # CRUD de directores
│   │   └── movieService.js        # CRUD de películas
│   │
│   ├── styles/                    # Estilos CSS
│   │   ├── App.css                # Estilos globales
│   │   ├── Navbar.css             # Estilo de la navbar
│   │   ├── Home.css               # Estilo de la página inicio
│   │   ├── List.css               # Estilo de las listas
│   │   ├── Form.css               # Estilo de los formularios
│   │   └── Detail.css             # Estilo de los detalles
│   │
│   ├── App.js                     # Configuración de rutas (Router)
│   ├── index.js                   # Punto de entrada
│   └── index.css                  # Estilos base
│
├── package.json                   # Dependencias del proyecto
└── README.md                      # Este archivo

⚙️ Instalación
1. Clonar el repositorio
bashgit clone <URL_del_repositorio>
cd frontend
2. Instalar dependencias
bashnpm install
Esto instala automáticamente: react, react-dom, axios, react-router-dom y demás dependencias listadas en package.json.
3. Iniciar el servidor de desarrollo
bashnpm start
La aplicación estará disponible en:
👉 http://localhost:3000

⚠️ Importante: El backend de Django debe estar corriendo en http://127.0.0.1:8000 para que la aplicación funcione correctamente.


🔗 Configuración de la API
El archivo src/services/api.js configura la dirección del backend de Django:
javascriptconst API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
Si tu Django corre en una URL diferente, solo cambia el valor de API_BASE_URL.

🛣️ Rutas de la aplicación
RutaComponenteDescripción/HomePágina de inicio/directorsDirectorListLista de todos los directores/directors/newDirectorFormFormulario para crear director/directors/:idDirectorDetailDetalle de un director y sus películas/directors/edit/:idDirectorFormFormulario para editar director/moviesMovieListLista de todas las películas/movies/newMovieFormFormulario para crear película/movies/:idMovieDetailDetalle de una película/movies/edit/:idMovieFormFormulario para editar película

🧩 Componentes
Navbar
Barra de navegación fija que aparece en todas las páginas. Contiene enlaces a las secciones principales: Inicio, Directores y Películas.
Home
Página de bienvenida con una descripción de la aplicación y accesos rápidos a las secciones principales.
DirectorList
Muestra la lista de todos los directores en formato de tarjetas. Incluye búsqueda por nombre y botones para ver detalle, editar y eliminar.
DirectorForm
Formulario reutilizable para crear y editar directores. Si la URL contiene un :id, se carga en modo edición; si no, en modo creación.
DirectorDetail
Muestra toda la información de un director y la lista de películas que dirigió.
MovieList
Muestra la lista de películas en formato de tarjetas. Incluye búsqueda por título y filtro por género.
MovieForm
Formulario reutilizable para crear y editar películas. Incluye un select para elegir el director.
MovieDetail
Muestra toda la información de una película, incluyendo el nombre del director.

📡 Servicios (conexión con Django)
Los servicios encapsulan todas las peticiones HTTP hacia la API. Están en la carpeta src/services/.
api.js — Configuración central
Crea la instancia de axios con la URL base y los headers necesarios. Todos los servicios importan esta instancia.
directorService.js — CRUD de Directores
FunciónMétodo HTTPEndpointDescripcióngetAllDirectors()GET/directors/Obtiene todos los directoresgetDirectorById(id)GET/directors/{id}/Obtiene un director por IDcreateDirector(data)POST/directors/Crea un nuevo directorupdateDirector(id, data)PUT/directors/{id}/Actualiza un directordeleteDirector(id)DELETE/directors/{id}/Elimina un directorsearchDirectors(term)GET/directors/?search={term}Busca directores por texto
movieService.js — CRUD de Películas
FunciónMétodo HTTPEndpointDescripcióngetAllMovies()GET/movies/Obtiene todas las películasgetMovieById(id)GET/movies/{id}/Obtiene una película por IDcreateMovie(data)POST/movies/Crea una nueva películaupdateMovie(id, data)PUT/movies/{id}/Actualiza una películadeleteMovie(id)DELETE/movies/{id}/Elimina una películasearchMovies(term)GET/movies/?search={term}Busca películas por textogetMoviesByGenre(genre)GET/movies/?genre={genre}Filtra películas por género

🔄 Cómo funciona la conexión con Django
El flujo de datos cuando el usuario visita la lista de películas es así:
1. El usuario hace clic en "Películas" en la navbar
        ↓
2. React abre el componente MovieList.js
        ↓
3. useEffect() se ejecuta automáticamente
        ↓
4. Llama a getAllMovies() en movieService.js
        ↓
5. movieService usa axios para hacer:
        GET http://127.0.0.1:8000/api/movies/
        ↓
6. Django recibe la petición, consulta la base de datos
        ↓
7. Django responde con JSON
        ↓
8. React guarda los datos con useState y re-renderiza
        ↓
9. ¡El usuario ve la lista de películas!

📦 Requisitos previos
Para que la aplicación funcione correctamente necesitas:

Node.js (v18 o superior) — Descargar aquí
npm (se instala junto con Node.js)
El backend de Django corriendo en http://127.0.0.1:8000

Verificar Node.js
bashnode --version   # Debe mostrar v18.x.x o superior
npm --version    # Debe mostrar 9.x.x o superior
Correr ambos servidores simultáneamente
TerminalComandoPuertoTerminal 1 (Django)python manage.py runserver8000Terminal 2 (React)npm start3000

🔗 Backend
Este frontend consume la API del backend de Django. Ver repositorio: Movies Manager — Backend Django

Proyecto desarrollado como examen parcial — Curso de Django
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## OAuth2 / Autenticación

Este frontend ahora soporta autenticación OAuth2/Simple JWT.

Pruebas rápidas:

1. Definir `REACT_APP_API_URL` en `.env.local` apuntando al backend.
2. Levantar backend que exponga un endpoint de token en `/oauth/token/` o `/api/token/`.
3. Ejecutar frontend:

```bash
npm install
npm start
```

4. Ir a `http://localhost:3000/login` y autenticarse.
5. Las peticiones protegidas añadirán automáticamente `Authorization: Bearer <token>`.

Si necesitas adaptar el endpoint/token payload, edita `src/services/authService.js`.
>>>>>>> f2a3b19 (Initial commit frontend)
