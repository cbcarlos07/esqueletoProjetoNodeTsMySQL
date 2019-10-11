const initial = server => {
    server.get( '/', (req, res, next) =>{
        res.send( {msg: 'Bem vindo à página inicial da API'} )
        next()
    })
}

export default initial