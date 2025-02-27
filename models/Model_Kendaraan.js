const connect = require('../config/database');

class Model_kendaraan {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM kendaraan k LEFT JOIN transmisi t ON t.id_transmisi = k.id_transmisi ORDER BY k.no_pol DESC',(err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connect.query(
                'INSERT INTO kendaraan SET ?',Data,(err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static async getId(Id) {
        return new Promise((resolve, reject) => {
            connect.query(
                'SELECT * FROM kendaraan k LEFT JOIN transmisi t ON t.id_transmisi = k.id_transmisi WHERE k.no_pol = ?',[Id], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static async Update(Id, Data) {
        return new Promise((resolve, reject) => {
            connect.query(
                'UPDATE kendaraan SET ? WHERE no_pol = ?',[Data, Id],(err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static async Delete(Id) {
        return new Promise((resolve, reject) => {
            connect.query(
                'DELETE FROM kendaraan WHERE no_pol = ?',[Id],(err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }
}

module.exports = Model_kendaraan;