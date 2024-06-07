import nodeMailer from "nodemailer";

// Fucntion for sending the mail of the reset-password and the response back to the user.
const sendResetPasswordMail = async function (name, email, token, next, res) {
  try {
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
        name: "ToonDig",
        address: process.env.EMAIL,
      },
      to: email,
      subject: "Reset Password",
      html: `<p>Hi ${name}, please copy the link and <a href="http://localhost:3000/api/auth/password-reset/${token}">reset your password</a></p>`,
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

    // Sending the response back to the user
    res.status(200).json({
      status: "success",
      message: `A link to reset you password has been send to ${email}.`,
      token,
    });
  } catch (error) {
    // Gives the error the global error middleware
    next(error);
  }
};

export default sendResetPasswordMail;
