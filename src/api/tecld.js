const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.src.api.validation

    const save = (req, res) => {
        const indger_tec_ld = { ...req.body }
        if(req.params.id) {
            indger_tec_ld.id = req.params.id
        }

        try {
            existsOrError(indger_tec_ld.TECLD_001, 'Código da Distribuidora não informado')
 //           existsOrError(indger_tec_ld.TECLD_002, 'Código do Conjunto Elétrico não informado')
 //           existsOrError(indger_tec_ld.TECLD_003, 'Mês não informado')
 //           existsOrError(indger_tec_ld.TECLD_004, 'Ano n"ao informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(indger_tec_ld.id) {
            app.db('indger_tec_ld')
                .update(indger_tec_ld)
                .where({ id: indger_tec_ld.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('indger_tec_ld')
                .insert(indger_tec_ld)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('indger_tec_ld')
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
        const result = await app.db('indger_tec_ld').count('id').first()
        const count = parseInt(result.count)
        app.db('indger_tec_ld')
            .select('id','TECLD_001','TECLD_002','TECLD_003','TECLD_004','TECLD_005','TECLD_006','TECLD_007','TECLD_008','TECLD_009','TECLD_010','TECLD_011','TECLD_012','TECLD_013','TECLD_014')
            .orderBy('id', 'desc')
            .then(indger_tec_ld => res.json({ data: indger_tec_ld, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('indger_tec_ld')
            .where(
                { id: req.params.id }
            )
            .first()
            .then(indger_tec_ld => {
                indger_tec_ld.content = indger_tec_ld.content.toString()
                return res.json(indger_tec_ld)
            })
            .catch(err => res.status(500).send(err))            
    }   
    return { save, remove, get, getById }
}