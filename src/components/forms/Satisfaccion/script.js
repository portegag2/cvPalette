document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm');
    const sections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const progressBar = document.getElementById('progressBar');
    const currentPageSpan = document.getElementById('currentPage');
    const ratingInput = document.getElementById('rating');
    const ratingValue = document.getElementById('ratingValue');
    
    const totalSections = 2;
    let currentSection = 1;
    
    // Ensure section 1 is active initially
    document.getElementById('section1').classList.add('active');
    
    // Update progress calculation
    function updateProgress() {
        const progress = (currentSection / totalSections) * 100;
        progressBar.style.width = `${progress}%`;
        currentPageSpan.textContent = currentSection;
    }
    
    // Initial progress update
    updateProgress();
    
    // Update rating value display
    ratingInput.addEventListener('input', function() {
        ratingValue.textContent = this.value;
    });
    
    // Handle next button clicks
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionNumber = parseInt(this.getAttribute('data-section'));
            document.getElementById(`section${sectionNumber}`).classList.remove('active');
            currentSection = sectionNumber + 1;
            document.getElementById(`section${currentSection}`).classList.add('active');
            updateProgress();
            window.scrollTo(0, 0);
        });
    });
    
    // Handle previous button clicks
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionNumber = parseInt(this.getAttribute('data-section'));
            document.getElementById(`section${sectionNumber}`).classList.remove('active');
            currentSection = sectionNumber - 1;
            document.getElementById(`section${currentSection}`).classList.add('active');
            updateProgress();
            window.scrollTo(0, 0);
        });
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateSection(3)) {
            const formData = new FormData(form);
            
            document.querySelector('.submit-btn').disabled = true;
            document.querySelector('.submit-btn').textContent = 'Sending...';
            
            fetch('https://httpbin.org/post', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('Thank you! Your survey has been submitted.');
                console.log('Server response:', data);
                form.reset();
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById('section1').classList.add('active');
                currentSection = 1;
                updateProgress();
            })
            .catch(error => {
                alert('Sorry, there was an error submitting the survey. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                document.querySelector('.submit-btn').disabled = false;
                document.querySelector('.submit-btn').textContent = 'Submit Survey';
            });
        }
    });
    
    // Validate section fields
    function validateSection(sectionNumber) {
        const section = document.getElementById(`section${sectionNumber}`);
        const inputs = section.querySelectorAll('input[required], select[required], textarea[required]');
        let valid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                showError(input, 'This field is required');
            } else {
                clearError(input);
            }
        });
        
        return valid;
    }
    
    // Show error message
    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
        input.classList.add('error');
    }
    
    // Clear error message
    function clearError(input) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        input.classList.remove('error');
    }
});