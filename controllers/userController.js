const userModel = require('../models/userModel');
const generatePassword = require('../helpers/gerneratePassword');
const bcrypt = require('bcryptjs');
const mailSender = require('../helpers/googleMail');
const hashingPassword = require('../helpers/hashingPassword');

exports.createUser = async (req, res, next) => {
  const { userRole, email, phone, fullName } = req.body;
  const password = generatePassword.generatePassword(8);
  const existUser = await userModel.findOne({ email: email });
  if (existUser) {
    res.status(401).send(JSON.stringify('Tài khoản đã tồn tại'));
    res.end();
    return;
  }
  const newUser = await userModel.create({
    userRole,
    password: password,
    email,
    phone,
    fullName,
  });
  mailSender.sendMail(email, password, '0986219238');
  res.send(JSON.stringify(newUser));
  res.end();
};

exports.resetPassword = async (req, res, next) => {
  const email = req.body.email;
  const existUser = await userModel.findOne({ email: email });
  if (!existUser) {
    res.status(406).send(JSON.stringify('Tài khoản không tồn tại'));
    res.end();
    return;
  }
  const newPassword = generatePassword.generatePassword(8);
  const hashedPassword = await hashingPassword.hashPassword(newPassword);
  const newUser = await userModel.updateOne(
    { email },
    { password: hashedPassword }
  );
  console.log(newPassword);
  console.log(hashedPassword);

  // mailSender.sendMail(email, newPassword, '0986219238');

  res.end();
};

exports.userLogIn = async (req, res, next) => {
  const { email, password } = req.body;
  const matchUser = await userModel.findOne({ email });
  if (matchUser == null) {
    res.status(401).send(JSON.stringify('Người dùng không tồn tại'));
    return;
  }
  const doMatch = await bcrypt.compare(password, matchUser.password);
  if (!doMatch) {
    res.status(402).send(JSON.stringify('Sai mật khẩu'));
    return;
  }
  req.session.user = matchUser;
  res.status(200).send(JSON.stringify(matchUser));
  res.end();
};

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const matchUser = await userModel.findOne({ email });
  if (matchUser == null) {
    res.status(401).send(JSON.stringify('Người dùng không tồn tại'));
    res.end();
    return;
  }
  if (matchUser.userRole !== 'admin' && matchUser.userRole !== 'staff') {
    res.status(405).send(JSON.stringify('Chỉ admin có quyền đăng nhập'));
    return;
  }
  const doMatch = await bcrypt.compare(password, matchUser.password);
  if (!doMatch) {
    res.status(402).send(JSON.stringify('Sai mật khẩu'));
    return;
  }
  req.session.user = matchUser;
  res.status(200).send(JSON.stringify(matchUser));
  res.end();
};

exports.getAll = async (req, res, next) => {
  const users = await userModel.find({});
  res.send(JSON.stringify(users));
};
