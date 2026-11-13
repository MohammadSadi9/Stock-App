import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.NODEMAILER_EMAIL!,
        pass:process.env.NODEMAILER_PASSWORD!,

    }
})




export const sendWelcomeEmail=async({name,email,intro}:WelcomeEmailData)=>{

    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}',name)
    .replace('{{intro}}',intro);

    const mailOptions={
        from:`"NextTrader" <saadialqureshi@gmail.com>`,
        to: email,
        subject:'Welcome to NextTrader, Your stock Market tool-kit is ready',
        text: 'Thank you for joining next trader',
        html:htmlTemplate,    
    }


try {
  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent:", info.messageId);
  console.log("Accepted:", info.accepted);
  console.log("Rejected:", info.rejected);
  console.log("SMTP response:", info.response);


  console.log(
    "Preview URL:",
    nodemailer.getTestMessageUrl(info)
  );

  return {
    success: true,
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  };
} catch (err) {
  console.error("Error while sending mail:", err);
  throw err; // Important: let Inngest know the step failed
}

}