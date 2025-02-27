const Model_Transmisi = require('../models/Model_Transmisi')

module.exports.getAllTransmisi = async(req,res,next) => {
    let rows = await Model_Transmisi.getAll();
    return res.status(200).json({
        status: true,
        message: 'Data Transmisi',
        data: rows
    })
}

module.exports.InputDataTransmisi = async(req,res,next)=>{
    try {
        const {nama_transmisi} = req.body;
        const Data={
            nama_transmisi
        }
        await Model_Transmisi.Store(Data)
        return res.status(200).json({
            status: true,
            message: "Data Success Added!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: true,
            message: "Data Failed Added!"
        })
    }
}

module.exports.UpdateDataTransmisi = async(req,res,next)=>{
    try {
        let id = req.params.id;
        const {nama_transmisi} = req.body;
        const Data={
            nama_transmisi
        }
        await Model_Transmisi.Update(id, Data);
        return res.status(201).json({
            status: true,
            message: "Data Success Update!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: true,
            message: "Data Failed Update!"
        })
    }
}

module.exports.DeleteDataTransmisi = async(req,res,next)=>{
    try {
        let id = req.params.id;
        if(!id){
            return res.status(404).json({
                status: true,
                message: "Gak ada ID mas"
            })
        }
        await Model_Transmisi.Delete(id);
        return res.status(201).json({
            status: true,
            message: "Data Success Delete!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: true,
            message: "Data Failed Delete!"
        })
    }
}