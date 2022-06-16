const Knex = require('knex');



const knex = Knex({
    client: 'sqlite3',
    connection: {
        filename: './db/mensajes.db'
    },
    useNullAsDefault: true
});

class Mensajes{
    constructor(){
        (async function(){
            await knex.schema.dropTableIfExists('mensajes');
            await knex.schema.createTable('mensajes', tbl=> {
                tbl.increments('id');
                tbl.string('fecha');
                tbl.string('mensaje');
                tbl.string('usuario');
            }).then( () =>{
                console.log('Tabla creada.')
            }).catch( (err) => {console.log(err)});
        })();
    }

    async guardar_mensajes(mensaje){
        await knex('mensajes').insert(mensaje);
    }
    async cargar_mensajes(){
        return await knex.from('mensajes').select('*');
    }
}



module.exports = {mensajes: Mensajes};

