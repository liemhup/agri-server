const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const REFRESH_TOKEN =
  '1//04PI8DoKx2CVSCgYIARAAGAQSNwF-L9Ir3o_pNbyVAM0ilbCF51eKf06uOR-fRs9L_mQmbKf3YTMEmGG_s2nAbS0wdHvEg2MYWG8';

const REDIRECT_URI = 'http://localhost:5173/';

const oAuth = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  REDIRECT_URI
);

oAuth.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.sendMail = async (email, password, phone) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: 'liemptFX20140@funix.edu.vn',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOption = {
      from: 'liemptFX20140@funix.edu.vn',
      to: `${email}`,
      subject: 'Thông tin đăng nhập ',
      html: `<body>
      <h1>Xin chao ${email}</h1>       
      <p>Tài khoản của bạn đã được tạo trên Dalat Farm.</p>
      <p>Thông tin đăng nhập</p>
      <ul>
      <li> Email đăng nhập: ${email}</li>
      <li> Mật khẩu: ${password}</li>
      Mọi thắc mắc xin liên hệ: ${phone}
    </body>`,
    };
    const result = await transport.sendMail(mailOption);
    return result;
  } catch (err) {
    return err;
  }
};
