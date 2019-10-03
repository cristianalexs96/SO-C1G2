function WorstFit()
    { 
         var bloques = [100, 500, 200, 300, 600]; 
         var procesos = [212, 417, 100, 300]; 
         var m = bloques.length; 
         var n = procesos.length; 
           
         wf(bloques, m, procesos, n); 
    } 

function wf(bloques,m,procesos,n) 
    { 
        var asignacion = new Array(n); 
        var fragmentacion = 0;
        document.write("BLOQUE DE MEMORIA:" +"\t" + bloques);
        document.write("<br><br> PROCESOS:" + "\t" + procesos);
        // Initially no block is assigned to any process 
        for (i = 0; i < asignacion.length; i++) 
            asignacion[i] = -1; 
       
        // pick each process and find suitable blocks 
        // according to its size ad assign to it 
        for (i=0; i<n; i++) 
        { 
            // Find the best fit block for current process 
            var aux = -1; 
            for (j=0; j<m; j++) 
            {   
                if (bloques[j] >= procesos[i]) 
                {   
                    fragmentacion = bloques[j]
                    if (aux == -1) 
                        aux = j; 
                    else if (bloques[aux] < bloques[j]) 
                        aux = j; 
                } 
            } 
       
            // If we could find a block for current process 
            if (aux != -1) 
            { 
                // allocate block j to p[i] process 
                asignacion[i] = aux; 
       
                // Reduce available memory in this block. 
                bloques[aux] -= procesos[i]; 
                fragmentacion -= procesos[i]
                document.write("<br> Porcentaje fragmentacion:" + fragmentacion);
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
   