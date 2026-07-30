import mongoose from "mongoose";

// Multer needs a product ID to build the per-product upload folder, but
// normally MongoDB only assigns an _id when the document is created —
// which happens *after* the upload. So we generate the ObjectId here,
// attach it to req, and the controller uses this same ID when calling
// Product.create({ _id: req.productId, ... }) so the folder name and
// the document's real _id always match.
const assignProductId = (req, res, next) => {
    req.productId = new mongoose.Types.ObjectId();
    next();
};

export default assignProductId;