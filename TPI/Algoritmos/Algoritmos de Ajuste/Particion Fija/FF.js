function FirstFit()
  {     var bloques = [100, 500, 200, 300, 600]; 
        var procesos = [212, 417, 200, 300,100]; 
        var m = bloques.length; 
        var n = procesos.length; 
          
        ff(bloques, m, procesos, n); 
    }

function ff(bloques,m,procesos,n) 
    {
        var asignacion = new Array(n); 
        var fragmentacion = 0;

// Inicialmente no se asigna ningún bloque a ningún proceso 
        document.write("BLOQUE DE MEMORIA:" +"\t" + bloques);
        document.write("<br><br> PROCESOS:" + "\t" + procesos);
        for (i = 0; i < asignacion.length; i++) 
            asignacion[i] = -1; 
      
        for (i = 0; i < n; i++) 
        
        { 
            for (j = 0; j < m; j++) 
            {   

                if (bloques[j] >= procesos[i]) 
                { 
                    // asigna el bloque j al proceso p [i] 
                    asignacion[i] = j; 
                    fragmentacion = bloques[j];
                    // Reduce la memoria disponible en este bloque.
                    bloques[j] -= procesos[i];
                    fragmentacion -= procesos[i]; 
                    document.write("<br><br> Fragmentación externa:" + fragmentacion);
                    document.write("<br> N° Proceso \tTamaño del Proceso \tBloque Asignado");
                    document.write("<br>" + (i+1) + "\t" + procesos[i] + "\t"); 
                    if (asignacion[i] != -1) 
                    document.write(asignacion[i] + 1); 
                    else
                        document.write("<br> No Asignado"); 
                        document.write("<br>");
                    break; 
                } 
            } 
        } 
} 
