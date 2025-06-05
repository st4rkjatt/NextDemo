import bcrypt from "bcryptjs";
import User from "../../models/userModel";
import nodemailer from "nodemailer";

export const sendMail = async (to: string, type: string, id: string) => {
    try {
        const hashToken = bcrypt.hashSync(id.toString(), 10);
        if (type === 'verify') {
            await User.findByIdAndUpdate(id, {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now() + 8 * 60 * 60 * 1000 // 8 hours
            });
        }
        else if (type === 'reset') {
            await User.findByIdAndUpdate(id, {
                forgotPasswordToken: hashToken,
                forgotPasswordTokenExpiry: Date.now() + 15 * 60 * 1000 // 15 minutes
            });
        }




        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        // Wrap in an async IIFE so we can use await.
        (async () => {
            const info = await transporter.sendMail({
                from: 'starkjatt594@gmail.com',
                to: to,
                subject: type === 'verify' ? "Verify  your account" : "Reset your password",
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            background-color: #2563eb;
            color: white !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
        }
        .code {
            font-family: monospace;
            font-size: 24px;
            letter-spacing: 4px;
            background: #f5f5f5;
            padding: 10px 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
              
        <h1>Verify Your Email Address</h1>
        
        <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
        
        <a href=${process.env.DOMAIN}/verifyemail?token=${hashToken} class="button">Verify Email</a>        
        <p>If you didn't create an account with us, please ignore this email.</p>
        
        <div class="footer">
            <p>© 2023 YourAppName. All rights reserved.</p>
            <p>1234 App Street, Tech City, TC 10001</p>
        </div>
    </div>
</body>
</html>`, // HTML body
            });

            console.log("Message sent:", info.messageId);
        })();


    } catch (error: any) {
        console.error("Error updating user for verification:", error);
        throw new Error(error.message);
    }
}