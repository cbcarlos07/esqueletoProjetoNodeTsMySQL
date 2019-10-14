import produtos from "../service/produto"

const prefix = '/api/produto'
const produtoRoute = server => {
    server.post( `${prefix}`, async (req, res, next) =>{
        try {
            res.send( await produtos().save( req.body ) )
        } catch (error) {
            res.send( error )
        }
        next()
    })
}
export default produtoRoute