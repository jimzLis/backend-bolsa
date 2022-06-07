// Traemos las dependencias necesarias
const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose")
const graphqlSchema = require("./schema/index")
const graphqlResolvers = require("./lib/resolvers")
const port = process.env.PORT || 3000
const cors = require('cors');

// Instanciamos Express, necesario en toda aplicación Express
const app = express()
app.use(cors({
    origin: '*'
}));
// Declaramos el endpoint y comos egundo parámetro el esquema y resolver de graphQL
app.use(
        "/graphql",
        graphqlHTTP({
            schema: graphqlSchema,
            rootValue: graphqlResolvers,
            graphiql: true,
        })
    )
    // Este es el uri para la conexion a MongoDB se trae desde Mongo Atlas
    // Usamos process.env para obtener los valores desde Nodemon
const uri = `mongodb+srv://rootMiguelB:Password123@cluster0.1vrpd.mongodb.net/?retryWrites=true&w=majority`
    // Declaramos las opciones para mongoose
const options = { useNewUrlParser: true, useUnifiedTopology: true }

// Usamos mongose para conectarnos al uri con las opciones y entonces escucharlas en el puerto 3000 usando app
mongoose
    .connect(uri, options)
    .then(() => app.listen(port, console.log(`Server running on port ${port}`)))
    .catch(error => {
        throw error
    })