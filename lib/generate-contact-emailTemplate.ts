interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export const generateContactEmailTemplate = (formData: ContactFormData) => {
  const fullName = `${formData.firstName} ${formData.lastName}`;

  return {
    subject: `New Contact: ${formData.subject}`,
    from: formData.email,
    message: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.6;
          }
          
          .wrapper {
            background-color: #f5f5f5;
            padding: 40px 20px;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 40px 32px;
            text-align: center;
            border-bottom: 2px solid #0066ff;
          }
          
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.5px;
            margin-bottom: 12px;
          }
          
          .header-subtitle {
            font-size: 14px;
            color: #b3b3b3;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1.2px;
          }
          
          .content {
            padding: 40px 32px;
          }
          
          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 24px;
          }
          
          .field-group {
            margin-bottom: 28px;
          }
          
          .field-label {
            font-size: 12px;
            font-weight: 700;
            color: #666666;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 8px;
            display: block;
          }
          
          .field-value {
            font-size: 15px;
            color: #1a1a1a;
            background-color: #f8f8f8;
            padding: 14px 16px;
            border-radius: 8px;
            border-left: 3px solid #0066ff;
            word-wrap: break-word;
            white-space: pre-wrap;
          }
          
          .divider {
            height: 1px;
            background-color: #e8e8e8;
            margin: 32px 0;
          }
          
          .footer {
            padding: 24px 32px;
            background-color: #f8f8f8;
            text-align: center;
            border-top: 1px solid #e8e8e8;
          }
          
          .footer-text {
            font-size: 13px;
            color: #999999;
            line-height: 1.5;
          }
          
          .footer-link {
            color: #0066ff;
            text-decoration: none;
            font-weight: 500;
          }
          
          .footer-link:hover {
            text-decoration: underline;
          }
          
          .accent {
            color: #0066ff;
            font-weight: 600;
          }
          
          .message-content {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          
          @media (max-width: 600px) {
            .container {
              border-radius: 0;
            }
            
            .header {
              padding: 32px 24px;
            }
            
            .content {
              padding: 28px 24px;
            }
            
            .footer {
              padding: 20px 24px;
            }
            
            .greeting {
              font-size: 16px;
            }
            
            .field-value {
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <!-- Header -->
            <div class="header">
              <div class="logo">FastLink</div>
              <div class="header-subtitle">New Contact Submission</div>
            </div>
            
            <!-- Content -->
            <div class="content">
              <div class="greeting">Hi there,</div>
              
              <p style="font-size: 15px; color: #666666; margin-bottom: 32px;">You've received a new message from your FastLink contact form. Here are the details:</p>
              
              <!-- Name Field -->
              <div class="field-group">
                <label class="field-label">Full Name</label>
                <div class="field-value">${fullName}</div>
              </div>
              
              <!-- Email Field -->
              <div class="field-group">
                <label class="field-label">Email Address</label>
                <div class="field-value">
                  <a href="mailto:${formData.email}" style="color: #0066ff; text-decoration: none; font-weight: 500;">${formData.email}</a>
                </div>
              </div>
              
              <!-- Subject Field -->
              <div class="field-group">
                <label class="field-label">Subject</label>
                <div class="field-value">${formData.subject}</div>
              </div>
              
              <!-- Message Field -->
              <div class="field-group">
                <label class="field-label">Message</label>
                <div class="field-value message-content">${formData.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <p class="footer-text">
                This email was automatically sent from your <span class="accent">FastLink</span> contact form.<br>
                Please reply directly to the sender's email address above to respond.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,

    text: `
FastLink – New Contact Submission

Hi there,

You've received a new message from your FastLink contact form. Here are the details:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full Name
${fullName}

Email Address
${formData.email}

Subject
${formData.subject}

Message
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was automatically sent from your FastLink contact form.
Please reply directly to the sender's email address above to respond.
    `,
  };
};
