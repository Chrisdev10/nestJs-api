const bcrypt = require('bcrypt');
export const pwdChecker = async function (
  input: string,
  stored: string,
): Promise<boolean> {
  return await bcrypt.compare(input, stored);
};
export const pwdHashing = async function (pwd: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pwd, salt);
};
