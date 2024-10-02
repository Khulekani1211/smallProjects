//DOM Selectors
const encryptionKey = document.getElementById('cipher-keys')
const message = document.getElementById('Textarea1')
const submitBtn = document.getElementById('encrypt-btn')
const cipherText = document.getElementById('cipher-message')
const cipherBlock = document.querySelector('.cipher')

const decipherBlock = document.querySelector('.plain-message')
const decipherText = document.getElementById('plain-text')

const decryptionKey = document.getElementById('decipher-keys')
const decipherBtn = document.getElementById('decrypt-btn')
const message2 = document.getElementById('Textarea2')

const cipherButtons = document.querySelectorAll('input[name="btnradio"]');
const cipherOptions = document.querySelectorAll('.encrypt')

//Toggle between the Encrypt and Decrypt Options
cipherButtons.forEach(cipherButton => {
  cipherButton.addEventListener('change', function(){
    const displayInfo = document.getElementById(this.value);
    //console.log(displayInfo)
    cipherOptions.forEach(block => {
      block.style.display = 'none';
    })
    
    displayInfo.style.display = 'block';
    encryptionKey.value = "default";
    message.value = "";

    decryptionKey.value = "default"
    message2.value = "";
  })
})

//Assigning an Encryption Key
let key;

encryptionKey.addEventListener('change', () => {
  key = encryptionKey.value;
  //console.log(key)
})

//Encrypting the text
submitBtn.addEventListener('click', () => {
  const plaintext = message.value
  
  const encryptKey = parseInt(key)

  const cipher = CaesarCipherEncrypt(plaintext.toUpperCase(), encryptKey)
  
  cipherText.innerHTML = cipher
  cipherBlock.style.display = "block";
  document.getElementById("status").innerText = "";
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

//console.log(CaesarCipherEncrypt('KHULEKANI', 9))

//Decryption Section of JavaScript
let decryptKey;

decryptionKey.addEventListener('change', () => {
  decryptKey = decryptionKey.value;
  //console.log(decryptKey)
})

//Encrypting the text
decipherBtn.addEventListener('click', () => {
  const plaintext = message2.value
  //console.log(plaintext)
  const decrypt_key = parseInt(decryptKey)
  //console.log(decryptKey)
  const decipher = CaesarCipherDecrypt(plaintext.toUpperCase(), decrypt_key)
  //console.log(decipher)
  decipherText.innerHTML = decipher
  decipherBlock.style.display = "block";
  document.getElementById("status-2").innerText = "";
})

//Decryption function
function CaesarCipherDecrypt(message, key){
  //Letters of the alphabet in CAPS
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  
  //Array to store the encrypted characters
  let encrypt = []

  //regex matching the letters of the english alphabet
  const regex = /[A-Z]/

  for(let i = 0; i < message.length; i++){

      if(regex.test(message[i])){
          let index = alphabets.indexOf(message[i])
          let shiftedIndex = (index - key + 26) % 26
          encrypt.push(alphabets[shiftedIndex])
      }else{
          encrypt.push(message[i])
      }
  }
  //console.log(encrypt)
  return encrypt.join("")
}

// Copy Cipher text to clipboard

function copyText() {
  //console.log("Working")
  const textToCopy = document.getElementById("cipher-message").innerText;
  const tempTextArea = document.createElement("textarea");

  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  //textToCopy.select();
  tempTextArea.setSelectionRange(0, 99999); // For mobile devices
  //console.log(textToCopy)

  navigator.clipboard.writeText(tempTextArea.value).then(function() {
      document.getElementById("status").innerText = "Copied!";
      //console.log("Function Enters this point")
  }).catch(function(error) {
      document.getElementById("status").innerText = "Failed to copy!";
      console.log("Something went wrong!", error)
  }).finally(function() {
    document.body.removeChild(tempTextArea);
  });
}

function decryptCopyText() {
  //console.log("Working")
  const textToCopy = document.getElementById("plain-text").innerText;
  const tempTextArea = document.createElement("textarea");

  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  //textToCopy.select();
  tempTextArea.setSelectionRange(0, 99999); // For mobile devices
  

  navigator.clipboard.writeText(tempTextArea.value).then(function() {
      document.getElementById("status-2").innerText = "Copied!";
      
  }).catch(function(error) {
      document.getElementById("status-2").innerText = "Failed to copy!";
      console.log("Something went wrong!", error)
  }).finally(function() {
    document.body.removeChild(tempTextArea);
  });
}