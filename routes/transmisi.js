const express = require('express')
const router = express.Router();
const Transmisi = require('../controllers/transmisi');

router.get('/', Transmisi.getAllTransmisi)

router.post('/store', Transmisi.InputDataTransmisi)

router.patch('/update/:id', Transmisi.UpdateDataTransmisi)

router.delete('/delete/:id', Transmisi.DeleteDataTransmisi)

module.exports = router;