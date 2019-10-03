function rr(){
	rafaga = [8, 6, 4, 2, 9, 1];
	cuantum = 5; //El cuantum seria de 1, es decir, 1 cuantum de 5 milisegundos de rafaga
	procesos = [];
	tiempos_arribo = [];
	procesos_final = [];
	tiempos_arribo = [];

	//Cargo los procesos con sus rafagas a un arreglo
	for (var i = 0; i < rafaga.length; i++) {
		procesos[i] = {rafaga: rafaga[i], proceso: 'P'+ i};
	}

	procesos_aux = procesos;
	//Comentario solo para mi, js hace asignacion por referencia para valores que no sean primitivos
	//Como objetos, arrays (que tambien son objetos), etc. Por eso al modificar 'procesos_aux', tambien
	//se modifica 'procesos', porque previamente los asigné
	for (var i = 0; i < procesos.length; i++) {
		
		if (procesos[i].rafaga <= cuantum) {
			procesos_final.push(procesos_aux[i]);
			tiempos_arribo.push(procesos_aux[i].rafaga);
		}else{
			procesos_aux[i].rafaga = procesos_aux[i].rafaga - cuantum;
			tiempos_arribo.push(cuantum);
			procesos_final.push(procesos_aux[i]);
			procesos_aux.push(procesos_aux[i]);
		}
	}

	acumulador = 0;
	console.log(procesos_final[0].proceso + ' empieza en ' + acumulador + ' y termina en ' + tiempos_arribo[0]);
	for (var i = 1; i < procesos_final.length; i++) {
		acumulador = acumulador + tiempos_arribo[i-1];
		console.log(procesos_final[i].proceso + ' empieza en ' +  acumulador + ' y termina en ' + (acumulador+tiempos_arribo[i]));
	}
}

