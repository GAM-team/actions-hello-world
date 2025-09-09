import { TOTP } from 'totp-generator';

const not_secret = 'OJCUKVCEKVLW6MLGOJ3XSZCVGZATCSTPPJZEKZ5ZKNTUEVZTVLQ';
console.log('Our secret is ' + not_secret.length + ' characters.');
const { token_value } = TOTP.generate(not_secret, {algorithm: 'SHA-256'});
console.log('Our token is ' + token_value.length + ' characters.');
const token_arr =  [...token_value];
