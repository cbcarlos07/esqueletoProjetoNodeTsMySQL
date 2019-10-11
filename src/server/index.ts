import * as restify from 'restify'
import routes from '../routes'
const server = restify.createServer()

routes(server)

export default server