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
}