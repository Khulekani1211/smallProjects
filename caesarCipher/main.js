//DOM Selectors
const encryptionKey = document.getElementById('encrypt-key')
const message = document.getElementById('plain-text')
const submitBtn = document.querySelector('button')
const cipherText = document.getElementById('cipher-message')

submitBtn.addEventListener('click', () => {
  const inputkey = encryptionKey.value
  const plaintext = message.value

  //console.log(typeof inputkey)
  const encryptKey = parseInt(inputkey)
  //console.log(typeof encryptKey)
  //console.log(inputkey)
  //console.log(plaintext)

  const cipher = CaesarCipherEncrypt(plaintext.toUpperCase(), encryptKey)
  console.log(cipher)
  console.log(CaesarCipherEncrypt(plaintext, inputkey))
  cipherText.innerText = cipher
})

function CaesarCipherEncrypt(message, key){
  //Letters of the alphabet in CAPS
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  //Array to store the encrypted characters
  let encrypt = []

  //regex matching the letters of the english alphabet
  const regex = /[A-Z]/

  for(let i = 0; i < message.length; i++){

      if(regex.test(message[i])){
          let index = alphabets.indexOf(message[i])
          let shiftedIndex = (index + key + 26) % 26
          encrypt.push(alphabets[shiftedIndex])
      }else{
          encrypt.push(message[i])
      }
  }
  //console.log(encrypt)
  return encrypt.join("")
}

console.log(CaesarCipherEncrypt('KHULEKANI', 9))