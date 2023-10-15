const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.src.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if(req.params.id) {
            article.id = req.params.id
            articleid = req.params.id

        } else {
            articleid = -1
        }

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }
        let sql = article.content   
 
        let listarPar =function f(sql) {
            if (sql.indexOf(':') > -1) {
                sql = sql.substring(sql.indexOf(':'))
                console.log(sql)
                if (sql.indexOf(' ') > 0){
                    var parBind = sql.substring(1, sql.indexOf(' '))
                } else{
                    var parBind = sql.substring(1, sql.indexOf('<'))                    
                }                

                console.log(parBind, article.id )

                app.db('parametros')
                    .select()
                    .where('PARAMETRO', parBind)
                    .where('articleid', articleid )
                    .then(function(rows) {
                    if (rows.length===0) {
                        // no matching records found
                        console.log('Inserindo o parametro.')
                        app.db('parametros')
                            .insert({'NOME': parBind,'PARAMETRO': parBind, 'articleid' : article.id
                        })
                            .catch(function(ex) {
                            // you can find errors here.
                                console.log('Erro ao inserir o parametro.' || ex)
                            })

                    } else {
                        // return or throw - duplicate name found
                        console.log('Existe paraemtro com esse nome para a consulta')
                    }
                })
                    .catch(function(ex) {
                    // you can find errors here.
                    console.log('Erro ao consulta o parametro.')
                })
                    

                if (sql.indexOf(' ') > 0){
                    sql = sql.substring(sql.indexOf(' '))
                } else{
                    sql = sql.substring(sql.indexOf('<'))
                }
                console.log(sql)
                console.log(sql.indexOf(':')) 
                if (sql.indexOf(':') > -1){
                    listarPar(sql)
                }
            }
        }
   
 
        if(article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
// FUNÇÃO QUE INSERRE PARAMETROS PARA A CONSULTA        
            listarPar(sql)
                                

        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
//            listarPar(sql)
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)            
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))            
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({a: 'articles', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')            
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
        }

    return { save, remove, get, getById, getByCategory }
}