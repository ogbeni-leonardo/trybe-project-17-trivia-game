import md5 from 'crypto-js/md5';

const createHash = (email) => md5(email).toString();
export default createHash;
