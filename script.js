function previewImage() {
  var preview = document.getElementById("preview");
  var file = document.getElementById("image").files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function encryptImage() {
  var file = document.getElementById("image").files[0];
  var password = document.getElementById("password").value;
  var reader = new FileReader();
  reader.onload = function (e) {
    console.log(e.target.result);
    var imageBinaryString = e.target.result.split(",")[1];
    var encrypted = CryptoJS.AES.encrypt(imageBinaryString, password);
    var encryptedDataURL = "data:image/png;base64," + encrypted.toString();
    var encryptedImage = document.getElementById("encrypted-image");
    var encryptedLink = document.getElementById("encrypted-link");
    encryptedImage.src = encryptedDataURL;
    encryptedImage.style.display = "inline";
    encryptedLink.href = encryptedDataURL;
    encryptedLink.style.display = "inline";
  };
  reader.readAsDataURL(file);
}

function decryptImage() {
  var file = document.getElementById("image").files[0];
  var password = document.getElementById("password").value;
  var reader = new FileReader();
  reader.onload = function (e) {
    var encryptedBinaryString = e.target.result.split(",")[1];
    var decrypted = CryptoJS.AES.decrypt(encryptedBinaryString, password);
    try {
      decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      alert("Invalid password");
      return;
    }
    var decryptedDataURL = "data:image/png;base64," + decrypted;
    var decryptedImage = document.getElementById("decrypted-image");
    var decryptedLink = document.getElementById("decrypted-link");
    decryptedImage.src = decryptedDataURL;
    decryptedImage.style.display = "inline";
    decryptedLink.href = decryptedDataURL;
    decryptedLink.style.display = "inline";
  };
  reader.readAsDataURL(file);
}

function dragOverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();
  var file = ev.dataTransfer.files[0];
  document.getElementById('image').files = file;
  previewImage();
}