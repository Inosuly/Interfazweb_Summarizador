# Interfaz Web del Summarizador de Artículos Científicos

**Nombre del Proyecto:** Sumarización de Artículos Científicos mediante Modelos Largos de Lenguaje  
**Nombre del Documento:** RAEME – Interfaz Web  
**Responsable:** Giovanna Inosuli Campos Flores  

---

## 1. Requerimientos

### 1.1 Requerimientos Funcionales

- Permitir al usuario cargar un archivo PDF mediante arrastre o selección.
- Visualizar el nombre del archivo cargado.
- Botón para generar un resumen automático estándar.
- Botón alternativo para generar un resumen con parámetros personalizados.
- Controles para modificar los siguientes parámetros del modelo:
  - Creatividad (temperature)
  - Enfoque (top-p)
  - Penalización por repetición (frequency_penalty)
  - Penalización por temas nuevos (presence_penalty)
  - Longitud máxima del resumen (max_tokens)

### 1.2 Requerimientos No Funcionales

- Interfaz intuitiva y visualmente atractiva.
- Diseño responsivo adaptado a distintos tamaños de pantalla.
- Retroalimentación visual clara al usuario (ej. botones deshabilitados).
- Uso de iconografía para mejorar la comprensión visual.

---

## 2. Análisis

La interfaz web debe ofrecer una experiencia sencilla para usuarios de cualquier nivel técnico. Para ello:

- El proceso de carga del archivo debe ser claro y con retroalimentación visual inmediata.
- Los botones de resumen deben habilitarse solo si hay un archivo cargado.
- Los parámetros avanzados deben estar organizados y ser opcionales.
- Se prioriza la experiencia de usuario enfocada en accesibilidad y claridad.

---

## 3. Especificación

### 3.1 Estructura HTML

```html
<div class="container">
  <div class="card">
    <!-- Encabezado -->
    <!-- Carga de PDF (drag & drop y selección) -->
    <!-- Botón de resumen automático -->
  </div>

  <div class="advanced-params">
    <!-- Sliders y parámetros avanzados -->
  </div>

  <div class="action-buttons">
    <!-- Botón de resumen con configuración personalizada -->
  </div>
</div>
