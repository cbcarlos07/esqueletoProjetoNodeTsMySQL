import { Config } from './config'
const conn = new Config('produtos')
const produtos = () => {
    return {
        save: obj => {
            const save = conn.save( obj )
            return save
        },
        update: obj => {
            const update = conn.update( obj )
            return update
        },
        del: id => {
            const del = conn.delete( id )
            return del
        },
        findId: id =>{
            const find = conn.findById( id )
            return find
        },
        findAll: () =>{
            const all = conn.findAll()
            return all
        }
    }
}

export default produtos
