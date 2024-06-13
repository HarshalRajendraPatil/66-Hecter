import catchAsync from "../utils/catchAsync.js";
import nodeMailer from "nodemailer";

const sendEmails = catchAsync(async (email, subject, htmlMsg) => {
  // Setting up the mail which will send the email
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Setting up the content of the email
  const mailOption = {
    from: {
      name: "66Hectors",
      address: process.env.EMAIL,
    },
    to: email,
    subject: subject,
    html: htmlMsg,
  };

  // Sending the mail to the given email
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      next(
        // Gives the error the global error middleware
        new CustomError("Failed to send the mail. Try again later", 500)
      );
    }
  });
});

export default sendEmails;
