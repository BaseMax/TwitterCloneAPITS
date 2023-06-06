import * as bcrypt from 'bcrypt';

export class Hash {
  static async hash(code: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(code, 10);

      return hash;
    } catch (error) {
      console.log(error);
    }
  }
  static async compare(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
