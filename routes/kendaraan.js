const express = require('express');
const router = express.Router();
const Kendaraan = require('../controllers/kendaraan');

router.get('/', Kendaraan.getDataKendaraan)

router.get('/:id', Kendaraan.getDataIDKendaraan)

router.post('/store', Kendaraan.InputDataKendaraan);

router.patch('/update/(:id)', Kendaraan.UpdateDataKendaraan)

router.delete('/delete/(:id)', Kendaraan.DeleteDataKendaraan)

module.exports = router;