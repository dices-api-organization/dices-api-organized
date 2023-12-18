import bcrypt from 'bcrypt';

export const encrypt = async (plainPassword: string) => {
  const hash = await bcrypt.hash(plainPassword, 10);
  return hash;
};

export const compare = (plainPassword: string, hashPassword: string) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
