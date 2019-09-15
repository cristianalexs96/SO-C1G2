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

// Trata los radio buttons de seleccion de particuines
particiones = document.getElementById("particiones");
function ocultarInputMem(){
	particiones.style.display = "none";
}

function mostrarInputMem(){
	particiones.style.display = "";
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
