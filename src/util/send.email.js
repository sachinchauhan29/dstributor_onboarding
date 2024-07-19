require('dotenv').config();
const nodemailer = require('nodemailer');
const { totp } = require('otplib');
const { SERVICE, USER_MAIL, PASSWORD, HOST, PORT ,OTP_SECRET} = process.env;



 const sendLinkOnMail = async (Email,otp) => {


    let transporter = nodemailer.createTransport({
        service: SERVICE,
        auth: {
            user: USER_MAIL,
            pass: PASSWORD
        }
    });

    let mailOptions = {
        from: USER_MAIL,
        to: Email, 
        subject: 'Hello ✔', 
        text: `Hello, your OTP is: ${otp}`, 
        html: `<b>Your OTP is: ${otp}</b>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};

const generateOTP = async()=>{
    const secret = OTP_SECRET;

    if (!secret) {
    throw new Error('Missing OTP_SECRET in environment variables');
    }
    const otp = totp.generate(secret);
    return otp;
}

module.exports = { sendLinkOnMail,generateOTP }
