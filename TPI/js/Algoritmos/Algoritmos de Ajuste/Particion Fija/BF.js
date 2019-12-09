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