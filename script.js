document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById("file");
    const fileNameSpan = document.getElementById("file-name");
    const summarizeBtn = document.getElementById("summarizeBtn");

    fileInput.addEventListener("change", function() {
        const fileName = this.files.length > 0 ? this.files[0].name : "Sin archivos seleccionados";
        fileNameSpan.textContent = fileName;
        summarizeBtn.disabled = this.files.length === 0;
    });

    summarizeBtn.addEventListener("click", function() {
        if (fileInput.files.length === 0) return;
        
        alert("El resumen se está generando...");
        // Aquí puedes agregar código para enviar el archivo a la API
        // Ejemplo:
        // const formData = new FormData();
        // formData.append('pdf', fileInput.files[0]);
        // fetch('/api/summarize', { method: 'POST', body: formData })
        //   .then(response => response.json())
        //   .then(data => mostrarResumen(data))
        //   .catch(error => console.error('Error:', error));
    });

    // Función para manejar la navegación entre pestañas
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Controladores para los sliders
    const sliders = ['temperature', 'top_p', 'frequency_penalty', 'presence_penalty'];
    sliders.forEach(id => {
        const slider = document.getElementById(id);
        const valueDisplay = document.getElementById(`${id}-value`);
        
        slider.addEventListener('input', function() {
            valueDisplay.textContent = this.value;
        });
    });

    // Botón de reset
    document.getElementById('resetParams').addEventListener('click', function() {
        document.getElementById('temperature').value = 0.3;
        document.getElementById('top_p').value = 0.6;
        document.getElementById('frequency_penalty').value = 0.8;
        document.getElementById('presence_penalty').value = 0.5;
        document.getElementById('max_tokens').value = 500;
        
        // Actualizar displays
        document.getElementById('temp-value').textContent = '0.3';
        document.getElementById('topp-value').textContent = '0.6';
        document.getElementById('freqp-value').textContent = '0.8';
        document.getElementById('presp-value').textContent = '0.5';
    });

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const preset = presets[this.dataset.preset];
            document.getElementById('temperature').value = preset.temp;
            document.getElementById('top_p').value = preset.top_p;
            document.getElementById('frequency_penalty').value = preset.freq;
            document.getElementById('presence_penalty').value = preset.pres;
            document.getElementById('max_tokens').value = preset.tokens;
            
            // Actualizar displays
            document.getElementById('temp-value').textContent = preset.temp;
            document.getElementById('topp-value').textContent = preset.top_p;
            document.getElementById('freqp-value').textContent = preset.freq;
            document.getElementById('presp-value').textContent = preset.pres;
        });
    });

    // Envío al servidor
    document.getElementById('summarizeBtn').addEventListener('click', function() {
        const params = {
            file: document.getElementById('file').files[0],
            temperature: parseFloat(document.getElementById('temperature').value),
            top_p: parseFloat(document.getElementById('top_p').value),
            frequency_penalty: parseFloat(document.getElementById('frequency_penalty').value),
            presence_penalty: parseFloat(document.getElementById('presence_penalty').value),
            max_tokens: parseInt(document.getElementById('max_tokens').value)
        };
        
        // Aquí iría la llamada a tu API
        console.log("Parámetros enviados:", params);
        // generateSummary(params);
    });
});

document.getElementById('file').addEventListener('change', function(e) {
    const fileName = e.target.files[0] ? e.target.files[0].name : 'Ningún archivo seleccionado';
    document.getElementById('file-name').innerHTML = `<i class="fas fa-file"></i> ${fileName}`;
    document.getElementById('drop-zone').classList.add('hidden');
    document.getElementById('file-name').parentElement.classList.add('file-selected');
    
    // Habilitar botón de resumen
    document.getElementById('summarizeBtn').disabled = false;
    document.getElementById('summarizeBtnCustom').disabled = false;
});

// Manejar drag and drop (opcional)
const dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
        document.getElementById('file').files = e.dataTransfer.files;
        document.getElementById('file-name').innerHTML = `<i class="fas fa-file"></i> ${file.name}`;
        this.classList.add('hidden');
        document.getElementById('file-name').parentElement.classList.add('file-selected');
        
        // Habilitar botón de resumen
        document.getElementById('summarizeBtn').disabled = false;
        document.getElementById('summarizeBtnCustom').disabled = false;
    }
    this.classList.remove('highlight');
});
function generateSummary(params) {
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('temperature', params.temperature);
    formData.append('top_p', params.top_p);
    formData.append('frequency_penalty', params.frequency_penalty);
    formData.append('presence_penalty', params.presence_penalty);
    formData.append('max_tokens', params.max_tokens);

    fetch('https://tu-api.com/api/summarize', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en la API');
        return response.json();
    })
    .then(data => {
        console.log('Resumen recibido:', data);
        mostrarResumen(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al generar el resumen');
    });
}
function mostrarResumen(data) {
    const resumen = data.resumen || "No se recibió resumen";
    document.getElementById('resultado').textContent = resumen;
}


// VISUALISAR RESUMEN 
function mostrarResumen(texto) {
        // Oculta los parámetros avanzados
        document.querySelector('.advanced-params').style.display = 'none';

        // Muestra el contenedor del resumen
        document.getElementById('summary-container').style.display = 'block';

        // Coloca el texto del resumen
        document.getElementById('summary-text').value = texto;
    }

function copySummary() {
        const resumen = document.getElementById("summary-text");
        resumen.select();
        resumen.setSelectionRange(0, 99999); // Para móviles

        document.execCommand("copy");
        alert("Resumen copiado al portapapeles");
    }

// Simula mostrar el resumen cuando el botón se presione (puedes eliminar esto en producción)
document.getElementById('summarizeBtn').addEventListener('click', function () {
        // Aquí deberías poner el resumen real recibido desde el backend
    mostrarResumen("Este es un ejemplo de resumen generado automáticamente.");
    });