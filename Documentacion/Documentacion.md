# <p align="center"> UNIVERSIDAD TECNOLOGICA NACIONAL</p>
## <p align="center"> FACULTAD REGIONAL RESISTENCIA</p>
### <p align="center"> SISTEMAS OPERATIVOS</p>
__*<p align="center"> Proyecto: Simulador para la administración de memoria y Planificación de Procesos</p>*__

__*Integrantes del equipo:*__

Arias, Leandro Exequiel
Florentin, Cristian Alexis
Imfeld, Facundo Nicolas
Nasir, Khalil Abdul
Matto, Pablo

__*Equipo docente:*__

Ing. Cuenca Plestch, Liliana
Ing. Ristoff, Alberto
Ing. Roa, Jorge Alejandro
Ing. Gramajo, Sergio

## <p align="center"> DOCUMENTACIÓN</p>
## __ÍNDICE__
##### [Introducción](#id1)
##### [Datos de Entrada y Salida](#id2)
##### [Visualización del Planificador](#id3)
##### [Consideraciones](#id4)

#### Introducción<a name="id1"></a>
<div style="text-align: justify;"> 
El objetivo del desarrollo del siguiente simulador es permitir visualizar los aspectos de la planificación de procesos a corto plazo, empleando los algoritmos de planificación FCFS, Prioridades, Round Robin, Colas Multinivel. A demás se representará la gestión de la memoria con particiones Fijas y Variables para un esquema de un solo procesador, mostrando el ciclo de vida completo de un proceso desde su ingreso al sistema hasta su finalización. El objetivo de este documento es brindar información acerca del funcionamiento del simulador, en el mismo se detallaran las consideraciones que se tienen que tener en cuenta a la hora de cargar los datos requeridos para la simulación. Se detallara y adjuntara el funcionamiento de los diferentes algoritmos de planificacion y algoritmos de intercambio.
</div>

#### Datos de Entrada y Salida<a name="id2"></a>

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

#### Visualización del Simulador<a name="id3"></a>
__*Pantalla Inicial*__
<p style='text-align: justify;'>Dispondremos de un menu en el cual podremos optar por Configuración de Arquitectura o Carga de Procesos
</p>

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img2.jpeg "Pantalla entrada de Datos")


__*Opción Configuración de Arquitectura*__
<p style='text-align: justify;'>En esta opción podremos seleccionar el tipo de algoritmo de planificación con el que queremos trabajar(FCFS,Por Prioridades,Round Robin, Colas multinivel); también cargaremos aquí los datos correspondientes a la Memoria, en el cual seleccionaremos el tipo de partición a utilizar, el tamaño de la memoria y su unidad (b, kb, mb, gb), y el algoritmo de ajuste deseado.</p>
<p style='text-align: justify;'>El campo Particiones estará disponible sólo en el caso que se seleccione particiones fijas.</p>

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img3.jpeg "Pantalla entrada de Datos")

__*Opción Carga de Procesos*__
<p style='text-align: justify;'>Esta opción nos permitirá realizar la carga de todos los datos de los procesos requeridos para la simulación, como su nombre, tiempo de arribo tiempo de irrupción y ráfaga.</p>

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img4.jpeg "Pantalla entrada de Datos")

__*Pantalla de Resultados*__
<p style='text-align: justify;'>Luego de cargar todos los datos necesarios, al ejecutar la simulación obtendremos en pantalla una tabla con toda la información de los procesos, y el Diagrama de Gantt.</p>

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img5.jpeg "Pantalla entrada de Datos")

#### Consideraciones<a name="id4"></a>
> Las imagenes presentadas anteriormente se presentan en modo de diseño preliminar, sujetas a modificaciones durante el desarrollo del proyecto hasta su entrega final.
Colas multinivel: Se toma como referencia tres niveles de colas. Definir el quantum para cada cola.
> Colas multinivel: Se toma como referencia tres niveles de colas. Definir por cada cola qué tipo de algoritmo utilizará.