import server from './server'
import { env } from './environment'
const port = env.SERVER_PORT
server.listen( port , () =>{
    console.log(`Server is listening on port ${port}`);
    
})