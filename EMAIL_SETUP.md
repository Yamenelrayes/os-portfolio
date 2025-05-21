# Setting Up EmailJS for Contact Form

To make your contact form actually send emails, follow these steps to set up EmailJS:

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. The free tier allows 200 emails per month, which should be sufficient for a portfolio website

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Give your service a name and click "Create Service"
6. Note down the **Service ID**

## Step 3: Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template. Here's a simple example:
   - **Subject**: New message from {{from_name}}
   - **Content**:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     
     Message:
     {{message}}
     ```
4. Save the template and note down the **Template ID**

## Step 4: Get Your User ID

1. In your EmailJS dashboard, go to "Account" > "API Keys"
2. Copy your **User ID**

## Step 5: Update Your Code

1. Open `src/components/Windows/ContactWindow.js`
2. Replace the placeholder values with your actual IDs:
   - Replace `YOUR_USER_ID` with your EmailJS User ID
   - Replace `YOUR_SERVICE_ID` with your EmailJS Service ID
   - Replace `YOUR_TEMPLATE_ID` with your EmailJS Template ID

Example:
```javascript
// Initialize EmailJS with your user ID
useEffect(() => {
  emailjs.init("user_abc123XYZ"); // Replace with your actual User ID
}, []);

// Inside handleSubmit function
emailjs.send(
  'service_xyz789', // Replace with your actual Service ID
  'template_abc456', // Replace with your actual Template ID
  templateParams
)
```

## Step 6: Test Your Form

After setting up EmailJS and updating your code, test your contact form by submitting a test message. You should receive the email at the address associated with your EmailJS service.

## Troubleshooting

- If emails are not sending, check the browser console for error messages
- Make sure all IDs are correctly copied from EmailJS
- Verify that your email service is properly connected in EmailJS dashboard 