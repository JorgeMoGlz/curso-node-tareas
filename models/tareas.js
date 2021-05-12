/**
 * _listado:
 * { uuid-1234-1234: id:12, desc:asdf, completadoEn: 9877 }
 * { uuid-1234-1234: id:12, desc:asdf, completadoEn: 9877 }
 * { uuid-1234-1234: id:12, desc:asdf, completadoEn: 9877 }
 */

const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });


        return listado;

    };

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if(this._listado[id]) {
            delete this._listado[id];

        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i+1}`.green;
            const {desc, completadoEn} = tarea;

            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`)
        });
        console.log();
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;

        this.listadoArr.forEach( (tarea) => {
            
            const {desc, completadoEn} = tarea;

            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            if(completadoEn) {
                // Mostrar completadas
                if(completadas) {
                    contador+=1;
                    console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                // Mostrar pendientes
                if(!completadas) {
                    contador+=1;
                    console.log(`${(contador+'.').green} ${desc} :: ${estado}`);
                }
            }
        });
        
        
        // const comp = [];
        // const pend = [];

        // this.listadoArr.forEach((tarea, i) => {
        //     const {desc, completadoEn} = tarea;

        //     (completadoEn)
        //         ? comp.push(`${i} ${desc} :: ${completadoEn}`)
        //         : pend.push(`${i} ${desc} :: ${completadoEn}`);
        // })

        // if(completadas) {
        //     comp.forEach(c => {
        //         console.log(c);
        //     })
        // } else {
        //     pend.forEach(p => {
        //         console.log(p);
        //     })
        // }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];

            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;