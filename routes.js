const express = require('express');
const router = express.Router();
const Medicine = require("./schemas/medicine");

// create one
router.post('/', async (req, res, next) => {
    try {
        const newMedicine = req.body;

        await Medicine.create({ 
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        });

        res.status(201).json({ message: "success", medicine: req.body });
    } catch (err) {
        res.status(500).json({ message: "fail" });
    }
});

// get everything
router.get('/', async (req, res, next) => {
    try {
        const medicines = await Medicine.find({ });

        res.status(201).json({ message: "success", medicines: medicines });

    } catch(err) {
        res.status(500).json({ message: "fail" })
    }   
});

// get one with id
router.get('/:medicineId', async (req, res, next) => {
    const { medicineId } = req.params;

    try {
        const medicine = await Medicine.findById({ _id: medicineId });

        res.status(201).json({ message: "success", medicine: medicine });

    } catch(err) {
        res.status(500).json({ message: "fail" })
    }   
});

// modify one
router.put("/:medicineId", async (req, res, next) => {
    const { medicineId } = req.params;
    const { name, description, price } = req.body;

    try {
        await Medicine.updateOne({ _id: medicineId }, {$set: {name, description, price}});

        res.status(201).json({ message: "success" });
        
    } catch (err) {
        res.status(500).json({ message: "fail" });
    }
});

// delete one
router.delete("/:medicineId", async (req, res, next) => {
    const { medicineId } = req.params;

    try {
        await Medicine.findOneAndDelete(({ _id: medicineId }));

        res.status(201).json({ message: "success" });
        
    } catch (err) {
        res.status(500).json({ message: "fail" });
    }
});


module.exports = router;