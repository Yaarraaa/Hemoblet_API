const nodemailer = require('nodemailer')

const sendEmail = async (userEmail, subject, htmlTemplate) => {
   try {
      const transport = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.APP_EMAIL_ADDRESS,
            pass: process.env.APP_EMAIL_PASSWORD,
         },
      });
      const mailOptions = {
         from: process.env.APP_EMAIL_ADDRESS,
         to: userEmail,
         subject: subject,
         html: htmlTemplate,
      };
      const info = await transport.sendMail(mailOptions);
      console.log(info.response);
   } catch (err) {
      console.log(err);
      throw new Error('Internal server Error with nodemailer');
   }
};

module.exports = {
    sendEmail
}