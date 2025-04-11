// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // FAQ functionality
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Toggle current FAQ content
            const content = this.nextElementSibling;
            content.classList.toggle('hidden');
            
            // Rotate arrow
            const arrow = this.querySelector('.faq-arrow');
            arrow.classList.toggle('rotate-180');
        });
    });
    
    // Eligibility checker functionality
    const eligibilityForm = document.getElementById('eligibility-form');
    const eligibilityResults = document.getElementById('eligibility-results');
    const resultHeading = document.getElementById('result-heading');
    const resultMessage = document.getElementById('result-message');
    const eligibilityMeter = document.getElementById('eligibility-meter');
    
    if (eligibilityForm) {
        eligibilityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const businessAge = document.getElementById('business-age').value;
            const annualRevenue = document.getElementById('annual-revenue').value;
            const industry = document.getElementById('industry').value;
            const creditHistory = document.getElementById('credit-history').value;
            const loanAmount = document.getElementById('loan-amount').value;
            
            // Check if all fields are filled
            if (!businessAge || !annualRevenue || !industry || !creditHistory || !loanAmount) {
                alert('Please fill in all fields to check your eligibility.');
                return;
            }
            
            // Calculate eligibility score (simplified algorithm)
            let score = 0;
            
            // Business age scoring
            if (businessAge === 'less-than-1') score += 10;
            else if (businessAge === '1-2') score += 20;
            else if (businessAge === '2-5') score += 30;
            else if (businessAge === 'more-than-5') score += 40;
            
            // Annual revenue scoring
            if (annualRevenue === 'less-than-100k') score += 10;
            else if (annualRevenue === '100k-500k') score += 20;
            else if (annualRevenue === '500k-1m') score += 30;
            else if (annualRevenue === '1m-5m') score += 35;
            else if (annualRevenue === 'more-than-5m') score += 40;
            
            // Credit history scoring
            if (creditHistory === 'excellent') score += 20;
            else if (creditHistory === 'good') score += 15;
            else if (creditHistory === 'fair') score += 10;
            else if (creditHistory === 'poor') score += 5;
            else if (creditHistory === 'no-history') score += 7;
            
            // Calculate final percentage (max score would be 100)
            const eligibilityPercentage = score;
            
            // Update results
            eligibilityMeter.style.width = `${eligibilityPercentage}%`;
            
            if (eligibilityPercentage >= 70) {
                resultHeading.textContent = 'High Eligibility';
                resultHeading.className = 'text-xl font-semibold mb-4 text-center text-green-600';
                resultMessage.textContent = 'Congratulations! Based on the information provided, you have a high chance of qualifying for an ABSA SME loan. Start your application to receive a personalized offer.';
            } else if (eligibilityPercentage >= 40) {
                resultHeading.textContent = 'Moderate Eligibility';
                resultHeading.className = 'text-xl font-semibold mb-4 text-center text-yellow-600';
                resultMessage.textContent = 'You may qualify for an ABSA SME loan. We recommend proceeding with the application for a full assessment of your business.';
            } else {
                resultHeading.textContent = 'Limited Eligibility';
                resultHeading.className = 'text-xl font-semibold mb-4 text-center text-red-600';
                resultMessage.textContent = 'Based on the information provided, you may face challenges qualifying for our standard SME loan. We recommend speaking with one of our advisors to explore alternative financing options.';
            }
            
            // Show results
            eligibilityResults.classList.remove('hidden');
            
            // Scroll to results
            eligibilityResults.scrollIntoView({ behavior: 'smooth' });
        });
    }
});