const express = require('express');
const router = express.Router();
const { getMyCertificates, verifyCertificate } = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');

router.get('/mine', protect, getMyCertificates);
router.get('/verify/:certificateId', verifyCertificate); // public, no auth - for QR/link verification

module.exports = router;
