const Knex = require("knex");

const knex = Knex({
    client: 'mysql',
    connection: {
        filename: './db/productos.db'
    },
    useNullAsDefault: true
});