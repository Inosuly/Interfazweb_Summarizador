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