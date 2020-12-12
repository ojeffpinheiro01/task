module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/tarefas')
        .all(app.config.passport.authenticate())
        .get(app.api.tarefa.pegaTarefa)
        .post(app.api.tarefa.save)

    app.route('/tarefas/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.tarefa.remove)

    app.route('/tarefas/:id/toggle')
        .all(app.config.passport.authenticate())
        .put(app.api.tarefa.alteraTarefa)
}