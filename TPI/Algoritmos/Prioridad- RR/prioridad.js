function prioridad(){
	//Claramente los arreglos rafaga y prioridad seran ilimitados
	//En este caso los hice con 10 elementos para facilitar el entendimiento
	//Pero a la hora de implementarse, tomaran los valores que se asignen en la interface
	rafaga = [8, 6, 4, 2, 7, 8, 2, 45, 45, 25];
	prioridad = [2, 1, 2, 0, 0, 3, 4, 4, 5, 1];
	procesos = [];
	tiempos_arribo = [];

	//Cargo los procesos con sus rafagas a un arreglo
	for (var i = 0; i < rafaga.length; i++) {
		procesos[i] = {prioridad: prioridad[i], rafaga: rafaga[i], proceso: 'P'+ i};
	}

	//Ordena el arreglo por prioridad
	procesos.sort(function(prev, next){
		return prev.prioridad - next.prioridad;
	})

	acumulador = procesos[0].rafaga;
	tiempos_arribo[0] = acumulador;
	for (var i = 1; i < rafaga.length; i++) {
		acumulador = acumulador + procesos[i].rafaga;
		tiempos_arribo[i] = acumulador;
	}

	//Imprime los valores por consola para corroborar (claramente esta porcion de codigo no sera implementada)
	for (var i = 0; i < rafaga.length; i++) {
		console.log(procesos[i]);
	}

	acumulador = 0;
	console.log(procesos[0].proceso + ' empieza en ' + acumulador + ' y termina en ' + tiempos_arribo[0]);
	for (var i = 1; i < rafaga.length; i++) {

		console.log(procesos[i].proceso + ' empieza en ' + tiempos_arribo[i-1] + ' y termina en ' + tiempos_arribo[i]);
	}


}	
