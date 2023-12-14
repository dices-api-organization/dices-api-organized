import bcrypt from 'bcrypt';

export const encrypt = async (plainPassword: string) => {
  const hash = await bcrypt.hash(plainPassword, 10);
  return hash;
};

export const compare = async (plainPassword: string, hashPassword: string) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};
