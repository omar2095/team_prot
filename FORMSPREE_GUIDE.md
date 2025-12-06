# Alternative: Formspree Integration Guide

If you prefer using **Formspree** instead of EmailJS, follow these steps:

## Setup Formspree

1. Go to https://formspree.io/
2. Sign up for a free account
3. Create a new form and get your form ID
4. Copy the form ID (looks like: `f/xxxxxxxxxxxxx`)

## Update HTML Contact Form

Replace the contact form in `index.html`:

```html
<!-- PAGE 6: Contact -->
<section id="contact" class="contact-section">
    <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-content">
            <div class="contact-form-wrapper">
                <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Your Name" required>
                        <span class="error-message" id="nameError"></span>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Your Email" required>
                        <span class="error-message" id="emailError"></span>
                    </div>
                    <div class="form-group">
                        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                        <span class="error-message" id="messageError"></span>
                    </div>
                    <button type="submit" class="submit-btn">Send Message</button>
                    <div class="form-message success-message" id="successMessage"></div>
                    <div class="form-message error-message-box" id="errorMessage"></div>
                </form>
            </div>
            <!-- Rest of contact section unchanged -->
        </div>
    </div>
</section>
```

**Replace `YOUR_FORM_ID` with your actual Formspree form ID!**

## Update JavaScript

Replace the `initContactForm()` function in `script.js`:

```javascript
// ============================================
// FORM VALIDATION & SUBMISSION (Formspree)
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous messages
        document.getElementById('successMessage').classList.remove('show');
        document.getElementById('errorMessage').classList.remove('show');
        
        // Validate form
        if (!validateForm()) return;
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showSuccessMessage('✓ Message sent successfully! We\'ll get back to you soon.');
                contactForm.reset();
                clearErrors();
            } else {
                showErrorMessage('✗ Failed to send message. Please try again later.');
            }
        } catch (error) {
            showErrorMessage('✗ Failed to send message. Please try again later.');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Send Message';
        }
    });
}
```

## Keep the Validation Functions

All other validation functions remain the same:
- `validateForm()`
- `showFieldError()`
- `clearErrors()`
- `showSuccessMessage()`
- `showErrorMessage()`

## Advantages of Formspree

✅ No API key management  
✅ Free tier includes 50 submissions/month  
✅ Easy setup (just add action attribute)  
✅ Built-in spam protection  
✅ Email forwarding  
✅ No frontend complexity  

## Advantages of EmailJS

✅ More submissions on free tier  
✅ More customization options  
✅ Better for high-traffic sites  
✅ Professional templates  
✅ Advanced features  

---

Choose based on your needs! Both solutions work perfectly.
