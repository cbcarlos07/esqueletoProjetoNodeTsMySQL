import * as restify from 'restify'
import routes from '../routes'
import { env } from '../environment'
class Server {
    server: any
    port =  env.SERVER_PORT
    constructor(){
        this.server = restify.createServer()
    }

    listen(){
        this.routesConfig()
        this.server.listen( this.port, () =>{
            console.log(`Server is listening on port ${this.port}`);
        })
    }

    routesConfig(){
        routes(this.server)

    }


}



export const server = new Server()