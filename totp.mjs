import { TOTP } from 'totp-generator';

const not_secret = 'OJCUKVCEKVLW6MLGOJ3XSZCVGZATCSTPPJZEKZ5ZKNTUEVZTVLQ';
console.log('Our secret is ' + not_secret.length + ' characters.');
const { otp } = TOTP.generate(not_secret, {algorithm: 'SHA-256'});
console.log('Our token is ' + otp.length + ' characters.');
console.log('Our otp is ' + otp);
const otp_arr =  [...otp];
console.log('otp_arr is ' + otp_arr);
