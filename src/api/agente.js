const queries = require('./queries')

module.exports = app => { 
    const { existsOrError } = app.src.api.validation

    const save = (req, res) => {
        const agente = { ...req.body }
        if(req.params.id) {
            agente.id = req.params.id
        }

        try {
            existsOrError(agente.id, 'Código não informado')
 //           existsOrError(agente.TECLD_002, 'Código do Conjunto Elétrico não informado')
 //           existsOrError(agente.TECLD_003, 'Mês não informado')
 //           existsOrError(agente.TECLD_004, 'Ano n"ao informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(agente.id) {
            app.db('agente')
                .update(agente)
                .where({ id: agente.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('agente')
                .insert(agente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('agente')
                .where(
                    { id: req.params.id }
                ).del()
            
            try {
                existsOrError(rowsDeleted, 'Registro não encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }
    
    const get = (req, res) => {
        app.db('agente')
            .select('id', 'nome_agente', 'formato_arquivo', 'intervalo_execucao')
            .then(agente => res.json(agente))
            .catch(err => res.status(500).send(err))
    }


    const getById = (req, res) => {
        app.db('agente')
            .where(
                { id: req.params.id }
            )
            .first()
            .then(agente => {
                agente.content = agente.content.toString()
                return res.json(agente)
            })
            .catch(err => res.status(500).send(err))            
    }   
    return { save, remove, get, getById }
}