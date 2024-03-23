import { SendRegistrationType, SendResetPasswordRequestType } from 'src/core/types/email';

export const registration = (attributes: SendRegistrationType) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Welcome to ${process.env.APP_NAME}</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
      <div style="background-color: #f4f4f4; padding: 20px;">
        <h1>Welcome to ${process.env.APP_NAME}!</h1>
        <p>Dear ${attributes.values.firstName},</p>
        <p>Thank you for joining us! Your registration is almost complete. Please use the following registration code to activate your account:</p>
        
        <div style="background-color: #ffffff; border: 1px solid #cccccc; padding: 15px; margin-bottom: 15px;">
          <p style="font-size: 18px; margin: 0;">Registration Code: <strong>${attributes.values.confirmationCode}</strong></p>
        </div>

        <p>Please click on the activation link below to complete the registration process:</p>
        
        <p><a href="${attributes.values.activationLink}" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Activate Your Account</a></p>
        
        <p>If the above button doesn't work, you can also copy and paste the following URL into your web browser:</p>
        <p>${attributes.values.activationLink}</p>
        
        <p>We are excited to have you on board! If you have any questions or need assistance, please feel free to contact us.</p>

        <p>Best Regards,<br> The ${process.env.APP_NAME} Team</p>
      </div>
    </body>
  </html>
`;

export const resetPassword = ({ values: { firstName, passwordResetLink } }: SendResetPasswordRequestType) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Let's Reset Your Password</title>
  </head>
  <body style="font-family: Arial, sans-serif;">

    <table style="max-width: 600px; margin: 0 auto; padding: 20px; border-collapse: collapse;">
      <tr>
        <td style="background-color: #f8f8f8; text-align: center; padding: 20px;">
          <h2>Let's Reset Your Password</h2>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <p>Dear ${firstName},</p>
          <p>You have requested to reset your password. Please click the link below to reset it:</p>
          <p><a href="${passwordResetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Reset Password</a></p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thank you!</p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f8f8f8; text-align: center; padding: 20px;">
          <p style="font-size: 12px; color: #888;">This email was sent to you because of a password reset request. If you didn't initiate this request, please ignore this email.</p>
        </td>
      </tr>
    </table>

  </body>
  </html>
`;
