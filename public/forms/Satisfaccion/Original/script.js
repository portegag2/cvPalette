document.addEventListener('DOMContentLoaded', function() {
    // Selección de elementos
    const form = document.getElementById('surveyForm');
    const sections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const progressBar = document.getElementById('progressBar');
    const currentPageSpan = document.getElementById('currentPage');
    const ratingInput = document.getElementById('rating');
    const ratingValue = document.getElementById('ratingValue');
    
    const totalSections = 2;
    let currentSection = 2; // Start with section2
    
    // Ensure section2 is active initially
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById('section2').classList.add('active');
    
    // Update initial progress
    updateProgress();
    
    // Actualizar el valor del rating cuando cambia
    ratingInput.addEventListener('input', function() {
        ratingValue.textContent = this.value;
        
        // Cambiar el color de fondo basado en el valor
        const value = parseInt(this.value);
        let backgroundColor;
        
        if (value <= 3) {
            backgroundColor = '#e74c3c'; // Rojo para valores bajos
        } else if (value <= 6) {
            backgroundColor = '#f39c12'; // Naranja para valores medios
            
        } else {
            backgroundColor = '#2ecc71'; // Verde para valores altos
        }
        
        ratingValue.style.backgroundColor = backgroundColor;
        ratingValue.style.color = 'white';
        ratingValue.style.padding = '2px 6px';
        ratingValue.style.borderRadius = '3px';
    });
    
    // Inicializar el estilo del rating
    ratingInput.dispatchEvent(new Event('input'));
    
    // Manejar la navegación hacia adelante
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionNumber = parseInt(this.getAttribute('data-section'));
            // Simplemente pasar a la siguiente sección, no se necesita validación
            document.getElementById(`section${sectionNumber}`).classList.remove('active');
            currentSection = sectionNumber + 1;
            document.getElementById(`section${currentSection}`).classList.add('active');
            updateProgress();
            window.scrollTo(0, 0);
        });
    });
    
    // Manejar la navegación hacia atrás
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionNumber = parseInt(this.getAttribute('data-section'));
            
            // Ocultar sección actual
            document.getElementById(`section${sectionNumber}`).classList.remove('active');
            
            // Mostrar sección anterior
            currentSection = sectionNumber - 1;
            document.getElementById(`section${currentSection}`).classList.add('active');
            
            // Actualizar barra de progreso y contador de página
            updateProgress();
            
            // Desplazar hacia arriba
            window.scrollTo(0, 0);
        });
    });
    
    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        
        document.querySelector('.submit-btn').disabled = true;
        document.querySelector('.submit-btn').textContent = 'Enviando...';
        
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('¡Gracias! Tu encuesta ha sido enviada correctamente.');
            console.log('Respuesta del servidor:', data);
            form.reset();
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById('section1').classList.add('active');
            currentSection = 1;
            updateProgress();
        })
        .catch(error => {
            alert('Lo sentimos, ha ocurrido un error al enviar la encuesta. Por favor, inténtalo de nuevo.');
            console.error('Error:', error);
        })
        .finally(() => {
            document.querySelector('.submit-btn').disabled = false;
            document.querySelector('.submit-btn').textContent = 'Enviar Encuesta';
        });
    });
    
    // Función para actualizar la barra de progreso
    function updateProgress() {
        const progress = (currentSection / totalSections) * 100;
        progressBar.style.width = `${progress}%`;
        currentPageSpan.textContent = currentSection;
    }
    
    // Función para validar cada sección
    function validateSection(sectionNumber) {
        let valid = true;
        const section = document.getElementById(`section${sectionNumber}`);
        
        // // Reiniciar mensajes de error
        // section.querySelectorAll('.error-message').forEach(msg => {
        //     msg.textContent = '';
        // });
        
        // // Reiniciar estilos de error
        // section.querySelectorAll('.error').forEach(field => {
        //     field.classList.remove('error');
        // });
        
        // // Validar campos obligatorios según la sección
        // if (sectionNumber === 1) {
        //     // La validación ya se realiza en tiempo real, solo verificamos el estado
        //     valid = !document.getElementById('nameError').textContent &&
        //            !document.getElementById('emailError').textContent &&
        //            !document.getElementById('phoneError').textContent &&
        //            document.getElementById('name').value.trim() !== '' &&
        //            document.getElementById('email').value.trim() !== '' &&
        //            document.getElementById('phone').value.trim() !== '';
        // } else if (sectionNumber === 2) {
        //     valid = validateField('product', 'Por favor, introduce el producto comprado.') && valid;
        //     valid = validateField('purchaseDate', 'Por favor, selecciona la fecha de compra.') && valid;
        // } else if (sectionNumber === 3) {
        //     valid = validateField('birthDate', 'Por favor, selecciona tu fecha de nacimiento.') && valid;
        //     valid = validateField('zodiac', 'Por favor, selecciona tu signo del zodiaco.') && valid;
        //     valid = validateRadio('recommend', 'recommendError', 'Por favor, indica si recomendarías nuestro producto.') && valid;
        //     valid = validateRadio('service', 'serviceError', 'Por favor, califica nuestro servicio al cliente.') && valid;
        //     valid = validateCheckboxGroup('features', 'featuresError', 'Por favor, selecciona al menos una característica.') && valid;
        // } else if (sectionNumber === 4) {
        //     valid = validateTimeRange() && valid;
        //     valid = validateCheckboxGroup('paymentMethods', 'paymentMethodsError', 'Por favor, selecciona al menos un método de pago.') && valid;
        //     valid = validateRadio('frequency', 'frequencyError', 'Por favor, indica la frecuencia de compra.') && valid;
        // }
        
        return valid;
    }
    
    // Función para validar un campo básico
    function validateField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (!field.value.trim()) {
            errorElement.textContent = errorMessage;
            field.classList.add('error');
            return false;
        } else {
            errorElement.textContent = ''; // Limpiar mensaje de error
            field.classList.remove('error'); // Quitar clase de error
            return true;
        }
    }

    
    // Función para validar email
    function validateEmail(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!field.value.trim() || !emailRegex.test(field.value)) {
            errorElement.textContent = errorMessage;
            field.classList.add('error');
            return false;
        } else {
            errorElement.textContent = ''; // Limpiar mensaje de error
            field.classList.remove('error'); // Quitar clase de error
            return true;
        }
    }
    
    // Función para validar teléfono
    function validatePhone(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        const phoneRegex = /^[0-9]{9}$/;
        
        if (!field.value.trim() || !phoneRegex.test(field.value)) {
            errorElement.textContent = errorMessage;
            field.classList.add('error');
            return false;
        } else {
            errorElement.textContent = ''; // Limpiar mensaje de error
            field.classList.remove('error'); // Quitar clase de error
            return true;
        }
    }
    
    // Función para validar radio buttons
    function validateRadio(name, errorId, errorMessage) {
        const radioButtons = document.querySelectorAll(`input[name="${name}"]`);
        const errorElement = document.getElementById(errorId);
        let checked = false;
        
        radioButtons.forEach(radio => {
            if (radio.checked) {
                checked = true;
            }
        });
        
        if (!checked) {
            errorElement.textContent = errorMessage;
            return false;
        }
        
        return true;
    }
    
    // Función para validar grupos de checkbox
    function validateCheckboxGroup(name, errorId, errorMessage) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
        const errorElement = document.getElementById(errorId);
        let checked = false;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checked = true;
            }
        });
        
        if (!checked) {
            errorElement.textContent = errorMessage;
            return false;
        }
        
        return true;
    }
    
    // Función para validar el rango de tiempo
    function validateTimeRange() {
        const startTime = document.getElementById('timeRangeStart');
        const endTime = document.getElementById('timeRangeEnd');
        const errorElement = document.getElementById('timeRangeError');
        
        if (!startTime.value || !endTime.value) {
            errorElement.textContent = 'Por favor, selecciona un rango de horas completo.';
            if (!startTime.value) startTime.classList.add('error');
            if (!endTime.value) endTime.classList.add('error');
            return false;
        }
        
        // Validar que la hora de fin sea posterior a la de inicio
        if (startTime.value >= endTime.value) {
            errorElement.textContent = 'La hora de fin debe ser posterior a la hora de inicio.';
            startTime.classList.add('error');
            endTime.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    // Calcular el signo del zodíaco basado en la fecha de nacimiento
    document.getElementById('birthDate').addEventListener('change', function() {
        const birthDate = new Date(this.value);
        if (!isNaN(birthDate.getTime())) {
            const zodiacSign = calculateZodiacSign(birthDate.getMonth() + 1, birthDate.getDate());
            document.getElementById('zodiac').value = zodiacSign.toLowerCase();
            
            // Cambiar el color de fondo según el signo del zodíaco
            updateZodiacTheme(zodiacSign);
        }
    });
    
    // Función para calcular el signo del zodíaco
    function calculateZodiacSign(month, day) {
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
            return 'aries';
        } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
            return 'tauro';
        } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
            return 'geminis';
        } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
            return 'cancer';
        } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
            return 'leo';
        } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
            return 'virgo';
        } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
            return 'libra';
        } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
            return 'escorpio';
        } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
            return 'sagitario';
        } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
            return 'capricornio';
        } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
            return 'acuario';
        } else {
            return 'piscis';
        }
    }
    
    // Función para actualizar el tema según el signo del zodíaco
    function updateZodiacTheme(sign) {
        let themeColor;
        
        switch(sign) {
            case 'aries':
                themeColor = '#FF5733';
                break;
            case 'tauro':
                themeColor = '#77DD77';
                break;
            case 'geminis':
                themeColor = '#FFD700';
                break;
            case 'cancer':
                themeColor = '#C3B1E1';
                break;
            case 'leo':
                themeColor = '#FF7F50';
                break;
            case 'virgo':
                themeColor = '#9FE2BF';
                break;
            case 'libra':
                themeColor = '#F08080';
                break;
            case 'escorpio':
                themeColor = '#800000';
                break;
            case 'sagitario':
                themeColor = '#6495ED';
                break;
            case 'capricornio':
                themeColor = '#654321';
                break;
            case 'acuario':
                themeColor = '#40E0D0';
                break;
            case 'piscis':
                themeColor = '#1E90FF';
                break;
            default:
                themeColor = '#3498db';
        }
        
        // Aplicar el color temático a varios elementos
        document.getElementById('favoriteColor').value = themeColor;
        
        // Opcional: Cambiar el color de los encabezados y botones también
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            h2 { color: ${themeColor} !important; }
            .next-btn, .submit-btn { background-color: ${themeColor} !important; }
            .progress-bar { background-color: ${themeColor} !important; }
        `;
        
        // Eliminar estilos anteriores si existen
        const oldStyle = document.getElementById('zodiacThemeStyle');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        // Añadir nuevos estilos
        styleElement.id = 'zodiacThemeStyle';
        document.head.appendChild(styleElement);
    }

    document.getElementById('favoriteColor').addEventListener('change', function() {
        const newColor = this.value;
        updateThemeColor(newColor);
    });

    // Función para actualizar el tema de la página
    function updateThemeColor(color) {
        // Aplicar el color temático a varios elementos
        document.getElementById('favoriteColor').value = color;

        // Opcional: Cambiar el color de los encabezados y botones también
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            h2 { color: ${color} !important; }
            .next-btn, .submit-btn { background-color: ${color} !important; }
            .progress-bar { background-color: ${color} !important; }
        `;

        // Eliminar estilos anteriores si existen
        const oldStyle = document.getElementById('themeColorStyle');
        if (oldStyle) {
            oldStyle.remove();
        }

        // Añadir nuevos estilos
        styleElement.id = 'themeColorStyle';
        document.head.appendChild(styleElement);
    }

    // Agregar validación en tiempo real para la sección de información personal
    document.getElementById('name').addEventListener('blur', function() {
        validateField('name', 'Por favor, introduce tu nombre.');
    });

    document.getElementById('email').addEventListener('blur', function() {
        validateEmail('email', 'Por favor, introduce un correo electrónico válido.');
    });

    document.getElementById('phone').addEventListener('blur', function() {
        validatePhone('phone', 'Por favor, introduce un número de teléfono válido (9 dígitos).');
    });

    // Agregar restricción de máximo 9 caracteres numéricos al input de teléfono
    document.getElementById('phone').addEventListener('input', function(e) {
        // Remover cualquier carácter que no sea número
        this.value = this.value.replace(/\D/g, '');
        
        // Limitar a 9 caracteres
        if (this.value.length > 9) {
            this.value = this.value.slice(0, 9);
        }
    });
    
});