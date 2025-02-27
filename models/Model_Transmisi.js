const connect = require('../config/database');

class Model_Transmisi{
    static async getAll() {
        return new Promise((resolve, reject) =>{
            connect.query('SELECT * FROM transmisi order by id_transmisi desc', (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows)
                }
            })
        })
    }
    static async Store(Data){
        return new Promise((resolve, reject)=>{
            connect.query('INSERT INTO transmisi SET ?',[Data],(err,rows)=>{
                if(err){
                    reject(err)
                } else{
                    resolve(rows)
                }
            })
        })
    }
    static async getId(Id){
        return new Promise((resolve, reject)=>{
            connect.query('SELECT * FROM transmisi WHERE id_transmisi = '+Id,(err,rows)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    static async Update(Id, Data){
        return new Promise((resolve, reject)=>{
            connect.query('UPDATE transmisi SET ? WHERE id_transmisi = '+Id, Data,(err,rows)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(err)
                }
            })
        })
    }
    static async Delete(Id){
        return new Promise((resolve, reject)=>{
            connect.query('DELETE FROM transmisi WHERE id_transmisi = '+Id,(err,rows)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = Model_Transmisi;