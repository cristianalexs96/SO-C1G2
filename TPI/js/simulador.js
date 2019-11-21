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

	// if (alg_planific.value == 4){
	// 	cuantum_multi.style.display = "";
	// }else{
	// 	cuantum_multi.style.display = "none";
	// }

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
	// ultimo2.innerHTML = tamanioMem.value + " B"; //En la memoria real
	mapa.className = "mapa blue-grey lighten-5";
	// mapa2.className = "mapa blue-grey lighten-5";//En la memoria real

	//Deshabilito los radiobutton para que no me traiga problemas si el usuario cambia en plena ejecucion
	radio[0].disabled = true;
	radio[1].disabled = true;

	info[0].innerHTML = "Tamaño Memoria: " + tamanioMem.value + " B";
	restante = Math.round(parseInt(tamanioMem.value)-parseInt(tamanioMem.value)*0.1); //Le resto el 10% para el SO
	info[1].innerHTML = "Tamaño Restante: " + restante + " B";
	

	// //Cargo el sistema operativo en la memoria
	// div1 = document.createElement("div");
	// div2 = document.createElement("div");
	// span = document.createElement("span");
	// span.innerHTML = "SO";
	// div2.appendChild(span);
	// div2.className = "text center-align";
	// div1.appendChild(div2);
	// div1.className = "procmem col";

	// div1.style.width = "10%"; //El 10% es para el SO
	// div1.style.background = "#ff8f00";
	// div1.setAttribute("id", "memSO");
	// mapa.appendChild(div1);

	//Agrego el SO en la memoria real
	//Aca lo hago medio rebuscado porque no me deja poner dos AppendChild seguidos, no se por que
	// auxSO.style.width = "10%"; 
	// auxSO.style.background = "#ff8f00";
	// auxSO.style.display = ""; //En la memoria real

	//Habilito el boton cargar
	// cargar.className = "waves-effect waves-light btn-small right blue darken-1 separar";


	//Deshabilito el campo de tamanio memoria
	tamanioMem.disabled = true;

}
function validarMem(){
	if (tamanioMem.value == "") {
		return false;
	}else if(parseInt(tamanioMem.value) < 10){
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

	// tamanioDiv = (((parseInt(tamanio.value)/parseInt(tamanioMem.value))*100)/ancho);
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

// 	//Cargo las particiones a la memoria real
// 	for (var i = 0; i < particiones.length ; i++) {
// 		mostrarParticiones(particiones[i],i);
// 	}
	
	bandCargarProc2 = true;

// 	//Deshabilito el campo de agregar particiones, para que el usuario no quiera
// 	//modificar en tiempo de ejecucion

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

// function mostrarParticiones(tamPart,i){
// 	coloresPart = ["bdbdbd", "9e9e9e", "b0bec5", "90a4ae", "78909c", "607d8b"];
// 	div1 = document.createElement("div");
// 	div1.className = "procmem col";
// 	//Con esta linea obtengo el ancho del div que corresponde al uso del sistema operativo dentro de la memoria
// 	//Tambien representaria el tamanio del proceo
// 	ancho = parseInt(document.getElementById("memSO").offsetWidth);
// 	//Con esta linea calculo el procentaje de memoria que ocupa el SO dentro de la memoria
// 	procentajeSO = (ancho/parseInt(tamanioMem.value))*100;
// 	//Con esta linea calculo el procentaje que le corrresponde a la particion en base a la
// 	//memoria disponible que le queda, despues de la que usa el SO
// 	tamanioDiv = (tamPart/(parseInt(tamanioMem.value)-procentajeSO))*100;

// 	div1.style.width = tamanioDiv + "%";
// 	div1.style.background = "#"+coloresPart[i];
// 	div1.style.overflow = "auto";
// 	div1.style.overflowY = "hidden";
// 	span = document.createElement("span");
// 	span.innerHTML = "Part: " + (i+1);
// 	span.className = "center-align";
// 	div1.appendChild(span);
// 	mapa2.appendChild(div1);

// }

//Me permite hacer click en el boton para cargar el archivo, es todo un descajete jaja
archivo = document.getElementById("archivo");
cargarArchivo = document.getElementById("cargarArchivo");

cargarArchivo.addEventListener("click", function(){
	archivo.click();
});


//Cmienzo del tratamiento del archivo de entrada

var reader = new FileReader();

function lecturaArchivo(e){
	archivo = e.target.files[0];
	reader.readAsText(archivo);
	reader.onload = devolverProcesos;
}

procesosObjetos = [];

c = 0;
function devolverProcesos(){
	var result = reader.result;
	var lineas = result.split("\n");
	
	for (var i = 0; i < lineas.length-1; i++) {
		
		procesosObjetos[i] = {
			nombre: "P" + i,
			tamanio: parseInt(lineas[i].substring(0,4)),
			ta: parseInt(lineas[i].substring(5,8)),
			rafagacpu: parseInt(lineas[i].substring(9,12)),
			rafagaES: parseInt(lineas[i].substring(13,16)),
			rafagacpu2: parseInt(lineas[i].substring(17,20)),
			prioridad: parseInt(lineas[i].substring(21,23)),
			tiempoEntrada: 0,
			tiempoSalida: 0
		}
	}

	//Permite mostrar los procesos en cola de nuevos solo una vez
	if(c == 0){
		mostrarColaNuevos(procesosObjetos);
		mostrarProcesosPlanificador(procesosObjetos);
		c += 1;
	}

	controlArchivo = true;
	return procesosObjetos;
}


document.getElementById("archivo").addEventListener('change', lecturaArchivo, false);
// document.getElementById("archivo").addEventListener('change', mostrarColaNuevos, false);

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

		// tamanioDiv = (((parseInt(tamanio.value)/parseInt(tamanioMem.value))*100)/ancho);
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
	}
//	if ((alg_planific.value == 1) && (algoritmosMem.value == 2) && (radio2.checked)) {
//		if (controlArchivo) {
//			FCFS(true);
//			historialProcesosArchivo(auxiliar);
//			diagramaGantArchivo(auxiliar);
//			
//		}else{
//
//			algFCSS_Prioridad(1); //Se ejecuta como FCFS
//
//			historialProcesos();
//			diagramaGantt();
//		}
//	}else if (alg_planific.value == 2) {
//		algFCSS_Prioridad(2); // Se ejecuta como prioridad
//
//		historialProcesos();
//
//		diagramaGantt();
//	}else if (alg_planific.value == 3){
//		algRR();
//		historialProcesosRR(procesosAux1,procesosAux2,procesosAux3);
//		diagramaGanttRR();
//	}else{
//		algColasMultinivel();
//		historialProcesosRR(procesosAux1,procesosAux2,procesosAux3);
//		diagramaGanttRR();
//	}

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
	// console.log(posiciones);

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
			posiciones[contEsp].final = i;
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


	//Calculo el menor desperdicio, para que funcione con BF
	for (var i = 0; i < desperdicio.length; i++) {
		//Dependiendo de alg se comporta como BF o WF
		if (alg == 1) {
			valor = Math.min.apply(null, desperdicio);
		}else{
			valor = Math.max.apply(null, desperdicio);
		}
		
		if (valor >= 0) {
			break;
		}		
	}

	//Busco la posicion del menor elemento 
	//Y escribo el proceso en la memoria siempre y cuando haya espacio disponible
	if (valor >= 0) {
		pos = desperdicio.indexOf(valor, 0);
		for (var i = 0; i < tamP; i++) {
			memoriaP[posiciones[pos].inicio + i] = nombreP;
		}

	}else{
		for (var i = 0; i < procesosOrd.length; i++) {
			if(procesosOrd[i].nombre == nombreP){
				procesosOrd[i].ta += 1;
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

function FCFS(archivo){
	memoriaP = new Array(parseInt(tamanioMem.value));
	listos = [];
	auxiliar = [];
	for (var i = 0; i < memoriaP.length; i++) {
		memoriaP[i] = 0;
	}
	

	//Con esto funciona para archivos y manual
	if (archivo) {
		procesosOrd = devolverProcesos();
	}else{
		procesosOrd[i] = {	nombre: nombreProc[i], 
						tamanio: tamanioProc[i], 
						ta: taProc[i],
						rafagacpu: rafagacpuProc[i],
						rafagaES: rafagaESProc[i],
						rafagacpu2: rafagacpuProc[i],
						prioridad: prioridadProc[i],
						tiempoEntrada: 0,
						tiempoSalida: 0
					};
	}


	acum = 0;
	for (var i = 0; i < procesosOrd.length; i++) {
		//Acumulo todos los tiempos, esto me dara el tiempo total de ejecucion
		acum += procesosOrd[i].rafagacpu;
	}

	controlProc = 0;
	rafagas = 0;
	for (var i = 0; i <= acum; i++) {
		for (var j = 0; j < procesosOrd.length; j++) {
			if(procesosOrd[j].ta == i){
				montarEnMemoria(procesosOrd[j].nombre, procesosOrd[j].tamanio, 2);
				if(valor >= 0){
					listos.push(procesosOrd[j]);
				}
			}
		}

		// console.log(listos);

		if ((listos[controlProc].rafagacpu == i) && (auxiliar.length == 0)) {
			auxiliar.push({nombre: listos[controlProc].nombre, tiempoEntrada: 0, tiempoSalida: listos[controlProc].rafagacpu});
			rafagas += i; //i es la rafaga en este momento
			if (listos[controlProc].rafagaES == 0) {
				removerDeMemoria(listos[controlProc].nombre);
			}
			controlProc += 1;
		}else if ((listos[controlProc].rafagacpu + rafagas) == i) {
			auxiliar.push({nombre: listos[controlProc].nombre, tiempoEntrada: rafagas, tiempoSalida: rafagas + listos[controlProc].rafagacpu});
			rafagas += listos[controlProc].rafagacpu;
			if (listos[controlProc].rafagaES == 0) {
				removerDeMemoria(listos[controlProc].nombre);
			}
			controlProc += 1;
		}

		



	}
	
	// // console.log(memoriaP);
	// console.log(auxiliar);

}

function algFCSS_Prioridad(elegir){
	// procesosOrd = [];
	// procesosAux = [];
	//Cargo los procesos con todas sus caracteristicas para posteriormente ordenarlo
	// for (var i = 0; i < nombreProc.length; i++) {
	// 	procesosOrd[i] = {	nombre: nombreProc[i], 
	// 					tamanio: tamanioProc[i], 
	// 					ta: taProc[i],
	// 					rafagacpu: rafagacpuProc[i],
	// 					rafagaES: rafagaESProc[i],
	// 					rafagacpu2: rafagacpuProc[i],
	// 					prioridad: prioridadProc[i]
	// 				};
	// }
	procesosOrd = devolverProcesos();
	
	//Ordena el arreglo por prioridad o por TA
	if (elegir == 1) {
		procesosOrd.sort(function(a, b){
			return a.ta - b.ta;
		});
	}else{
		procesosOrd.sort(function(a, b){
			return a.prioridad - b.prioridad;
		});
	}
	for (var i = 0; i < nombreProc.length; i++) {
		if (procesosOrd[i].rafagaES > 0) {
			procesosOrd.push(procesosOrd[i]);
		}
	}
	
}

cuant = document.getElementById("cuant");
function algRR(){
	procesosOrd = [];
	procesosAux1 = [];
	procesosAux2 = [];
	procesosAux3 = [];
	if(!validarCuant()){
		return false;
	}
	cuant = parseInt(cuant.value);
	for (var i = 0; i < nombreProc.length; i++) {
		procesosOrd[i] = {	nombre: nombreProc[i], 
						tamanio: tamanioProc[i], 
						ta: taProc[i],
						rafagacpu: rafagacpuProc[i],
						rafagaES: rafagaESProc[i],
						rafagacpu2: rafagacpuProc2[i],
						prioridad: prioridadProc[i],
						tiempoEntrada: 0, //Auxiliar
						tiempoSalida: 0 //Auxiliar
					};
	}
	respaldoProcesosOrd = procesosOrd;
	
	acumTiempoRR = 0;
	band = true;

	while (band){
		control = 0;
		for (var i = 0; i < procesosOrd.length; i++) {
			if (procesosOrd[i].rafagacpu > cuant) {
				control += 1;
				procesosOrd[i].rafagacpu -= cuant;
				procesosOrd[i].tiempoEntrada = acumTiempoRR;
				procesosOrd[i].tiempoSalida = acumTiempoRR + cuant;
				acumTiempoRR += cuant;
				procesosAux1.push(procesosOrd[i].nombre);
				procesosAux2.push(procesosOrd[i].tiempoEntrada);
				procesosAux3.push(procesosOrd[i].tiempoSalida);
				
			}else if (procesosOrd[i].rafagacpu > 0){
				
				procesosOrd[i].tiempoEntrada = acumTiempoRR;
				procesosOrd[i].tiempoSalida = acumTiempoRR + procesosOrd[i].rafagacpu;
				
				acumTiempoRR += procesosOrd[i].rafagacpu;
				procesosOrd[i].rafagacpu = 0;
				procesosAux1.push(procesosOrd[i].nombre);
				procesosAux2.push(procesosOrd[i].tiempoEntrada);
				procesosAux3.push(procesosOrd[i].tiempoSalida);

			}else{
				continue;
			}
			
		}
		
		if (control == 0) {
			band = false;
		}
	}

	band = true;
	while (band){
		control = 0;
		for (var i = 0; i < procesosOrd.length; i++) {
			if ((procesosOrd[i].rafagacpu2 > cuant) && (procesosOrd[i].rafagaES > 0)) {
				control += 1;
				procesosOrd[i].rafagacpu2 -= cuant;
				procesosOrd[i].tiempoEntrada = acumTiempoRR;
				procesosOrd[i].tiempoSalida = acumTiempoRR + cuant;
				acumTiempoRR += cuant;
				procesosAux1.push(procesosOrd[i].nombre);
				procesosAux2.push(procesosOrd[i].tiempoEntrada);
				procesosAux3.push(procesosOrd[i].tiempoSalida);
				
			}else if ((procesosOrd[i].rafagacpu2 > 0) && (procesosOrd[i].rafagaES > 0)){
				
				procesosOrd[i].tiempoEntrada = acumTiempoRR;
				procesosOrd[i].tiempoSalida = acumTiempoRR + procesosOrd[i].rafagacpu2;
				
				acumTiempoRR += procesosOrd[i].rafagacpu2;
				procesosOrd[i].rafagacpu2 = 0;
				procesosAux1.push(procesosOrd[i].nombre);
				procesosAux2.push(procesosOrd[i].tiempoEntrada);
				procesosAux3.push(procesosOrd[i].tiempoSalida);

			}else{
				continue;
			}
			
		}
		
		if (control == 0) {
			band = false;
		}
	}

}



function historialProcesos(){
	p = document.createElement("p");
	p.innerHTML = "- El proceso " + procesosOrd[0].nombre + " entra en el tiempo 0 y sale en el tiempo " + procesosOrd[0].rafagacpu + "\n";
	p.style.marginBottom = "10px";
	historial.appendChild(p);

	acumTiempo = procesosOrd[0].rafagacpu;
	for (var i = 1; i < procesosOrd.length; i++) {
		p = document.createElement("p");
		p.style.marginBottom = "10px";
		if (i > (nombreProc.length-1)) {
			acumTiempo += procesosOrd[i].rafagacpu2;
			p.innerHTML = "- El proceso " + procesosOrd[i].nombre + " entra en el tiempo " + (acumTiempo - procesosOrd[i].rafagacpu2) + " y sale en el tiempo " + acumTiempo + "\n";
		}else{
			acumTiempo += procesosOrd[i].rafagacpu;
			p.innerHTML = "- El proceso " + procesosOrd[i].nombre + " entra en el tiempo " + (acumTiempo - procesosOrd[i].rafagacpu) + " y sale en el tiempo " + acumTiempo + "\n";
		}
		historial.appendChild(p);
	}
}	

function historialProcesosRR(procesosAux1,procesosAux2,procesosAux3){
	for (var i = 0; i < procesosAux1.length; i++) {
		
		if (procesosAux2[i] == procesosAux3[i]) {
			break;
		}
		p = document.createElement("p");
		p.style.marginBottom = "10px";

		p.innerHTML = "- El proceso " + procesosAux1[i] + " entra en el tiempo " + procesosAux2[i] + " y sale en el tiempo " + procesosAux3[i] + "\n";

		historial.appendChild(p);
	}

}

function historialProcesosArchivo(auxiliar){
	for (var i = 0; i < auxiliar.length; i++) {
		p = document.createElement("p");
		p.style.marginBottom = "10px";
		p.innerHTML = "- El proceso " + auxiliar[i].nombre + " entra en el tiempo " + auxiliar[i].tiempoEntrada + " y sale en el tiempo " + auxiliar[i].tiempoSalida + "\n";
		historial.appendChild(p);	
	}
}

ganttProc = document.getElementById("ganttProc");
ganttTiempo = document.getElementById("ganttTiempo");
function diagramaGantt(){
	totalTiempo = 0;
	for (var i = 0; i < procesosOrd.length; i++) {
		totalTiempo += procesosOrd[i].rafagacpu;
	}
	acumTiempo = 0;
	for (var i = 0; i < procesosOrd.length; i++) {
		acumTiempo += procesosOrd[i].rafagacpu;
		//Agrego los divs de procesos
		div1 = document.createElement("div");
		span = document.createElement("span");
		span.innerHTML = procesosOrd[i].nombre;
		span.className = "white-text";
		ancho = (procesosOrd[i].rafagacpu/totalTiempo)*100;
		div1.style.width = ancho + "%";
		div1.style.height = "50px !important";

		div1.className = "col center-align ganttProc";
		div1.style.background = "#"+colores[i];

		div1.appendChild(span);
		ganttProc.appendChild(div1);

		//Agrego los divs de tiempos
		div1 = document.createElement("div");
		span2 = document.createElement("span");
		span2.innerHTML = acumTiempo;
		span2.className = "right !important";
		div1.style.width = ancho + "%";
		div1.className = "col quitar";

		div1.appendChild(span2);
		ganttTiempo.appendChild(div1);
	}

}

function diagramaGanttRR(){

	totalTiempo = procesosAux3[procesosAux3.length-1];

	for (var i = 0; i < procesosAux1.length; i++) {
		//Agrego los divs de procesos
		if (procesosAux2[i] == procesosAux3[i]) {
			break;
		}
		div1 = document.createElement("div");
		span = document.createElement("span");
		span.innerHTML = procesosAux1[i];
		span.className = "white-text";
		ancho = ((procesosAux3[i]-procesosAux2[i])/totalTiempo)*100;
		div1.style.width = ancho + "%";
		div1.style.height = "50px !important";

		div1.className = "col center-align ganttProc";
		div1.style.background = "#"+colores[i];

		div1.appendChild(span);
		ganttProc.appendChild(div1);

		//Agrego los divs de tiempos
		div1 = document.createElement("div");
		span2 = document.createElement("span");
		span2.innerHTML = procesosAux3[i];
		span2.className = "right !important";
		div1.style.width = ancho + "%";
		div1.className = "col quitar";

		div1.appendChild(span2);
		ganttTiempo.appendChild(div1);
	}

}

function diagramaGantArchivo(auxiliar){
	totalTiempo = auxiliar[auxiliar.length-1].tiempoSalida;
	for (var i = 0; i < auxiliar.length; i++) {
		div1 = document.createElement("div");
		span = document.createElement("span");
		span.innerHTML = auxiliar[i].nombre;
		span.className = "white-text";
		ancho = ((auxiliar[i].tiempoSalida-auxiliar[i].tiempoEntrada)/totalTiempo)*100;
		//console.log(ancho + '\n');

		div1.style.width = ancho + "%";
		div1.style.height = "50px !important";

		div1.className = "col center-align ganttProc";
		div1.style.background = "#"+colores[i];
		div1.appendChild(span);
		ganttProc.appendChild(div1);

		//Agrego los divs de tiempos
		div1 = document.createElement("div");
		span2 = document.createElement("span");
		span2.innerHTML = auxiliar[i].tiempoSalida;
		span2.className = "right !important";
		div1.style.width = ancho + "%";
		div1.className = "col quitar";
		div1.appendChild(span2);
		ganttTiempo.appendChild(div1);
	}
}

function algColasMultinivel(){
	cuantum1 = 3;
	cuantum2 = 6;
	procesosOrd = [];
	procesosAux1 = [];
	procesosAux2 = [];
	procesosAux3 = [];
	for (var i = 0; i < nombreProc.length; i++) {
		procesosOrd[i] = {	nombre: nombreProc[i], 
						tamanio: tamanioProc[i], 
						ta: taProc[i],
						rafagacpu: rafagacpuProc[i],
						rafagaES: rafagaESProc[i],
						rafagacpu2: rafagacpuProc2[i],
						prioridad: prioridadProc[i],
						tiempoEntrada: 0, //Auxiliar
						tiempoSalida: 0 //Auxiliar
					};
	}

	//TRATAMIENTO PRIMERA COLA -- RR q=3

	acumTiempoRR = 0;
	const longitud = procesosOrd.length;
	for (var i = 0; i < longitud; i++) {
			if (procesosOrd[i].rafagacpu > cuantum1) {
				procesosOrd[i].rafagacpu -= cuantum1;
				procesosOrd[i].tiempoEntrada = acumTiempoRR;
				procesosOrd[i].tiempoSalida = acumTiempoRR + cuantum1;
				acumTiempoRR += cuantum1;
			
			}else if (procesosOrd[i].rafagacpu > 0){
				
				procesosOrd[i].tiempoEntrada = acumTiempoRR;
				procesosOrd[i].tiempoSalida = acumTiempoRR + procesosOrd[i].rafagacpu;
				
				acumTiempoRR += procesosOrd[i].rafagacpu;
				procesosOrd[i].rafagacpu = 0;
				

			}
			procesosAux1.push(procesosOrd[i].nombre);
			procesosAux2.push(procesosOrd[i].tiempoEntrada);
			procesosAux3.push(procesosOrd[i].tiempoSalida);
			procesosOrd.push(procesosOrd[i]);
		
	}

	//TRATAMINETO SEGUNDA COLA -- RR q=6
	const longitud2 = procesosOrd.length;
	for (var i = 0; i < longitud2; i++) {
		
		if(procesosOrd[i].rafagacpu > 0){
			procesosOrd[i].tiempoEntrada = acumTiempoRR;
			procesosOrd[i].tiempoSalida = acumTiempoRR + procesosOrd[i].rafagacpu;
			acumTiempoRR += procesosOrd[i].rafagacpu;
			procesosOrd[i].rafagacpu = 0;
			
		}else if((procesosOrd[i].rafagacpu2 > cuantum2) && (procesosOrd[i].rafagaES > 0)){
			procesosOrd[i].rafagacpu2 -= cuantum2;
			procesosOrd[i].tiempoEntrada = acumTiempoRR;
			procesosOrd[i].tiempoSalida = acumTiempoRR + cuantum2;
			acumTiempoRR += cuantum2;
		}else{
			procesosOrd[i].tiempoEntrada = acumTiempoRR;
			procesosOrd[i].tiempoSalida = acumTiempoRR + procesosOrd[i].rafagacpu2;
			
			acumTiempoRR += procesosOrd[i].rafagacpu2;
			procesosOrd[i].rafagacpu2 = 0;

		}
		procesosAux1.push(procesosOrd[i].nombre);
		procesosAux2.push(procesosOrd[i].tiempoEntrada);
		procesosAux3.push(procesosOrd[i].tiempoSalida);
		procesosOrd.push(procesosOrd[i]);	
	
			
	}

	//TRATAMIENTO DE LA TERCER COLA -- FCFS

	for (var i = 0; i < procesosOrd.length; i++) {
		if (procesosOrd[i].rafagacpu > 0) {
			procesosOrd[i].tiempoEntrada = acumTiempoRR;
			procesosOrd[i].tiempoSalida = acumTiempoRR + procesosOrd[i].rafagacpu;
			acumTiempoRR += procesosOrd[i].rafagacpu;
			procesosOrd[i].rafagacpu = 0;
			procesosAux1.push(procesosOrd[i].nombre);
			procesosAux2.push(procesosOrd[i].tiempoEntrada);
			procesosAux3.push(procesosOrd[i].tiempoSalida);
			procesosOrd.push(procesosOrd[i]);
			
			
		}else if ((procesosOrd[i].rafagacpu2 > 0) && (procesosOrd[i].rafagaES > 0)){
			procesosOrd[i].tiempoEntrada = acumTiempoRR;
			procesosOrd[i].tiempoSalida = acumTiempoRR + procesosOrd[i].rafagacpu2;
			acumTiempoRR += procesosOrd[i].rafagacpu2;
			procesosOrd[i].rafagacpu2 = 0;
			procesosAux1.push(procesosOrd[i].nombre);
			procesosAux2.push(procesosOrd[i].tiempoEntrada);
			procesosAux3.push(procesosOrd[i].tiempoSalida);
		

		}
		
	}
}

//PART FIJA
function crearmemoriaPF() {
	var memoria = new Object();
	memoria.tamanio = tamanioMem.value;
	memoria.particiones = [];
	memoria.procesos = devolverProcesos();
	cantparts = cant_part.value.split("-");
	for (let part = 0; part < cantparts.length; part++) {
		var particion = {
			nombre: "PART" + part,
			tamanio: parseInt(cantparts[part])/1000,
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
		procejecucion: null,
		tiempoejecucionactual: 0,
		procentradasalida: [],
		proceliminar: [],
		procesos: [],
	};
	var fin = false;
	var tiempo = 0;
	while (!fin) {

		console.log("___________________");
		console.log("TIEMPO : " + tiempo);
		console.log("PROCESOS CARGADOS: ")
		for (let i = 0; i < memoria.procesos.length; i++) {
			console.log(".... nombre: " + memoria.procesos[i].nombre);
			console.log(".... tamanio: " + memoria.procesos[i].tamanio);
			console.log(".... ta: " + memoria.procesos[i].ta);
			console.log(".... rafagacpu: " + memoria.procesos[i].rafagacpu);
			console.log("-----------------")
		}
		console.log("PARTICIONES: ");
		for (let i = 0; i < memoria.particiones.length; i++) {
			console.log(".... nombre: " + memoria.particiones[i].nombre);
			console.log(".... tamanio: " + memoria.particiones[i].tamanio);
			console.log(".... Procesos corriendo: ")
			for (let j = 0; j < memoria.particiones[i].procesos.length; j++) {
				console.log("........ " + memoria.particiones[i].procesos[j].nombre);
			}
			console.log(".................");
		}

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
						if (parts[part].tamanio >= proceso.tamanio && !assign) {
							parts[part].procesos.push(proceso);
							memoria.particiones[part].tamanio = memoria.particiones[part].tamanio - proceso.tamanio;
							cpu.colalistos.push(proceso);
							assign = true;
						}
					}	
				}else{
					//BF
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
						cpu.colalistos.push(proceso);
						assign = true;
					}
				}
				if (!assign){
					eliminar.push(proc);
				}
			}
		}
		//controlo tiempo de procesos corriendo
		cpu = CPU(cpu, tiempo);
		for (let part = 0; part < memoria.particiones.length; part++) {
			var posfinprocs = [];
			//recorro procesos corriendo en particion
			for (let p = 0; p < parts[part].procesos.length; p++) {
				//Recorro procesos a eliminar de memoria
				for (let i = 0; i < cpu.proceliminar.length; i++) {
					eliminar.push(p);
					//recorro procesos para guardar ubicacion a eliminar
					for (let proc = 0; proc < memoria.procesos.length; proc++) {
						if (memoria.procesos[proc].nombre == parts[part].procesos[p].nombre) {
							eliminar.push(proc);
						}
					}
				}
			}
			//elimino procesos terminados de la particion
			posfinprocs.sort();
			posfinprocs.reverse();
			for (let p = 0; p < posfinprocs.length; p++) {
				 memoria.particiones[part].procesos.splice(posfinprocs[p], 1);
			}
		}

		eliminar.sort();
		eliminar.reverse();
		for (let proc = 0; proc < eliminar.length; proc++) {
				memoria.procesos.splice(eliminar[proc], 1);
		}

		if (memoria.procesos.length == 0) {
			fin = true;
		}

		tiempo++;
	}
}

function CPU(cpu, tiempo) {
	//FCFS
	if (alg_planific.value == 1) {
		var ejecband = false;
		var ejecentsal = false;
		//Controlo proceso en ejecucion
		if (cpu.procejecucion != null) {
			//el proceso termino su ejecucion
			if (cpu.tiempoejecucionactual == 0){
				if ((cpu.procejecucion.tiempoEntrada + cpu.procejecucion.tiempoSalida) != 0) {
					ejecentsal = controlentradasalida(cpu.procentradasalida, cpu.procejecucion);
				}
				//el proceso no tiene entrada salida o ya lo ejecuto
				if ((cpu.procejecucion.tiempoEntrada + cpu.procejecucion.tiempoSalida) == 0 || ejecentsal) {
					cpu.proceliminar.push(cpu.procejecucion);
					cpu.procejecucion = null;
				}
				//el proceso tiene entrada salida y no lo ejecuto aun
				if ((cpu.procejecucion.tiempoEntrada + cpu.procejecucion.tiempoSalida) != 0 && !ejecentsal) {
					var procesoentradasalida = {
						proceso: cpu.procejecucion,
						entradasalida: cpu.procejecucion.tiempoEntrada + cpu.procejecucion.tiempoSalida,
					}
					cpu.procentradasalida.push(procesoentradasalida);
					cpu.procejecucion = null;
				}
			}else{
				//el proceso no termino su ejecucion aun
				cpu.tiempoejecucionactual -= 1;
			}
		}

		//controlo entrada salida
		for (let i = 0; i < cpu.procentradasalida.length; i++) {
			if (cpu.procentradasalida[i].entradasalida != 0) {
				cpu.procentradasalida[i].entradasalida -= 1;
			}else{
				if (cpu.procesoentradasalida[i].proceso.rafagacpu2 == 0) {
					cpu.proceliminar.push(cpu.procesoentradasalida[i].proceso);
				}
				else{
					cpu.colaespera.push(cpu.procesoentradasalida[i].proceso);
				}
			}
		}

		//Ejecuto proceso
		for (let procesp = 0; procesp < cpu.colalistos.length; procesp++) {
			if (cpu.procejecucion == null){
				cpu.procejecucion = cpu.colalistos[procesp];
				if (controlentradasalida(cpu.procentradasalida, cpu.procejecucion)) {
					cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu2;
				}else{
					cpu.tiempoejecucionactual = cpu.procejecucion.rafagacpu;
				}
				ejecband = true;
			}else{
				cpu.colaespera.push(cpu.colalistos[procesp]);
			}
		}
		//Elimino de cola de listos
		if (ejecband){
			cpu.colalistos = [];
		}

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
			if (colaespera[j].proceso.nombre == proceliminar[i].proceso.nombre) {
				pos = j;
			}
		}
		if (pos != null) {
			colaespera.splice(pos, 1);
		}
	}
	return colaespera;
}