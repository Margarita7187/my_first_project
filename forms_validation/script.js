document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const inputs = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        terms: document.getElementById('terms')
    };

    const errors = {
        firstName: document.getElementById('firstNameError'),
        lastName: document.getElementById('lastNameError'),
        email: document.getElementById('emailError'),
        phone: document.getElementById('phoneError'),
        password: document.getElementById('passwordError'),
        confirmPassword: document.getElementById('confirmPasswordError'),
        terms: document.getElementById('termsError')
    };

    Object.keys(inputs).forEach(field => {
        if (inputs[field]) {
            inputs[field].addEventListener('input', function() {
                validateField(field);
            });
            
            inputs[field].addEventListener('blur', function() {
                validateField(field);
            });
        }
    });

    inputs.password.addEventListener('input', function() {
        if (inputs.confirmPassword.value) {
            validateField('confirmPassword');
        }
    });

    function validateField(field) {
        const input = inputs[field];
        const error = errors[field];
        
        if (!input || !error) return;

        let isValid = true;
        let message = '';

        switch(field) {
            case 'firstName':
            case 'lastName':
                isValid = input.value.trim().length > 0;
                message = 'Пожалуйста, заполните это поле';
                break;
                
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                message = 'Пожалуйста, введите корректный email';
                break;
                
            case 'phone':
                if (input.value.trim()) {
                    isValid = /^[\+]?[0-9\s\-\(\)]{10,}$/.test(input.value);
                    message = 'Пожалуйста, введите корректный номер телефона';
                } else {
                    isValid = true;
                }
                break;
                
            case 'password':
                isValid = input.value.length >= 6;
                message = 'Пароль должен содержать минимум 6 символов';
                break;
                
            case 'confirmPassword':
                isValid = input.value === inputs.password.value;
                message = 'Пароли не совпадают';
                break;
                
            case 'terms':
                isValid = input.checked;
                message = 'Необходимо принять условия соглашения';
                break;
        }

        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            error.classList.remove('show');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            error.textContent = message;
            error.classList.add('show');
        }

        return isValid;
    }

    function validateForm() {
        let isFormValid = true;
        
        Object.keys(inputs).forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            alert('Форма успешно отправлена!');
            form.reset();
            
            // Сброс стилей
            Object.keys(inputs).forEach(field => {
                if (inputs[field]) {
                    inputs[field].classList.remove('valid', 'invalid');
                }
            });
            
            Object.keys(errors).forEach(field => {
                if (errors[field]) {
                    errors[field].classList.remove('show');
                }
            });
        } else {
            alert('Пожалуйста, исправьте ошибки в форме');
        }
    });
});