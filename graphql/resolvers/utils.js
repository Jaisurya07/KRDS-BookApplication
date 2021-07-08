// Helper Functions for Validations.....

function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function validatePassword(passwd) {
  /* Password Regex for :
      Minmimum 8 characters & atleast one special character,uppercase character ,number....*/

  const passwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwdRegex.test(passwd);
}

function validateMobile(mobile) {
  const mobileRegex = /^([+]\d{2}[ ])?\d{10}$/;
  return mobileRegex.test(mobile);
}

function validateName(name) {
  const regex = /^[a-zA-Z ]{2,30}$/;
  return regex.test(name);
}

module.exports = {
  validateEmail,
  validateMobile,
  validateName,
  validatePassword,
};
