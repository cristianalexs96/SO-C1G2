theme:
  name: 'material'

# <p align="center"> UNIVERSIDAD TECNOLOGICA NACIONAL</p>

<p align="center"><img src="https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img1.png"></p>

## <p align="center"> FACULTAD REGIONAL RESISTENCIA</p>
### <p align="center"> SISTEMAS OPERATIVOS</p>
#### <p align="center"> Proyecto: Simulador para la Administración de Memoria y Planificación de Procesos</p>

__Integrantes del equipo:__
* Arias, Leandro Exequiel
* Florentin, Cristian Alexis
* Imfeld, Facundo Nicolas
* Nasir, Khalil Abdul
* Matto, Pablo

__Equipo docente:__
* Ing. Cuenca Plestch, Liliana
* Ing. Ristoff, Alberto
* Ing. Roa, Jorge Alejandro
* Ing. Gramajo, Sergio

-------------------------------------------------------
## <p align="center"> DOCUMENTACIÓN</p>
## __ÍNDICE__
##### [Introducción](#id1)
##### [Datos de Entrada y Salida](#id2)
##### [Visualización del Planificador](#id3)
##### [Consideraciones](#id4)
##### [Algoritmos de Planificación de Procesos y Asignacion de Memoria](#id5)

#### Introducción<a name="id1"></a>
<p align="justify";>El objetivo del desarrollo del siguiente simulador es permitir visualizar los aspectos de la planificación de procesos a corto plazo, empleando los algoritmos de planificación FCFS, Prioridades, Round Robin, Colas Multinivel. Además se representará la gestión de la memoria con particiones Fijas y Variables para un esquema de un solo procesador, mostrando el ciclo de vida completo de un proceso desde su ingreso al sistema hasta su finalización. El objetivo de este documento es brindar información acerca del funcionamiento del simulador, en el mismo se detallaran las consideraciones que se tienen que tener en cuenta a la hora de cargar los datos requeridos para la simulación. Se detallara y adjuntara el funcionamiento de los diferentes algoritmos de planificacion y algoritmos de intercambio.</p>

#### Datos de Entrada y Salida<a name="id2"></a>

Partición de Memoria:
* FIJAS
	* Algoritmos de intercambio: First Fit, Best Fit. Estos algoritmos se encargarán de administrar la asignacion de particiones a los procesos.
	* Tamaño total: El tamaño maximo de memoria sera de 1024 kb, se podra definir tamaños menores a este segun se requiera.
	* Tamaño ocupado para el SO: Se debe especificar el tamaño que el sistema operativo ocupará y que no podrá ser modificado por los procesos.
	* Cantidad de particiones: Se establece un minimo de 2 particiones, y como maximo 10 particiones.
	* <p align="justify"> Tamaño de cada partición: Se puede optar por crear particiones en las cuales todas tengan el mismo tamaño, o definir particiones con tamaños variados, en ambos casos la suma de todos los tamaños no deberá superar el tamaño total de memoria.</p>.
* VARIABLES
	* Algoritmos de intercambio: Best Fit, Worst Fit
	* Tamaño total: El tamaño maximo de memoria sera de 1024 kb, .
	* Tamaño ocupado para el SO:Se debe especificar el tamaño que el sistema operativo ocupará y que no podra ser modificado por los procesos.


__Algoritmos de Planificación__
<p align="justify"> Estos algoritmos se encargaran de administrar los procesos 
* FCFS
* Por prioridades
* RR
	* Quantum
* Cola Multinivel

__Procesos__
* Cantidad de procesos: Se podra cargar un maximo de 10 procesos
* Tamaño de cada proceso: Se debe considerar que el tamaño de proceso no sea superior al tamaño de partición 
* Tiempo de arribo: Instante en el cual el proceso ingresa a la cola de nuevos.
* Tiempo de irrupción
	* Rafaga de CPU
	* Rafaga de E/S

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
__Pantalla Inicial__
<p align="justify";>Dispondremos de un menu en el cual podremos optar por Configuración de Arquitectura o Carga de Procesos</p>

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img2.jpeg "Pantalla entrada de Datos")

__Opción Configuración de Arquitectura__
<p align="justify";>En esta opción podremos seleccionar el tipo de algoritmo de planificación con el que queremos trabajar(FCFS,Por Prioridades,Round Robin, Colas multinivel); también cargaremos aquí los datos correspondientes a la Memoria, en el cual seleccionaremos el tipo de partición a utilizar, el tamaño de la memoria y su unidad (b, kb, mb, gb), y el algoritmo de ajuste deseado.</p>
<p style='text-align: justify;'>El campo Particiones estará disponible sólo en el caso que se seleccione particiones fijas.</p>

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img3.jpeg "Pantalla entrada de Datos")

__Opción Carga de Procesos__
<p align="justify";>Esta opción nos permitirá realizar la carga de todos los datos de los procesos requeridos para la simulación, como su nombre, tiempo de arribo tiempo de irrupción y ráfaga.</p>

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img4.jpeg "Pantalla entrada de Datos")

__Pantalla de Resultados__
<p align="justify";>Luego de cargar todos los datos necesarios, al ejecutar la simulación obtendremos en pantalla una tabla con toda la información de los procesos, el mapa de memoria y Diagrama de Gantt.</p>

![alt text](https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/img5.jpg "Pantalla entrada de Datos")

#### Consideraciones<a name="id4"></a>
><p align="justify";>Las imagenes presentadas anteriormente se presentan en modo de diseño preliminar, sujetas a modificaciones durante el desarrollo del proyecto hasta su entrega final.</p>
><p align="justify">Al seleccionar el tipo de particion "fija" se deberá ingresar el tamaño de la partición separando por "-", cada tamaño separado por "-" nos indica una particion.  
><p align="justify";>Colas multinivel: Se toma como referencia tres niveles de colas. Definir por cada cola qué tipo de algoritmo utilizará y quantum.</p>

### Algoritmos de Planificacion de Procesos y Asignación de Memoria <a name="id5"></a>  
__Asignacion de Memoria__  
En el presente simulador, la memoria se podra particionar de dos formas: particiones fijas o particiones variables. Las particiones fijas podrán ser con todas sus particiones del mismo tamaño, o bien ser de diferentes tamaños.   

__Algoritmo First Fit__  
Este algoritmo consiste en recorrer la memoria hasta encontrar una partición que sea lo bastante grande para asignarse al proceso entrante 


