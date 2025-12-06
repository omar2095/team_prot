# Innovetronics Robotics Team - Portfolio Website Setup Guide

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- EmailJS account (for contact form functionality)
- Text editor or VS Code

---

## 📋 File Structure

```
my_website/
├── index.html          # Main HTML file
├── style.css           # Complete styling
├── script.js           # All JavaScript functionality
├── Logo.jpg            # Team logo (place in root)
├── Design.JPG          # Department image
├── Ai.JPG              # Department image
├── Electronics.JPG     # Department image
├── Software.JPG        # Department image
├── project-01.jpg      # Through project-09.jpg (optional)
└── [member photos]     # Member photos (optional)
```

---

## ⚙️ EmailJS Setup (For Contact Form)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Create a new email service (Gmail recommended)
4. Create a new email template

### Step 2: Get Your Credentials
- **Public Key**: Found in EmailJS dashboard under Account settings
- **Service ID**: Created when setting up your email service
- **Template ID**: Created when setting up your email template

### Step 3: Update Script
Replace the placeholders in `script.js`:

```javascript
// Line ~465 - Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your public key

// Line ~471 - Send form
const response = await emailjs.sendForm(
    'SERVICE_ID',      // Replace with your service ID
    'TEMPLATE_ID',     // Replace with your template ID
    contactForm
);
```

**Example EmailJS Template Variables:**
```
From: {{from_name}}
Email: {{email}}
Message: {{message}}
```

---

## 🎨 Features & Customization

### 1. Team Section
- ✅ Team leader profile with links
- ✅ Department cards with member modal
- ✅ Member photos with fallback emoji
- **To customize**: Edit `departmentData` in `script.js`

### 2. Projects Gallery
- ✅ 9 professional project cards
- ✅ Category filtering (All, AI, Robotics, Hardware, Software)
- ✅ 3D flip animation on hover
- ✅ Lightbox for detailed view
- **To add projects**: Edit `projectsData` in `script.js`

**Project data structure:**
```javascript
{
    id: '01',
    title: 'Project Title',
    category: 'Category Name',
    filter: 'ai',  // ai, robotics, hardware, software
    description: 'Project description',
    image: 'project-01.jpg',
    github: 'https://github.com/...',
    drive: 'https://drive.google.com/...',
    media: 'https://youtu.be/...',
    tags: ['Tag1', 'Tag2', 'Tag3']
}
```

### 3. Contact Form
- ✅ Real-time validation
- ✅ Success/error messages
- ✅ EmailJS integration
- ✅ Responsive design

**Validation includes:**
- Name (minimum 2 characters)
- Email (valid format)
- Message (minimum 10 characters)

### 4. Animations
- ✅ Hero section with 3D rotating robot cube
- ✅ Typing effect on subtitle
- ✅ CTA button with ripple effect
- ✅ Particle system on mouse movement
- ✅ 3D project cards
- ✅ Smooth scroll animations

---

## 📱 Responsive Design

- **Desktop** (1024px+): Full features, 3 columns for projects
- **Tablet** (768px-1023px): Optimized layout, 2 columns
- **Mobile** (< 768px): Stack layout, touch-friendly buttons

---

## 🔧 Customization Tips

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --dark-bg: #0a0e27;
    --primary-blue: #00d9ff;
    --secondary-blue: #0099ff;
    /* ... more colors ... */
}
```

### Update Team Members
Edit `departmentData` in `script.js`:
```javascript
members: [
    {
        name: 'Member Name',
        role: 'Role Title',
        email: 'email@example.com',
        github: 'https://github.com/...',
        cv: 'https://drive.google.com/...',
        photo: 'member-photo.jpg'
    }
]
```

### Add More Projects
Add to `projectsData` array:
```javascript
{
    id: '10',
    title: 'Your Project',
    category: 'Category',
    filter: 'ai',
    // ... rest of fields
}
```

---

## 🖼️ Required Images

### Department Images (in root folder)
- `Logo.jpg` - Team logo in header
- `Design.JPG` - Mechanical Design department
- `Ai.JPG` - AI Department
- `Electronics.JPG` - Electronics Department
- `Software.JPG` - Software Department

### Project Images (optional, in root folder)
- `project-01.jpg` through `project-09.jpg`

### Member Photos (optional, in root folder)
- Used by names in departmentData

**If image not found**, system gracefully handles it with fallback emoji.

---

## 🚨 Troubleshooting

### Contact Form Not Working
1. Check EmailJS credentials are correct
2. Verify EmailJS service is active
3. Check browser console for errors (F12)
4. Ensure email service is properly configured

### Images Not Showing
1. Verify image filenames match exactly (case-sensitive)
2. Ensure images are in the same folder as HTML
3. Check browser console for 404 errors
4. Try with full URL instead of relative path

### Animations Not Working
1. Check browser compatibility (modern browsers only)
2. Disable browser extensions that block JavaScript
3. Clear browser cache (Ctrl+Shift+Delete)
4. Verify JavaScript is enabled

### Form Validation Not Showing
1. Open browser console (F12) for JavaScript errors
2. Verify form field IDs match in HTML and JS
3. Check that error message elements exist

---

## 📊 Analytics & Tracking

To add Google Analytics:
```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 🔒 Security Notes

- EmailJS credentials are public-facing in client code (normal for EmailJS)
- Always validate form input on server-side as well
- Never commit real API keys to version control
- Use environment variables for sensitive data in production

---

## 📈 Performance Optimization

### Lazy Loading
Images with `data-src` attribute will load on scroll:
```html
<img data-src="image.jpg" alt="Description">
```

### Minification
For production, minify CSS and JavaScript:
- CSS: Use online minifiers or build tools
- JS: Use UglifyJS or Terser

### Image Optimization
- Use WebP format for better compression
- Compress images with TinyPNG or similar
- Use responsive images with `srcset`

---

## 🎯 Best Practices

1. **Keep It Updated**
   - Update project information regularly
   - Refresh team member photos
   - Add new achievements

2. **SEO Optimization**
   - Update meta descriptions
   - Use semantic HTML
   - Add structured data (schema.org)

3. **Accessibility**
   - Test with screen readers
   - Use proper heading hierarchy
   - Add alt text to all images

4. **Testing**
   - Test on multiple browsers
   - Test on mobile devices
   - Test form submission
   - Check all links work

---

## 📞 Support

For issues or questions:
- Check the console (F12) for error messages
- Review this guide's troubleshooting section
- Visit EmailJS documentation: https://www.emailjs.com/docs/
- Check CSS variables for styling issues

---

## 📄 License

This website template is provided as-is for Innovetronics Robotics Team.

---

**Version**: 2.0  
**Last Updated**: December 5, 2025  
**Status**: Production Ready ✅
