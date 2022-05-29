// Comenzamos traendo el modelo de datos
const Job = require("../models/job")
const MessageReturn = require("../models/messageReturn")

// Exportamos las funciones que resolverá las peticiones
module.exports = {
    // Esta función es para los querys
    jobs: async() => {
        try {
            // creamos una constante que mediante find me trae todo el arreglo de registros
            const jobsFetched = await Job.find()
                // Hacemos un map al arreglo y creamos otro arreglo pero con los datos que queremos mostrar
            return jobsFetched.map(job => {
                return {
                    ...job._doc,
                    _id: job.id,
                    createdAt: new Date(job._doc.createdAt).toISOString(),
                }

            })
        } catch (error) {
            throw error
        }
    },

    // Esta otra función es para el mutation
    createJob: async args => {
        try {
            // Creamos un objeto a partir de los args que son los que mandamos
            const { title, companyName, place, emailCompany, phoneCompany, body } = args.job
                // Creamos el objeto article con el objeto anterior
            const job = new Job({
                title,
                companyName,
                place,
                emailCompany,
                phoneCompany,
                body,
            })
            console.log(job);
            // Hacemos un await guardando el articulo creado con save
            const newJob = await job.save()
                // Retornamos un objeto con el resultado del await y el id
            return {...newJob._doc, _id: newJob.id }
        } catch (error) {
            throw error
        }
    },
    // Esta otra función es para el mutation
    updateJob: async args => {
        try {
            // Creamos un objeto a partir de los args que son los que mandamos
            const { title, companyName, place, emailCompany, phoneCompany, body } = args.job
            var query = { '_id': args.id };


            // Creamos el objeto article con el objeto anterior

            // Hacemos un await guardando el articulo creado con save
            const updatedJob = await Job.findOneAndUpdate(query, { title: title, companyName: companyName, place: place, emailCompany: emailCompany, phoneCompany: phoneCompany, body: body }, { upsert: true });
            // Retornamos un objeto con el resultado del await y el id
            return {...updatedJob._doc, _id: updatedJob.id }
        } catch (error) {
            throw error
        }
    },

    deleteJob: args => {
        var query = { '_id': args.id };
        Job.deleteOne(query).then(function() {
            console.log("Data deleted"); // Success
        }).catch(function(error) {
            console.log(error); // Failure
        });
        const mensajeReturn = new MessageReturn({
            title: "Operacion realizada"
        })
        return mensajeReturn;
    }

}