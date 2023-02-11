var textoIngreso = document.getElementById("cajaTexto1");   //variable que guarda la caja de texto donde el usuario debera colocar el texto que quiere encriptar o desencriptar
var textoResultado = document.getElementById("cajaTexto2");     //variable que guarda la caja de texto donde se muestra el resultado de la encriptacion o desencriptacion
var botonEncriptar = document.getElementById("botonEncriptar");
var botonDesencriptar = document.getElementById("botonDesencriptar"); 

var textoNormal;
var textoEncriptado;

const vocales = ["a", "e", "c", "o", "m"];
const reemplazoVocales = ["ai", "entr", "ihe", "jer","uft"];

//variables utilizadas para crear y editar elementos del HTML
var cajaResultado = document.getElementById("cajaTextoResultado");
var muñeco = document.getElementById("muñeco");
var botones = document.getElementById("botones2");
var cajaBotonCopiar = document.getElementById("botonCopiar");
var cajaBotonCompartir = document.getElementById("botonCompartir");
var popupCopiar = document.getElementById("popup-copiar");
var popupCompartir = document.getElementById("popup-compartir");
var ventanaCompartir = document.getElementById("ventana-compartir");
var botonBorrar = document.getElementById("botonBorrar");
var botonWhatsapp = document.getElementById("botonWhatsapp");
var botonEmail = document.getElementById("botonEmail");
var backupMuñeco;
var backupTexto;


//Eventos
botonEncriptar.addEventListener("click", encriptar);
botonDesencriptar.addEventListener("click", desencriptar); 

textoIngreso.addEventListener("keyup", mostrarBotonBorrar);
botonBorrar.addEventListener("click", borrarTextoIngreso);

cajaBotonCopiar.addEventListener("click", copiarTexto);
cajaBotonCopiar.addEventListener("mouseover", mostarPopupCopiar);
cajaBotonCopiar.addEventListener("mouseleave", ocultarPopupCopiar);

cajaBotonCompartir.addEventListener("click", mostrarVentanaCompartir);
cajaBotonCompartir.addEventListener("mouseover", mostrarPopupCompartir);
cajaBotonCompartir.addEventListener("mouseleave", ocultarPopupCompartir);

botonWhatsapp.addEventListener("click", llevarWhatsapp);
botonEmail.addEventListener("click", llevarEmail);

//Funciones
function capturarTextoNormal()
{
    textoNormal = textoIngreso.value;
}

function capturarTextoEncriptado()
{
    textoEncriptado = textoIngreso.value;
}

function encriptar()
{
    var encontrado = false;     //esta variable se vuelve true cuando encuentra una vocal en el texto, si continua false significa que es una consonante
    textoEncriptado = "";
    capturarTextoNormal();
    for (var i = 0; i < textoNormal.length; i++)    //este ciclo recorre todo el texto ingresado por el ususario
    {
        for (j = 0; j < vocales.length; j++)    //este ciclo compara cada uno de los valores del texto ingresado con elemento del array "vocales"
        {
            if (textoNormal[i] == vocales [j])      //se entra al condicional cuando alguna valor del texto ingresado es igual a algun elemento del array
            {
                textoEncriptado = textoEncriptado + reemplazoVocales[j];    //reemplaza la vocal por el valor encriptado que esta en el array "reemplazoVocales"
                encontrado = true;
            }
        }
        if (encontrado == false)    //este condicional quiere decir que es una consonante y debe añadirse en la variable "textoEncriptado" sin ningun cambio
        {
            textoEncriptado = textoEncriptado + textoNormal[i];     
        }
        encontrado = false;     //se vuelve a colocar false para que en las siguientes iteraciones no de por hecho que es una vocal
    }

    textoResultado.value = textoEncriptado;
    limpiarCajaTexto2();
    if(textoResultado.value != "")
    {
        mostrarBotonesAdicionales();
    }
}

function desencriptar()
{
    capturarTextoEncriptado();
    var i = 0;
    var contador = 0;   
    while (i < reemplazoVocales.length)     //ciclo que recorre el array "reemplazoVocales"
    {
        if (textoEncriptado.indexOf(reemplazoVocales[i]) >= 0)      //este condicional revisa si en el texto ingresado se encuentra algun elemento del array "reemplazoVocales", devuelve el numero de la posicion donde inicia, si es -1 significa que no hay ningun elemento del array en el texto
        {
            var posInicial = textoEncriptado.indexOf(reemplazoVocales[i]);  //variable que guarda la posicion en el texto donde inicia el array encontrado
            var posFinal = reemplazoVocales[i].length + posInicial;   //varaible que guarda la posicion final del array encontrado
            textoEncriptado = textoEncriptado.replace(textoEncriptado.slice( posInicial, posFinal), vocales[i]);    //identifica el elemento del array encontrado dentro del texto y lo reemplaza con la vocal correspondiente

            contador++;     //este contador registra que se encontraron elementos encriptados en el texto
        }

        i++;

        if (contador > 0 && i == 5)     //si contador es mayor que cero quiere decir que aun hay elementos encriptados en el texto y es necesario realizar el ciclo de nuevo para cambiar los que faltan, la condicion "i == 5" se coloco para que solo se realice de nuevo el ciclo una vez se haya terminado el actual 
        {
            i = 0;      //i vuelve a ser cero para hacer otro ciclo
            contador = 0;   //contador vuelve a ser 0 para registrar cambios en el texto, en caso de que no haya cambios, seguira siendo 0 y acabará el ciclo
        }
    }
    
    textoResultado.value = textoEncriptado;
    limpiarCajaTexto2();
    if(textoResultado.value != "")
    {
        
    }
}

function mostrarBotonesAdicionales()
{
    botones.style.opacity = 1;
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
        backupTexto = cajaResultado.removeChild(textoIndicativo);
        botones.style.opacity = 1;
    }
}

function copiarTexto()
{
    textoResultado.select();
    document.execCommand("copy");
    ventanaCompartir.style.opacity = 0;
}

function mostarPopupCopiar()
{
    if(textoResultado.value != 0 && window.innerWidth>700)
    {
        popupCopiar.classList.add("show");
    }
}

function ocultarPopupCopiar()
{
    popupCopiar.classList.remove("show");
}

function mostrarPopupCompartir()
{
    if(ventanaCompartir.style.opacity == 0 && textoResultado.value != 0 && window.innerWidth>700)
    {
        popupCompartir.classList.add("show");
    }
}

function ocultarPopupCompartir()
{
    popupCompartir.classList.remove("show");
}

function mostrarVentanaCompartir()
{
    if(ventanaCompartir.style.opacity == 0)
    {
        ventanaCompartir.style.opacity = 1;
    }
    else
    {
        ventanaCompartir.style.opacity = 0;
    }
}

function mostrarBotonBorrar()
{
    if(textoIngreso.value != "")
    {
        botonBorrar.style.opacity = 0.6;
    }
    else
    {
        botonBorrar.style.opacity = 0;
    }
}

function borrarTextoIngreso()
{
    limpiarTextoIngresado();
    limpiarTextoResultado();
    mostrarBotonBorrar();
    cajaResultado.appendChild(backupMuñeco);
    cajaResultado.appendChild(backupTexto);
    botones.style.opacity = 0;
    ventanaCompartir.style.opacity = 0;
}

function llevarWhatsapp()
{
    copiarTexto();
    window.location = "https://web.whatsapp.com/";
}

function llevarEmail()
{
    copiarTexto();
    window.location = "https://www.google.com/intl/es/gmail/about/";
}