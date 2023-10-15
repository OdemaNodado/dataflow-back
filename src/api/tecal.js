const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.src.api.validation

    const save = (req, res) => {
        const indger_tec_al = { ...req.body }
        if(req.params.id) {
            indger_tec_al.id = req.params.id
        }

        try {
            existsOrError(indger_tec_al.TECAL_001, 'Código da Distribuidora não informado')
 //           existsOrError(indger_tec_al.TECAL_002, 'Código do Conjunto Elétrico não informado')
 //           existsOrError(indger_tec_al.TECAL_003, 'Mês não informado')
 //           existsOrError(indger_tec_al.TECAL_004, 'Ano n"ao informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(indger_tec_al.id) {
            app.db('indger_tec_al')
                .update(indger_tec_al)
                .where({ id: indger_tec_al.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('indger_tec_al')
                .insert(indger_tec_al)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('indger_tec_al')
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
        const result = await app.db('indger_tec_al').count('id').first()
        const count = parseInt(result.count)
        app.db('indger_tec_al')
            .select('id','TECAL_001','TECAL_002','TECAL_003','TECAL_004','TECAL_005','TECAL_006','TECAL_007','TECAL_008','TECAL_009','TECAL_010','TECAL_011','TECAL_012','TECAL_013','TECAL_014')
            .orderBy('id', 'desc')
            .then(indger_tec_al => res.json({ data: indger_tec_al, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('indger_tec_al')
            .where(
                { id: req.params.id }
            )
            .first()
            .then(indger_tec_al => {
                indger_tec_al.content = indger_tec_al.content.toString()
                return res.json(indger_tec_al)
            })
            .catch(err => res.status(500).send(err))            
    }   
    return { save, remove, get, getById }
}