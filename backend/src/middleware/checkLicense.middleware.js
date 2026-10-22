import asyncHandler from "../utils/asyncHandler.js";
import { evaluateLicense } from "../utils/licenseService.js";

/*
 * Single gate for all protected routes. All policy lives in
 * utils/licenseService.js. Denials keep the existing response shape
 * ({ success, statusCode, message }) and add a machine-readable `code`
 * so the frontend can show a proper renewal / trial-ended screen.
 */
const checkLicense = asyncHandler(async (req, res, next) => {
    const status = await evaluateLicense({ touch: true });

    if (!status.allowed) {
        return res.status(403).json({
            success: false,
            statusCode: 403,
            message: status.message,
            code: status.code,
            validUntil: status.validUntil ?? null,
        });
    }

    req.licenseStatus = {
        activated: status.activated,
        validUntil: status.validUntil,
        trialDaysLeft: status.trialDaysLeft,
        state: status.state,
    };

    return next();
});

export default checkLicense;