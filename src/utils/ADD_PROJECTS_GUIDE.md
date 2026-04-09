/**
 * GUÍA: Cómo agregar un nuevo proyecto
 * 
 * Para agregar un proyecto a /proyectos, edita SOLO DOS archivos:
 * 
 * ---
 * 1️⃣  PASO 1: Agregar datos técnicos en src/utils/proyectos.json
 * ---
 * 
 * Abre: src/utils/proyectos.json
 * 
 * Encuentra el array "proyectos" y agrega un nuevo objeto:
 * 
 * {
 *     "nombre": "my-awesome-project",        // Identificador único (sin espacios)
 *     "lenguaje": "TypeScript",              // Lenguaje de programación principal
 *     "status": "public",                    // "public" o "private"
 *     "frameworks": [                        // Array de frameworks/librerías principales
 *         "React",
 *         "Vite"
 *     ],
 *     "dependencias": {                      // Objeto con dependencies y devDependencies
 *         "dependencies": {
 *             "react": "^19.0.0",
 *             "react-dom": "^19.0.0"
 *             // ... más dependencias
 *         },
 *         "devDependencies": {
 *             "typescript": "~5.9.3",
 *             "@types/react": "^19.0.0"
 *             // ... más devDependencies
 *         }
 *     }
 * }
 * 
 * ⚠️  IMPORTANTE: 
 * - El campo "nombre" debe ser ÚNICO y sin espacios
 * - Los caracteres permitidos: a-z, 0-9, guiones (-)
 * - El status debe ser exactamente "public" o "private" (minúsculas)
 * 
 * ---
 * 2️⃣  PASO 2: Agregar descripción en ESPAÑOL (es.json)
 * ---
 * 
 * Abre: src/i18n/locales/es.json
 * 
 * Encuentra: "proyectos": { "descripciones": { ... } }
 * 
 * Agrégauno nuevo:
 * 
 *     "my-awesome-project": "Tu descripción en español aquí. Puede tener múltiples líneas y explica qué hace el proyecto, tecnologías usadas, etc."
 * 
 * Ejemplo completo:
 * {
 *     "proyectos": {
 *         "descripciones": {
 *             "practica-pokedex": "Aplicación web moderna...",
 *             "custom_todo": "Aplicación de gestión de tareas...",
 *             "speedtest-api": "Backend experimental...",
 *             "my-awesome-project": "Tu descripción en español"  ← Nuevo
 *         }
 *     }
 * }
 * 
 * ---
 * 3️⃣  PASO 3: Agregar descripción en INGLÉS (en.json)
 * ---
 * 
 * Abre: src/i18n/locales/en.json
 * 
 * Encuentra: "proyectos": { "descripciones": { ... } }
 * 
 * Agrégauno nuevo correspondiente a la descripción en español:
 * 
 *     "my-awesome-project": "Your description in English here. You can have multiple lines and explain what the project does, technologies used, etc."
 * 
 * Ejemplo:
 * {
 *     "proyectos": {
 *         "descripciones": {
 *             "practica-pokedex": "Modern web application",
 *             "custom_todo": "Task management application",
 *             "speedtest-api": "Experimental backend",
 *             "my-awesome-project": "Your description in English"  ← Nuevo
 *         }
 *     }
 * }
 * 
 * ---
 * ✅ VERIFICACIÓN
 * ---
 * 
 * Después de agregar el proyecto:
 * 1. Guarda los 3 archivos editados
 * 2. Abre http://localhost:5173/proyectos (en tu navegador)
 * 3. Verifica que el proyecto aparezca en la lista
 * 4. Haz click en él para ver la descripción
 * 5. Cambia de idioma (ES ↔ EN) para verificar que ambas descripciones aparecen
 * 
 * Si no aparece:
 * - Verifica que "nombre" sea IDÉNTICO en los 3 archivos
 * - Verifica que no haya errores de JSON (comas faltantes, etc.)
 * - Compila con: pnpm run build
 * 
 * ---
 * 📝 TEMPLATE EJEMPLO
 * ---
 * 
 * Copia y pega esto para crear tu propio proyecto:
 * 
 * PROYECTOS.JSON:
 * {
 *     "nombre": "proyecto-ejemplo",
 *     "lenguaje": "TypeScript",
 *     "status": "public",
 *     "frameworks": ["React", "Vite"],
 *     "dependencias": {
 *         "dependencies": {},
 *         "devDependencies": {}
 *     }
 * }
 * 
 * ES.JSON:
 * "proyecto-ejemplo": "Descripción en español del proyecto..."
 * 
 * EN.JSON:
 * "proyecto-ejemplo": "Description in English of the project..."
 * 
 */
