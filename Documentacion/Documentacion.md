# <p align="center"> Documentación</p>

## __Índice__
##### [Datos de Entrada y Salida](#id1)
##### [Visualización Planificador](#id2)
##### [Consideraciones](#id3)

### Datos de Entrada y Salida<a name="id1"></a>

__Partición de memoria__
1. Fija
	* Algoritmos de intercambio:
		* First Fit
		* Best Fit
	* Tamaño total
	* Tamaño ocupado para el SO
	* Cantidad de particiones
	* Tamaño de cada partición

2. Variable
	* Algoritmos de intercambio:
		* Best Fit
		* Works Fit
	* Tamaño total
	* Tamaño ocupado para el SO

__Algoritmos de asignación__
* FCFS
* Por prioridades
* RR
	* Quantum
* Cola Multinivel

__Procesos__
* Cantidad de procesos
* Tamaño de cada proceso
* Tiempo de arribo
* Tiempo 

__Colas__
* Cola de Nuevos
* Cola de Listos
* Cola de CPU
* Cola de Entrada
* Cola de Salida

__Cálculos__
* TRP
* TE
* TEP

__PCB__
* Id Proceso
* Estado
* Registro CPU
* Memoria asignada
* RLI
* RLS
* Base
* Desplazamiento

### Visualización Planificador<a name="id2"></a>

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img1.jpeg "Pantalla entrada de Datos")

Pantalla inicial:

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img2.jpeg "Pantalla entrada de Datos")

Configuración de Arquitectura:

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img3.jpeg "Pantalla entrada de Datos")

Carga de procesos:

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img4.jpeg "Pantalla entrada de Datos")

### Consideraciones<a name="id3"></a>

> __Colas multinivel__: Se toma como referencia tres niveles de colas. Definir por cada cola qué tipo de algoritmo utilizará.