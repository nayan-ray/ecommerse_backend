require('dotenv').config();

const server_port = process.env.SERVER_PORT || 3002;
const Mongo_connect_url = process.env.ATLAS_URL;
const secretKey = process.env.SECRET_KEY;
const smtpPassword  = process.env.SMTP_PASSWORD;
const  smtpUser = process.env.SMTP_USERNAME;
const secret_login_Key = process.env.SECRET_LOGIN_KEY;
const secret_password_reset_key = process.env.SECRET_RESETPASSWORD_KEY;



module.exports = {server_port,  Mongo_connect_url, secretKey,
      smtpPassword, smtpUser , secret_login_Key,  secret_password_reset_key};




