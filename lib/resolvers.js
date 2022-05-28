// Comenzamos traendo el modelo de datos
const Article = require("../models/article")
const Mensaje = require("../models/mensaje")

// Exportamos las funciones que resolverá las peticiones
module.exports = {
    // Esta función es para los querys
    articles: async() => {
        try {
            // creamos una constante que mediante find me trae todo el arreglo de registros
            const articlesFetched = await Article.find()
                // Hacemos un map al arreglo y creamos otro arreglo pero con los datos que queremos mostrar
            return articlesFetched.map(article => {
                return {
                    ...article._doc,
                    _id: article.id,
                    createdAt: new Date(article._doc.createdAt).toISOString(),
                }

            })
        } catch (error) {
            throw error
        }
    },

    // Esta otra función es para el mutation
    createArticle: async args => {
        try {
            // Creamos un objeto a partir de los args que son los que mandamos
            const { title, body } = args.article
                // Creamos el objeto article con el objeto anterior
            const article = new Article({
                title,
                body,
            })
            console.log(article);
            // Hacemos un await guardando el articulo creado con save
            const newArticle = await article.save()
                // Retornamos un objeto con el resultado del await y el id
            return {...newArticle._doc, _id: newArticle.id }
        } catch (error) {
            throw error
        }
    },
    // Esta otra función es para el mutation
    updateArticle: async args => {
        try {
            // Creamos un objeto a partir de los args que son los que mandamos
            const { title, body } = args.article
            var query = { '_id': args.id };


            // Creamos el objeto article con el objeto anterior

            // Hacemos un await guardando el articulo creado con save
            const updatedArticle = await Article.findOneAndUpdate(query, { title: title, body: body }, { upsert: true });
            // Retornamos un objeto con el resultado del await y el id
            return {...updatedArticle._doc, _id: updatedArticle.id }
        } catch (error) {
            throw error
        }
    },

    deleteArticle: args => {
        var query = { '_id': args.id };
        Article.deleteOne(query).then(function() {
            console.log("Data deleted"); // Success
        }).catch(function(error) {
            console.log(error); // Failure
        });
        const mensajes = new Mensaje({
            title: "Se ejecuto la operacion",
        })
        return mensajes;
    }

}