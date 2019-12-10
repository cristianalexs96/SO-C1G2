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
firstFit = document.getElementById("firstFit");
worstFit = document.getElementById("worstFit");
function ocultarInputMem(){
	particiones.style.display = "none";
	firstFit.style.display = "none";
	worstFit.style.display = "";

}

function mostrarInputMem(){
	particiones.style.display = "";
	firstFit.style.display = "";
	worstFit.style.display = "none";
}
bandCargarProc = false;
bandCargarProc2 = false;
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

	//Si se selecciona Prioridad, habilita el campo Prioridad en la seccion de carga de procesos
	if (alg_planific.value == 2 || alg_planific.value == 4) {
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

	mapa.className = "mapa blue-grey lighten-5";


	//Deshabilito los radiobutton para que no me traiga problemas si el usuario cambia en plena ejecucion
	radio[0].disabled = true;
	radio[1].disabled = true;

	info[0].innerHTML = "Tamaño Memoria: " + tamanioMem.value + " B";
	restante = Math.round(parseInt(tamanioMem.value)-parseInt(tamanioMem.value)*0.1); //Le resto el 10% para el SO
	info[1].innerHTML = "Tamaño Restante: " + restante + " B";

	//Deshabilito el campo de tamanio memoria
	tamanioMem.disabled = true;

}
function validarMem(){
	if (tamanioMem.value == "") {
		return false;
	}else if(parseInt(tamanioMem.value) < 30){
		return false;
	}
	bandCargarProc = true;
	return true;
}
radio1 = document.getElementById("radio1");
radio2 = document.getElementById("radio2");
function validarConfMemoria(){
	if (radio1.checked == true) {
		if (bandCargarProc && bandCargarProc2) {
			cargar.className = "waves-effect waves-light btn-small right blue darken-1 separar";
			cargarArchivo.className = "waves-effect waves-light btn-small right blue darken-1 separar";
		}
	}else if (radio2.checked == true) {
		if (bandCargarProc) {
			cargar.className = "waves-effect waves-light btn-small right blue darken-1 separar";
			cargarArchivo.className = "waves-effect waves-light btn-small right blue darken-1 separar";
		}
	}
}

//Esta funcion carga los procesos en la memoria y el planificador de procesos
contadorProc = 0;
contador = 0;
tamanio = document.getElementById("tamanio");
ta = document.getElementById("tiempo_arr");
rafagacpu = document.getElementById("rafagaCPU");
rafagacpu2 = document.getElementById("rafagaCPU2");
rafagaES = document.getElementById("rafagaES");
prioridad = document.getElementById("prioridad");
planificadorProceso = document.getElementById("tabla");
tamanio_mem = document.getElementById("tamanio_mem");

ancho = mapa.offsetWidth;

//Estos arreglos los utilizare mas adelante en los algoritmos de gestion de procesos
nombreProc = [];
tamanioProc = [];
taProc = [];
rafagacpuProc = [];
rafagacpuProc2 = [];
rafagaESProc = [];
prioridadProc = [];
mostrarPlanif = document.getElementById("mostrarPlanif");
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

function cargarProcesoMem(){
	if(!validarInputsCargar()){
		return false;
	}
	cargarProcesosPlanificador();

	div1 = document.createElement("div");
	div2 = document.createElement("div");
	span = document.createElement("span");
	span.innerHTML = "P" + contadorProc + " ";
	div2.appendChild(span);
	div2.className = "text center-align";
	div1.setAttribute("title", tamanio.value + " B"); //Para que al pasar el mouse, diga el tamanio
	div1.appendChild(div2);
	div1.className = "procmem col";
	tamanioDiv = (parseInt(tamanio.value)/parseInt(tamanioMem.value))*100;
	div1.style.width = String(Math.round(tamanioDiv)) + "%";
	div1.style.background = "#" + colores[contadorProc];
	mapa.appendChild(div1);

	//Actualizo la informacion de la memoria disponible
	restante = restante - parseInt(tamanio.value);
	info[1].innerHTML = "Tamaño Restante: " + String(restante) + " B";
	contadorProc += 1;

	mostrarPlanif.style.display = "";

}

function validarCuant(){
	if (parseInt(cuant.value) < 1) {
		cuant.style.borderBottom = "1px solid #b71c1c";
		return false;
	}else{
		cuant.style.borderBottom = "1px solid #4caf50";
		return true;	
	}
}

function cargarProcesosPlanificador(){
	//Carga los procesos al planificador de procesos
	tr = document.createElement("tr");
	
	td0 = document.createElement("td"); //nombre proceso
	td1 = document.createElement("td"); //tiempo de arribo
	td2 = document.createElement("td"); //tamanio
	td3 = document.createElement("td");	//rafaga cpu
	td4 = document.createElement("td"); //rafaga e/s
	td5 = document.createElement("td");	//rafaga cpu
	td6 = document.createElement("td"); //prioridad

	nombreProc.push("P" + contador);
	tamanioProc.push(parseInt(tamanio.value));
	taProc.push(parseInt(ta.value));
	rafagacpuProc.push(parseInt(rafagacpu.value));
	rafagaESProc.push(parseInt(rafagaES.value));
	rafagacpuProc2.push(parseInt(rafagacpu2.value));
	prioridadProc.push(parseInt(prioridad.value));

	td0.innerHTML = "P" + contador;
	contador += 1;

	td1.innerHTML = ta.value;
	td2.innerHTML = tamanio.value;
	td3.innerHTML = rafagacpu.value;
	td4.innerHTML = rafagaES.value;
	td5.innerHTML = rafagacpu2.value;
	if(prioridad.value == ""){
		td6.innerHTML = "Ninguna";
	}else{
		td6.innerHTML = prioridad.value;
	}

	tr.appendChild(td0);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);
	tabla.appendChild(tr);
}

function validarInputsCargar(){
	if ((tamanio.value == "") || (parseInt(tamanio.value) <= 0)) {
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
	
	bandCargarProc2 = true;

	//Deshabilito el campo de agregar particiones, para que el usuario no quiera
	//modificar en tiempo de ejecucion

	cant_part.disabled = true;

}

function obtenerValoresParticion(){
	contadorPart = 0;
	posIni = 0;
	arreglo = [];
	for (var i = 0; i <= cadena.length; i++) {
		if (cadena[i] == "-") {
			arreglo.push(cadena.substr(posIni, contadorPart-posIni));
			posIni = contadorPart+1;
		}
		if (i == cadena.length) {
			arreglo.push(cadena.substr(posIni, contadorPart-posIni));
		}
		contadorPart += 1;
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
	tamanioMem10 = parseInt(tamanioMem.value);
	for (var i = 0; i < particiones.length; i++) {
		acumulador += parseInt(particiones[i]);
		if (parseInt(particiones[i]) < 5) { //Cada particion no puede ser menor a 5
			return false;
		}
	}
	if (acumulador > tamanioMem10) {
		return false;
	}
	particiones[particiones.length-1] = tamanioMem10 - (acumulador-parseInt(particiones[particiones.length-1]));
	return true;
}


//Me permite hacer click en el boton para cargar el archivo, es todo un descajete jaja
archivo = document.getElementById("archivo");
cargarArchivo = document.getElementById("cargarArchivo");

cargarArchivo.addEventListener("click", function(){
	archivo.click();
});


//Comienzo del tratamiento del archivo de entrada

var reader = new FileReader();

function lecturaArchivo(e){
	archivo = e.target.files[0];
	reader.readAsText(archivo);
	reader.onload = devolverProcesos;
}

procesosObjetos = [];

c = 0;
controlArchivo = false;
function devolverProcesos(){
	var result = reader.result;
	var lineas = result.split("\n");
	
	for (var i = 0; i < lineas.length; i++) {
		
		procesosObjetos[i] = {
			nombre: "P" + i,
			tamanio: parseInt(lineas[i].substring(0,4)),
			ta: parseInt(lineas[i].substring(5,8)),
			rafagacpu: parseInt(lineas[i].substring(9,12)),
			rafagaES: parseInt(lineas[i].substring(13,16)),
			rafagacpu2: parseInt(lineas[i].substring(17,20)),
			prioridad: parseInt(lineas[i].substring(21,23)),
			tiempoEntrada: 0,
			tiempoSalida: 0,
			tiempoEntradaES: 0,
			tiempoSalidaES: 0,
			controlMemoria: 0, //Controla aquellos procesos que se intentaron cargar en memoria y no entraron
			controlRafaga1: 0,	//Controla que la rafaga 1 haya terminado
			controlRafaga2: 0	//Controla que la rafaga 2 haya terminado
		}
	}

	//Permite mostrar los procesos en cola de nuevos solo una vez
	if(c == 0){
		mostrarColaNuevos(procesosObjetos);
		mostrarProcesosPlanificador(procesosObjetos);
		c += 1;
	}

		
	procesosObjetos = validarProcesos(procesosObjetos);

	controlArchivo = true;
	return procesosObjetos;
}


document.getElementById("archivo").addEventListener('change', lecturaArchivo, false);

function validarProcesos(procesos){
	validar = procesos;
	for (var i = 0; i < procesos.length; i++) {

		//Controlo las rafagas
		if (validar[i].rafagacpu <= 0 || validar[i].rafagaES < 0 || validar[i].rafagacpu2 < 0) { //Todas las rafagas tienen que ser positivas. La primera no puede ser 0
			validar.splice(i,1);
		}else if(validar[i].rafagaES > 0 && validar[i].rafagacpu2 <= 0){ // Si tiene rafaga de E/S pero no tiene de cpu2 o es negativa, error
			validar.splice(i,1);
		}else if(validar[i].rafagaES == 0 && validar[i].rafagacpu2 > 0){ // Si tiene E/S 0 y tiene rafagacpu2, error
			validar.splice(i,1);
		}else if (validar[i].ta < 0 || validar[i].prioridad < 0 || validar[i].tamanio < 1) { //Si el TA o la prioridad son negativas o el tamanio del proceso es menor a 1, error
			validar.splice(i,1);
		}
	}
	return validar;	
}

function mostrarColaNuevos(procesosObjetos){
	for (var i = 0; i < procesosObjetos.length; i++) {
		
		div1 = document.createElement("div");
		div2 = document.createElement("div");
		span = document.createElement("span");
		span.innerHTML = "P" + i + " ";
		div2.appendChild(span);
		div2.className = "text center-align";
		div1.setAttribute("title", tamanio.value + " B"); //Para que al pasar el mouse, diga el tamanio
		div1.appendChild(div2);
		div1.className = "procmem col";

		tamanioDiv = (parseInt(procesosObjetos[i].tamanio)/parseInt(tamanioMem.value))*100;
		div1.style.width = String(Math.round(tamanioDiv)) + "%";

		div1.style.background = "#" + colores[i];
		mapa.appendChild(div1);
		mostrarPlanif.style.display = "";

	}

}

function mostrarProcesosPlanificador(){
	for (var i = 0; i < procesosObjetos.length; i++) {

		//Carga los procesos al planificador de procesos
		tr = document.createElement("tr");
		
		td0 = document.createElement("td"); //nombre proceso
		td1 = document.createElement("td"); //tiempo de arribo
		td2 = document.createElement("td"); //tamanio
		td3 = document.createElement("td");	//rafaga cpu
		td4 = document.createElement("td"); //rafaga e/s
		td5 = document.createElement("td");	//rafaga cpu
		td6 = document.createElement("td"); //prioridad

		td0.innerHTML = procesosObjetos[i].nombre
		td1.innerHTML = procesosObjetos[i].ta;
		td2.innerHTML = procesosObjetos[i].tamanio;
		td3.innerHTML = procesosObjetos[i].rafagacpu;
		td4.innerHTML = procesosObjetos[i].rafagaES;
		td5.innerHTML = procesosObjetos[i].rafagacpu2;
		td6.innerHTML = procesosObjetos[i].prioridad;

		tr.appendChild(td0);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);

		tabla.appendChild(tr);
	}
}


historial = document.getElementById("historial");
ejecutar = document.getElementById("ejecutar");
mostrar = document.getElementsByClassName("mostrar");
algoritmosMem = document.getElementById("algoritmosMem");
radio2 = document.getElementById("radio2");
function adminAlgoritmosProcesos(){
	if (radio1.checked) {
		crearmemoriaPF();
	}else if(radio2.checked){

		if ((alg_planific.value == 1) && (algoritmosMem.value == 2)) {
			if (controlArchivo) {
				FCFS(true, 1);
				
			}else{

				FCFS(false, 1);
			}
			historialProcesosArchivo(auxiliar);
			diagramaGantArchivo(auxiliar, 0);
			diagramaGantArchivo(auxiliar, 3);
			historialMemoria(auxiliarMemoria, porcentajeMem);
		}else if ((alg_planific.value == 2) && (algoritmosMem.value == 2)) {
			if (controlArchivo) {
				Prioridades(true, 1);
				
			}else{
				Prioridades(false, 1);
			}
			historialProcesosArchivo(auxiliar);
			diagramaGantArchivo(auxiliar, 0);
			diagramaGantArchivo(auxiliar, 3);
			historialMemoria(auxiliarMemoria, porcentajeMem);
		}else if ((alg_planific.value == 3) && (algoritmosMem.value == 2)){
			if (controlArchivo) {
				RoundRobin(true, 1);
				
			}else{
				RoundRobin(false, 1);
			}
			historialProcesosArchivo(auxiliar);
			diagramaGantArchivo(auxiliar, 0);
			diagramaGantArchivo(auxiliar, 3);
			historialMemoria(auxiliarMemoria, porcentajeMem);
		}else if ((alg_planific.value == 4) && (algoritmosMem.value == 2)){
			if (controlArchivo) {
				multiNivel(true, 1);
				
			}else{
				multiNivel(false, 1);
			}
			historialProcesosArchivo(auxiliar);
			diagramaGantArchivo(auxiliar, 0);
			diagramaGantArchivo(auxiliar, 1);
			diagramaGantArchivo(auxiliar, 2);
			diagramaGantArchivo(auxiliar, 3);
			historialMemoria(auxiliarMemoria, porcentajeMem);
		}else if (alg_planific.value == 1 && algoritmosMem.value == 3) {
			if (controlArchivo) {
				FCFS(true, 3);
				
			}else{

				FCFS(false, 3);
			}
			historialProcesosArchivo(auxiliar);
			diagramaGantArchivo(auxiliar, 0);
			diagramaGantArchivo(auxiliar, 3);
			historialMemoria(auxiliarMemoria, porcentajeMem);
		}else if (alg_planific.value == 2 && algoritmosMem.value == 3) {
			if (controlArchivo) {
				Prioridades(true, 3);
				
			}else{

				Prioridades(false, 3);
			}
			historialProcesosArchivo(auxiliar);
			diagramaGantArchivo(auxiliar, 0);
			diagramaGantArchivo(auxiliar, 3);
			historialMemoria(auxiliarMemoria, porcentajeMem);
		}else if (alg_planific.value == 3 && algoritmosMem.value == 3) {
			if (controlArchivo) {
				RoundRobin(true, 3);
				
			}else{

				RoundRobin(false, 3);
			}
			historialProcesosArchivo(auxiliar);
			diagramaGantArchivo(auxiliar, 0);
			diagramaGantArchivo(auxiliar, 3);
			historialMemoria(auxiliarMemoria, porcentajeMem);
		}else if (alg_planific.value == 4 && algoritmosMem.value == 3) {
			if (controlArchivo) {
				multiNivel(true, 3);
				
			}else{

				multiNivel(false, 3);
			}
			historialProcesosArchivo(auxiliar);
			diagramaGantArchivo(auxiliar, 0);
			diagramaGantArchivo(auxiliar, 1);
			diagramaGantArchivo(auxiliar, 2);
			diagramaGantArchivo(auxiliar, 3);
			historialMemoria(auxiliarMemoria, porcentajeMem);
		}
	}

	ejecutar.className += " disabled";
	for (var i = 0; i < mostrar.length; i++) {
		mostrar[i].style.display = "";
	}
}


function montarEnMemoria(nombreP, tamP, alg){
	//Cuento los espacios libres de memoria 
	contLibre = 0;
	for (var i = 1; i < memoriaP.length; i++) {
		if ((i == 1) && (memoriaP[i] == 0) && (memoriaP[i-1] == 0)) {
			contLibre += 1;
		}else if ((memoriaP[i] == 0) && (memoriaP[i-1] != 0)) {
			contLibre += 1;
		}else if ((i == memoriaP.length-1) && (contLibre == 0)){ //Controlo el primer caso donde la memoria esta vacia
			contLibre = 1;
		}
	}

	//Inicializo el arreglo que controla los espacios libres de memoria
	posiciones = [];
	for (var i = 0; i < contLibre; i++) {
		posiciones[i] = {inicio:0, final:0};
	}

	//Verifico las posiciones libres y sus respectivos inicio y fin de cada espacio en memoria
	contEsp = 0;
	control1 = false;
	control2 = false;

	for (var i = 1; i < memoriaP.length; i++) {
		if ((i == 1) && (memoriaP[i-1] == 0)) {
			posiciones[contEsp].inicio = 0;
			control1 = true;

		}else if ((memoriaP[i] == 0) && (memoriaP[i-1] != 0)) {
			posiciones[contEsp].inicio = i;
			control1 = true;

		}else if ((memoriaP[i] != 0) && (memoriaP[i-1] == 0)){
			posiciones[contEsp].final = i;
			control2 = true;

		}else if ((i == memoriaP.length-1) && (memoriaP[i] == 0)){
			posiciones[contEsp].final = i+1; //SI TENGO PROBLEMAS CON LA MEMORIA, ELIMINAR EL + 1
			control2 = true;
		}

		if (control1 && control2) {
			contEsp++;
			control1 = false;
			control2 = false;
		}
	}

	//Calculo los espacios disponibles en tamanio que tengo en la memoria
	espaciosDisp = [];
	desperdicio = [];
	for (var i = 0; i < posiciones.length; i++) {
		espaciosDisp[i] = posiciones[i].final - posiciones[i].inicio;
		desperdicio[i] = espaciosDisp[i] - tamP;
	}

	//Aca esta la posta si es FF, BF o WF

	//Esto controla que exista al menos un espacio libre en la memoria
	bandera = false;
	for (var i = 0; i < desperdicio.length; i++) {
		if (desperdicio[i] >= 0) {
			bandera = true;
			break;
		}
	}
	if (bandera) {

		if (alg == 1) {

			min = 999999999999; //Representa un valor muy grande para hacer la busqueda
			for (var i = 0; i < desperdicio.length; i++) {
				if ((desperdicio[i] < min) && (desperdicio[i] >= 0)) {
					min = desperdicio[i];
				}
			}
			pos = desperdicio.indexOf(min, 0);

			//Escribe el proceso sobre la memoria
			for (var i = 0; i < tamP; i++) {
				memoriaP[posiciones[pos].inicio + i] = nombreP;
			}
		}else if (alg == 3) {
			max = -1; //Representa un valor muy chico para hacer la busqueda
			for (var i = 0; i < desperdicio.length; i++) {
				if ((desperdicio[i] > max) && (desperdicio[i] >= 0)) {
					max = desperdicio[i];
				}
			}

			pos = desperdicio.indexOf(max, 0);

			//Escribe el proceso sobre la memoria
			for (var i = 0; i < tamP; i++) {
				memoriaP[posiciones[pos].inicio + i] = nombreP;
			}
		}

		
	}

	
}

function removerDeMemoria(nombre){
	for (var i = 0; i < memoriaP.length; i++) {
		if (memoriaP[i] == nombre) {
			memoriaP[i] = 0;
		}
	}
}

function controlTamanioProc(){
	//Busco que un proceso sea mayor que la memoria
	aux = procesosOrd;
	for (var i = 0; i < aux.length; i++) {
		if (aux[i].tamanio > parseInt(tamanioMem.value)) {
			aux.push(aux[i]);
			aux.splice(i, 1);
		}
	}
	for (var i = 0; i < aux.length; i++) {
		if (aux[i].tamanio > parseInt(tamanioMem.value)) {
			aux.splice(i, aux.length-1);
		}
	}
	procesosOrd = aux;
}
auxiliarElemento = [];
auxiliarMemoria = [];
porcentajeMem = [];

function estadisticasMemoria(){
	elemento = memoriaP[0];
	auxiliarElemento.push(elemento);
	contProc = 0;
	//Voy guardando los procesos en este instante de tiempo
	for (var i = 0; i < memoriaP.length; i++) {
		if (elemento != memoriaP[i]) {
			auxiliarElemento.push(elemento);
			elemento = memoriaP[i];
		}

		//Calculo cuantos espacios de memoria estan siendo utilizados
		if (memoriaP[i] != 0) {
			contProc++;
		}
	}

	//Elimina los elementos duplicados
	auxiliarElemento.filter(function(value, index, self) { 
	  return self.indexOf(value) === index;
	});

	porcentajeMem.push((contProc/memoriaP.length)*100); //Porcentaje de memoria utilizada en ese momento
	auxiliarMemoria.push(auxiliarElemento); //Arreglo de arreglo. Una matriz
	auxiliarElemento = [];

}
function FCFS(archivo, alg){
	memoriaP = new Array(parseInt(tamanioMem.value));
	listos = [];
	auxiliar = [];
	auxControlMem = [];
	colaES = [];
	procesosOrd = [];
	colaEjec = [];
	auxiliarES = [];

	for (var i = 0; i < memoriaP.length; i++) {
		memoriaP[i] = 0;
	}

	//Con esto funciona para archivos y manual
	if (archivo) {
		procesosOrd = devolverProcesos();
	}else{
		for (var i = 0; i < nombreProc.length; i++) {
			procesosOrd[i] = {	nombre: nombreProc[i], 
							tamanio: tamanioProc[i], 
							ta: taProc[i],
							rafagacpu: rafagacpuProc[i],
							rafagaES: rafagaESProc[i],
							rafagacpu2: rafagacpuProc2[i],
							prioridad: prioridadProc[i],
							tiempoEntrada: 0,
							tiempoSalida: 0,
							tiempoEntradaES: 0,
							tiempoSalidaES: 0,
							controlMemoria: 0, //Controla aquellos procesos que se intentaron cargar en memoria y no entraron
							controlRafaga1: 0,	//Controla que la rafaga 1 haya terminado
							controlRafaga2: 0	//Controla que la rafaga 2 haya terminado
						};
		}
		procesosOrd = validarProcesos(procesosOrd); //Verifica rafagas, TA, prioridades, etc
	}

	//Ordeno el arreglo por ta
	procesosOrd.sort(function(a, b){
		return a.ta - b.ta;
	});

	controlTamanioProc();
	acum = 0;
	for (var i = 0; i < procesosOrd.length; i++) {
		//Acumulo todos los tiempos, esto me dara el tiempo total de ejecucion
		acum = acum + procesosOrd[i].rafagacpu + procesosOrd[i].rafagaES + procesosOrd[i].rafagacpu2 + procesosOrd[i].ta;
	}

	controlProc = 0;
	controlES = 0;
	rafagas = 0;
	iES = 0;
	bandRes = true;
	for (var i = 0; i <= (acum + 1); i++) { // Es acum + 1 porque la primera vez no entra al procesador
	
		if ((colaEjec == 0) && (listos.length > 0)) {
			colaEjec = listos[0];
			listos.splice(0,1);
		}

		if (colaEjec != 0) { 
		 
		 	if (colaEjec.controlRafaga1 == 0){
		 		if((colaEjec.rafagacpu + rafagas) == i){
		 			if (colaEjec.ta > 0) {
		 				if (auxiliar.length == 0) { //Si no pregunto esto, siempre que todos los TA de todos los procesos sean > 0, pondra como tiempo de entrada, el TA de ese proceso. Error
			 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: colaEjec.ta, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
		 				}else{
		 					auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
		 				}
		 			}else{
		 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
		 			}

		 			if (colaEjec.rafagaES == 0) {
						removerDeMemoria(colaEjec.nombre);
					}else{
						colaEjec.controlRafaga1 = 1;
						if (colaES.length == 0) { //Si la cola de E/S esta ocupada, i no seria el tiempo de entrada
							colaEjec.tiempoEntradaES = i;
						}
						colaES.push(colaEjec);
					}
					colaEjec = 0;
					rafagas = i;
					
		 		}
		 		
		 	}else if(colaEjec.controlRafaga2 == 0){
		 		
	 			if((colaEjec.rafagacpu2 + rafagas) == i){
					
	 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada:rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
	 				
					removerDeMemoria(colaEjec.nombre);
					

					colaEjec.controlRafaga2 = 1;
					colaEjec = 0;
					rafagas = i;
	 			}
		 		

		 	}
		}


		//Este for intenta meter en la memoria aquellos procesos que anteriormente no pudieron entrar
		//claramente esos procesos deberian tenerse encuenta antes que los otros que aun no intentaron entrar
		for (var j = 0; j < auxControlMem.length; j++) {
			
			montarEnMemoria(auxControlMem[j].nombre, auxControlMem[j].tamanio, alg);
			if(bandera){
				listos.push(auxControlMem[j]);
				auxControlMem.splice(j,1);
			}
			
		}

		for (var j = 0; j < procesosOrd.length; j++) {
			if(procesosOrd[j].ta == i){
				montarEnMemoria(procesosOrd[j].nombre, procesosOrd[j].tamanio, alg);
				if(bandera){
					listos.push(procesosOrd[j]);
				}else{
					auxControlMem.push(procesosOrd[j]);

				}
			}
		}


		//Maneja la cola de entrada salida
		if (colaES.length > 0) {
			if (colaES[0].rafagaES == iES) {

				//Esto es para que no se actualice el ultimo tiempo de salida si la cpu esta ejecutando un proceso
				if (colaEjec == 0) {
					rafagas = i;
				}

				auxiliar.push({nombre: colaES[0].nombre, tiempoEntrada: colaES[0].tiempoEntradaES, tiempoSalida: i, marca: 3, auxEntrada:0, auxSalida:0});
				listos.push(colaES[0]);
				if (colaES.length > 1) {
					colaES[1].tiempoEntradaES = i;
					iES = 1;
				}else{

					iES = 0;
				}
				colaES.splice(0,1); 
			}else{

				iES++;
			}
		}

		//Cuando algun proceso tenga un TA mucho mayor a los otros, es necesario actualizar las
		//rafagas para que puedan entrar, sino se rompe todo
		if (listos.length == 0 && colaEjec == 0 && colaES.length == 0) {
			rafagas = i+1;
		}

		estadisticasMemoria();
		
	}
}

function Prioridades(archivo, alg){
	memoriaP = new Array(parseInt(tamanioMem.value));
	listos = [];
	auxiliar = [];
	auxControlMem = [];
	colaES = [];
	colaEjec = 0;
	procesosOrd = [];

	for (var i = 0; i < memoriaP.length; i++) {
		memoriaP[i] = 0;
	}
	
	//Con esto funciona para archivos y manual
	if (archivo) {
		procesosOrd = devolverProcesos();
	}else{
		for (var i = 0; i < nombreProc.length; i++) {
			
			procesosOrd[i] = {	nombre: nombreProc[i], 
							tamanio: tamanioProc[i], 
							ta: taProc[i],
							rafagacpu: rafagacpuProc[i],
							rafagaES: rafagaESProc[i],
							rafagacpu2: rafagacpuProc2[i],
							prioridad: prioridadProc[i],
							tiempoEntrada: 0,
							tiempoSalida: 0,
							tiempoEntradaES: 0,
							tiempoSalidaES: 0,
							controlMemoria: 0, //Controla aquellos procesos que se intentaron cargar en memoria y no entraron
							controlRafaga1: 0,	//Controla que la rafaga 1 haya terminado
							controlRafaga2: 0	//Controla que la rafaga 2 haya terminado
						};
		}

		procesosOrd = validarProcesos(procesosOrd); //Verifica rafagas, TA, prioridades, etc
	}


	controlTamanioProc();
	acum = 0;
	for (var i = 0; i < procesosOrd.length; i++) {
		//Acumulo todos los tiempos, esto me dara el tiempo total de ejecucion
		acum = acum + procesosOrd[i].rafagacpu + procesosOrd[i].rafagaES + procesosOrd[i].rafagacpu2 + procesosOrd[i].ta;
	}

	controlProc = 0;

	controlES = 0;
	rafagas = 0;
	iES = 0;

	for (var i = 0; i <= (acum + 1); i++) { // Es acum + 1 porque la primera vez no entra al procesador
	
		if ((colaEjec == 0) && (listos.length > 0)) {
			colaEjec = listos[0];
			listos.splice(0,1);
		}

		//Ordeno el arreglo por Prioridad
		procesosOrd.sort(function(a, b){
			return a.prioridad - b.prioridad;
		});

		if (colaEjec != 0) { 
		 
		 	if (colaEjec.controlRafaga1 == 0){
		 		if((colaEjec.rafagacpu + rafagas) == i){
		 			if (colaEjec.ta > 0) {
		 				if (auxiliar.length == 0) { //Si no pregunto esto, siempre que todos los TA de todos los procesos sean > 0, pondra como tiempo de entrada, el TA de ese proceso. Error
			 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: colaEjec.ta, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
		 				}else{
		 					auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
		 				}
		 			}else{
		 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
		 			}

		 			if (colaEjec.rafagaES == 0) {
						removerDeMemoria(colaEjec.nombre);
					}else{
						colaEjec.controlRafaga1 = 1;
						if (colaES.length == 0) { //Si la cola de E/S esta ocupada, i no seria el tiempo de entrada
							colaEjec.tiempoEntradaES = i;
						}
						colaES.push(colaEjec);
					}
					colaEjec = 0;
					rafagas = i;
					
		 		}
		 		
		 	}else if(colaEjec.controlRafaga2 == 0){
		 		
	 			if((colaEjec.rafagacpu2 + rafagas) == i){
					
	 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada:rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
	 				
					removerDeMemoria(colaEjec.nombre);
					

					colaEjec.controlRafaga2 = 1;
					colaEjec = 0;
					rafagas = i;
	 			}
		 		

		 	}
		}

		//Este for intenta meter en la memoria aquellos procesos que anteriormente no pudieron entrar
		//claramente esos procesos deberian tenerse encuenta antes que los otros que aun no intentaron entrar
		for (var j = 0; j < auxControlMem.length; j++) {
			
			montarEnMemoria(auxControlMem[j].nombre, auxControlMem[j].tamanio, alg);
			if(bandera){
				listos.push(auxControlMem[j]);
				auxControlMem.splice(j,1);
			}
		}
		for (var j = 0; j < procesosOrd.length; j++) {
			if(procesosOrd[j].ta == i){
				montarEnMemoria(procesosOrd[j].nombre, procesosOrd[j].tamanio, alg);
				if(bandera){
					listos.push(procesosOrd[j]);
				}else{
					auxControlMem.push(procesosOrd[j]);

				}
			}
		}

		//Maneja la cola de entrada salida
		if (colaES.length > 0) {
			if (colaES[0].rafagaES == iES) {

				//Esto es para que no se actualice el ultimo tiempo de salida si la cpu esta ejecutando un proceso
				if (colaEjec == 0) {
					rafagas = i;
				}

				auxiliar.push({nombre: colaES[0].nombre, tiempoEntrada: colaES[0].tiempoEntradaES, tiempoSalida: i, marca: 3, auxEntrada:0, auxSalida:0});
				listos.push(colaES[0]);
				if (colaES.length > 1) {
					colaES[1].tiempoEntradaES = i;
					iES = 1;
				}else{

					iES = 0;
				}
				colaES.splice(0,1); 
			}else{

				iES++;
			}
		}

		//Cuando algun proceso tenga un TA mucho mayor a los otros, es necesario actualizar las
		//rafagas para que puedan entrar, sino se rompe todo
		if (listos.length == 0 && colaEjec == 0 && colaES.length == 0) {
			rafagas = i+1;
		}

		estadisticasMemoria();
	}
}

quantumInput = document.getElementById("cuant");
function RoundRobin(archivo, alg){
	memoriaP = new Array(parseInt(tamanioMem.value));
	listos = [];
	auxiliar = [];
	auxControlMem = [];
	colaES = [];
	colaEjec = 0;
	procesosOrd = [];
	quantum = parseInt(quantumInput.value);

	for (var i = 0; i < memoriaP.length; i++) {
		memoriaP[i] = 0;
	}
	
	//Con esto funciona para archivos y manual
	if (archivo) {
		procesosOrd = devolverProcesos();
	}else{
		for (var i = 0; i < nombreProc.length; i++) {
			
			procesosOrd[i] = {	nombre: nombreProc[i], 
							tamanio: tamanioProc[i], 
							ta: taProc[i],
							rafagacpu: rafagacpuProc[i],
							rafagaES: rafagaESProc[i],
							rafagacpu2: rafagacpuProc2[i],
							prioridad: prioridadProc[i],
							tiempoEntrada: 0,
							tiempoSalida: 0,
							tiempoEntradaES: 0,
							tiempoSalidaES: 0,
							controlMemoria: 0, //Controla aquellos procesos que se intentaron cargar en memoria y no entraron
							controlRafaga1: 0,	//Controla que la rafaga 1 haya terminado
							controlRafaga2: 0	//Controla que la rafaga 2 haya terminado
						};
		}

		procesosOrd = validarProcesos(procesosOrd); //Verifica rafagas, TA, prioridades, etc
	}

	//Ordeno el arreglo por ta
	procesosOrd.sort(function(a, b){
			return a.ta - b.ta;
	});

	controlTamanioProc();

	//Acumulo todos los tiempos, esto me dara el tiempo total de ejecucion
	acum = 0;
	for (var i = 0; i < procesosOrd.length; i++) {
		
		acum = acum + procesosOrd[i].rafagacpu + procesosOrd[i].rafagaES + procesosOrd[i].rafagacpu2 + procesosOrd[i].ta;
	}

	controlES = 0;
	rafagas = 0;
	iES = 0;
	contQ = 0;

	for (var i = 0; i <= (acum + 1); i++) { // Es acum + 1 porque la primera vez no entra al procesador
		
		if ((colaEjec == 0) && (listos.length > 0)) {
			colaEjec = listos[0];
			listos.splice(0,1);
		}

		if (colaEjec != 0) { 
		 	if (colaEjec.controlRafaga1 == 0){
		 		if((colaEjec.rafagacpu - 1 == 0) || (contQ + 1 == quantum)){ //CONTROLAR ESTA LINEA, PUEDE QUE DEBA SER (contQ + 1 == quantum)
		 			if (colaEjec.ta > 0) {
		 				if (auxiliar.length == 0) { //Si no pregunto esto, siempre que todos los TA de todos los procesos sean > 0, pondra como tiempo de entrada, el TA de ese proceso. Error
			 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: colaEjec.ta, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
		 				}else{
		 					auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
		 				}
		 			}else{
		 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
		 			}

					if (colaEjec.rafagacpu - 1 == 0) {
						colaEjec.rafagacpu -= 1;
						if (colaEjec.rafagaES == 0) {
							removerDeMemoria(colaEjec.nombre);
						}else{
							colaEjec.controlRafaga1 = 1;
							if (colaES.length == 0) { //Si la cola de E/S esta ocupada, i no seria el tiempo de entrada
								colaEjec.tiempoEntradaES = i;
							}
							colaES.push(colaEjec);
						}
					}else{
						colaEjec.rafagacpu -= 1;
						listos.push(colaEjec);
					}
					rafagas = i; 
					colaEjec = 0;
					
					contQ = 0;

				}else if (contQ < quantum){
					contQ += 1;
					colaEjec.rafagacpu -= 1;
				}

		 	}else if(colaEjec.controlRafaga2 == 0){
		 		
		 		if((colaEjec.rafagacpu2 - 1 == 0) || (contQ + 1 == quantum)){ //CONTROLAR ESTA LINEA, PUEDE QUE DEBA SER (contQ + 1 == quantum)
					auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca: 0});
					
					if (colaEjec.rafagacpu2 - 1 == 0) {
						colaEjec.rafagacpu2 -= 1;
						colaEjec.controlRafaga2 = 1;
						removerDeMemoria(colaEjec.nombre);
					}else{
						colaEjec.rafagacpu2 -= 1;
						listos.push(colaEjec);
					
					}
					rafagas = i; 
					colaEjec = 0;
					contQ = 0;

				}else if (contQ < quantum){
					contQ += 1;
					colaEjec.rafagacpu2 -= 1;
				}
		 	}
		}

		//Este for intenta meter en la memoria aquellos procesos que anteriormente no pudieron entrar
		//claramente esos procesos deberian tenerse encuenta antes que los otros que aun no intentaron entrar
		for (var j = 0; j < auxControlMem.length; j++) {
			
			montarEnMemoria(auxControlMem[j].nombre, auxControlMem[j].tamanio, alg);
			if(bandera){
				listos.push(auxControlMem[j]);
				auxControlMem.splice(j,1);
			}
			
		}
		for (var j = 0; j < procesosOrd.length; j++) {
			if(procesosOrd[j].ta == i){
				montarEnMemoria(procesosOrd[j].nombre, procesosOrd[j].tamanio, alg);
				if(bandera){
					listos.push(procesosOrd[j]);
				
				}else{
					auxControlMem.push(procesosOrd[j]);
				}
			}
		}

		//Maneja la cola de entrada salida
		if (colaES.length > 0) {
			if (colaES[0].rafagaES == iES) {

				//Esto es para que no se actualice el ultimo tiempo de salida si la cpu esta ejecutando un proceso
				if (colaEjec == 0) {
					rafagas = i;
				}

				auxiliar.push({nombre: colaES[0].nombre, tiempoEntrada: colaES[0].tiempoEntradaES, tiempoSalida: i, marca: 3, auxEntrada:0, auxSalida:0});
				listos.push(colaES[0]);
				if (colaES.length > 1) {
					colaES[1].tiempoEntradaES = i;
					iES = 1;
				}else{

					iES = 0;
				}
				colaES.splice(0,1);
			}else{

				iES++;
			}
		}

		//Cuando algun proceso tenga un TA mucho mayor a los otros, es necesario actualizar las
		//rafagas para que puedan entrar, sino se rompe todo
		if (listos.length == 0 && colaEjec == 0 && colaES.length == 0) {
			rafagas = i+1;
		}
		estadisticasMemoria();
	} 
}

function multiNivel(archivo, alg){
	memoriaP = new Array(parseInt(tamanioMem.value));
	listos = [];
	auxiliar = [];
	auxControlMem = [];
	colaES = [];
	colaEjec = 0;
	procesosOrd = [];
	quantum1 = 3;
	quantum2 = 6;

	for (var i = 0; i < memoriaP.length; i++) {
		memoriaP[i] = 0;
	}
	
	//Con esto funciona para archivos y manual
	if (archivo) {
		procesosOrd = devolverProcesos();
	}else{
		for (var i = 0; i < nombreProc.length; i++) {
			
			procesosOrd[i] = {	nombre: nombreProc[i], 
							tamanio: tamanioProc[i], 
							ta: taProc[i],
							rafagacpu: rafagacpuProc[i],
							rafagaES: rafagaESProc[i],
							rafagacpu2: rafagacpuProc2[i],
							prioridad: prioridadProc[i],
							tiempoEntrada: 0,
							tiempoSalida: 0,
							tiempoEntradaES: 0,
							tiempoSalidaES: 0,
							controlMemoria: 0, //Controla aquellos procesos que se intentaron cargar en memoria y no entraron
							controlRafaga1: 0,	//Controla que la rafaga 1 haya terminado
							controlRafaga2: 0	//Controla que la rafaga 2 haya terminado
						};
		}

		procesosOrd = validarProcesos(procesosOrd); //Verifica rafagas, TA, prioridades, etc
	}
	controlTamanioProc();

	// //Ordeno el arreglo por ta
	// procesosOrd.sort(function(a, b){
	// 		return a.ta - b.ta;
	// });
	//Acumulo todos los tiempos, esto me dara el tiempo total de ejecucion
	acum = 0;
	for (var i = 0; i < procesosOrd.length; i++) {
		
		acum = acum + procesosOrd[i].rafagacpu + procesosOrd[i].rafagaES + procesosOrd[i].rafagacpu2 + procesosOrd[i].ta;
	}
	
	controlES = 0;
	rafagas = 0;
	iES = 0;
	contQ = 0;

	for (var i = 0; i <= (acum + 1); i++) { // Es acum + 1 porque la primera vez no entra al procesador
		
		//Ordeno por prioridad
		listos.sort(function(a, b){
			return a.prioridad - b.prioridad;
		});

		if ((colaEjec == 0) && (listos.length > 0)) {
			colaEjec = listos[0];
			listos.splice(0,1);
		}


		if (colaEjec != 0) { 

			if (colaEjec.prioridad >= 0 && colaEjec.prioridad <= 5) {
				if (colaEjec.controlRafaga1 == 0){
		 	
			 		if((colaEjec.rafagacpu - 1 == 0) || (contQ + 1 == quantum1)){ 
			 			if (colaEjec.ta > 0) {
			 				if (auxiliar.length == 0) { //Si no pregunto esto, siempre que todos los TA de todos los procesos sean > 0, pondra como tiempo de entrada, el TA de ese proceso. Error
				 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: colaEjec.ta, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
			 				}else{
			 					auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
			 				}
			 			}else{
			 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
			 			}

						if (colaEjec.rafagacpu - 1 == 0) {
							colaEjec.rafagacpu -= 1;
							if (colaEjec.rafagaES == 0) {
								removerDeMemoria(colaEjec.nombre);
							}else{
								colaEjec.controlRafaga1 = 1;
								if (colaES.length == 0) { //Si la cola de E/S esta ocupada, i no seria el tiempo de entrada
									colaEjec.tiempoEntradaES = i;
								}
								colaES.push(colaEjec);3
							}
						}else{
							colaEjec.rafagacpu -= 1;
							listos.push(colaEjec);
						}
						rafagas = i; 
						colaEjec = 0;
						
						contQ = 0;

					}else if (contQ < quantum1){
						contQ += 1;
						colaEjec.rafagacpu -= 1;
					}

			 	}else if(colaEjec.controlRafaga2 == 0){
			 		
			 		if((colaEjec.rafagacpu2 - 1 == 0) || (contQ + 1 == quantum1)){ //CONTROLAR ESTA LINEA, PUEDE QUE DEBA SER (contQ + 1 == quantum1)
						auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:0, auxEntrada:0, auxSalida:0});
												
						if (colaEjec.rafagacpu2 - 1 == 0) {
							colaEjec.rafagacpu2 -= 1;
							
							colaEjec.controlRafaga2 = 1;
							removerDeMemoria(colaEjec.nombre);
						}else{
							
							colaEjec.rafagacpu2 -= 1;
							listos.push(colaEjec);
						}
						rafagas = i; 
						colaEjec = 0;
						contQ = 0;
						
					}else if (contQ < quantum1){
						contQ += 1;
						colaEjec.rafagacpu2 -= 1;
					}
			 	}
			}else if (colaEjec.prioridad >= 6 && colaEjec.prioridad <= 10){

				if (colaEjec.controlRafaga1 == 0){
		 	
			 		if((colaEjec.rafagacpu - 1 == 0) || (contQ + 1 == quantum2)){ //CONTROLAR ESTA LINEA, PUEDE QUE DEBA SER (contQ + 1 == quantum)
			 			if (colaEjec.ta > 0) {
			 				if (auxiliar.length == 0) { //Si no pregunto esto, siempre que todos los TA de todos los procesos sean > 0, pondra como tiempo de entrada, el TA de ese proceso. Error
				 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: colaEjec.ta, tiempoSalida: i, marca:1, auxEntrada:0, auxSalida:0});
			 				}else{
			 					auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:1, auxEntrada:0, auxSalida:0});
			 				}
			 			}else{
			 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:1, auxEntrada:0, auxSalida:0});
			 			}

						if (colaEjec.rafagacpu - 1 == 0) {
							colaEjec.rafagacpu -= 1;
							if (colaEjec.rafagaES == 0) {
								removerDeMemoria(colaEjec.nombre);
							}else{
								colaEjec.controlRafaga1 = 1;
								if (colaES.length == 0) { //Si la cola de E/S esta ocupada, i no seria el tiempo de entrada
									colaEjec.tiempoEntradaES = i;
								}
								colaES.push(colaEjec);
							}
						}else{
							colaEjec.rafagacpu -= 1;
							listos.push(colaEjec);
						}
						rafagas = i; 
						colaEjec = 0;
						contQ = 0;

					}else if (contQ < quantum2){
						contQ += 1;
						colaEjec.rafagacpu -= 1;
					}

			 	}else if(colaEjec.controlRafaga2 == 0){
			 		
			 		if((colaEjec.rafagacpu2 - 1 == 0) || (contQ + 1 == quantum2)){ //CONTROLAR ESTA LINEA, PUEDE QUE DEBA SER (contQ + 1 == quantum2)
						
						auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:1, auxEntrada:0, auxSalida:0});
						
						
						if (colaEjec.rafagacpu2 - 1 == 0) {
							colaEjec.rafagacpu2 -= 1;
							
							colaEjec.controlRafaga2 = 1;
							removerDeMemoria(colaEjec.nombre);
						}else{
							
							colaEjec.rafagacpu2 -= 1;
							listos.push(colaEjec);
							
						}
						rafagas = i; 
						colaEjec = 0;
						contQ = 0;
						
					}else if (contQ < quantum2){
						contQ += 1;
						colaEjec.rafagacpu2 -= 1;
					}
			 	}

			}else if (colaEjec.prioridad > 10) {

				if (colaEjec.controlRafaga1 == 0){
			 		if(colaEjec.rafagacpu + rafagas == i){
						if (colaEjec.ta > 0) {
			 				if (auxiliar.length == 0) { //Si no pregunto esto, siempre que todos los TA de todos los procesos sean > 0, pondra como tiempo de entrada, el TA de ese proceso. Error
				 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: colaEjec.ta, tiempoSalida: i, marca:2, auxEntrada:0, auxSalida:0});
			 				}else{
			 					auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:2, auxEntrada:0, auxSalida:0});
			 				}
			 			}else{
			 				auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:2, auxEntrada:0, auxSalida:0});
			 			}
						rafagas = i;
						if (colaEjec.rafagaES == 0) {
							removerDeMemoria(colaEjec.nombre);
						}else{
							colaEjec.controlRafaga1 = 1;
							if (colaES.length == 0) { //Si la cola de E/S esta ocupada, i no seria el tiempo de entrada
								colaEjec.tiempoEntradaES = i;
							}
							colaES.push(colaEjec);
						}
						colaEjec = 0;
					
					}
			 	}else if(colaEjec.controlRafaga2 == 0){
			 		if (colaEjec.rafagacpu2 + rafagas == i) {
						
						auxiliar.push({nombre: colaEjec.nombre, tiempoEntrada: rafagas, tiempoSalida: i, marca:2, auxEntrada:0, auxSalida:0});
						rafagas = i; // suma la rafaga en este momento
						colaEjec.controlRafaga2 = 1;
						removerDeMemoria(colaEjec.nombre);
						colaEjec = 0;
						
					}
			 	}

			}

		}

		//Este for intenta meter en la memoria aquellos procesos que anteriormente no pudieron entrar
		//claramente esos procesos deberian tenerse encuenta antes que los otros que aun no intentaron entrar
		for (var j = 0; j < auxControlMem.length; j++) {
			
			montarEnMemoria(auxControlMem[j].nombre, auxControlMem[j].tamanio, alg);
			if(bandera){
				listos.push(auxControlMem[j]);
				auxControlMem.splice(j,1);
			}
			
		}
		for (var j = 0; j < procesosOrd.length; j++) {
			if(procesosOrd[j].ta == i){
				montarEnMemoria(procesosOrd[j].nombre, procesosOrd[j].tamanio, alg);
				if(bandera){
					listos.push(procesosOrd[j]);
				
				}else{
					auxControlMem.push(procesosOrd[j]);

				}
			}
		}

		//Maneja la cola de entrada salida
		if (colaES.length > 0) {
			if (colaES[0].rafagaES == iES) {

				//Esto es para que no se actualice el ultimo tiempo de salida si la cpu esta ejecutando un proceso
				if (colaEjec == 0) {
					rafagas = i;
				}

				auxiliar.push({nombre: colaES[0].nombre, tiempoEntrada: colaES[0].tiempoEntradaES, tiempoSalida: i, marca: 3, auxEntrada:0, auxSalida:0});
				listos.push(colaES[0]);
				if (colaES.length > 1) {
					colaES[1].tiempoEntradaES = i;
					iES = 1;
				}else{

					iES = 0;
				}
				colaES.splice(0,1);
			}else{

				iES++;
			}
		}

		//Cuando algun proceso tenga un TA mucho mayor a los otros, es necesario actualizar las
		//rafagas para que puedan entrar, sino se rompe todo
		if (listos.length == 0 && colaEjec == 0 && colaES.length == 0) {
			rafagas = i+1;
		}
		estadisticasMemoria();
	}
}



historial = document.getElementById("historial");
function historialProcesosArchivo(auxiliar){
	for (var i = 0; i < auxiliar.length; i++) {
		
		p = document.createElement("p");
		p.style.marginBottom = "10px";
		if (auxiliar[i].marca == 3) {
			p.innerHTML = "- El proceso " + auxiliar[i].nombre + " entra en el tiempo " + auxiliar[i].tiempoEntrada + " y sale en el tiempo " + auxiliar[i].tiempoSalida + " en E/S\n";
		}else{
			p.innerHTML = "- El proceso " + auxiliar[i].nombre + " entra en el tiempo " + auxiliar[i].tiempoEntrada + " y sale en el tiempo " + auxiliar[i].tiempoSalida + "\n";
		}
		historial.appendChild(p);	
		
	}
}

historialMem = document.getElementById("historialMemoria");
function historialMemoria(auxiliar, porcentaje){

	cadena = "";
	band = true;
	for (var i = 0; i < auxiliar.length; i++) {
		for (var j = 0; j < auxiliar[i].length; j++) {
			if (j == 0) {

				if (auxiliar[i][j] != 0) {
					cadena += auxiliar[i][j] + " ";
				}
			}else{ //No imprime los duplicados
				if (auxiliar[i][j] != 0 && auxiliar[i][j-1] != auxiliar[i][j]) {
					cadena += auxiliar[i][j] + " ";
				}
			}
		}
		if (cadena != "") {
			p_time = document.createElement("p");
			timeicon = '<i class="tiny material-icons" style="position: relative; top:2px;">access_time</i>';
			p_time.innerHTML = timeicon + " TIEMPO: " + i + "\n";
			p = document.createElement("p");
			p.style.marginBottom = "10px";
			pporcentaje = document.createElement("p");
			pporcentaje.innerHTML = "- Memoria Utilizada " + porcentaje[i].toFixed(2)+ "%\n";
			
			p.innerHTML = "- En el tiempo " + i + " se encuentran los procesos " + cadena;
			cadena = "";
			pfinal = document.createElement("p");
			pfinal.innerHTML = "___________________________________________ \n";

			historialMem.appendChild(p_time);
			historialMem.appendChild(p);
			historialMem.appendChild(pporcentaje);	
			historialMem.appendChild(pfinal);
			tiempo = i;
		}
		
	}

	p_time = document.createElement("p");
	timeicon = '<i class="tiny material-icons" style="position: relative; top:2px;">access_time</i>';
	p_time.innerHTML = timeicon + " TIEMPO: " + (tiempo + 1) + "\n";
	p = document.createElement("p");
	p.style.marginBottom = "10px";
	
	p.innerHTML = "- En el tiempo " + (tiempo + 1) + " se libera la memoria";
	cadena = "";
	pfinal = document.createElement("p");
	pfinal.innerHTML = "___________________________________________ \n";

	historialMem.appendChild(p_time);
	historialMem.appendChild(p);	
	historialMem.appendChild(pfinal);

}

ganttProc = document.getElementById("ganttProc");
ganttTiempo = document.getElementById("ganttTiempo");
ganttProc2 = document.getElementById("ganttProc2");
ganttTiempo2 = document.getElementById("ganttTiempo2");
ganttProc3 = document.getElementById("ganttProc3");
ganttTiempo3 = document.getElementById("ganttTiempo3");
ganttProcES = document.getElementById("ganttProcES");
ganttTiempoES = document.getElementById("ganttTiempoES");
colaMulti1 = document.getElementById("colaMulti1");
colaMulti2 = document.getElementById("colaMulti2");



function diagramaGantArchivo(auxiliar, marca){
	band = false;
	band2 = false;
	bandControl = true;
	acum = 0;
	controlacum = false;
	if (auxiliar.length > 0) {
		totalTiempo = auxiliar[auxiliar.length-1].tiempoSalida;
		//Todo esto, es para corregir el gantt. Cuando acum sea mayor a 100, se le resta el excedente a los tiempos
		//Y se lo hace valer 100, entonces de esa forma no se rompe el gantt
		for (var i = 0; i < auxiliar.length; i++){
			acum += ((auxiliar[i].tiempoSalida-auxiliar[i].tiempoEntrada)/totalTiempo)*100;
		}

		if (acum > 98) {
			controlacum = true;
			for (var i = 0; i < auxiliar.length; i++){
				auxiliar[i].auxEntrada = auxiliar[i].tiempoEntrada;
				auxiliar[i].auxSalida = auxiliar[i].tiempoSalida;
			}
			
			//Hace que el diagrama de gantt siempre tenga el 100% del ancho, a la fuerza
			totalTiempo = auxiliar[auxiliar.length-1].auxSalida;
			while(bandControl){
				acum = 0;
				for (var i = 0; i < auxiliar.length; i++){
					acum += ((auxiliar[i].auxSalida-auxiliar[i].auxEntrada)/totalTiempo)*100;
				}
				if (acum > 98) {
					totalTiempo += 0.1; //Le aumenta 0.1 al divisor para que cada vez sea mas chico la suma de los anchos (acum = ancho total del gantt)
				}else{
					bandControl = false;
				}
			}
			
		}else if (acum < 98) {
			controlacum = true;
			for (var i = 0; i < auxiliar.length; i++){
				auxiliar[i].auxEntrada = auxiliar[i].tiempoEntrada;
				auxiliar[i].auxSalida = auxiliar[i].tiempoSalida;
			}
			
			//Hace que el diagrama de gantt siempre tenga el 100% del ancho, a la fuerza
			totalTiempo = auxiliar[auxiliar.length-1].auxSalida;
			while(bandControl){
				acum = 0;
				for (var i = 0; i < auxiliar.length; i++){
					acum += ((auxiliar[i].auxSalida-auxiliar[i].auxEntrada)/totalTiempo)*100;
				}
				if (acum < 98) {
					totalTiempo -= 0.1; //Le resta 0.1 al divisor para que cada vez sea mas grande la suma de los anchos (acum = ancho total del gantt)
				}else{
					bandControl = false;
				}
			}
		}
		
		//Aca comienzo a crear los divs que representan a cada proceso. Y posteriorimente introducirlos en el diagrama
		for (var i = 0; i < auxiliar.length; i++) {
			div1 = document.createElement("div");
			span = document.createElement("span");
			
			span.className = "white-text";
			
			div1.style.height = "50px !important";

			div1.className = "col center-align ganttProc";

			//Agrego los divs de tiempos
			div2 = document.createElement("div");
			span2 = document.createElement("span");

			if (auxiliar[i].marca == marca) {
				div1.style.background = "#"+colores[i];
				span.innerHTML = auxiliar[i].nombre;
				
				span2.innerHTML = auxiliar[i].tiempoSalida;

				//Otro parche
				if(i < auxiliar.length-1 && i > 0 && marca == 3){
					if (auxiliar[i-1].marca != 3 && auxiliar[i].marca == 3 && auxiliar[i+1].marca != 3) {
						span3 = document.createElement("span");
						span3.innerHTML = auxiliar[i].tiempoEntrada;
						span3.className = "left !important";
						
						span3.style.position = "relative";
						span3.style.right = "15px";

						span2.style.display = "inline";
						span3.style.display = "inline";

						ancho = ((auxiliar[i].auxSalida-auxiliar[i].auxEntrada)/totalTiempo)*100;
						if (ancho < 2.7) {

							span2.style.position = "relative";
							span2.style.bottom = "22px";
						}
						div2.appendChild(span3);
					}else{
						div1.style.background = "#E0E0E0";
						span.innerHTML = "";
						span2.innerHTML = "";
					}

				}
			}else{
			
					div1.style.background = "#E0E0E0";
					span.innerHTML = "";
					
					span2.innerHTML = "";
				
				
			}
			ancho = ((auxiliar[i].auxSalida-auxiliar[i].auxEntrada)/totalTiempo)*100;
			div1.style.width = ancho + "%";
			div1.appendChild(span);

			span2.className = "right !important";
			div2.style.width = ancho + "%";
			div2.className = "col quitar";
			div2.appendChild(span2);

			if (marca == 0) {
				ganttProc.appendChild(div1);
				ganttTiempo.appendChild(div2);
			}else if (marca == 1) {
				ganttProc2.appendChild(div1);
				ganttTiempo2.appendChild(div2);
				band = true;
			}else if (marca == 2){
				ganttProc3.appendChild(div1);
				ganttTiempo3.appendChild(div2);
				band2 = true;
			}else{
				ganttProcES.appendChild(div1);
				ganttTiempoES.appendChild(div2);
			}
		}
	}
	

	if (band || band2) {

		colaMulti1.style.display = "";
		colaMulti2.style.display = "";
	}

}

//PART FIJA
function crearmemoriaPF() {
	procesosOrd = [];
	if (controlArchivo) {
		procesosOrd = devolverProcesos();
	}else{
		for (var i = 0; i < nombreProc.length; i++) {
			
			procesosOrd[i] = {	nombre: nombreProc[i], 
							tamanio: tamanioProc[i], 
							ta: taProc[i],
							rafagacpu: rafagacpuProc[i],
							rafagaES: rafagaESProc[i],
							rafagacpu2: rafagacpuProc2[i],
							prioridad: prioridadProc[i],
							tiempoEntrada: 0,
							tiempoSalida: 0,
							controlMemoria: 0, //Controla aquellos procesos que se intentaron cargar en memoria y no entraron
							controlRafaga1: 0,	//Controla que la rafaga 1 haya terminado
							controlRafaga2: 0	//Controla que la rafaga 2 haya terminado
						};
		}

	}
	var memoria = new Object();
	memoria.tamanio = tamanioMem.value;
	memoria.particiones = [];
	memoria.procesos = procesosOrd;
	cantparts = cant_part.value.split("-");
	for (let part = 0; part < cantparts.length; part++) {
		var particion = {
			nombre: "PART" + part,
			tamanio: parseInt(cantparts[part]),
			procesos: []
		}
		memoria.particiones.push(particion);
	}
	memoriaPF(memoria);
}

function memoriaPF(memoria){
	var cpu = {
		colalistos: [],
		colaespera: [],
		colaespera2: [],
		colaespera3: [],
		procejecucion: null,
		procejecucion2: null,
		procejecucion3: null,
		tiempoejecucionactual: 0,
		tiempoejecucionactual2: 0,
		tiempoejecucionactual3: 0,
		procentradasalida: [],
		ejecentradasalida: false,
		proceliminar: [],
		procesos: [],
		historial: [],
		historial2: [],
		historial3: [],
		historiales: [],
	};
	var colamemoria = [];
	var fin = false;
	var tiempo = 0;
	while (!fin) {
		var mostrarhist = false;
		var eliminar = [];
		var parts = memoria.particiones;
		for (let proc = 0; proc < memoria.procesos.length; proc++) {
			proceso = memoria.procesos[proc];
			var assign = false;
			if (proceso.ta == tiempo) {
				//Cargo proceso en particion
				//FF
				if (algoritmosMem.value == 1) {
					for (let part = 0; part < parts.length; part++) {
						if (parts[part].procesos.length == 0) {
							if(colamemoria == 0){
								if (parts[part].tamanio >= proceso.tamanio && !assign) {
									parts[part].procesos.push(proceso);
									memoria.particiones[part].tamanio = memoria.particiones[part].tamanio - proceso.tamanio;
									assign = true;
									mostrarhist = true;
								}	
							}
						}
					}	
				}else{
					//BF
					if (colamemoria.length == 0) {
						var partelegida = -1;
						var tamelegido = -1;
						for (let part = 0; part < parts.length; part++) {
							if (parts[part].tamanio >= proceso.tamanio && tamelegido > parts[part].tamanio) {
								tamelegido = parts[part].tamanio;
								partelegida = part;
							}else{
								if (parts[part].tamanio >= proceso.tamanio && tamelegido == -1) {
									tamelegido = parts[part].tamanio;
									partelegida = part;
								}
							}
						}
						if (partelegida != -1) {
							parts[partelegida].procesos.push(proceso);
							memoria.particiones[partelegida].tamanio = memoria.particiones[partelegida].tamanio - proceso.tamanio;
							assign = true;
							mostrarhist = true;
						}
					}
				}
				if (!assign){

					//CONTROLO SI EL PROCESO VA A COLAMEMORIA O NO
					var procmemespera = false;
					for (let part = 0; part < memoria.particiones.length; part++) {
						var totalmemoria = memoria.particiones[part].tamanio;
						for (let p = 0; p < memoria.particiones[part].procesos.length; p++) {
							totalmemoria += memoria.particiones[part].procesos[p].tamanio;
						}
						if (proceso.tamanio <= totalmemoria) {
							procmemespera = true;
						}
					}
					if (procmemespera){
						colamemoria.push(proceso);
					}else{
						eliminar.push(proc);
					}
				}else{
					cpu.colalistos.push(proceso);
				}
			}
		}
		//controlo tiempo de procesos corriendo
//		console.log("Cola listos:");
//		var cl = ".... ";
//		for (let i = 0; i < cpu.colalistos.length; i++) {
//			cl = cl + cpu.colalistos[i].nombre + " | ";
//		}
//		console.log(cl);
//		console.log("----------");


		cpu = CPU(cpu, tiempo);

		for (let part = 0; part < memoria.particiones.length; part++) {
			var posfinprocs = [];
			//recorro procesos corriendo en particion
			for (let p = 0; p < parts[part].procesos.length; p++) {
				//Recorro procesos a eliminar de memoria
				for (let i = 0; i < cpu.proceliminar.length; i++) {
					if (cpu.proceliminar[i].nombre == parts[part].procesos[p].nombre) {
						posfinprocs.push(p); //agrego a lista para eliminar de particion

						//busco ubicacion de proceso en lista de procesos
						for (let lp = 0; lp < memoria.procesos.length; lp++) {
							if (cpu.proceliminar[i].nombre == memoria.procesos[lp].nombre) {
								eliminar.push(lp);
							}
						}
					}
				}
			}

			//elimino procesos terminados de la particion
			posfinprocs.sort();
			posfinprocs.reverse();
			for (let p = 0; p < posfinprocs.length; p++) {
				//restauro tamaño de memoria
				memoria.particiones[part].tamanio += memoria.particiones[part].procesos[posfinprocs[p]].tamanio;
				mostrarhist = true;
				//elimino proceso
				memoria.particiones[part].procesos.splice(posfinprocs[p], 1);
			}
		}

		eliminar.sort();
		eliminar.reverse();
		for (let proc = 0; proc < eliminar.length; proc++) {
				memoria.procesos.splice(eliminar[proc], 1);
		}

		//TRATO COLAMEMORIA
		if (colamemoria.length != 0) {

			var asignado = false;

			//FF
			if (algoritmosMem.value == 1) {
				for (let part = 0; part < parts.length; part++) {
					if (parts[part].procesos.length == 0) {
						if (parts[part].tamanio >= colamemoria[0].tamanio && !asignado) {
							parts[part].procesos.push(colamemoria[0]);
							memoria.particiones[part].tamanio = memoria.particiones[part].tamanio - colamemoria[0].tamanio;
							asignado = true;
							mostrarhist = true;
						}	
					}
				}
			}else{

				//BF
				var partelegida = -1;
				var tamelegido = -1;
				for (let part = 0; part < parts.length; part++) {
					if (parts[part].tamanio >= colamemoria[0].tamanio && tamelegido > parts[part].tamanio) {
						tamelegido = parts[part].tamanio;
						partelegida = part;
					}else{
						if (parts[part].tamanio >= colamemoria[0].tamanio && tamelegido == -1) {
							tamelegido = parts[part].tamanio;
							partelegida = part;
						}
					}
				}
				if (partelegida != -1) {
					parts[partelegida].procesos.push(colamemoria[0]);
					memoria.particiones[partelegida].tamanio = memoria.particiones[partelegida].tamanio - colamemoria[0].tamanio;
					asignado = true;
					mostrarhist = true;
				}

			}
			//ASIGNO PROCESO DE COLAMEMORIA
			if (asignado) {
				cpu.colalistos.push(colamemoria[0]);
				colamemoria.splice(0, 1);
			}
		}

		if (mostrarhist) {
			mostrarMemoria(memoria, tiempo);
		}

		tiempo++;

		if (memoria.procesos.length == 0) {
			fin = true;
		}
	}

	//ORDENO GHANT PARA MULTINIVEL
	if (alg_planific.value == 4) {
		var max = 0;
		var maxh = 0;
		if (cpu.historial.length > 0) {
			if (cpu.historial[cpu.historial.length - 1].sal > max) {
				max = cpu.historial[cpu.historial.length - 1].sal;
				maxh = 1;
			}
		}
		if (cpu.historial2.length > 0) {
			if (cpu.historial2[cpu.historial2.length - 1].sal > max) {
				max = cpu.historial2[cpu.historial2.length - 1].sal;
				maxh = 2;
			}
		}
		if (cpu.historial3.length > 0) {
			if (cpu.historial3[cpu.historial3.length - 1].sal > max) {
				max = cpu.historial3[cpu.historial3.length - 1].sal;
				maxh = 3;
			}
		}
		
		if (cpu.historial.length > 0 && maxh != 1) {
			var hist = {
				proceso: "  ",
				ent: cpu.historial[cpu.historial.length - 1].sal,
				sal: max,
			};
			cpu.historial.push(hist);
		}
	
		if (cpu.historial2.length > 0 && maxh != 2) {
			var hist = {
				proceso: "  ",
				ent: cpu.historial2[cpu.historial2.length - 1].sal,
				sal: max,
			};
			cpu.historial2.push(hist);
		}
	
		if (cpu.historial3.length > 0 && maxh != 3) {
			var hist = {
				proceso: "  ",
				ent: cpu.historial3[cpu.historial3.length - 1].sal,
				sal: max,
			};
			cpu.historial3.push(hist);
		}
	}

	if (cpu.historial.length > 0) {
		mostrarHistorial(cpu.historial, cpu.historiales);
		mostrarGantt(cpu.historial);
	}

	if (cpu.historial2.length > 0) {
		mostrarHistorial(cpu.historial2, cpu.historiales);
		mostrarGantt2(cpu.historial2);
	}

	if (cpu.historial3.length > 0) {
		mostrarHistorial(cpu.historial3, cpu.historiales);
		mostrarGantt3(cpu.historial3);
	}
	if (cpu.historiales.length > 0) {
		mostrarES(cpu.historiales);
	}

}

function CPU(cpu, tiempo) {
	if (cpu.procentradasalida.length == 0) {
		cpu.ejecentradasalida = false;
	}
	//FCFS
	if (alg_planific.value == 1) {
		var ejecentsal = false;
		//Controlo proceso en ejecucion
		if (cpu.procejecucion != null) {
			//el proceso termino su ejecucion
			if (cpu.tiempoejecucionactual == 0){
				var entsal = 0;
				if (cpu.procejecucion.rafagaES != null) {
					entsal += cpu.procejecucion.rafagaES;
				}
				//el proceso tiene entrada salida
				if (entsal > 0) {
					for (let es = 0; es < cpu.procentradasalida.length; es++) {
						if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion.nombre) {
							ejecentsal = true;
						}
					}
					//ejecentsal = controlentradasalida(cpu.procentradasalida, cpu.procejecucion);
				}

				//el proceso no tiene entrada salida o ya lo ejecuto
				if (entsal <= 0 || ejecentsal) {
					cpu.proceliminar.push(cpu.procejecucion);
					cpu.historial[cpu.historial.length - 1].sal = tiempo;
					cpu.procejecucion = null;
					ejecentsal = true;
				}
				//el proceso tiene entrada salida y no lo ejecuto aun
				if (entsal >= 0 && !ejecentsal) {
					var procesoentradasalida = {
						proceso: cpu.procejecucion,
						entradasalida: entsal,
						ejec: false,
						enejecucion: false,
					}
					if (!cpu.ejecentradasalida) {
						procesoentradasalida.enejecucion = true;
						cpu.ejecentradasalida = true;
						if (cpu.historiales.length == 0) {
							var proces = {
								proceso: "  ",
								inicio: 0,
								fin: tiempo,
							}
							cpu.historiales.push(proces);
						}else{
							if (cpu.historiales.length != 0 && cpu.historiales[cpu.historiales.length-1].fin != tiempo) {
								var proces = {
									proceso: "  ",
									inicio: cpu.historiales[cpu.historiales.length-1].fin,
									fin: tiempo,
								}
								cpu.historiales.push(proces);
							}
						}
						
						var proces = {
							proceso: cpu.procejecucion.nombre,
							inicio: tiempo,
							fin: null,
						}
						cpu.historiales.push(proces);
					}
					cpu.procentradasalida.push(procesoentradasalida);
					cpu.historial[cpu.historial.length - 1].sal = tiempo;
					cpu.procejecucion = null;
				}
			}else{
				//el proceso no termino su ejecucion aun
				cpu.tiempoejecucionactual -= 1;
			}
		}

		//controlo entrada salida
		for (let i = 0; i < cpu.procentradasalida.length; i++) {
//			console.log("PROCESO ENTRADA SALIDA: " + cpu.procentradasalida[i].nombre);
			if (cpu.procentradasalida[i].entradasalida != 0 && cpu.procentradasalida[i].enejecucion) {
				cpu.procentradasalida[i].entradasalida -= 1;
			}else{
				if (cpu.procentradasalida[i].entradasalida == 0 && cpu.procentradasalida[i].enejecucion) {
					if (cpu.procentradasalida[i].proceso.rafagacpu2 == null && !cpu.procentradasalida[i].ejec) {
						cpu.proceliminar.push(cpu.procentradasalida[i].proceso);
						cpu.historiales[cpu.historiales.length-1].fin = tiempo;
						if ((cpu.procentradasalida.length - 1) >= i + 1) {
							cpu.procentradasalida[i + 1].enejecucion = true;
							var proces = {
								proceso: cpu.procentradasalida[i + 1].proceso.nombre,
								inicio: tiempo,
								fin: null,
							}
							cpu.historiales.push(proces);
						}else{
							cpu.ejecentradasalida = false;
						}
					}
					if (cpu.procentradasalida[i].proceso.rafagacpu2 != null && !cpu.procentradasalida[i].ejec) {
						cpu.colalistos.push(cpu.procentradasalida[i].proceso);
						cpu.historiales[cpu.historiales.length-1].fin = tiempo;
						cpu.procentradasalida[i].ejec = true;
						if ((cpu.procentradasalida.length - 1) >= i + 1) {
							cpu.procentradasalida[i + 1].enejecucion = true;
							var proces = {
								proceso: cpu.procentradasalida[i + 1].proceso.nombre,
								inicio: tiempo,
								fin: null,
							}
							cpu.historiales.push(proces);
						}else{
							cpu.ejecentradasalida = false;
						}
					}
					cpu.procentradasalida[i].enejecucion = false;	
				}
			}
		}

		//Ejecuto proceso desde cola de espera
		if (cpu.colaespera.length > 0 && cpu.procejecucion == null) {
			cpu.procejecucion = cpu.colaespera[0];
			cpu.historial = cargarahistorial(cpu.historial, tiempo, cpu.procejecucion);
			if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion)) {
				cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu2 - 1;
			}else{
				cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu - 1;
			}
			cpu.colaespera.splice(0, 1);
		}

		//Trato desde cola de listos
		for (let procesp = 0; procesp < cpu.colalistos.length; procesp++) {
			if (cpu.procejecucion == null){
				cpu.procejecucion = cpu.colalistos[procesp];
				cpu.historial = cargarahistorial(cpu.historial, tiempo, cpu.procejecucion);
				if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion)) {
					cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu2 - 1;
				}else{
					cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu - 1;
				}
			}else{
				cpu.colaespera.push(cpu.colalistos[procesp]);
			}
		}

//		if (cpu.procejecucion != null) {
//			console.log("PROCESO EJECUTANDOSE: " + cpu.procejecucion.nombre);
//		}
		
		//Elimino de cola de listos
		cpu.colalistos = [];
	
//		console.log("COLA ESPERA: ");
//		var ce = ".... ";
//		for (let index = 0; index < cpu.colaespera.length; index++) {
//			ce = ce + cpu.colaespera[index].nombre + " | ";
//		}
//		console.log(ce);

		cpu.colaespera = eliminardecolaespera(cpu.colaespera, cpu.proceliminar);
		return cpu;
	}

	//PRIORIDAD
	if (alg_planific.value == 2) {
		var ejecentsal = false;
		//Controlo proceso en ejecucion
		if (cpu.procejecucion != null) {
			//el proceso termino su ejecucion
			if (cpu.tiempoejecucionactual == 0){
				var entsal = 0;
				if (cpu.procejecucion.rafagaES != null) {
					entsal += cpu.procejecucion.rafagaES;
				}
				//el proceso tiene entrada salida
				if (entsal > 0) {
					for (let es = 0; es < cpu.procentradasalida.length; es++) {
						if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion.nombre) {
							ejecentsal = true;
						}
					}
					//ejecentsal = controlentradasalida(cpu.procentradasalida, cpu.procejecucion);
				}

				//el proceso no tiene entrada salida o ya lo ejecuto
				if (entsal <= 0 || ejecentsal) {
					cpu.proceliminar.push(cpu.procejecucion);
					cpu.historial[cpu.historial.length - 1].sal = tiempo;
					cpu.procejecucion = null;
					ejecentsal = true;
				}
				//el proceso tiene entrada salida y no lo ejecuto aun
				if (entsal >= 0 && !ejecentsal) {
					var procesoentradasalida = {
						proceso: cpu.procejecucion,
						entradasalida: entsal,
						ejec: false,
						enejecucion: false,
					}
					if (!cpu.ejecentradasalida) {
						procesoentradasalida.enejecucion = true;
						cpu.ejecentradasalida = true;
						if (cpu.historiales.length == 0) {
							var proces = {
								proceso: "  ",
								inicio: 0,
								fin: tiempo,
							}
							cpu.historiales.push(proces);
						}else{
							if (cpu.historiales.length != 0 && cpu.historiales[cpu.historiales.length-1].fin != tiempo) {
								var proces = {
									proceso: "  ",
									inicio: cpu.historiales[cpu.historiales.length-1].fin,
									fin: tiempo,
								}
								cpu.historiales.push(proces);
							}
						}
						
						var proces = {
							proceso: cpu.procejecucion.nombre,
							inicio: tiempo,
							fin: null,
						}
						cpu.historiales.push(proces);
					}
					cpu.procentradasalida.push(procesoentradasalida);
					cpu.historial[cpu.historial.length - 1].sal = tiempo;
					cpu.procejecucion = null;
				}
			}else{
				//el proceso no termino su ejecucion aun
				cpu.tiempoejecucionactual -= 1;
			}
		}

		//controlo entrada salida
		for (let i = 0; i < cpu.procentradasalida.length; i++) {
//			console.log("PROCESO ENTRADA SALIDA: " + cpu.procentradasalida[i].nombre);
			if (cpu.procentradasalida[i].entradasalida != 0 && cpu.procentradasalida[i].enejecucion) {
				cpu.procentradasalida[i].entradasalida -= 1;
			}else{
				if (cpu.procentradasalida[i].entradasalida == 0 && cpu.procentradasalida[i].enejecucion) {
					if (cpu.procentradasalida[i].proceso.rafagacpu2 == null && !cpu.procentradasalida[i].ejec) {
						cpu.proceliminar.push(cpu.procentradasalida[i].proceso);
						cpu.historiales[cpu.historiales.length-1].fin = tiempo;
						if ((cpu.procentradasalida.length - 1) >= i + 1) {
							cpu.procentradasalida[i + 1].enejecucion = true;
							var proces = {
								proceso: cpu.procentradasalida[i + 1].proceso.nombre,
								inicio: tiempo,
								fin: null,
							}
							cpu.historiales.push(proces);
						}else{
							cpu.ejecentradasalida = false;
						}
					}
					if (cpu.procentradasalida[i].proceso.rafagacpu2 != null && !cpu.procentradasalida[i].ejec) {
						cpu.colalistos.push(cpu.procentradasalida[i].proceso);
						cpu.historiales[cpu.historiales.length-1].fin = tiempo;
						cpu.procentradasalida[i].ejec = true;
						if ((cpu.procentradasalida.length - 1) >= i + 1) {
							cpu.procentradasalida[i + 1].enejecucion = true;
							var proces = {
								proceso: cpu.procentradasalida[i + 1].proceso.nombre,
								inicio: tiempo,
								fin: null,
							}
							cpu.historiales.push(proces);
						}else{
							cpu.ejecentradasalida = false;
						}
					}
					cpu.procentradasalida[i].enejecucion = false;	
				}
			}
		}

		//Controlo Prioridad con proceso en ejecucion
		var bloq = null;
		if (cpu.procejecucion != null) {
			var prioridad = false;
			for (let i = 0; i < cpu.colalistos.length; i++) {
				if (cpu.colalistos[i].prioridad < cpu.procejecucion.prioridad) {
					prioridad = true;
				}
			}
			if (prioridad) {
				var ejecutoprimerrafaga = false;
				for (let es = 0; es < cpu.procentradasalida.length; es++) {
					if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion.nombre) {
						ejecutoprimerrafaga = true;
					}
				}
				if (ejecutoprimerrafaga) {
					cpu.procejecucion.rafagacpu2 -= tiempo - cpu.historial[cpu.historial.length - 1].ent;
				}else{
					cpu.procejecucion.rafagacpu -= tiempo - cpu.historial[cpu.historial.length - 1].ent;
				}
				cpu.colalistos.push(cpu.procejecucion);
				bloq = cpu.procejecucion.nombre;
				cpu.procejecucion = null;
				cpu.historial[cpu.historial.length - 1].sal = tiempo;
			}
		}

		//Ejecuto proceso desde cola de espera
		if (cpu.colaespera.length > 0 && cpu.procejecucion == null && cpu.colalistos.length == 0) {
 
			//controlo prioridad
			var max = 0;
			var prio = 99999;
			for (let i = 0; i < cpu.colaespera.length; i++) {
				
				var prioridadproceso = 0;
				if (cpu.colaespera[i].prioridad != null) {
					var prioridadproceso = cpu.colaespera[i].prioridad;
				}
				if (prio > prioridadproceso) {
					max = i;
					prio = prioridadproceso;
				}
			}

			cpu.procejecucion = cpu.colaespera[max];
			cpu.historial = cargarahistorial(cpu.historial, tiempo, cpu.procejecucion);
			if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion)) {
				cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu2 - 1;
			}else{
				cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu - 1;
			}
			cpu.colaespera.splice(max, 1);
		}

		//Trato desde cola de listos

		//controlo prioridad
		var max = 0;
		var prio = 999999;
		for (let i = 0; i < cpu.colalistos.length; i++) {
			var prioridadproceso = 0;
			if (cpu.colalistos[i].prioridad != null) {
				var prioridadproceso = cpu.colalistos[i].prioridad;
			}
			if (prio > prioridadproceso) {
				max = i;
				prio = prioridadproceso;
			}
		}
		for (let procesp = 0; procesp < cpu.colalistos.length; procesp++) {
			if (cpu.procejecucion == null && max == procesp){
				cpu.procejecucion = cpu.colalistos[procesp];
				cpu.historial = cargarahistorial(cpu.historial, tiempo, cpu.procejecucion);
				if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion)) {
					cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu2 - 1;
				}else{
					cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu - 1;
				}
			}else{
				if (cpu.colalistos[procesp].nombre == bloq) {
					cpu.colaespera.unshift(cpu.colalistos[procesp]);
				}else{
					cpu.colaespera.push(cpu.colalistos[procesp]);
				}
			}
		}

//		if (cpu.procejecucion != null) {
//			console.log("PROCESO EJECUTANDOSE: " + cpu.procejecucion.nombre);
//		}
		
		//Elimino de cola de listos
		cpu.colalistos = [];
	
//		console.log("COLA ESPERA: ");
//		var ce = ".... ";
//		for (let index = 0; index < cpu.colaespera.length; index++) {
//			ce = ce + cpu.colaespera[index].nombre + " | ";
//		}
//		console.log(ce);

		cpu.colaespera = eliminardecolaespera(cpu.colaespera, cpu.proceliminar);
		return cpu;
	}

	//RR
	if (alg_planific.value == 3) {
		var quantum = parseInt(cuant.value);
		var ejecentsal = false;
		//Controlo proceso en ejecucion
		if (cpu.procejecucion != null) {
			//el proceso termino su ejecucion
			if (cpu.tiempoejecucionactual == 0){
				var entsal = 0;
				if (cpu.procejecucion.rafagaES != null) {
					entsal += cpu.procejecucion.rafagaES;
				}
				//el proceso tiene entrada salida
				if (entsal > 0) {
					for (let es = 0; es < cpu.procentradasalida.length; es++) {
						if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion.nombre) {
							ejecentsal = true;
						}
					}
					//ejecentsal = controlentradasalida(cpu.procentradasalida, cpu.procejecucion);
				}

				//el proceso no tiene entrada salida o ya lo ejecuto
				if (entsal <= 0 || ejecentsal) {
					cpu.proceliminar.push(cpu.procejecucion);
					cpu.historial[cpu.historial.length - 1].sal = tiempo;
					cpu.procejecucion = null;
					ejecentsal = true;
				}
				//el proceso tiene entrada salida y no lo ejecuto aun
				if (entsal >= 0 && !ejecentsal) {
					var procesoentradasalida = {
						proceso: cpu.procejecucion,
						entradasalida: entsal,
						ejec: false,
						enejecucion: false,
					}
					if (!cpu.ejecentradasalida) {
						procesoentradasalida.enejecucion = true;
						cpu.ejecentradasalida = true;
						if (cpu.historiales.length == 0) {
							var proces = {
								proceso: "  ",
								inicio: 0,
								fin: tiempo,
							}
							cpu.historiales.push(proces);
						}else{
							if (cpu.historiales.length != 0 && cpu.historiales[cpu.historiales.length-1].fin != tiempo) {
								var proces = {
									proceso: "  ",
									inicio: cpu.historiales[cpu.historiales.length-1].fin,
									fin: tiempo,
								}
								cpu.historiales.push(proces);
							}
						}
						
						var proces = {
							proceso: cpu.procejecucion.nombre,
							inicio: tiempo,
							fin: null,
						}
						cpu.historiales.push(proces);
					}
					cpu.procentradasalida.push(procesoentradasalida);
					cpu.historial[cpu.historial.length - 1].sal = tiempo;
					cpu.procejecucion = null;
				}
			}else{
				//el proceso no termino su ejecucion aun
				cpu.tiempoejecucionactual -= 1;
			}
		}

		//controlo entrada salida
		for (let i = 0; i < cpu.procentradasalida.length; i++) {
//			console.log("PROCESO ENTRADA SALIDA: " + cpu.procentradasalida[i].nombre);
			if (cpu.procentradasalida[i].entradasalida != 0 && cpu.procentradasalida[i].enejecucion) {
				cpu.procentradasalida[i].entradasalida -= 1;
			}else{
				if (cpu.procentradasalida[i].entradasalida == 0 && cpu.procentradasalida[i].enejecucion) {
					if (cpu.procentradasalida[i].proceso.rafagacpu2 == null && !cpu.procentradasalida[i].ejec) {
						cpu.proceliminar.push(cpu.procentradasalida[i].proceso);
						cpu.historiales[cpu.historiales.length-1].fin = tiempo;
						if ((cpu.procentradasalida.length - 1) >= i + 1) {
							cpu.procentradasalida[i + 1].enejecucion = true;
							var proces = {
								proceso: cpu.procentradasalida[i + 1].proceso.nombre,
								inicio: tiempo,
								fin: null,
							}
							cpu.historiales.push(proces);
						}else{
							cpu.ejecentradasalida = false;
						}
					}
					if (cpu.procentradasalida[i].proceso.rafagacpu2 != null && !cpu.procentradasalida[i].ejec) {
						cpu.colalistos.push(cpu.procentradasalida[i].proceso);
						cpu.historiales[cpu.historiales.length-1].fin = tiempo;
						cpu.procentradasalida[i].ejec = true;
						if ((cpu.procentradasalida.length - 1) >= i + 1) {
							cpu.procentradasalida[i + 1].enejecucion = true;
							var proces = {
								proceso: cpu.procentradasalida[i + 1].proceso.nombre,
								inicio: tiempo,
								fin: null,
							}
							cpu.historiales.push(proces);
						}else{
							cpu.ejecentradasalida = false;
						}
					}
					cpu.procentradasalida[i].enejecucion = false;	
				}
			}
		}

		//Controlo Quantum
		if (cpu.procejecucion != null) {
			var ejecutoprimerrafaga = false;
			var ejecutoquantum = false;
			for (let es = 0; es < cpu.procentradasalida.length; es++) {
				if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion.nombre) {
					ejecutoprimerrafaga = true;
				}
			}
			if (ejecutoprimerrafaga) {
				if (cpu.procejecucion.rafagacpu2 - cpu.tiempoejecucionactual > quantum) {
					cpu.procejecucion.rafagacpu2 -= tiempo - cpu.historial[cpu.historial.length - 1].ent;
					ejecutoquantum = true;
				}
			}else{
				if (cpu.procejecucion.rafagacpu - cpu.tiempoejecucionactual > quantum) {
					cpu.procejecucion.rafagacpu -= tiempo - cpu.historial[cpu.historial.length - 1].ent;
					ejecutoquantum = true;
				}
			}
			if (ejecutoquantum) {
				cpu.colalistos.push(cpu.procejecucion);
				cpu.historial[cpu.historial.length - 1].sal = tiempo;
				cpu.procejecucion = null;
			}
		}

		//Ejecuto proceso desde cola de espera
		if (cpu.colaespera.length > 0 && cpu.procejecucion == null) {
			cpu.procejecucion = cpu.colaespera[0];
			cpu.historial = cargarahistorial(cpu.historial, tiempo, cpu.procejecucion);
			if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion)) {
				cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu2 - 1;
			}else{
				cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu - 1;
			}
			cpu.colaespera.splice(0, 1);
		}

		//Trato desde cola de listos
		for (let procesp = 0; procesp < cpu.colalistos.length; procesp++) {
			if (cpu.procejecucion == null){
				cpu.procejecucion = cpu.colalistos[procesp];
				cpu.historial = cargarahistorial(cpu.historial, tiempo, cpu.procejecucion);
				if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion)) {
					cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu2 - 1;
				}else{
					cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu - 1;
				}
			}else{
				cpu.colaespera.push(cpu.colalistos[procesp]);
			}
		}

//		if (cpu.procejecucion != null) {
//			console.log("PROCESO EJECUTANDOSE: " + cpu.procejecucion.nombre);
//		}
		
		//Elimino de cola de listos
		cpu.colalistos = [];
	
//		console.log("COLA ESPERA: ");
//		var ce = ".... ";
//		for (let index = 0; index < cpu.colaespera.length; index++) {
//			ce = ce + cpu.colaespera[index].nombre + " | ";
//		}
//		console.log(ce);

		cpu.colaespera = eliminardecolaespera(cpu.colaespera, cpu.proceliminar);
		return cpu;
	}

	//MULTINIVEL
	if (alg_planific.value == 4) {
		var quantum = 2;
		var quantum2 = 3;

		//COLA1
		var ejecentsal = false;
		//Controlo proceso en ejecucion
		if (cpu.procejecucion != null) {
			//el proceso termino su ejecucion
			if (cpu.tiempoejecucionactual == 0){
				var entsal = 0;
				if (cpu.procejecucion.rafagaES != null) {
					entsal += cpu.procejecucion.rafagaES;
				}
				//el proceso tiene entrada salida
				if (entsal > 0) {
					for (let es = 0; es < cpu.procentradasalida.length; es++) {
						if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion.nombre) {
							ejecentsal = true;
						}
					}
					//ejecentsal = controlentradasalida(cpu.procentradasalida, cpu.procejecucion);
				}

				//el proceso no tiene entrada salida o ya lo ejecuto
				if (entsal <= 0 || ejecentsal) {
					cpu.proceliminar.push(cpu.procejecucion);
					cpu.historial[cpu.historial.length - 1].sal = tiempo;
					cpu.procejecucion = null;
					ejecentsal = true;
				}
				//el proceso tiene entrada salida y no lo ejecuto aun
				if (entsal >= 0 && !ejecentsal) {
					var procesoentradasalida = {
						proceso: cpu.procejecucion,
						entradasalida: entsal,
						ejec: false,
						enejecucion: false,
					}
					if (!cpu.ejecentradasalida) {
						procesoentradasalida.enejecucion = true;
						cpu.ejecentradasalida = true;
						if (cpu.historiales.length == 0) {
							var proces = {
								proceso: "  ",
								inicio: 0,
								fin: tiempo,
							}
							cpu.historiales.push(proces);
						}else{
							if (cpu.historiales.length != 0 && cpu.historiales[cpu.historiales.length-1].fin != tiempo) {
								var proces = {
									proceso: "  ",
									inicio: cpu.historiales[cpu.historiales.length-1].fin,
									fin: tiempo,
								}
								cpu.historiales.push(proces);
							}
						}
						
						var proces = {
							proceso: cpu.procejecucion.nombre,
							inicio: tiempo,
							fin: null,
						}
						cpu.historiales.push(proces);
					}
					cpu.procentradasalida.push(procesoentradasalida);
					cpu.historial[cpu.historial.length - 1].sal = tiempo;
					cpu.procejecucion = null;
				}
			}else{
				//el proceso no termino su ejecucion aun
				cpu.tiempoejecucionactual -= 1;
			}
			
		}

		//COLA 2
		var ejecentsal2 = false;
		if (cpu.procejecucion2 != null) {
			//el proceso termino su ejecucion
			if (cpu.tiempoejecucionactual2 == 0){
				var entsal2 = 0;
				if (cpu.procejecucion2.rafagaES != null) {
					entsal2 += cpu.procejecucion2.rafagaES;
				}
				//el proceso tiene entrada salida
				if (entsal2 > 0) {
					for (let es = 0; es < cpu.procentradasalida.length; es++) {
						if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion2.nombre) {
							ejecentsal2 = true;
						}
					}
					//ejecentsal = controlentradasalida(cpu.procentradasalida, cpu.procejecucion);
				}

				//el proceso no tiene entrada salida o ya lo ejecuto
				if (entsal2 <= 0 || ejecentsal2) {
					cpu.proceliminar.push(cpu.procejecucion2);
					cpu.historial2[cpu.historial2.length - 1].sal = tiempo;
					cpu.procejecucion2 = null;
					ejecentsal2 = true;
				}
				//el proceso tiene entrada salida y no lo ejecuto aun
				if (entsal2 >= 0 && !ejecentsal2) {
					var procesoentradasalida = {
						proceso: cpu.procejecucion2,
						entradasalida: entsal2,
						ejec: false,
						enejecucion: false,
					}
					if (!cpu.ejecentradasalida) {
						procesoentradasalida.enejecucion = true;
						cpu.ejecentradasalida = true;
						if (cpu.historiales.length == 0) {
							var proces = {
								proceso: "  ",
								inicio: 0,
								fin: tiempo,
							}
							cpu.historiales.push(proces);
						}else{
							if (cpu.historiales.length != 0 && cpu.historiales[cpu.historiales.length-1].fin != tiempo) {
								var proces = {
									proceso: "  ",
									inicio: cpu.historiales[cpu.historiales.length-1].fin,
									fin: tiempo,
								}
								cpu.historiales.push(proces);
							}
						}
						
						var proces = {
							proceso: cpu.procejecucion2.nombre,
							inicio: tiempo,
							fin: null,
						}
						cpu.historiales.push(proces);
					}
					cpu.procentradasalida.push(procesoentradasalida);
					cpu.historial2[cpu.historial2.length - 1].sal = tiempo;
					cpu.procejecucion2 = null;
				}
			}else{
				//el proceso no termino su ejecucion aun
				cpu.tiempoejecucionactual2 -= 1;
			}
		}

		//COLA 3
		var ejecentsal3 = false;
		if (cpu.procejecucion3 != null) {
			//el proceso termino su ejecucion
			if (cpu.tiempoejecucionactual3 == 0){
				var entsal3 = 0;
				if (cpu.procejecucion3.rafagaES != null) {
					entsal3 += cpu.procejecucion3.rafagaES;
				}
				//el proceso tiene entrada salida
				if (entsal3 > 0) {
					for (let es = 0; es < cpu.procentradasalida.length; es++) {
						if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion3.nombre) {
							ejecentsal3 = true;
						}
					}
					//ejecentsal = controlentradasalida(cpu.procentradasalida, cpu.procejecucion);
				}

				//el proceso no tiene entrada salida o ya lo ejecuto
				if (entsal3 <= 0 || ejecentsal3) {
					cpu.proceliminar.push(cpu.procejecucion3);
					cpu.historial3[cpu.historial3.length - 1].sal = tiempo;
					cpu.procejecucion3 = null;
					ejecentsal3 = true;
				}
				//el proceso tiene entrada salida y no lo ejecuto aun
				if (entsal3 >= 0 && !ejecentsal3) {
					var procesoentradasalida = {
						proceso: cpu.procejecucion3,
						entradasalida: entsal3,
						ejec: false,
						enejecucion: false,
					}
					if (!cpu.ejecentradasalida) {
						procesoentradasalida.enejecucion = true;
						cpu.ejecentradasalida = true;
						if (cpu.historiales.length == 0) {
							var proces = {
								proceso: "  ",
								inicio: 0,
								fin: tiempo,
							}
							cpu.historiales.push(proces);
						}else{
							if (cpu.historiales.length != 0 && cpu.historiales[cpu.historiales.length-1].fin != tiempo) {
								var proces = {
									proceso: "  ",
									inicio: cpu.historiales[cpu.historiales.length-1].fin,
									fin: tiempo,
								}
								cpu.historiales.push(proces);
							}
						}
						
						var proces = {
							proceso: cpu.procejecucion3.nombre,
							inicio: tiempo,
							fin: null,
						}
						cpu.historiales.push(proces);
					}
					cpu.procentradasalida.push(procesoentradasalida);
					cpu.historial3[cpu.historial3.length - 1].sal = tiempo;
					cpu.procejecucion3 = null;
				}
			}else{
				//el proceso no termino su ejecucion aun
				cpu.tiempoejecucionactual3 -= 1;
			}
		}

		//controlo entrada salida
		for (let i = 0; i < cpu.procentradasalida.length; i++) {
//			console.log("PROCESO ENTRADA SALIDA: " + cpu.procentradasalida[i].nombre);
			if (cpu.procentradasalida[i].entradasalida != 0 && cpu.procentradasalida[i].enejecucion) {
				cpu.procentradasalida[i].entradasalida -= 1;
			}else{
				if (cpu.procentradasalida[i].entradasalida == 0 && cpu.procentradasalida[i].enejecucion) {
					if (cpu.procentradasalida[i].proceso.rafagacpu2 == null && !cpu.procentradasalida[i].ejec) {
						cpu.proceliminar.push(cpu.procentradasalida[i].proceso);
						cpu.historiales[cpu.historiales.length-1].fin = tiempo;
						if ((cpu.procentradasalida.length - 1) >= i + 1) {
							cpu.procentradasalida[i + 1].enejecucion = true;
							var proces = {
								proceso: cpu.procentradasalida[i + 1].proceso.nombre,
								inicio: tiempo,
								fin: null,
							}
							cpu.historiales.push(proces);
						}else{
							cpu.ejecentradasalida = false;
						}
					}
					if (cpu.procentradasalida[i].proceso.rafagacpu2 != null && !cpu.procentradasalida[i].ejec) {
						cpu.colalistos.push(cpu.procentradasalida[i].proceso);
						cpu.historiales[cpu.historiales.length-1].fin = tiempo;
						cpu.procentradasalida[i].ejec = true;
						if ((cpu.procentradasalida.length - 1) >= i + 1) {
							cpu.procentradasalida[i + 1].enejecucion = true;
							var proces = {
								proceso: cpu.procentradasalida[i + 1].proceso.nombre,
								inicio: tiempo,
								fin: null,
							}
							cpu.historiales.push(proces);
						}else{
							cpu.ejecentradasalida = false;
						}
					}
					cpu.procentradasalida[i].enejecucion = false;	
				}
			}
		}

		//Controlo Quantum
		if (cpu.procejecucion != null) {
			var ejecutoprimerrafaga = false;
			var ejecutoquantum = false;
			for (let es = 0; es < cpu.procentradasalida.length; es++) {
				if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion.nombre) {
					ejecutoprimerrafaga = true;
				}
			}
			if (ejecutoprimerrafaga) {
				if (cpu.procejecucion.rafagacpu2 - cpu.tiempoejecucionactual > quantum) {
					cpu.procejecucion.rafagacpu2 -= tiempo - cpu.historial[cpu.historial.length - 1].ent;
					ejecutoquantum = true;
				}
			}else{
				if (cpu.procejecucion.rafagacpu - cpu.tiempoejecucionactual > quantum) {
					cpu.procejecucion.rafagacpu -= tiempo - cpu.historial[cpu.historial.length - 1].ent;
					ejecutoquantum = true;
				}
			}
			if (ejecutoquantum) {
				cpu.colalistos.push(cpu.procejecucion);
				cpu.historial[cpu.historial.length - 1].sal = tiempo;
				cpu.procejecucion = null;
			}
		}

		//Controlo Quantum2
		if (cpu.procejecucion2 != null) {
			var ejecutoprimerrafaga = false;
			var ejecutoquantum = false;
			for (let es = 0; es < cpu.procentradasalida.length; es++) {
				if (cpu.procentradasalida[es].proceso.nombre == cpu.procejecucion2.nombre) {
					ejecutoprimerrafaga = true;
				}
			}
			if (ejecutoprimerrafaga) {
				if (cpu.procejecucion2.rafagacpu2 - cpu.tiempoejecucionactual2 > quantum2) {
					cpu.procejecucion2.rafagacpu2 -= tiempo - cpu.historial2[cpu.historial2.length - 1].ent;
					ejecutoquantum = true;
				}
			}else{
				if (cpu.procejecucion2.rafagacpu - cpu.tiempoejecucionactual2 > quantum2) {
					cpu.procejecucion2.rafagacpu -= tiempo - cpu.historial2[cpu.historial2.length - 1].ent;
					ejecutoquantum = true;
				}
			}
			if (ejecutoquantum) {
				cpu.colalistos.push(cpu.procejecucion2);
				cpu.historial2[cpu.historial2.length - 1].sal = tiempo;
				cpu.procejecucion2 = null;
			}
		}

		//Ejecuto proceso desde cola de espera

		//COLA 1
		if (cpu.colaespera.length > 0 && cpu.procejecucion == null) {
			cpu.procejecucion = cpu.colaespera[0];
			cpu.historial = cargarahistorial(cpu.historial, tiempo, cpu.procejecucion);
			if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion)) {
				cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu2 - 1;
			}else{
				cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu - 1;
			}
			cpu.colaespera.splice(0, 1);
		}

		//COLA 2
		if (cpu.colaespera2.length > 0 && cpu.procejecucion2 == null) {
			var ejecprio = true;
			for (let procesp = 0; procesp < cpu.colalistos.length; procesp++) {
				if (cpu.colalistos[procesp].prioridad < 6) {
					ejecprio = false;
				}
			}
			if (ejecutocolaanterior(cpu, 2) && ejecprio) {
				cpu.procejecucion2 = cpu.colaespera2[0];
				cpu.historial2 = cargarahistorial(cpu.historial2, tiempo, cpu.procejecucion2);
				if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion2)) {
					cpu.tiempoejecucionactual2 = cpu.procejecucion2.rafagacpu2 - 1;
				}else{
					cpu.tiempoejecucionactual2 = cpu.procejecucion2.rafagacpu - 1;
				}
				cpu.colaespera2.splice(0, 1);
			}
		}

		//COLA 3
		if (cpu.colaespera3.length > 0 && cpu.procejecucion3 == null) {
			var ejecprio2 = true;
			for (let procesp = 0; procesp < cpu.colalistos.length; procesp++) {
				if (cpu.colalistos[procesp].prioridad <= 10) {
					ejecprio2 = false;
				}
			}
			if (ejecutocolaanterior(cpu, 3) && ejecprio2) {
				cpu.procejecucion3 = cpu.colaespera3[0];
				cpu.historial3 = cargarahistorial(cpu.historial3, tiempo, cpu.procejecucion3);
				if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion3)) {
					cpu.tiempoejecucionactual3 = cpu.procejecucion3.rafagacpu2 - 1;
				}else{
					cpu.tiempoejecucionactual3 = cpu.procejecucion3.rafagacpu - 1;
				}
				cpu.colaespera3.splice(0, 1);	
			}
		}

		//VERIFICO PROCESO DE MAYOR PRIORIDAD
		var maxp = 0;
		var maxpr = 999999;
		for (let procesp = 0; procesp < cpu.colalistos.length; procesp++) {
			if (cpu.colalistos[procesp].prioridad < maxpr) {
				maxpr = cpu.colalistos[procesp].prioridad;
				maxp = procesp;
			}
		}

		//Trato desde cola de listos
		for (let procesp = 0; procesp < cpu.colalistos.length; procesp++) {

			//COLA 1
			if (cpu.colalistos[procesp].prioridad < 6) {
				if (cpu.procejecucion == null && maxp == procesp){
					cpu.procejecucion = cpu.colalistos[procesp];
					cpu.historial = cargarahistorial(cpu.historial, tiempo, cpu.procejecucion);
					if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion)) {
						cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu2 - 1;
					}else{
						cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu - 1;
					}
				}else{
					cpu.colaespera.push(cpu.colalistos[procesp]);
				}
			}

			//COLA 2
			if (cpu.colalistos[procesp].prioridad >= 6 && cpu.colalistos[procesp].prioridad <= 10 ) {
				if (cpu.procejecucion2 == null && ejecutocolaanterior(cpu, 2) && maxp == procesp){
					cpu.procejecucion2 = cpu.colalistos[procesp];
					cpu.historial2 = cargarahistorial(cpu.historial2, tiempo, cpu.procejecucion2);
					if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion2)) {
						cpu.tiempoejecucionactual2 = cpu.procejecucion2.rafagacpu2 - 1;
					}else{
						cpu.tiempoejecucionactual2 = cpu.procejecucion2.rafagacpu - 1;
					}
				}else{
					cpu.colaespera2.push(cpu.colalistos[procesp]);
				}
			}

			//COLA 3
			if (cpu.colalistos[procesp].prioridad > 10) {
				if (cpu.procejecucion3 == null && ejecutocolaanterior(cpu, 3) && maxp == procesp){
					cpu.procejecucion3 = cpu.colalistos[procesp];
					cpu.historial3 = cargarahistorial(cpu.historial3, tiempo, cpu.procejecucion3);
					if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion3)) {
						cpu.tiempoejecucionactual3 = cpu.procejecucion3.rafagacpu2 - 1;
					}else{
						cpu.tiempoejecucionactual3 = cpu.procejecucion3.rafagacpu - 1;
					}
				}else{
					cpu.colaespera3.push(cpu.colalistos[procesp]);
				}
			}
		}

		//CONTROLO EJECUCION EN COLAS SUPERIORES
		if (cpu.procejecucion2 != null && cpu.procejecucion != null) {
			cpu.colaespera2.unshift(cpu.procejecucion2);
			cpu.historial2[cpu.historial2.length - 1].sal = tiempo;
			cpu.procejecucion2 = null;
		}

		if (cpu.procejecucion3 != null){
			if (cpu.procejecucion2 != null || cpu.procejecucion != null) {
				cpu.colaespera3.unshift(cpu.procejecucion3);
				cpu.historial3[cpu.historial3.length - 1].sal = tiempo;
				cpu.procejecucion3 = null;
			}
		} 



//		if (cpu.procejecucion != null) {
//			console.log("PROCESO EJECUTANDOSE: " + cpu.procejecucion.nombre);
//		}
		
		//Elimino de cola de listos
		cpu.colalistos = [];
	
//		console.log("COLA ESPERA: ");
//		var ce = ".... ";
//		for (let index = 0; index < cpu.colaespera.length; index++) {
//			ce = ce + cpu.colaespera[index].nombre + " | ";
//		}
//		console.log(ce);

		cpu.colaespera = eliminardecolaespera(cpu.colaespera, cpu.proceliminar);
		return cpu;
	}
	
}

function controlentradasalida(procentradasalida, proceso){
	var returnvalue = false;
	for (let i = 0; i < procentradasalida.length; i++) {
		if (procentradasalida[i].proceso.nombre == proceso.nombre) {
				returnvalue = true;
		}
	}
	return returnvalue;
}

function eliminardecolaespera(colaespera, proceliminar){
	for (let i = 0; i < proceliminar.length; i++) {
		var pos = null;
		for (let j = 0; j < colaespera.length; j++) {
			if (colaespera[j].nombre == proceliminar[i].nombre) {
				pos = j;
			}
		}
		if (pos != null) {
			colaespera.splice(pos, 1);
		}
	}
	return colaespera;
}

function cargarahistorial(historial, tiempo, proceso) {
	if (historial.length == 0 && tiempo != 0) {
		var histant = {
			proceso: "  ",
			ent: 0,
			sal: tiempo,
		};
		historial.push(histant);
	}
	if (historial.length > 0) {
		if (historial[historial.length - 1].sal != tiempo) {
			var histmed = {
				proceso: "  ",
				ent: historial[historial.length - 1].sal,
				sal: tiempo,
			};
			historial.push(histmed);
		}
	}
	var hist = {
		proceso: proceso.nombre,
		ent: tiempo,
		sal: null,
	};
	historial.push(hist);
	return historial;
}

function mostrarHistorial(historialarray, historiales) {
	for (let i = 0; i < historialarray.length; i++) {
		if (historialarray[i].proceso != "  ") {
			p = document.createElement("p");
			p.innerHTML = "- El proceso " + historialarray[i].proceso + " entra en el tiempo " + historialarray[i].ent + " y sale en el tiempo " + historialarray[i].sal + "\n";
			p.style.marginBottom = "10px";
			historial.appendChild(p);
			for (let j = 0; j < historiales.length; j++) {
				if (historiales[j].proceso == historialarray[i].proceso && historiales[j].inicio == historialarray[i].sal) {
					p = document.createElement("p");
					p.innerHTML = "- El proceso " + historiales[j].proceso + " entra a E/S en el tiempo " + historiales[j].inicio + " y sale en el tiempo " + historiales[j].fin + "\n";
					p.style.marginBottom = "10px";
					historial.appendChild(p);
				}
			}
		}
	}
}

function mostrarGantt(historialarray) {
	var totalTiempo = historialarray[historialarray.length-1].sal;
	for (let i = 0; i < historialarray.length; i++) {
		div1 = document.createElement("div");
		span = document.createElement("span");
		span.innerHTML = historialarray[i].proceso;
		span.className = "white-text";
		var rafaga = historialarray[i].sal - historialarray[i].ent;
		ancho = (rafaga/totalTiempo)*100;
		div1.style.width = ancho + "%";
		div1.style.height = "50px !important";

		div1.className = "col center-align ganttProc";
		if (historialarray[i].proceso == "  ") {
			div1.style.background = "#E0E0E0";
		}else{
			div1.style.background = "#"+colores[i];
		}
		

		div1.appendChild(span);
		ganttProc.appendChild(div1);

		//Agrego los divs de tiempos
		div1 = document.createElement("div");
		span2 = document.createElement("span");
		span2.innerHTML = historialarray[i].sal;
		span2.className = "right !important";
		div1.style.width = ancho + "%";
		div1.className = "col quitar";

		div1.appendChild(span2);
		ganttTiempo.appendChild(div1);
	}
}

function mostrarGantt2(historialarray) {
	colaMulti1.style.display = "";
	var totalTiempo = historialarray[historialarray.length-1].sal;
	for (let i = 0; i < historialarray.length; i++) {
		div1 = document.createElement("div");
		span = document.createElement("span");
		span.innerHTML = historialarray[i].proceso;
		span.className = "white-text";
		var rafaga = historialarray[i].sal - historialarray[i].ent;
		ancho = (rafaga/totalTiempo)*100;
		div1.style.width = ancho + "%";
		div1.style.height = "50px !important";

		div1.className = "col center-align ganttProc";

		if (historialarray[i].proceso == "  ") {
			div1.style.background = "#E0E0E0";
		}else{
			div1.style.background = "#"+colores[i];
		}

		div1.appendChild(span);
		ganttProc2.appendChild(div1);

		//Agrego los divs de tiempos
		div1 = document.createElement("div");
		span2 = document.createElement("span");
		span2.innerHTML = historialarray[i].sal;
		span2.className = "right !important";
		div1.style.width = ancho + "%";
		div1.className = "col quitar";

		div1.appendChild(span2);
		ganttTiempo2.appendChild(div1);
	}
}

function mostrarGantt3(historialarray) {
	colaMulti2.style.display = "";
	var totalTiempo = historialarray[historialarray.length-1].sal;
	for (let i = 0; i < historialarray.length; i++) {
		div1 = document.createElement("div");
		span = document.createElement("span");
		span.innerHTML = historialarray[i].proceso;
		span.className = "white-text";
		var rafaga = historialarray[i].sal - historialarray[i].ent;
		ancho = (rafaga/totalTiempo)*100;
		div1.style.width = ancho + "%";
		div1.style.height = "50px !important";

		div1.className = "col center-align ganttProc";
				if (historialarray[i].proceso == "  ") {
			div1.style.background = "#E0E0E0";
		}else{
			div1.style.background = "#"+colores[i];
		}

		div1.appendChild(span);
		ganttProc3.appendChild(div1);

		//Agrego los divs de tiempos
		div1 = document.createElement("div");
		span2 = document.createElement("span");
		span2.innerHTML = historialarray[i].sal;
		span2.className = "right !important";
		div1.style.width = ancho + "%";
		div1.className = "col quitar";

		div1.appendChild(span2);
		ganttTiempo3.appendChild(div1);
	}
}
function mostrarES(historialarray) {
	var totalTiempo = historialarray[historialarray.length-1].fin;
	for (let i = 0; i < historialarray.length; i++) {
		div1 = document.createElement("div");
		span = document.createElement("span");
		span.innerHTML = historialarray[i].proceso;
		span.className = "white-text";
		var rafaga = historialarray[i].fin - historialarray[i].inicio;
		ancho = (rafaga/totalTiempo)*100;
		div1.style.width = ancho + "%";
		div1.style.height = "50px !important";

		div1.className = "col center-align ganttProc";
		if (historialarray[i].proceso == "  ") {
			div1.style.background = "#E0E0E0";
		}else{
			div1.style.background = "#"+colores[i];
		}
		

		div1.appendChild(span);
		ganttProcES.appendChild(div1);

		//Agrego los divs de tiempos
		div1 = document.createElement("div");
		span2 = document.createElement("span");
		span2.innerHTML = historialarray[i].fin;
		span2.className = "right !important";
		div1.style.width = ancho + "%";
		div1.className = "col quitar";

		div1.appendChild(span2);
		ganttTiempoES.appendChild(div1);
	}
}

function ejecutocolaanterior(cpu, cola) {
	var puedeejecutar = true;
	if (cola == 2) {
		if (cpu.procejecucion == null) {
			for (let i = 0; i < cpu.procentradasalida.length; i++) {
				if (cpu.procentradasalida[i].proceso.prioridad < 6) {
					if (!cpu.procentradasalida[i].ejec) {
						puedeejecutar = false;
					}
				}
			}
		}else{
			puedeejecutar = false;
		}
	}else{
		if (cpu.procejecucion == null && cpu.procejecucion2 == null) {
			for (let i = 0; i < cpu.procentradasalida.length; i++) {
				if (cpu.procentradasalida[i].proceso.prioridad <= 10) {
					if (!cpu.procentradasalida[i].ejec) {
						puedeejecutar = false;
					}
				}
			}
		}else{
			puedeejecutar = false;
		}
	}
	return puedeejecutar;
}

function mostrarMemoria(memoria, tiempo) {
	p_time = document.createElement("p");
	timeicon = '<i class="tiny material-icons">access_time</i>';
	p_time.innerHTML = timeicon + " TIEMPO: " + tiempo;
	historialMem.appendChild(p_time);
	var hayprocesos = false;
	for (let i = 0; i < memoria.particiones.length; i++) {
		if (memoria.particiones[i].procesos.length > 0) {
			var procesos = "";
			var tamanioparticion = memoria.particiones[i].tamanio;
			for (let j = 0; j < memoria.particiones[i].procesos.length; j++) {
				procesos = procesos + memoria.particiones[i].procesos[j].nombre + ", ";
				tamanioparticion += memoria.particiones[i].procesos[j].tamanio;
			}
			p = document.createElement("p");
			porcentaje = 100 - Math.round(memoria.particiones[i].tamanio * 100 / tamanioparticion);
			p.innerHTML = "- En la Particion " + i + " se encuentran los procesos: " + procesos + " ocupando el %" + porcentaje + " de la partición"; 
			historialMem.appendChild(p);
			hayprocesos = true;
		}
	}
	if (tiempo > 0 && !hayprocesos) {
		p = document.createElement("p");
			p.innerHTML = "- Se libero la memoria"; 
			historialMem.appendChild(p);
	}
	pfinal = document.createElement("p");
	pfinal.innerHTML = "___________________________________________";
	historialMem.appendChild(pfinal);
}