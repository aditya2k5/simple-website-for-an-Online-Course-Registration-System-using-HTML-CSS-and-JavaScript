// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInputs = document.querySelectorAll('.name');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const ageInput = document.querySelector('input[type="number"]');
    const courseSelect = document.querySelector('#Course');

    // 1. Validate Student Name (combine first + last name, min 3 chars total)
    function validateName() {
        const fullName = nameInputs[0].value.trim() + nameInputs[1].value.trim();
        if (fullName.length < 3) {
            showError(nameInputs[0], 'Student name must have at least 3 characters');
            showError(nameInputs[1], '');
            return false;
        }
        clearError(nameInputs[0]);
        clearError(nameInputs[1]);
        return true;
    }

    // 2. Validate Email format
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Email ID must be in valid format (example@gmail.com)');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    // 3. Validate Password (min 6 characters)
    function validatePassword() {
        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password should be at least 6 characters long');
            return false;
        }
        clearError(passwordInput);
        return true;
    }

    // 4. Validate Age (18-60)
    function validateAge() {
        const age = parseInt(ageInput.value);
        if (isNaN(age) || age < 18 || age > 60) {
            showError(ageInput, 'Age should be between 18 and 60');
            return false;
        }
        clearError(ageInput);
        return true;
    }

    // 5. Validate Course Selection
    function validateCourse() {
        if (courseSelect.value === '') {
            showError(courseSelect, 'A course must be selected');
            return false;
        }
        clearError(courseSelect);
        return true;
    }

    // Show error message
    function showError(input, message) {
        input.style.borderColor = '#e74c3c';
        input.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
        
        // Add error message after input/select
        let errorMsg = input.parentNode.querySelector('.error-msg');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-msg';
            errorMsg.style.cssText = 'color: #e74c3c; font-size: 12px; margin-top: 5px;';
            input.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }

    // Clear error
    function clearError(input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
        const errorMsg = input.parentNode.querySelector('.error-msg');
        if (errorMsg) errorMsg.remove();
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual submit
        
        let isValid = true;
        
        // Run all validations
        isValid = validateName() && isValid;
        isValid = validateEmail() && isValid;
        isValid = validatePassword() && isValid;
        isValid = validateAge() && isValid;
        isValid = validateCourse() && isValid;
        
        // 6 & 7: Show alert + submit control
        if (isValid) {
            alert('Registration successful! All validations passed.');
            // form.reset(); // Uncomment to clear form
        } else {
            alert('Please fix the errors above before submitting.');
        }
    });

    // Real-time validation on input
    nameInputs.forEach(input => input.addEventListener('blur', validateName));
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    ageInput.addEventListener('blur', validateAge);
    courseSelect.addEventListener('change', validateCourse);
});
