const moment = require('moment')

module.exports = app => {
    const pegaTarefa = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('tarefas')
            .where({ userId: req.user.id })
            .where('dataEstimada', '<=', date)
            .orderBy('dataEstimada')
            .then(tarefa => res.json(tarefa))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id

        app.db('tarefas')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tarefas')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(linhasDel => {
                if (linhasDel > 0) {
                    res.status(204).send()
                } else{
                    const msg = `A tarefa ${req.params.id} não foi encontrada`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }
    const atualizaTarefa = (req, res, dataConclucao) => {
        app.db('tarefas')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ dataConclucao })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const alteraTarefa = (req, res) => {
        app.db('tarefas')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(tarefa => {
                if (!tarefa) {
                    const msg = `Tarefa com id ${req.params.id} não encontrada`
                    return res.status(400).send(msg)
                }

                const dataConclucao = tarefa.dataConclucao ? null : new Date()
                atualizaTarefa(req, res, dataConclucao)
            })
            .catch(err => res.status(400).json(err))
    }

    return { pegaTarefa, save, remove, alteraTarefa }
}