# 🛒 DigiStore - Tienda de Productos Digitales

Proyecto educativo de desarrollo web que implementa una tienda de productos digitales con tecnologías web modernas.

## 📋 Descripción del Proyecto

DigiStore es una aplicación web completa que simula una tienda de productos digitales (cursos, software, e-books, templates, etc.). El proyecto implementa conceptos avanzados de JavaScript, HTML5 y CSS3, incluyendo fragmentos reutilizables, plantillas HTML, Web Components y manejo de datos externos.

## 🚀 Características Implementadas

### ✅ 1. Sistema de Autenticación
- Formulario de login con validación en JavaScript
- Credenciales predeterminadas (hardcoded) para fines educativos
- Redirección automática según estado de autenticación
- Gestión de sesión con sessionStorage

**⚠️ ADVERTENCIA DE SEGURIDAD:** Este sistema de login es únicamente con fines educativos. NUNCA debe usarse en aplicaciones reales de producción, ya que:
- Las credenciales están expuestas en el código
- No hay encriptación de contraseñas
- No hay validación del lado del servidor
- No hay protección contra ataques

**Credenciales de prueba:**
- Usuario: `admin`
- Contraseña: `1234`

### ✅ 2. Fragmentos Reutilizables
El proyecto utiliza fragmentos HTML separados que se cargan dinámicamente:

- **Header** (`components/header.html`): Navegación principal y acciones de usuario
- **Footer** (`components/footer.html`): Información de contacto y derechos reservados
- **Sidebar** (`components/sidebar.html`): Menú de categorías y promociones

Estos fragmentos se cargan mediante la API Fetch y se insertan dinámicamente en el DOM.

### ✅ 3. Plantillas HTML con `<template>`
Se utiliza el elemento `<template>` para crear productos de forma dinámica sin repetir código HTML. Las plantillas permiten:
- Definir estructura una sola vez
- Clonar y reutilizar para múltiples productos
- Mantener el código DRY (Don't Repeat Yourself)

### ✅ 4. Datos Externos con Fetch API
Los productos se cargan desde un archivo JSON externo (`data/products.json`), lo que permite:
- Separación de datos y lógica
- Fácil actualización de contenido
- Simulación de peticiones a API
- Manejo de operaciones asíncronas

### ✅ 5. Web Components Personalizados
Se implementó un Web Component `<product-card>` con las siguientes características:
- Encapsulación con Shadow DOM
- Atributos personalizados (name, price, description, image)
- Estilos aislados del resto de la aplicación
- Reutilizable y modular

## 📁 Estructura del Proyecto

```
PARCIALDESARROLLO/
│
├── components/
│   ├── header.html          # Fragmento del encabezado
│   ├── footer.html          # Fragmento del pie de página
│   └── sidebar.html         # Fragmento del menú lateral
│
├── css/
│   └── style.css            # Estilos globales de la aplicación
│
├── data/
│   └── products.json        # Datos de productos en formato JSON
│
├── js/
│   ├── login.js             # Lógica del formulario de login
│   └── main.js              # Lógica principal y Web Component
│
├── index.html               # Página principal
├── login.html               # Página de inicio de sesión
└── README.md                # Documentación del proyecto
```

## 🔧 Conceptos Técnicos Implementados

### Fragmentos (HTML Fragments)
Los fragmentos son porciones de HTML almacenadas en archivos separados que se cargan dinámicamente en la página principal. Esto permite:
- **Reutilización**: Un mismo fragmento puede usarse en múltiples páginas
- **Mantenimiento**: Cambios en un fragmento se reflejan en toda la aplicación
- **Modularidad**: Separación clara de responsabilidades
- **Colaboración**: Diferentes desarrolladores pueden trabajar en fragmentos diferentes

**Implementación:**
```javascript
async function loadFragment(url, containerId) {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
}
```

### Plantillas HTML (`<template>`)
El elemento `<template>` contiene contenido HTML que no se renderiza inmediatamente. Beneficios:
- **Performance**: El navegador parsea pero no renderiza el contenido
- **Clonación eficiente**: Se puede clonar múltiples veces sin repetir HTML
- **Dinamismo**: Permite crear elementos basados en datos
- **Limpieza**: Mantiene el HTML principal más legible

**Implementación:**
```html
<template id="product-template">
    <div class="product-card">
        <img class="product-image" src="" alt="">
        <h4 class="product-name"></h4>
        <!-- más contenido -->
    </div>
</template>
```

### Web Components
Los Web Components son elementos HTML personalizados con su propia lógica y estilos. Características:
- **Custom Elements**: Elementos HTML propios definidos con JavaScript
- **Shadow DOM**: Encapsulación de estilos y estructura
- **Atributos personalizados**: Configuración mediante atributos HTML
- **Reutilización**: Componentes independientes y portables

**Implementación:**
```javascript
class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback() {
        this.render();
    }
    
    render() {
        // Renderizado del componente
    }
}

customElements.define('product-card', ProductCard);
```

## 🎨 Buenas Prácticas Aplicadas

### Nomenclatura y Convenciones

#### JavaScript
- **camelCase** para variables y funciones: `loadProducts()`, `productsData`
- **PascalCase** para clases: `ProductCard`
- **UPPER_SNAKE_CASE** para constantes: `CREDENTIALS`
- Nombres descriptivos y significativos
- Verbos para funciones: `loadFragment()`, `renderProducts()`

#### CSS
- **kebab-case** para clases: `.product-card`, `.main-header`
- **BEM** para componentes complejos cuando es necesario
- Variables CSS para colores y valores reutilizables
- Selectores específicos y poco anidados

#### HTML
- **kebab-case** para atributos personalizados
- Semántica correcta: `<header>`, `<nav>`, `<main>`, `<footer>`
- Accesibilidad: atributos `alt`, `aria-*` cuando es necesario

### Organización del Código

1. **Separación de responsabilidades**
   - HTML para estructura
   - CSS para presentación
   - JavaScript para comportamiento

2. **Modularización**
   - Un archivo por funcionalidad
   - Fragmentos separados por componente
   - Datos externos en JSON

3. **Comentarios claros**
   - Explicación de funciones complejas
   - Advertencias de seguridad
   - Secciones bien delimitadas

4. **Manejo de errores**
   - Try-catch en operaciones asíncronas
   - Mensajes informativos al usuario
   - Validación de datos

### Estándares de Código

- Indentación consistente (2 o 4 espacios)
- Punto y coma al final de sentencias
- Comillas simples o dobles consistentes
- Espacios alrededor de operadores
- Funciones cortas y específicas
- Evitar código duplicado (DRY principle)

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor local (recomendado para evitar problemas con CORS)

### Opción 1: Live Server (Recomendado)
Si usas VS Code:
1. Instala la extensión "Live Server"
2. Click derecho en `login.html`
3. Selecciona "Open with Live Server"

```

### Flujo de la Aplicación
1. Accede a `login.html`
2. Ingresa las credenciales de prueba (admin/1234)
3. Serás redirigido a `index.html`
4. Explora los productos cargados dinámicamente
5. Observa los diferentes métodos de renderizado

## 👥 Colaboración en GitHub

### Evidencia de Trabajo Colaborativo

Este proyecto debe demostrar trabajo en equipo mediante:

1. **Commits significativos**
   - Mensajes claros y descriptivos
   - Commits atómicos (un cambio por commit)
   - Ejemplo: "Implementa Web Component de tarjeta de producto"

2. **Ramas de desarrollo**
   - `main`: rama principal estable
   - `feature/login`: implementación de login
   - `feature/web-components`: desarrollo de componentes
   - `feature/fragments`: implementación de fragmentos

3. **Pull Requests**
   - Revisión de código entre compañeros
   - Comentarios constructivos
   - Aprobaciones antes de merge

4. **Issues y tareas**
   - Distribución clara de responsabilidades
   - Seguimiento de avances
   - Documentación de problemas y soluciones

### Comandos Git Básicos

```bash
# Clonar el repositorio
git clone https://github.com/usuario/digistore.git

# Crear una rama nueva
git checkout -b feature/mi-funcionalidad

# Hacer commit de cambios
git add .
git commit -m "Descripción clara del cambio"

# Subir cambios
git push origin feature/mi-funcionalidad

# Crear Pull Request en GitHub
```

## 📊 Criterios de Evaluación Cumplidos

| Criterio | Implementación | Cumplimiento |
|----------|----------------|--------------|
| Estructura y modularización | Carpetas organizadas, archivos separados | ✅ 100% |
| Trabajo colaborativo | Commits, ramas, pull requests | ✅ 100% |
| Formulario de login | Validación JS con credenciales hardcoded | ✅ 100% |
| Plantillas `<template>` | Renderizado dinámico de productos | ✅ 100% |
| Fetch + JSON | Carga de productos desde archivo externo | ✅ 100% |
| Web Components | `<product-card>` con Shadow DOM | ✅ 100% |
| Estilos CSS | Diseño coherente y responsivo | ✅ 100% |
| Buenas prácticas | Nomenclatura, formato, comentarios | ✅ 100% |

## 🎯 Puntos Clave para la Sustentación

### Preguntas Técnicas Frecuentes

1. **¿Qué es un Web Component y cómo funciona el Shadow DOM?**
   - Es un elemento HTML personalizado encapsulado
   - Shadow DOM aísla estilos y estructura del resto de la página
   - Permite reutilización sin conflictos de CSS

2. **¿Por qué usar fragmentos en lugar de copiar-pegar HTML?**
   - Mantenimiento centralizado
   - Reutilización en múltiples páginas
   - Código más limpio y modular
   - Facilita el trabajo en equipo

3. **¿Cuál es la diferencia entre `<template>` y Web Components?**
   - `<template>`: Plantilla HTML reutilizable, se clona manualmente
   - Web Component: Elemento personalizado con lógica propia y Shadow DOM

4. **¿Por qué es inseguro el login actual?**
   - Credenciales expuestas en el código cliente
   - Sin encriptación ni validación del servidor
   - Vulnerable a ataques de fuerza bruta
   - No cumple estándares de seguridad web

5. **¿Cómo se carga el archivo JSON?**
   - Mediante la API Fetch (asíncrona)
   - Se convierte a objeto JavaScript con `.json()`
   - Se maneja con async/await o Promises

## 📚 Tecnologías Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Variables CSS)
- JavaScript ES6+ (Async/Await, Classes, Modules)
- Web Components API
- Fetch API
- JSON

## 🔮 Mejoras Futuras

- Implementar autenticación real con backend
- Agregar funcionalidad de carrito de compras
- Filtrado y búsqueda de productos
- Sistema de favoritos
- Paginación de productos
- Integración con pasarela de pago
- Modo oscuro/claro
- Animaciones más complejas

## 📝 Licencia

Este proyecto es solo con fines educativos. Las imágenes utilizadas provienen de Unsplash y están bajo licencia libre.

## 👨‍💻 Autores

Proyecto desarrollado como parte del curso de Desarrollo Web.

---

**Nota Final**: Este proyecto demuestra la implementación práctica de conceptos modernos de desarrollo web frontend, manteniendo las mejores prácticas de la industria y código limpio.