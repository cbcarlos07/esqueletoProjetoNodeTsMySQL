import * as mysql from 'mysql'
import {env} from '../../environment'
export class Config {
    table: string
    conn: any
    constructor( tabela?: string ){
        this.table = tabela
        this.connection()
    }

    connection(){
        this.conn = mysql.createConnection({
            database: env.DB.DB,
            user: env.DB.USERNAME,
            password: env.DB.PWD,
            host: env.DB.HOST
        })
        return this.conn
    }
    save( obj: any ){
        const insert = new Promise((resolve, reject)=>{
            const queryString = this.mountInsert( obj )
            const data        = this.valuesInsert( obj )      
            this.conn.query(queryString, data, (err, result)=>{
                if( err ){
                    this.errorHandler(err, `Falha ao tentar salvar ${this.table}`, reject)
                    return false
                }
                resolve({result, status: true})
            })
        })
        return insert;         
    }

    update( obj: any ){
        return new Promise((resolve, reject)=>{
            const queryString = this.mountUpdate( obj )
            const data        = this.valuesUpdate( obj )      
            this.conn.query(queryString, data, (err, result)=>{
                if( err ){
                    this.errorHandler(err, `Falha ao tentar atualizar ${this.table}`, reject)
                    return false
                }
                resolve({result, status: true})
            })
        })      
    }

    valuesInsert( obj: any ){
        let insert = []
        for( const prop in obj ){
            insert.push( obj[prop] )
        }
        return insert
    }

    valuesUpdate( obj: any ){
        let update = []
        var keys = Object.keys(obj);
        var first = keys[0];            
        var index = 0
        for(const prop in obj){
            
            if( !(index == 0)  ){
                update.push( obj[prop] )
            }
            index++
        }
        update.push( obj[first] )            
        return update
    }

    mountInsert( obj: any ){
        let insert = `INSERT INTO ${this.table}`
        let values = ''
        let fields = ''
        for (const key in obj) {
            values += '?, '
            fields += `${key}, `
        }
        values = values.substring( 0, values.length - 2 )
        fields = fields.substring( 0, fields.length - 2 )
        insert += `(${fields}) VALUES(${values})`
        return insert
    }

    mountUpdate(obj: any){
        let update = `UPDATE ${this.table} SET `
        let values = ''
        let fields = obj
        var keys = Object.keys(obj);
        var first = keys[0];            
        var index = 0
        for(const prop in fields){
            
            if( !(index == 0)  ){
                values += `${prop} = ?, `
            }
            index++
        }
        values = values.substring(0, values.length -2)
        update += `${values} WHERE ${first} = ?`
        return update
    }

    findById( id: number ){
        return new Promise((resolve, reject)=>{
            const queryString = `SHOW COLUMNS FROM ${this.table};`
            this.conn.query(queryString, (err, result)=>{
                if(err) {
                    reject(err)
                    return false
                }
                const field = result[0].Field
                const select = `SELECT * FROM ${this.table} WHERE ${field} = ?`
                const data = [ id ]
                this.conn.query( select, data, (err, results) =>{
                    if( err ){
                        this.errorHandler(err, `Problema ao tentar buscar em ${this.table}`, reject)
                        return false
                    }
                    resolve(results[0])
                })
            })
        })
    }

    findAll( order: string = '' ){
        return new Promise((resolve, reject)=>{
            const queryString = `SELECT * FROM ${this.table} ${order}`
            this.conn.query(queryString, (err, result)=>{
                if(err) {
                    this.errorHandler(err, `Falha ao tentar buscar ${this.table}`, reject)
                    return false
                }
                resolve(result)
            })
        })
    }

    delete( id: number ){
        const dados = new Promise((resolve, reject)=>{
            const queryString = `SHOW COLUMNS FROM ${this.table};`
            this.conn.query(queryString, (err, result)=>{
                if(err) {
                    reject(err)
                    return false
                }
                const field = result[0].Field
                const select = `DELETE FROM ${this.table} WHERE ${field} = ?`
                const data = [ id ]
                this.conn.query( select, data, (err, results) =>{
                    if( err ){
                        this.errorHandler(err, `Problema ao tentar remover de ${this.table}`, reject)
                        return false
                    }
                    resolve({results, status: true})
                })
            })
        })
        
        const campo = dados
        return campo
    }
    

    private async getFields(  ){
        const dados = new Promise((resolve, reject)=>{
            const queryString = `SHOW COLUMNS FROM ${this.table};`
            this.conn.query(queryString, (err, result)=>{
                if(err) {
                    reject(err)
                    return false
                }
                const campos = []
                result.forEach(element => {                    
                    campos.push(element.Field)                    
                });
                resolve(campos)
            })
        })
        
        const arrCampo = await dados
        const campo = Object.assign({}, arrCampo)
        return campo
    }

    errorHandler(error: any, msg: string, rejectFunction: any){
        console.log('Error: ', error);
        rejectFunction(500, {error: msg, log: error, status: false})        
    }
}