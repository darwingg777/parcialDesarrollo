// login.js - Manejo del formulario de inicio de sesión
// ADVERTENCIA: Estas credenciales están quemadas en el código solo con fines educativos.
// NUNCA usar este método en una aplicación real de producción.

// Credenciales predeterminadas (hardcoded)
const CREDENTIALS = {
    username: 'admin',
    password: '1234'
};

// Elementos del DOM
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Función para mostrar mensaje de error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Ocultar el mensaje después de 4 segundos
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 4000);
}

// Función para validar credenciales
function validateCredentials(username, password) {
    return username === CREDENTIALS.username && password === CREDENTIALS.password;
}

// Manejar el envío del formulario
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores de los campos
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validar que los campos no estén vacíos
    if (!username || !password) {
        showError('Por favor, completa todos los campos');
        return;
    }
    
    // Validar credenciales
    if (validateCredentials(username, password)) {
        // Login exitoso
        console.log('Login exitoso');
        
        // Guardar estado de sesión (solo en memoria, no en localStorage)
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Redirigir a la página principal
        window.location.href = 'index.html';
    } else {
        // Login fallido
        showError('Usuario o contraseña incorrectos');
        
        // Limpiar el campo de contraseña por seguridad
        document.getElementById('password').value = '';
    }
});

// Verificar si ya hay una sesión activa
window.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        // Si ya está logueado, redirigir a index
        window.location.href = 'index.html';
    }
});