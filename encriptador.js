var textoIngreso = document.getElementById("cajaTexto1");   //variable que guarda la caja de texto donde el usuario debera colocar el texto que quiere encriptar o desencriptar
var textoResultado = document.getElementById("cajaTexto2");     //variable que guarda la caja de texto donde se muestra el resultado de la encriptacion o desencriptacion
var botonEncriptar = document.getElementById("botonEncriptar");     //variable que guarda el boton para encriptar
var botonDesencriptar = document.getElementById("botonDesencriptar");   //variable que guarda el boton para desencriptar  

botonEncriptar.addEventListener("click", encriptar);    //registra el evento sobre el boton "Encriptar" que activa la funcion "encriptar" 
botonDesencriptar.addEventListener("click", desencriptar);      //registra el evento sobre el boton "Desencriptar" que activa la funcion "desencriptar" 

//textoIngreso.addEventListener("paste", pegarTexto);

var textoNormal;    //esta variable se almacena el texto sin encriptar
var textoEncriptado;    //en esta variable se almacena el texto encriptado
var vocales = ["a", "e", "i", "o", "u"];
var reemplazoVocales = ["ai", "enter", "imes", "ober","ufat"];

var cajaResultado = document.getElementById("cajaTextoResultado");
var muñeco = document.getElementById("muñeco");
var botones = document.getElementById("cajaTextoResultado");
var backupMuñeco;
var backupTexto;
var botonCopiar;

function capturarTextoNormal()  //funcion que captura el texto normal que el usuario coloca en la caja, cuando oprime el boton "encriptar"
{
    textoNormal = textoIngreso.value;
}

function capturarTextoEncriptado()  //funcion que captura el texto encriptado que el usuario coloca en la caja cuando, cuando oprime el boton "desencriptar"
{
    textoEncriptado = textoIngreso.value;
}

function encriptar()
{
    var encontrado = false;     //esta variable se vuelve true cuando encuentra una vocal en el texto, si continua false significa que es una consonante y debe agregarse igual
    textoEncriptado = "";
    capturarTextoNormal();      //trae el texto ingresado para usarlo en esta funcion
    for (var i = 0; i < textoNormal.length; i++)    //este ciclo recorre todo el texto ingresado por el ususario
    {
        for (j = 0; j < vocales.length; j++)    //este ciclo compara cada uno de los valores del texto ingresado con elemento del array "vocales"
        {
            if (textoNormal[i] == vocales [j])      //se entra al condicional cuando alguna valor del texto ingresado es igual a algun elemento del array, ejemplo: a == a
            {
                textoEncriptado = textoEncriptado + reemplazoVocales[j];    //si entro al condicional quiere decir que encontro una vocal y la tiene que reemplazar por el valor encriptado que esta en el array "reemplazoVocales"
                encontrado = true;  //true para que siga con la siguiente linea
            }
        }
        if (encontrado == false)
        {
            textoEncriptado = textoEncriptado + textoNormal[i];     //si entra a este condicional quiere decir que es una consonante y debe añadirse en la variable "textoEncriptado" sin ningun cambio
        }
        encontrado = false;     //se vuelve a colocar false para que en las siguientes iteraciones no de por echo que es una vocal
    }

    textoResultado.value = textoEncriptado;     //se guarda en la caja de texto la variable "textoEncriptado" para mostrar el resultado final
    limpiarTextoIngresado();
    limpiarCajaTexto2();
    crearBotonCopiar();
}

function desencriptar()
{
    capturarTextoEncriptado();      //trae el texto ingresado para usarlo en esta funcion
    var i = 0;      //declaracion de la variable que se usa para controlar el ciclo while
    var contador = 0;   
    while (i < reemplazoVocales.length)     //ciclo que recorre el array "reemplazoVocales"
    {
        if (textoEncriptado.indexOf(reemplazoVocales[i]) >= 0)      //este condicional revisa si en el texto ingresado se encuentra algun elemento del array "reemplazoVocales", devuelve el numero de la posicion donde inicia, si es -1 significa que no hay ningun elemento del array en el texto
        {
            var posInicial = textoEncriptado.indexOf(reemplazoVocales[i]);  //variable que guarda la posicion del texto donde inicia el array encontrado
            var posFinal = reemplazoVocales[i].length + posInicial;   //varaible que guarda la posicion final del array encontrado, a la posicion inicial se le suma la longitud del elemento del array
            textoEncriptado = textoEncriptado.replace(textoEncriptado.slice( posInicial, posFinal), vocales[i]);    //identifica el elemento del array encontrado dentro del texto y lo reemplaza con la vocal correspondiente, de esta manera se van reemplazando los elementos encriptados

            contador++;     //este contador registra que se encontraron elementos encriptados en el texto
        }

        i++;

        if (contador > 0 && i == 5)     //si contador es mayor que cero quiere decir que aun hay elementos encriptados en el texto y es necesario realziar el ciclo de nuevo para cambiar los que faltan, la condicion "i == 5" se coloco para que solo se realice de nuevo el ciclo una vez se haya terminado el actual 
        {
            i = 0;      //i vuelve a ser cero para hacer otro ciclo
            contador = 0;   //contador vuelve a ser 0 para registrar cambios en el texto, en caso de que no haya cambios, seguira siendo 0 y dejara acabar el ciclo
        }
    }
    textoResultado.value = textoEncriptado;     //se guarda en la caja de texto la variable "textoEncriptado" para mostrar el resultado final
    limpiarTextoIngresado();
    limpiarCajaTexto2();
    crearBotonCopiar();
}

function crearBotonCopiar()
{
    botonCopiar = document.createElement("input");
    botonCopiar.type = "button";
    botonCopiar.id = "botonCopiar";
    botonCopiar.value = "Copiar";

    botones.appendChild(botonCopiar);

    botonCopiar.addEventListener("click", copiarTexto);
}

function limpiarTextoIngresado()
{
    textoIngreso.value = "";
}

function limpiarTextoResultado()
{
    textoResultado.value = "";
}

function limpiarCajaTexto2()
{
    if(textoResultado.value != "")
    {
        backupMuñeco = cajaResultado.removeChild(muñeco);
        backupTexto = cajaResultado.removeChild(textoNoEncontrado);
    }
}

function quitarBotonCopiar()
{
    var backupBotonCopiar = botones.removeChild(botonCopiar);
}

function copiarTexto()
{
    textoResultado.select();
    document.execCommand("copy");
    cajaResultado.appendChild(backupMuñeco);
    cajaResultado.appendChild(backupTexto);
    limpiarTextoResultado();
    quitarBotonCopiar();
    alert("Copiado");
}




