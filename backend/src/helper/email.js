const nodemailer = require("nodemailer");
const { smtpUser, smtpPassword } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

const emailWithNodeMailer = async (emailData)=>{
   
    console.log(emailData);
    
    
    try {
        const mailOptions = {
            from: smtpUser, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            text: emailData.text, // plain text body
            html: emailData.html, // html body
        }
        
        const info  = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.response);
        
    } catch (error) {
        console.log("error occurred while sending email", error);
        
        throw error;
    }
     
}

module.exports =  {emailWithNodeMailer};
