import initial from './initial.route'
import produtoRoute from './produto.route'
const routes = server =>{
    initial(server)
    produtoRoute(server)
}
export default routes