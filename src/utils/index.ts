import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const createCart = async (userId: string) => {
  try {
    await db.cart.create({
      data: {
        userId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const passwordToSalt = async (password: string) => {
  // Generate a random salt with appropriate length
  const salt = bcrypt.genSaltSync(12); // Generate salt synchronously
  // Hash the password using bcrypt with the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  // Return the hashed password (which includes the salt)
  return hashedPassword;
};

export const comparePassword = async (
  credentialsPassword: string,
  existingHashedPassword: string | null
): Promise<Boolean> => {
  if (!existingHashedPassword) throw new Error('Invalid password 2');

  try {
    const isMatch = await bcrypt.compare(
      credentialsPassword,
      existingHashedPassword
    );

    return isMatch;
  } catch (error) {
    throw new Error('Invalid password');
  }
};
