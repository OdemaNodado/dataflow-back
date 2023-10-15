const bcrypt = require('bcrypt-nodejs')
const fs = require('fs');

module.exports = app => {
    const { existsOrError } = app.src.api.validation

    const save = (req, res) => {
     //   console.log('teste antes')          
        const userReqRel = { ...req.body }
        if(req.params.id) userReqRel.id = req.params.id
        //console.log('teste depois')   
 
         try {
            existsOrError(userReqRel.relatorio_nome, 'Nome do relatório não informado')
//            existsOrError(userReqRel.parametros, 'Parametros não informado')
//            existsOrError(userReqRel.FAVORITADO, 'Categoria não informada')
            existsOrError(userReqRel.userId, 'Usuário não informado')
            existsOrError(userReqRel.articleid, 'ID Relatório não informado')
            userReqRel.data_submissao = new Date()
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(userReqRel.id) {
            app.db('usuario_exec_relatorio')
                .update(userReqRel)
                .where({ id: userReqRel.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {

            app.db('usuario_exec_relatorio')
                .insert(userReqRel)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }     
     
    }
    const get = (req, res) => {
        app.db('usuario_exec_relatorio')
            .select("id", "relatorio_nome", "descricao", "parametros", "favoritado", "userId", "articleid", "situacao", "data_submissao", "data_execucao", "data_conclusao", "data_submissao", "nome_arquivo")            
            .where(function() {('_data_execucao', '>', 'CURRENT_DATE - 2')})
            .then(usuario_exec_relatorio => res.json(usuario_exec_relatorio))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('usuario_exec_relatorio')
            .select("id", "relatorio_nome", "descricao", "parametros", "favoritado", "userId", "articleid", "situacao")
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(userReqRel => res.json(userReqRel))
            .catch(err => res.status(500).send(err))
    }
    
    const getByUserId = (req, res) => {
        app.db('usuario_exec_relatorio')
            .select("id", "relatorio_nome", "descricao", "parametros", "favoritado", "userId", "articleid", "situacao")
            .where({ userId: req.params.id })
            .whereNull('deletedAt')
//            .first()
            .then(userReqRel => res.json(userReqRel))
            .catch(err => res.status(500).send(err))
    }
    
    const getByArticleId = (req, res) => {
        app.db('usuario_exec_relatorio')
            .select("id", "relatorio_nome", "descricao", "parametros", "favoritado", "userId", "articleid", "situacao")
            .where({ articleid: req.params.id })
            .whereNull('deletedAt')            
            .then(userReqRel => res.json(userReqRel))
            .catch(err => res.status(500).send(err))
    }

    const downloadByReqId = (req, res) => {
       /*  app.db('usuario_exec_relatorio')
            .select("id", "relatorio_nome", "descricao", "parametros", "favoritado", "userId", "articleid", "situacao")
            .where({ id: req.params.id })
            .whereNull('deletedAt')            
            .then(userReqRel => res.json(userReqRel))
            .catch(err => res.status(500).send(err)) */


        // endpoint for /resume
        app.get("/resume", (req, res) => {
        // express.js
        res.download("./files/SEGUNDA-CONSULTA.xlsx");
        });
            
    }
    
    /* const getByArticleId = (req, res) => {
        app.db('usuario_exec_relatorio')
            .select('id', 'relatorio_nome', 'descricao', 'parametros', 'FAVORITADO', 'userId', 'articleId')
            .where({ articleId: req.params.articleId })
            .first()
            .then(_res => res.json(usuario_exec_relatorio))
            .catch(err => res.status(500).send(err))
    }

    const getByUserId = (req, res) => {
        app.db('usuario_exec_relatorio')
            .select('id', 'relatorio_nome', 'descricao', 'parametros', 'FAVORITADO', 'userId', 'articleId')
            .where({ userId: req.params.userId })
            .first()
            .then(_res => res.json(usuario_exec_relatorio))
            .catch(err => res.status(500).send(err))
    } */
    return { save, getById , getByArticleId, get, getByUserId, downloadByReqId }
}
