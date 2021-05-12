require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async() => {
    
    let opt = '';
    
    const tareas = new Tareas();
    
    const tareasDB = leerDB();
    
    if(tareasDB) {
        // Establecer tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descriptción: ');
                tareas.crearTarea( desc );

            break;
            case '2':
                // Listar tareas
                tareas.listadoCompleto();
            break;

            case '3':
                // Mostrar tareas completadas
                completadas = true;
                tareas.listarPendientesCompletadas(completadas);
                console.log();
            break;
            case '4':
                completadas = false;
                tareas.listarPendientesCompletadas(completadas);
                console.log();
            break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0') {
                    const ok = await confirmar('Seguro?');
    
                    if(ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }


            break;
        }

        guardarDB(tareas.listadoArr);


        await pausa();

        // console.clear();

    } while (opt !== '0');
};

main();