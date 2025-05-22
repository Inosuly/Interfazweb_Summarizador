// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const fileInput = document.getElementById('file');
    const fileNameSpan = document.getElementById('file-name');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const dropZone = document.getElementById('drop-zone');
    const summaryContainer = document.getElementById('summary-container');
    const summaryText = document.getElementById('summary-text');
    
    // Parámetros del modelo
    const params = {
        temperature: 0.3,
        top_p: 0.6,
        frequency_penalty: 0.8,
        presence_penalty: 0.5,
        max_tokens: 500
    };

    // Inicialización de eventos
    initFileUpload();
    initParamControls();
    initInfoButtons();
    setupDragAndDrop();

    // Función para inicializar la subida de archivos
    function initFileUpload() {
        fileInput.addEventListener('change', function(e) {
            if (this.files && this.files.length > 0) {
                const file = this.files[0];
                updateFileInfo(file);
                summarizeBtn.disabled = false;
            }
        });

        // Permitir que el drop-zone active el input file
        dropZone.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    // Función para actualizar la información del archivo seleccionado
    function updateFileInfo(file) {
        fileNameSpan.innerHTML = `<i class="fas fa-file-pdf"></i> ${file.name} (${formatFileSize(file.size)})`;
        dropZone.classList.add('active');
        setTimeout(() => dropZone.classList.remove('active'), 2000);
    }
    // Reemplaza la función updateFileInfo con esta versión modificada
    function updateFileInfo(file) {
    // Ocultar el drop-zone
        dropZone.style.display = 'none';
    
    // Mostrar el área de archivo subido
        const fileDisplay = document.getElementById('file-display');
        fileDisplay.style.display = 'flex';
    
    // Actualizar el nombre del archivo
        document.querySelector('.file-name-text').textContent = `${file.name} (${formatFileSize(file.size)})`;
    
    // Habilitar el botón de resumir
        summarizeBtn.disabled = false;
    
    // Configurar el botón para cambiar archivo
        document.getElementById('change-file-btn').addEventListener('click', function() {
            fileInput.value = ''; // Limpiar el input file
            fileDisplay.style.display = 'none'; // Ocultar el display
            dropZone.style.display = 'block'; // Mostrar el drop-zone
            summarizeBtn.disabled = true; // Deshabilitar el botón
        });
    }

// Modifica la función handleDrop para usar la nueva updateFileInfo
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0 && files[0].type === 'application/pdf') {
        fileInput.files = files;
        updateFileInfo(files[0]);
    } else {
        showToast('Por favor, sube solo archivos PDF');
    }
}

// Asegúrate de que el file input también valide el tipo de archivo
fileInput.addEventListener('change', function(e) {
    if (this.files && this.files.length > 0) {
        const file = this.files[0];
        if (file.type === 'application/pdf') {
            updateFileInfo(file);
        } else {
            showToast('Por favor, selecciona un archivo PDF');
            this.value = ''; // Limpiar el input
        }
    }
});
    // Función para formatear el tamaño del archivo
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Función para configurar el drag and drop
    function setupDragAndDrop() {
        // Prevenir comportamientos por defecto
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // Resaltar el drop zone cuando se arrastra sobre él
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        // Manejar la caída del archivo
        dropZone.addEventListener('drop', handleDrop, false);

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function highlight() {
            dropZone.classList.add('highlight');
        }

        function unhighlight() {
            dropZone.classList.remove('highlight');
        }

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                fileInput.files = files;
                updateFileInfo(files[0]);
                summarizeBtn.disabled = false;
            }
        }
    }

    // Función para inicializar los controles de parámetros
    function initParamControls() {
        // Configurar los sliders
        document.getElementById('temperature').addEventListener('input', function() {
            params.temperature = parseFloat(this.value);
            document.getElementById('temp-value').textContent = this.value;
        });

        document.getElementById('top_p').addEventListener('input', function() {
            params.top_p = parseFloat(this.value);
            document.getElementById('topp-value').textContent = this.value;
        });

        document.getElementById('frequency_penalty').addEventListener('input', function() {
            params.frequency_penalty = parseFloat(this.value);
            document.getElementById('freqp-value').textContent = this.value;
        });

        document.getElementById('presence_penalty').addEventListener('input', function() {
            params.presence_penalty = parseFloat(this.value);
            document.getElementById('presp-value').textContent = this.value;
        });

        document.getElementById('max_tokens').addEventListener('input', function() {
            params.max_tokens = parseInt(this.value);
        });

        // Botón para restablecer valores
        document.getElementById('reset-params-btn').addEventListener('click', function() {
            resetParams();
        });

        // Botón para aplicar parámetros
        document.getElementById('apply-params-btn').addEventListener('click', function() {
            showToast('Parámetros aplicados correctamente');
        });
    }

    // Función para restablecer los parámetros a los valores por defecto
    function resetParams() {
        params.temperature = 0.3;
        params.top_p = 0.6;
        params.frequency_penalty = 0.8;
        params.presence_penalty = 0.5;
        params.max_tokens = 500;

        document.getElementById('temperature').value = params.temperature;
        document.getElementById('top_p').value = params.top_p;
        document.getElementById('frequency_penalty').value = params.frequency_penalty;
        document.getElementById('presence_penalty').value = params.presence_penalty;
        document.getElementById('max_tokens').value = params.max_tokens;

        document.getElementById('temp-value').textContent = params.temperature;
        document.getElementById('topp-value').textContent = params.top_p;
        document.getElementById('freqp-value').textContent = params.frequency_penalty;
        document.getElementById('presp-value').textContent = params.presence_penalty;

        showToast('Parámetros restablecidos a valores predeterminados');
    }

    // Función para inicializar los botones de información
    function initInfoButtons() {
        document.querySelectorAll('.info-button').forEach(button => {
            button.addEventListener('click', function() {
                const param = this.getAttribute('data-param');
                const infoDiv = document.getElementById(`info-${param}`);
                infoDiv.style.display = infoDiv.style.display === 'none' ? 'block' : 'none';
                
                // Rotar el ícono
                this.querySelector('i').classList.toggle('fa-rotate-90');
            });
        });
    }

    // Función para mostrar notificaciones toast
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Función para copiar el resumen al portapapeles
    window.copySummary = function() {
        summaryText.select();
        document.execCommand('copy');
        
        // Mostrar feedback visual
        const copyBtn = document.querySelector('.copy-button');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    };

    // Función principal para generar el resumen
    summarizeBtn.addEventListener('click', async function() {
        if (!fileInput.files || fileInput.files.length === 0) {
            showToast('Por favor, selecciona un archivo PDF');
            return;
        }

        const file = fileInput.files[0];
        if (file.type !== 'application/pdf') {
            showToast('El archivo debe ser un PDF');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB límite
            showToast('El archivo es demasiado grande (máximo 10MB)');
            return;
        }

        // Mostrar estado de carga
        summarizeBtn.disabled = true;
        summarizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        
        try {
            // Simular procesamiento (en una implementación real, aquí iría la llamada a tu API)
            const summary = await simulateAPICall(file, params);
            
            // Mostrar resultados
            summaryText.value = summary;
            summaryContainer.style.display = 'block';
            
            // Desplazarse a los resultados
            setTimeout(() => {
                summaryContainer.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            
            showToast('Resumen generado con éxito');
        } catch (error) {
            console.error('Error:', error);
            showToast('Error al generar el resumen');
        } finally {
            summarizeBtn.disabled = false;
            summarizeBtn.innerHTML = '<i class="fas fa-magic"></i> Sumarizar';
        }
    });

    // Función de simulación de llamada a la API (para propósitos de demostración)
    async function simulateAPICall(file, params) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Esto es un resumen de ejemplo - en una implementación real, esto vendría de tu API
                const exampleSummary = `Resumen generado del archivo: ${file.name}\n\n` +
                    `Este es un resumen de ejemplo generado con los siguientes parámetros:\n` +
                    `- Creatividad: ${params.temperature}\n` +
                    `- Enfoque: ${params.top_p}\n` +
                    `- Penalización por repetición: ${params.frequency_penalty}\n` +
                    `- Longitud máxima: ${params.max_tokens} tokens\n\n` +
                    `En una implementación real, aquí aparecería el resumen del contenido del PDF analizado. ` +
                    `El sistema procesaría el texto del artículo científico y extraería los puntos clave, ` +
                    `proporcionando una versión condensada del material original.`;
                
                resolve(exampleSummary);
            }, 3000); // Simular tiempo de procesamiento
        });
    }
});

// Añadir estilos dinámicos para las notificaciones toast
const toastStyles = document.createElement('style');
toastStyles.textContent = `
.toast-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #2c3e50;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.toast-notification.show {
    opacity: 1;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.fa-spin {
    animation: spin 1s linear infinite;
}
`;
document.head.appendChild(toastStyles);

/* ==============Resumen con parametros ==================== */
// Variables de estado
let paramsApplied = false;
let fileUploaded = false;

// Modifica la función updateFileInfo para actualizar el estado
function updateFileInfo(file) {
    fileUploaded = true;
    // ... resto del código existente ...
    checkGenerateButtonState();
}

// Función para verificar el estado del botón Generar
function checkGenerateButtonState() {
    const generateBtn = document.getElementById('generate-summary-btn');
    generateBtn.disabled = !(fileUploaded && paramsApplied);
}

// Modifica el evento de aplicar parámetros
document.getElementById('apply-params-btn').addEventListener('click', function() {
    // Aquí iría tu lógica para guardar los parámetros
    paramsApplied = true;
    showToast('Parámetros aplicados correctamente');
    checkGenerateButtonState();
});

// Evento para el botón Generar resumen
document.getElementById('generate-summary-btn').addEventListener('click', function() {
    if (!fileUploaded) {
        showToast('Por favor, sube un archivo PDF primero');
        return;
    }
    
    if (!paramsApplied) {
        showToast('Por favor, aplica los parámetros primero');
        return;
    }
    
    // Aquí llamarías a tu función para generar el resumen
    generateSummary();
});

// Función para resetear parámetros
document.getElementById('reset-params-btn').addEventListener('click', function() {
    paramsApplied = false;
    checkGenerateButtonState();
    // ... resto del código existente ...
});

// Función para generar el resumen (ejemplo)
async function generateSummary() {
    const generateBtn = document.getElementById('generate-summary-btn');
    
    try {
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
        
        // Simular generación de resumen (reemplazar con tu lógica real)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showToast('Resumen generado con éxito');
        // Aquí mostrarías el resumen en la interfaz
        
    } catch (error) {
        showToast('Error al generar el resumen');
    } finally {
        generateBtn.innerHTML = '<i class="fas fa-play-circle"></i> Generar resumen';
        generateBtn.disabled = false;
    }
}