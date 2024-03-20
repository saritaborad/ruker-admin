const CryptoJS = require("crypto-js");

let encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
const hash = CryptoJS.SHA256(encryptionKey);

// Convert the hash to a hexadecimal string
const encryptionKeyHex = hash.toString(CryptoJS.enc.Hex);
const iv2 = CryptoJS.lib.WordArray.random(16); // 16 bytes IV for AES-256
const hashIv = CryptoJS.MD5(iv2);
const encryptionKeyHexIv = hashIv.toString(CryptoJS.enc.Hex);

export const EncryptData = (values: any) => {
  const encrypted = CryptoJS.AES.encrypt(values, encryptionKeyHex, {
    iv: encryptionKeyHexIv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
    rounds: 14,
  }).toString();
  return encrypted;
};

export const getUrlEncodedData = (data: any) => {
  let formData: any = [];
  Object.keys(data).forEach((item) => {
    const encodedKey = encodeURIComponent(item);
    const encodedValue = encodeURIComponent(data[item]);
    formData.push(`${encodedKey}=${encodedValue}`);
  });
  formData = formData.join("&");
  return formData;
};
export function encrypt(data: any, isFormData = false) {
  const phrase = JSON.stringify(data);
  if (encryptionKey) {
    const encrypted = CryptoJS.AES.encrypt(phrase, encryptionKeyHex, {
      iv: encryptionKeyHexIv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7,
      rounds: 14,
    }).toString();
    return isFormData ? encrypted : getUrlEncodedData({ data: encrypted });
  }
  return null;
}

// let key = CryptoJS.enc.Base64.parse(encryptionKey);
// // length = 16 bytes ,length=32 (hex encoded)
// let iv = CryptoJS.enc.Base64.parse(cipherKey); // length = 18 bytes, length=36 (hex encoded)

// var data = CryptoJS.AES.decrypt(cipherData, key, { iv: iv }).toString(CryptoJS.enc.utf8);
// const encryptionKey2 = CryptoJS.enc.Hex.parse(encryptionKeyHex);

//  const keyWordArray = CryptoJS.enc.Hex.parse(ciphertext);
// // Get the bit length of the key
// const keyBitLength = keyWordArray.sigBytes * 8;
// console.log('Key Bit Length:', keyBitLength,ciphertext?.length * 4 );
