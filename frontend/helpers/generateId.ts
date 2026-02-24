import CryptoJS from "crypto-js"
export const generateClientId = (file: File) => {
  const raw = file.name + file.size + Date.now()
  return CryptoJS.SHA256(raw).toString()
}