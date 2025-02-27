const Model_Kendaraan = require('../models/Model_Kendaraan');
const fs = require('fs');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images')
    },
    filename: (req, file, cb)=>{
        console.log(file)
        cb(null, Date.now()+path.extname(file.originalname))
    }
})
const filefilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
    } else {
        return cb(new Error('Only image files are allowed'))
    }
};
const limits = {fileSize: 1 * 1024 * 1024}
const upload = multer({storage: storage, limits, fileFilter: filefilter})


module.exports.getDataKendaraan = async(req,res,next)=>{
    try {
        let rows = await Model_Kendaraan.getAll();
        return res.status(200).json({
            status : true,
            message: 'Get Data Kendaraan!',
            data:rows
        })
    } catch (error) {
        console.log(error)
        console.log('Terjadi Error Pada Function!')
    }
}

module.exports.getDataIDKendaraan = async(req,res)=>{
    try {
        let id = req.params.id;
        let rows = await Model_Kendaraan.getId(id);
        return res.status(200).json({
            status: true,
            message: 'Get Data Based ID!',
            data:rows
        })
    } catch (error) {
        console.log(error)
        console.log('Terjadi Error Pada Function!')
    }    
}

module.exports.InputDataKendaraan = [
    upload.single('gambar_kendaraan'),
    async(req,res)=>{
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: false,
                    message: 'File is required!'
                });
            }
            let {no_pol, nama_kendaraan, id_transmisi} = req.body;
            let Data= {
                no_pol,
                nama_kendaraan,
                gambar_kendaraan: req.file.filename,
                id_transmisi
            }
            await Model_Kendaraan.Store(Data)
            return res.status(200).json({
                status: true,
                message: 'Input Data Successfuly!'
            })
        } catch (error) {
            console.log(error)
            console.log('Terjadi Error Pada Function!')
        }    
    }
]

module.exports.UpdateDataKendaraan = [
    upload.single('gambar_kendaraan'), 
    async(req,res)=>{
        try {
            let id = req.params.id;
            console.log(req.params.id)
            let {no_pol, nama_kendaraan, id_transmisi} = req.body;
            let gambar = req.file ? req.file.filename : null;
            let rows = await Model_Kendaraan.getId(id);
            if (!rows.length) {
                return res.status(404).json({
                    status: false,
                    message: 'Kendaraan tidak ditemukan!'
                });
            }
            const fileold = rows[0].gambar_kendaraan;
            if(gambar && fileold){
                const pathFile = path.join(__dirname, '../public/images/', fileold);
                if (fs.existsSync(pathFile)) {
                    fs.unlinkSync(pathFile);
                } 
            }
            let gambar_kendaraan = gambar || fileold;
            let Data = {
                no_pol, 
                nama_kendaraan,
                gambar_kendaraan,
                id_transmisi
            }
            await Model_Kendaraan.Update(id, Data);
            return res.status(200).json({
                status: true,
                message: 'Edit Data Successfuly!'
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                message: 'Server Error!',
                error: error.message
            });
        }    
    }
]

module.exports.DeleteDataKendaraan = async(req,res)=>{
    try {
        let id = req.params.id;
        console.log(id)
        let rows = await Model_Kendaraan.getId(id);
        const fileold = rows[0].gambar_kendaraan;
        if(fileold){
            const pathFile = path.join(__dirname, '../public/images/', fileold);
            fs.unlinkSync(pathFile);
        }
        await Model_Kendaraan.Delete(id)
        return res.status(200).json({
            status: true,
            message: 'Delete Data Successfuly!'
        })
    } catch (error) {
        console.log(error)
        console.log('Terjadi Error Pada Function!')
    }    
}