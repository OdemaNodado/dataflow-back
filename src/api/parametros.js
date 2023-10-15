const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError } = app.src.api.validation

    const save = (req, res) => {
     //   console.log('teste antes')          
        const parametro = { ...req.body }
        if(req.params.id) parametro.id = req.params.id
        //console.log('teste depois')   
        
         try {
            existsOrError(parametro.NOME, 'Nome do parametro não informado')
            existsOrError(parametro.PARAMETRO, 'Parametro não informado')
//            existsOrError(parametro.FAVORITADO, 'Categoria não informada')
//            existsOrError(parametro.userId, 'Usuário não informado')
//            existsOrError(parametro.articleid, 'ID do Artigo não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(parametro.id) {
            app.db('parametros')
                .update(parametro)
                .where({ id: parametro.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('parametros')
                .insert(parametro)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }     
     
    }
    const get = (req, res) => {
        app.db('parametros')
            .select( "id", "NOME", "PARAMETRO", "TIPO", "MASCARA", "articleid")            
            .then(parametros => res.json(parametros))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('parametros')
            .select( "id", "NOME", "PARAMETRO", "TIPO", "MASCARA", "articleid")
            .where({ id: req.params.id })
            .whereNull('deletedAt')            
            .first()
            .then(parametro => res.json(parametro))
            .catch(err => res.status(500).send(err))
    }    
    const getByArticleId = (req, res) => {
        app.db('parametros')
            .select( "id", "NOME", "PARAMETRO", "TIPO", "MASCARA", "articleid")
            .where({ articleid: req.params.id })
            .whereNull('deletedAt')                        
            .then(parametro => res.json(parametro))
            .catch(err => res.status(500).send(err))
    }    
    return { save, getById , getByArticleId, get }
}