
---------------------------------------------------------
Deployment Checklist for shop-frontend on Github pages
--------------------------------------------------------
1. cd AISHOP/shop-frontend npm install gh-pages --save-dev
2. In the shop-frontend/package.json, add the homepage field: { "homepage": "https://thanharmstrong86.github.io/AISHOP/" }
3. In shop-frontend/package.json, add the following scripts: "scripts": { "predeploy": "npm run build", "deploy": "gh-pages -d build" }
4. cd AISHOP
 git init 
 git remote add origin git@github.com/AISHOP.git
 git add . git commit -m "Initial commit" git push origin main
5. cd AISHOP/shop-frontend 
 npm run deploy
6. Go to your repository settings on GitHub:
 Navigate to Settings > Pages.
 Under Source, select the branch gh-pages and the root directory.
7. Visit https://thanharmstrong86.github.io/AISHOP/

--------------------------------------------------
Deployment Checklist for shop-backend on Render
-------------------------------------------------
1. Set Up Render Account and Link GitHub Repository:
Link your GitHub account to Render to give access to the AISHOP repository.
Create a New Web Service:
Select New > Web Service and connect your repository.
Choose the branch with your shop-backend code (typically main).
2. Configure Service Settings:
Name: Set as shop-backend.
Root Directory: Specify shop-backend if it’s in a subdirectory within the repository.
Build and Start Commands:
Build Command: Set to npm install if Render doesn’t detect it automatically.
Start Command: Set to node app.js (or replace app.js with the actual entry file if different).
3. Environment Variables:
Add MONGO_URI with your MongoDB connection string in Render’s Environment settings.
Port Configuration:
Ensure app.js listens on process.env.PORT:

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

4. Deploy:
Click Create Web Service to start deployment. Monitor the logs to verify a successful build and deployment.
Access and Test:
Use the URL provided by Render (e.g., https://shop-backend.onrender.com) to test API endpoints.

------------------------------------------------------
Cloudinary (Free tier with generous limits):
------------------------------------------------------
1. Pros: More storage and usage options, reliable, supports transformations (resizing, cropping, etc.).
2. Cons: Requires a free account and initial setup.
3. How to Use:
Sign up for a free account on Cloudinary.
After logging in, go to the Media Library and upload your images.
Copy the URL for each image you upload.
Use these URLs in your backend instead of hardcoded file paths.

------------------------------------------------------
To add a contact form with email notifications on the "About" (or "Contact Us") page, we’ll do the following:
------------------------------------------------------

1. **Create the Contact Form**: Add fields for name, email, and message.
2. **Send Email Notifications**: Set up an email service to notify the shop owner of new inquiries. We’ll use an email API service, such as **EmailJS** (or SendGrid for more advanced setups) to send emails directly from the frontend.

---

### Step 1: Add a Contact Form on the About Page

Add a contact form with `name`, `email`, and `message` fields to `About.js`.
Ex: Add to About.js `setFormData({ name: '', email: '', message: '' });`
---

### Step 2: Sending Email Notifications

To send the form data as an email, we can use an email API service like **EmailJS** to send emails directly from the frontend.

#### Configure EmailJS (or Similar Service)

1. **Sign Up on EmailJS**:
   - Go to [EmailJS](https://www.emailjs.com/) and create an account.
   - Set up a new email service and create a template that matches the contact form fields (name, email, message).

2. **Install EmailJS in the Project**:

   ```bash
   npm install emailjs-com
   ```

3. **Integrate EmailJS in `handleSubmit`**:

   Import `emailjs` and use it in the `handleSubmit` function in `About.js`.

   ```javascript
   import emailjs from 'emailjs-com';

   const sendEmail = async (formData) => {
     try {
       const result = await emailjs.send(
         'YOUR_SERVICE_ID',
         'YOUR_TEMPLATE_ID',
         formData,
         'YOUR_USER_ID'
       );
       return result;
     } catch (error) {
       throw new Error('Failed to send email');
     }
   };
   ```

Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_USER_ID` with your actual EmailJS credentials. 

---

### Explanation

- **Contact Form**: A form that collects `name`, `email`, and `message`, with a loading state and success/error feedback.
- **Email Notification**: Using EmailJS or similar, `sendEmail` sends the form data as an email to the shop owner.
