# Summarizador
Este proyecto tiene como objetivo desarrollar un sistema que permita generar resúmenes automáticos de artículos científicos escritos en español, utilizando modelos de lenguaje de contexto largo. Está diseñado para facilitar el acceso rápido y eficiente a la información relevante en literatura científica para investigadores, estudiantes, docentes y profesionales.

## Descripción del Proyecto
El sistema ofrece una API que permite:

- Subir artículos científicos en formato PDF.

- Extraer y preprocesar el texto.

- Generar un resumen comprensible y coherente en español mediante un modelo de lenguaje preentrenado de contexto largo.

- Devolver el resumen en texto plano.

### Características principales:
- Procesamiento exclusivo de archivos en español.

- Resúmenes automáticos generados por modelos de lenguaje.

- Interfaz API basada en REST para facilidad de integración.

### Tecnologías y Herramientas
- Lenguaje: Python 3.10+

- Framework: FastAPI

- Procesamiento de documentos: PyMuPDF, PDFMiner, spaCy

- Modelo de lenguaje: LLMs preentrenados (Ej. LongT5, LED, Mistral, etc.)

- Entorno: Jupyter, VSCode

- Control de versiones: Git

- Testing: Pytest
