process.stdin.resume();
process.stdin.setEncoding('utf8');
// Your code here!
class Proceso{
    constructor(nro,rafaga,siguiente=null)
    {
        this.nro = nro;
        this.rafaga = rafaga;
        this.siguiente = siguiente;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }
    //Insertar primero
    insertarPrimero(nro,rafaga)
    {
        this.head = new Proceso(nro,rafaga,this.head);
        this.size++;
    }
    //insertar Ultimo
    insertarUltimo(nro,rafaga)
    {
        let proceso = new Proceso(nro,rafaga);
        let actual;
        
        if(!this.head)
        {
            this.head = proceso;
            
        }
        else
        {
            actual = this.head;
            while(actual.next)
            {
                actual = actual.next;
            }
            actual.next = proceso;
        }
        this.size++;
    }
    //Remover Proceso
    removerProceso(pos)
    {
        let actual = this.head;
        let previo;
        let contador = 0;
        //Remover Primero
        if(pos===0)
        {
            this.head = actual.siguiente;
        }
        else
        {
            while(contador < pos)
            {
                contador++;
                previo = actual;
                actual = actual.siguiente;
            }
            previo.siguiente = actual.siguiente;
        }
        this.size--;
        
    }
    //borrarLista
    borrarLista(){
        this.head = null;
    }
        
    //Imprimir Lista
    imprimirLista()
    {
        let actual = this.head;
        while(actual)
        {
            console.log('proceso:', actual.nro);
            console.log('rafaga:', actual.rafaga);
            actual = actual.siguiente;
        }
    }
   procesosCola1()
    {
        let act = this.head;
        while(act)
        {
            if(act.rafaga > Q1)
            {
                act.rafaga = act.rafaga - Q1;
                p++;
            }
            else
            {
               removerProceso(p);
            }
            act = act.siguiente;
        }
    }
    procesosCola2()
    {
        let act2 = this.head;
        while(act2)
        {
            if(act2.rafaga > Q2)
            {
                act2.rafaga = act2.rafaga - Q2;
                p++;
            }
            else
            {
                removerProceso(p);
            }
        }
    }
}
var Q1 = 4;
var Q2 = 8;
const l1 = new LinkedList();
const l2 = new LinkedList();

l1.procesosCola1();
l2.procesosCola2();
l1.imprimirLista();