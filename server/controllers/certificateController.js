const Certificate = require('../models/Certificate');

const getMyCertificates = async (req, res, next) => {
  try {
    const certs = await Certificate.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) { next(err); }
};

// @route GET /api/certificates/verify/:certificateId  (public - no auth required)
const verifyCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.certificateId });
    if (!cert) return res.status(404).json({ message: 'Certificate not found', verified: false });
    res.json({ verified: true, certificate: cert });
  } catch (err) { next(err); }
};

module.exports = { getMyCertificates, verifyCertificate };
