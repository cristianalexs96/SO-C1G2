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
Estos algoritmos se encargaran de organizar los procesos de manera eficiente en cuanto al uso del procesador.
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
<p align="justify">En el presente simulador, la memoria se podra particionar de dos formas: particiones fijas o particiones variables. Las particiones fijas podrán ser con todas sus particiones del mismo tamaño, o bien ser de diferentes tamaños.</p>

__Algoritmo First Fit__  
<p align="justify">Este algoritmo consiste en recorrer la memoria hasta encontrar una partición que sea lo bastante grande para asignarse al proceso entrante. En el caso de particiones variables, se le asigna el primer espacio libre que este disponible ( en el caso de ser el primer proceso, en memoria tendremos todo el espacio disponible excepto el espacio asignado al sistema operativo) y lo divide en dos; una de esas partes sera todo el espacio requerido por el proceso y la otra quedara como espacio libre, disponible para otros procesos que puedan hacer uso del mismo. </p>

<p align="center"><img src="https://github.com/cristianalexs96/SO-C1G2/blob/master/Documentacion/First%20Fit.png"></p>

<P align="justify">En ambos casos, tanto para particiones fijas como particiones variables, se presentan inconvenientes; en particiones fijas puede ocurrir que el tamañano del proceso sea muy inferior al tamaño de la particion, produciendo fragmentacion interna (espacio que no se podra liberar ni usar hasta que finalice el proceso o bien termine la simulación. En el caso de las particiones variables puede ocurrir que entre dos procesos quede espacio sin asignar(fragmentación externa) puesto que ningun proceso que ingrese a memoria pueda ser asignado, esto podria optimizarse mediante un proceso de compactacion de memoria. </p> 

__Algoritmo Best Fit__
<p align="justify">Este algoritmo busca en toda la memoria, de principio a fin y toma la particion mas pequeña que se ajuste más al tamaño del proceso. El algoritmo Best Fit es más lento que el First Fit, ya que debe buscar en toda la memoria cada vez que se le llama y comparar cada particion con el tamaño del proceso solicitado.</p>  

Codigo a implementar en el simulador:

~~~javascript
function BestFit() 
    { 
         bloques = [100, 500, 200, 300, 600]; 
         procesos = [212, 417, 112, 426]; 
         m = bloques.length; 
         n = procesos.length; 
           
         bf(bloques, m, procesos, n); 
    }

function bf(bloques,m,procesos,n) 
    { 
        var asignacion = new Array(n); 
        var fragmentacion = 0;
        document.write("BLOQUE DE MEMORIA:" +"\t" + bloques);
        document.write("<br><br> PROCESOS:" + "\t" + procesos);
        for (i = 0; i < asignacion.length; i++) 
            asignacion[i] = -1;

        for (i=0; i<n; i++) 
        { 
            var aux = -1; 
            for (j=0; j<m; j++) 
            { 
                
                if (bloques[j] >= procesos[i]) 
                { 
                    if (aux == -1) 
                        aux = j; 
                    else if (bloques[aux] > bloques[j]) 
                        aux = j; 
                } 
            } 
            if (aux != -1) 
            { 
                asignacion[i] = aux;
                fragmentacion = bloques[aux]; 
                bloques[aux] -= procesos[i]; 
                fragmentacion -= procesos[i];
                document.write("<br><br> Fragmentación externa:" + fragmentacion);
                document.write("<br> N° Proceso \tTamaño del Proceso \tBloque Asignado");
                document.write("<br>" + (i+1) + "\t" + procesos[i] + "\t"); 
                    if (asignacion[i] != -1) 
                    document.write(asignacion[i] + 1); 
                    else
                    document.write("<br> No Asignado"); 
                    document.write("<br>");

            } 
        } 
    }
    
 ~~~
__Algoritmo Worst Fit__
<p align="justify"> Este algoritmo debe recorrer toda la memoria buscando el espacio libre mas grande disponible y se la asigna al actual proceso,con esto se busca que el espacio libre restante pueda ser utilizado por otro proceso.
	
__Planificación de Procesos__  

__Algoritmo FCFS__
<p align="justify"> Este algoritmo consiste en asignar la CPU al primer proceso que la solicite. La implementación de la política FCFS se puede gestionar mediante una cola FIFO, pues los procesos a medida que van ingresando a la cola de listos van quedando encolados en el orden en el cual fueron llegando. Es el algoritmo de planificacion de CPU mas simple, pero no así el mas efectivo puesto a que presenta inconvenientes tales como la situación en la que un proceso se este ejecutando, no podrá ingresarse ninguú otro proceso hasta haber finalizado en su totalidad el proceso que esté haciendo uso de la CPU, es un algoritmo no apropiativo, en el cual se produce un tiempo de espera en cola de listos muy extenso e ineficiente,  ya que los procesos en la mayoria de las veces no llegarán de forma ordenada y los que tengan tiempo de ejecución muy largos harán que el tiempo de respuesta de procesos cortos se vuelva muy prolongada.</p>  

__Algoritmo Por Prioridades__

<p align="justify"> Este algoritmo basa su funcionamiento en asignarle prioridades a los procesos para compertir por el uso del procesador. Las prioridades pueden definirse interna o externamente. Las prioridades definidas internamente utilizan algún valor como puede ser el tiempo de CPU que demanda un proceso; las prioridades definidas externamente se establecen en funcion de criterios externos al sistema operativo, como ser la importancia del proceso.</p>
<p align="justify"> La planificacion de procesos por prioridades puede ser apropiativa, en la cual si llega un nuevo proceso a la cola de listos y tiene una prioridad mayor a la del proceso que esta haciendo uso de  la CPU, se expulsa al proceso en ejecucion y se le asigna el recurso al nuevo proceso; tambien puede ser cooperativa, en este caso el algoritmo colocara al nuevo proceso al comienzo de la cola de listos, evitando la expulsion de un proceso en ejecución. Un problema importante de este algoritmo es que se puede producir un bloqueo indefinido o muerte por inanición, es decir, que se atiendan procesos con prioridades altas y nunca llegue a ejecutarse procesos con bajas prioridades. Una solución al problema del bloqueo indefinido de los proceso de baja prioridad consiste en aplicar mecanismos de envejecimiento, que consiste en luego de un tiempo ir aumentando la prioridad de los procesos que lleven mucho tiempo en espera por hacer uso de la CPU.</p>  

__Algoritmo Round Robin__

<p align="justify"> Tambien conocido como planificación cíclica o turno rotatorio, este algoritmo basa su funcionamiento en interrupciones de reloj cada cierto intervalo de tiempo. Cuando sucede la interrupción el proceso actual en ejecución se situa en la cola de listos, y se selecciona el siguiente trabajo segun la politica FCFS. Este metodo permite seleccionar todos los elementos de la carga de trabajo de manera equitativa, mediante un recorrido de la cola de listos desde principio a fin y empezando nuevamente por el primer proceso de la cola.</p>
<p align="justify">  Una desventaja de la planificación Round Robin es que trata de forma desigual a los procesos limitados por el procesador y a los procesos limitados por la E/S. Generalmente, un proceso limitado por la E/S tiene ráfagas de procesador más cortas (cantidad de tiempo de ejecución utilizada entre operaciones de E/S) que los procesos
limitados por el procesador. Si hay una mezcla de los dos tipos de procesos, sucederá lo siguiente: un proceso limitado por la E/S utiliza el procesador durante un periodo corto y luego se bloquea; espera a que complete la operación de E/S y a continuación se une a la cola de listos. Por otra parte, un proceso limitado por el procesador generalmente utiliza su quantum de tiempo completo mientras ejecuta e inmediatamente vuelve a la cola de listos o finaliza. De esta forma, los procesos limitados por el procesador tienden a recibir un quantum no equitativo de tiempo de procesador, lo que conlleva un mal rendimiento de los procesos limitados por la E/S ,uso ineficiente de los recursos de E/S y un incremento en la variación del tiempo de respuesta.</p>
	
	 

