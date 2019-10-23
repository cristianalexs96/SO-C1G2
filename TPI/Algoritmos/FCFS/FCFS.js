// Definicion del Nodo
function Node () {
    var ID;
    var execTime;
    var arriveTime;
    var next;
}

//Definicion de la lista
function Cola () {
    var first;
    var lenght;
}

//Creacion de procesos de manera Random
Cola.prototype.createProcess = function() {
    console.log("creando procesos... ");
    var random = Math.floor((Math.random() * 10) + 1);
    console.log("Cantidad de procesos random: " + random);

    //Comienza a crear los nodos con los procesos y a agregarlos a la Cola
    this.first = new Node();
    this.lenght=6000;
    var tmp = new Node();
    tmp = this.first;
    for (i=1;i<=random;i++){
        var currentProcess = new Node();
        currentProcess.ID = '0x00' + i;
        currentProcess.execTime = Math.floor((Math.random() * 800) + 1);
        currentProcess.arriveTime = Math.floor((Math.random() * this.lenght) + 1);
        tmp.next = currentProcess;
        tmp = tmp.next;
    }
    this.first = this.first.next;
};

//Lista los procesos cargados en la cola
Cola.prototype.listProcess = function () {
    var tmp = null;
    tmp = this.first;
    while ( tmp ){
        console.log("proceso: "+tmp.ID+"|| tiempo de ejecucion: "+tmp.execTime+"|| tiempo de arribo: "+tmp.arriveTime);
        tmp = tmp.next;
    }
}

Cola.prototype.FCFS = function() {
    console.log("FCFS... ");
    var currentProcess = this.first;
    while ( currentProcess ){
        console.log("---------------------------" );
        console.log("Proceso en ejecucion: "+ currentProcess.ID );
        console.log("demoro: " );
        console.log(" "+ currentProcess.execTime);
        currentProcess = currentProcess.next;
    }
};

var execute = new Cola();

execute.createProcess();
execute.listProcess();
execute.FCFS();

