import crypto from 'crypto';

export default (value: string): string => crypto.createHash('md5')
  .update(value)
  .digest('hex');
