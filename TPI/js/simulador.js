// Inicia el collapsible de la configuracion preliminar
document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.collapsible');
	var instances = M.Collapsible.init(elems);
});

// Inicia los select
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

// Trata los radio buttons de seleccion de particiones
particiones = document.getElementById("particiones");
algoritmosMem = document.getElementById("algoritmosMem");
function ocultarInputMem(){
	particiones.style.display = "none";
	algoritmosMem.remove(1);
}
best = document.createElement("option");
best.text = "Best-Fit";
function mostrarInputMem(){
	particiones.style.display = "";
	algoritmosMem.add(best,1);
}

// Muestra u oculta el input del cuantum cuando selecciona Round Robin
// Muestra u oculta los cuantums cuando selecciona cola multinivel
cuantum = document.getElementById("cuantum");
cuantum_multi = document.getElementById("cuantum_multi");
div_prioridad = document.getElementById("div_prioridad");
alg_planific = document.getElementById("alg_planific");
function mostrarInputCuantum(){
	
	if (alg_planific.value == 3) {
		cuantum.style.display = "inline-block";
	}else{
		cuantum.style.display = "none";
	}

	if (alg_planific.value == 4){
		cuantum_multi.style.display = "";
	}else{
		cuantum_multi.style.display = "none";
	}

	//Si se selecciona Prioridad, habilita el campo Prioridad en la seccion de carga de procesos
	if (alg_planific.value == 2) {
		div_prioridad.style.display = "";
	}else{
		div_prioridad.style.display = "none";
	}
}

//Carga el tamanio de la memoria
info = document.getElementsByClassName("info");
ultimo = document.getElementById("ultimo");
ultimo2 = document.getElementById("ultimo2");
tamanioMem = document.getElementById("tamanio_mem");
mapaMemPrincipal = document.getElementById("mapaMemPrincipal");
mapa = document.getElementById("mapa");
radio = document.getElementsByClassName("radio");
cargar = document.getElementById("cargar");
ltamanioMem = document.getElementById("ltamanioMem");
auxSO = document.getElementById("auxSO");

function cargarUltimoTam(){

	if (!validarMem()) {
		tamanioMem.style.borderBottom = "1px solid #b71c1c";
		return false;
	}else{
		tamanioMem.style.borderBottom = "1px solid #4caf50";
	}
	ultimo.innerHTML = tamanioMem.value + " B";
	ultimo2.innerHTML = tamanioMem.value + " B"; //En la memoria real
	mapa.className = "mapa blue-grey lighten-5";
	mapa2.className = "mapa blue-grey lighten-5";//En la memoria real

	//Deshabilito los radiobutton para que no me traiga problemas si el usuario cambia en plena ejecucion
	radio[0].disabled = true;
	radio[1].disabled = true;

	info[0].innerHTML = "Tamaño Memoria: " + tamanioMem.value + " B";
	restante = Math.round(parseInt(tamanioMem.value)-parseInt(tamanioMem.value)*0.1); //Le resto el 10% para el SO
	info[1].innerHTML = "Tamaño Restante: " + restante + " B";
	

	//Cargo el sistema operativo en la memoria
	div1 = document.createElement("div");
	div2 = document.createElement("div");
	span = document.createElement("span");
	span.innerHTML = "SO";
	div2.appendChild(span);
	div2.className = "text center-align";
	div1.appendChild(div2);
	div1.className = "procmem col";

	div1.style.width = "10%"; //El 10% es para el SO
	div1.style.background = "#ff8f00";
	div1.setAttribute("id", "memSO");
	mapa.appendChild(div1);

	//Agrego el SO en la memoria real
	//Aca lo hago medio rebuscado porque no me deja poner dos AppendChild seguidos, no se por que
	auxSO.style.width = "10%"; 
	auxSO.style.background = "#ff8f00";
	auxSO.style.display = ""; //En la memoria real

	//Habilito el boton cargar
	cargar.className = "waves-effect waves-light btn-small right blue darken-1 separar";

	//Deshabilito el campo de tamanio memoria
	tamanioMem.disabled = true;

}
function validarMem(){
	if (tamanioMem.value == "") {
		return false;
	}else if(parseInt(tamanioMem.value) < 100000){
		return false;
	}
	return true;
}

//Esta funcion carga los procesos en la memoria y el planificador de procesos
contador = 0;
tamanio = document.getElementById("tamanio");
ta = document.getElementById("tiempo_arr");
rafagacpu = document.getElementById("rafagaCPU");
rafagaES = document.getElementById("rafagaES");
prioridad = document.getElementById("prioridad");
planificadorProceso = document.getElementById("tabla");
tamanio_mem = document.getElementById("tamanio_mem");

ancho = mapa.offsetWidth;
function cargarProcesoMem(){
	if(!validarInputsCargar()){
		return false;
	}
	cargarProcesosPlanificador();

	div1 = document.createElement("div");
	div2 = document.createElement("div");
	span = document.createElement("span");
	span.innerHTML = "P" + contador + " ";
	div2.appendChild(span);
	div2.className = "text center-align";
	div1.setAttribute("title", tamanio.value + " B"); //Para que al pasar el mouse, diga el tamanio
	div1.appendChild(div2);
	div1.className = "procmem col";

	// tamanioDiv = (((parseInt(tamanio.value)/parseInt(tamanioMem.value))*100)/ancho);
	tamanioDiv = (parseInt(tamanio.value)/parseInt(tamanioMem.value))*100;
	div1.style.maxWidth = String(Math.round(tamanioDiv)) + "%";

	colores = ["1d2c3d","25415a","2d567a", "346c9b", "3b83bd", "6496c8", "86aad3", 
				"a5bfde", "304c33", "3e6642", "4c8152", "5b9d63", "77ad7c", "92bd95",
				"adceae", "c8dec9", "4d2d4e", "673b69", "824885", "9e56a2", "af72b1",
				"c08ec1", "d0a9d0", "e0c5e0", "53535e", "696876", "7f7e90", "9392a2",
				"a8a7b4", "bdbcc6", "513512", "794e14", "a46813", "d0830e", "ffa000",
				"ffaf43", "ffbf6b", "ffcf90", "ffdfb5", "2e434d", "426475", "56889f",
				"6badcc", "81d4fa", "9adbfb", "b0e2fc", "c5e9fd", "d9f1fd", "512b2e",
				"6d4a4c", "1d2c3d","25415a","2d567a", "346c9b", "3b83bd", "6496c8", "86aad3", 
				"a5bfde", "304c33", "3e6642", "4c8152", "5b9d63", "77ad7c", "92bd95",
				"adceae", "c8dec9", "4d2d4e", "673b69", "824885", "9e56a2", "af72b1",
				"c08ec1", "d0a9d0", "e0c5e0", "53535e", "696876", "7f7e90", "9392a2",
				"a8a7b4", "bdbcc6", "513512", "794e14", "a46813", "d0830e", "ffa000",
				"ffaf43", "ffbf6b", "ffcf90", "ffdfb5", "2e434d", "426475", "56889f",
				"6badcc", "81d4fa", "9adbfb", "b0e2fc", "c5e9fd", "d9f1fd", "512b2e",
				"1d2c3d","25415a","2d567a", "346c9b", "3b83bd", "6496c8", "86aad3", 
				"a5bfde", "304c33", "3e6642", "4c8152", "5b9d63", "77ad7c", "92bd95",
				"adceae", "c8dec9", "4d2d4e", "673b69", "824885", "9e56a2", "af72b1",
				"c08ec1", "d0a9d0", "e0c5e0", "53535e", "696876", "7f7e90", "9392a2",
				"a8a7b4", "bdbcc6", "513512", "794e14", "a46813", "d0830e", "ffa000",
				"ffaf43", "ffbf6b", "ffcf90", "ffdfb5", "2e434d", "426475", "56889f",
				"6badcc", "81d4fa", "9adbfb", "b0e2fc", "c5e9fd", "d9f1fd", "512b2e",
				"1d2c3d","25415a","2d567a", "346c9b", "3b83bd", "6496c8", "86aad3", 
				"a5bfde", "304c33", "3e6642", "4c8152", "5b9d63", "77ad7c", "92bd95",
				"adceae", "c8dec9", "4d2d4e", "673b69", "824885", "9e56a2", "af72b1",
				"c08ec1", "d0a9d0", "e0c5e0", "53535e", "696876", "7f7e90", "9392a2",
				"a8a7b4", "bdbcc6", "513512", "794e14", "a46813", "d0830e", "ffa000",
				"ffaf43", "ffbf6b", "ffcf90", "ffdfb5", "2e434d", "426475", "56889f",
				"6badcc", "81d4fa", "9adbfb", "b0e2fc", "c5e9fd", "d9f1fd", "512b2e",
				];

	div1.style.background = "#" + colores[contador];
	mapa.appendChild(div1);

	//Actualizo la informacion de la memoria disponible
	restante = restante - parseInt(tamanio.value);
	info[1].innerHTML = "Tamaño Restante: " + String(restante) + " B";


}

function cargarProcesosPlanificador(){
	//Carga los procesos al planificador de procesos
	tr = document.createElement("tr");
	
	td0 = document.createElement("td"); //nombre proceso
	td1 = document.createElement("td"); //tamanio
	td2 = document.createElement("td"); //tiempo de arribo
	td3 = document.createElement("td");	//rafaga cpu
	td4 = document.createElement("td"); //rafaga e/s
	td5 = document.createElement("td"); //prioridad

	td0.innerHTML = "P" + contador;
	contador += 1;

	td1.innerHTML = tamanio.value;
	td2.innerHTML = ta.value;
	td3.innerHTML = rafagacpu.value;
	td4.innerHTML = rafagaES.value;

	if(prioridad.value == ""){
		td5.innerHTML = "Ninguna";
	}else{
		td5.innerHTML = prioridad.value;
	}
	

	tr.appendChild(td0);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);

	tabla.appendChild(tr);
}

function validarInputsCargar(){
	if ((parseInt(tamanio.value) > restante) || (tamanio.value == "") || (parseInt(tamanio.value) < 0)) {
		tamanio.style.borderBottom = "1px solid #b71c1c";
		return false;
	}else if ((ta.value == "") || (parseInt(ta.value)) < 0) {
		ta.style.borderBottom = "1px solid #b71c1c";
		return false; 
	}else if ((rafagacpu.value == "") || (parseInt(rafagacpu.value) == 0) || (parseInt(rafagacpu.value)) < 0) {
		rafagacpu.style.borderBottom = "1px solid #b71c1c";
		return false; 
	}else if ((rafagaES.value == "") || (parseInt(rafagaES.value)) < 0) {
		rafagaES.style.borderBottom = "1px solid #b71c1c";
		return false; 
	}else if (alg_planific.text == "Prioridad") {
		if ((prioridad.value == "") || (parseInt(prioridad.value)) < 0) {
			prioridad.style.borderBottom = "1px solid #b71c1c";
			return false; 
		}else{
			return true;
		}
	}else{
		//Vuelvo a poner su color original de nuevo
		tamanio.style.borderBottom = "1px solid #4caf50";
		ta.style.borderBottom = "1px solid #4caf50";
		rafagacpu.style.borderBottom = "1px solid #4caf50";
		rafagaES.style.borderBottom = "1px solid #4caf50";
		prioridad.style.borderBottom = "1px solid #4caf50";

		return true;
	}

}

cant_part = document.getElementById("cant_part");
function agregarParticiones(){
	cadena = "" + cant_part.value; //Lo convierte a string

	if(!validarParticiones()){ //Valida que no se escriba cualquier cosa y que sean solo 6 particiones
		cant_part.style.borderBottom = "1px solid #b71c1c";
		return false;
	}else{
		cant_part.style.borderBottom = "1px solid #4caf50"; //Regreso los valores a la normalidad
	}

	particiones = obtenerValoresParticion();

	if (!validarTamParticiones() || (!validarMem())) { 
		cant_part.style.borderBottom = "1px solid #b71c1c";
		return false;
	}else{
		cant_part.style.borderBottom = "1px solid #4caf50";
	}

	//Cargo las particiones a la memoria real
	for (var i = 0; i < particiones.length ; i++) {
		mostrarParticiones(particiones[i],i);
	}
	

	//Deshabilito el campo de agregar particiones, para que el usuario no quiera
	//modificar en tiempo de ejecucion

	cant_part.disabled = true;

}

function obtenerValoresParticion(){
	contador = 0;
	posIni = 0;
	arreglo = [];
	for (var i = 0; i <= cadena.length; i++) {
		if (cadena[i] == "-") {
			arreglo.push(cadena.substr(posIni, contador-posIni));
			posIni = contador+1;
		}
		if (i == cadena.length) {
			arreglo.push(cadena.substr(posIni, contador-posIni));
		}
		contador += 1;
	}
	return arreglo;
}

function validarParticiones(){
	numeros = ["0","1","2","3","4","5","6","7","8","9"];
	contGuiones = 0;
	if (cadena.length == 0) {
		return false;
	}
	for (var i = 0; i < cadena.length; i++) {
		if (contGuiones > 6) { //Solo contemplamos hasta 6 particiones
			return false;
		}
		if (!numeros.includes(cadena[i])) {
			if (cadena[i] == "-") {
				contGuiones += 1;
			}
			if ((cadena[i] == "-") && (i == 0)) { //Error, no puede empezar con un guion

				return false;
			}else if ((cadena[i] == "-") && (cadena[i-1] == "-")){ //Error, no puede haber dos o mas guines seguidos

				return false;
			}else if (cadena[i] != "-"){ //Error, no puede haber otro caracter que no sea guion, en este momento

				return false;
			}else if ((cadena[i] == "-") && (i == cadena.length-1)){ //Error, no puede finalizar con un guion
		
				return false;
			}
		}

	}
	if (contGuiones < 1) { //Minimamente debe haber 2 particiones
		return false;
	}
	return true;

}

function validarTamParticiones(){
	acumulador = 0;
	tamanioMem10 = parseInt(tamanioMem.value)-parseInt(tamanioMem.value)*0.1;
	for (var i = 0; i < particiones.length; i++) {
		acumulador += parseInt(particiones[i]);
		if (parseInt(particiones[i]) < 19999) { //Cada particion no puede ser menor a 20000
			return false;
		}
	}
	if (acumulador > tamanioMem10) {
		return false;
	}
	particiones[particiones.length-1] = tamanioMem10 - (acumulador-parseInt(particiones[particiones.length-1]));
	return true;
}

function mostrarParticiones(tamPart,i){
	coloresPart = ["bdbdbd", "9e9e9e", "b0bec5", "90a4ae", "78909c", "607d8b"];
	div1 = document.createElement("div");
	div1.className = "procmem col";
	//Con esta linea obtengo el ancho del div que corresponde al uso del sistema operativo dentro de la memoria
	//Tambien representaria el tamanio del proceo
	ancho = parseInt(document.getElementById("memSO").offsetWidth);
	//Con esta linea calculo el procentaje de memoria que ocupa el SO dentro de la memoria
	procentajeSO = (ancho/parseInt(tamanioMem.value))*100;
	//Con esta linea calculo el procentaje que le corrresponde a la particion en base a la
	//memoria disponible que le queda, despues de la que usa el SO
	tamanioDiv = (tamPart/(parseInt(tamanioMem.value)-procentajeSO))*100;

	div1.style.width = tamanioDiv + "%";
	div1.style.background = "#"+coloresPart[i];
	div1.style.overflow = "auto";
	div1.style.overflowY = "hidden";
	span = document.createElement("span");
	span.innerHTML = "Part: " + (i+1);
	span.className = "center-align";
	div1.appendChild(span);
	mapa2.appendChild(div1);

}