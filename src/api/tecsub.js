const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.src.api.validation

    const save = (req, res) => {
        const indger_tec_sub = { ...req.body }
        if(req.params.id) {
            indger_tec_sub.id = req.params.id
        }

        try {
            existsOrError(indger_tec_sub.TECSUB_001, 'Código da Distribuidora não informado')
 //           existsOrError(indger_tec_sub.TECSUB_002, 'Código do Conjunto Elétrico não informado')
 //           existsOrError(indger_tec_sub.TECSUB_003, 'Mês não informado')
 //           existsOrError(indger_tec_sub.TECSUB_004, 'Ano n"ao informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(indger_tec_sub.id) {
            app.db('indger_tec_sub')
                .update(indger_tec_sub)
                .where({ id: indger_tec_sub.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('indger_tec_sub')
                .insert(indger_tec_sub)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('indger_tec_sub')
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

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('indger_tec_sub').count('id').first()
        const count = parseInt(result.count)
        app.db('indger_tec_sub')
            .select('id','TECSUB_001','TECSUB_002','TECSUB_003','TECSUB_004','TECSUB_005','TECSUB_006','TECSUB_007','TECSUB_008','TECSUB_009','TECSUB_010','TECSUB_011','TECSUB_012','TECSUB_013','TECSUB_014', 'TECSUB_015', 'TECSUB_016')
            .orderBy('id', 'desc')
            .then(indger_tec_sub => res.json({ data: indger_tec_sub, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('indger_tec_sub')
            .where(
                { id: req.params.id }
            )
            .first()
            .then(indger_tec_sub => {
                indger_tec_sub.content = indger_tec_sub.content.toString()
                return res.json(indger_tec_sub)
            })
            .catch(err => res.status(500).send(err))            
    }   
    return { save, remove, get, getById }
}