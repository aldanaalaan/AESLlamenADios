// Importaciones
const fs = require("fs");
var CryptoJS = require("crypto-js");

// Metodos de codificacion/decodificacion de String
// Codificacion
function cifrarAES(mensaje, clave, Tamaño) {
  console.log("Cifrado String");
  var encrypt = CryptoJS.AES.encrypt(mensaje, clave, { keySize: Tamaño });
  return encrypt.toString();
}
// Decodificacion
function descifrarAES(mensajeCodificado, clave, Tamaño) {
  console.log("Descifrado String");
  var decrypt = CryptoJS.AES.decrypt(mensajeCodificado, clave, {
    keySize: Tamaño,
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}
// * Codificacion de un .txt
function codificarFile(ArchivoEntrada, ArchivoSalida, Clave, Tamaño) {
  console.log("Cifrado Archivo");
  fs.readFileSync(ArchivoEntrada, (err, data) => {
    // data -> Buffer (Binario)
    // err -> Error
    if (!err) {
      // Aqui se lleva a cabo la codificacion del archivo
      console.log("...");
      fs.writeFile(
        ArchivoSalida,
        cifrarAES(data.toString(), Clave, Tamaño),
        function (err) {
          if (err) throw err;
          console.log("Archivo codificado correctamente!");
        }
      );
      // * Prueba para imprimir el contenido del archivo
      // // console.log(data.toString( ));
    } else {
      // ! Mostrar el error (Si hay) en consola
      console.log(err);
    }
  });
}

// * DeCodificacion de un .txt
function decodificarFile(ArchivoEntrada, ArchivoSalida, Clave, Tamaño) {
  console.log("Descifrado Archivo");
  fs.readFileSync(ArchivoEntrada, (err, data) => {
    // data -> Buffer (Binario)
    // err -> Error
    if (!err) {
      // Aqui se lleva a cabo la codificacion del archivo
      fs.writeFile(
        ArchivoSalida,
        descifrarAES(data.toString(), Clave, Tamaño),
        function (err) {
          if (err) throw err;
          console.log("Archivo decodificado correctamente!");
        }
      );
      // * Prueba para imprimir el contenido del archivo
      // // console.log(data.toString( ));
    } else {
      // ! Mostrar el error (Si hay) en consola
      console.log(err);
    }
  });
}

module.exports = function encdec(Entrada, Salida, Clave, Mode, Tamaño) {
  console.log("Principal");
  if (Mode == "1") {
    codificarFile(Entrada, Salida, Clave, Tamaño);
    return;
  } else if (Mode == "2") {
    decodificarFile(Entrada, Salida, Clave, Tamaño);
    return;
  }
};
