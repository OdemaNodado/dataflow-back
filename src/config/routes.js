const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.src.api.user.save)
    app.post('/signin', app.src.api.auth.signin)
    app.post('/validateToken', app.src.api.auth.validateToken) 
    app.route('/users')
        .all(app.src.config.passport.authenticate())
        .post(admin(app.src.api.user.save))
        .get(admin(app.src.api.user.get))

    app.route('/users/:id')
        .all(app.src.config.passport.authenticate())
        .put(admin(app.src.api.user.save))
        .get(admin(app.src.api.user.getById))
        .delete(admin(app.src.api.user.remove)) 

    app.route('/userReqRels/')
        .all(app.src.config.passport.authenticate())
    //    .get(admin(app.src.api.userReqRel.getById))
    //    .post(admin(app.src.api.userReqRel.save))
        .post(app.src.api.userReqRel.save)        

    app.route('/userReqRels')
        .all(app.src.config.passport.authenticate())
    //    .get(admin(app.src.api.userReqRel.getById))
    //    .post(admin(app.src.api.userReqRel.save))
        .get(app.src.api.userReqRel.get)

    app.route('/userReqRels/:id')
        .all(app.src.config.passport.authenticate())
    //    .get(admin(app.src.api.userReqRel.getById))
    //    .post(admin(app.src.api.userReqRel.save))
        .get(app.src.api.userReqRel.getById)
    
    app.route('/userReqRels/:id/articles')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.userReqRel.getByArticleId)     

    app.route('/userReqRels/:id/users')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.userReqRel.getByUserId)  

    app.route('/userReqRels/:id/download')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.userReqRel.downloadByReqId)     
    
    app.route('/files/:name')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.controler.download)       

    app.route('/parametros/')
        .all(app.src.config.passport.authenticate())
    //    .get(admin(app.src.api.userReqRel.getById))
    //    .post(admin(app.src.api.userReqRel.save))
        .post(app.src.api.parametros.save)        

    app.route('/parametros')
        .all(app.src.config.passport.authenticate())
    //    .get(admin(app.src.api.userReqRel.getById))
    //    .post(admin(app.src.api.userReqRel.save))
        .get(app.src.api.parametros.get)

    app.route('/parametros/:id')
        .all(app.src.config.passport.authenticate())
    //    .get(admin(app.src.api.userReqRel.getById))
        .post(admin(app.src.api.parametros.save))
        .get(app.src.api.parametros.getById)
    
    app.route('/parametros/:id/articles')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.parametros.getByArticleId)     

    app.route('/categories')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.api.category.get))
        .post(admin(app.src.api.category.save))

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.category.getTree)

    app.route('/categories/:id')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.category.getById)
        .put(admin(app.src.api.category.save))
        .delete(admin(app.src.api.category.remove))

    app.route('/articles')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.api.article.get))
        .post(admin(app.src.api.article.save))

    app.route('/articles/:id')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.article.getById)
        .put(admin(app.src.api.article.save))
        .delete(admin(app.src.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.article.getByCategory)

    app.route('/stats')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.stat.get)

    app.route('/tecld')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.api.tecld.get))
        .post(admin(app.src.api.tecld.save))  
    
    app.route('/tecld/:id')      
        .all(app.src.config.passport.authenticate())
        .delete(admin(app.src.api.tecld.remove)) 
    
    app.route('/tecsub')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.api.tecsub.get))
        .post(admin(app.src.api.tecsub.save))  
    
    app.route('/tecsub/:id')      
        .all(app.src.config.passport.authenticate())
        .delete(admin(app.src.api.tecsub.remove))  

    app.route('/tecal')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.api.tecal.get))
        .post(admin(app.src.api.tecal.save))  
    
    app.route('/tecal/:id')      
        .all(app.src.config.passport.authenticate())
        .delete(admin(app.src.api.tecal.remove))    

    app.route('/agente')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.api.agente.get))
        .post(admin(app.src.api.agente.save))  

    app.route('/agente/:id')      
        .all(app.src.config.passport.authenticate())
        .delete(admin(app.src.api.agente.remove))   
}