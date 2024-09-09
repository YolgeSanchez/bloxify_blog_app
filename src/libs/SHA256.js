import CryptoJS from 'crypto-js'

const encrypt = (input) => {
  return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex)
}

export default encrypt
