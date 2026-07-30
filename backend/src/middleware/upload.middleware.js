import multer from "multer";
import path from "path";
import fs from "fs";

// Storage configuration — files land in public/uploads/products/<productId>/
// req.productId must already be set (see assignProductId.middleware.js),
// which must run BEFORE this middleware in the route chain.
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        const productId = req.productId || req.params.id;

        if (!productId) {
            return cb(
                new Error(
                    "No product id available — assignProductId middleware must run before upload on create, and :id must be present in the route on update"
                )
            );
        }

        const dir = path.join(
            "public/uploads/products",
            productId.toString()
        );

        // Multer does NOT create folders automatically — without this,
        // uploads to a new product's folder fail silently.
        fs.mkdirSync(dir, { recursive: true });

        cb(null, dir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        const prefix = file.fieldname === "video" ? "video" : "img";

        cb(null, `${prefix}_${uniqueName}${path.extname(file.originalname)}`);
    },
});

// Different allowed types depending on which form field the file came in on.
const IMAGE_TYPES = /jpeg|jpg|png|webp/;
const VIDEO_TYPES = /mp4|mov|webm/;

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (file.fieldname === "images") {
        const isValidExtension = IMAGE_TYPES.test(ext);
        const isValidMime = IMAGE_TYPES.test(file.mimetype);

        if (isValidExtension && isValidMime) {
            return cb(null, true);
        }

        return cb(new Error("Only jpg, jpeg, png and webp images are allowed."));
    }

    if (file.fieldname === "video") {
        const isValidExtension = VIDEO_TYPES.test(ext);
        const isValidMime = /mp4|quicktime|webm/.test(file.mimetype);

        if (isValidExtension && isValidMime) {
            return cb(null, true);
        }

        return cb(new Error("Only mp4, mov and webm videos are allowed."));
    }

    return cb(new Error(`Unexpected field: ${file.fieldname}`));
};

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB — raised from 5 MB since this now covers video too
    },
});

export default upload;