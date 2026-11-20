const jwt = require('jsonwebtoken');

// Verify Tenant & Role Middleware
const verifyToken = (requiredRoles = []) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
            req.user = decoded; // { id, tenant_id, role, subscription_tier }
            
            if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
                return res.status(403).json({ error: 'Access forbidden: Insufficient permissions.' });
            }
            next();
        } catch (ex) {
            res.status(400).json({ error: 'Invalid token.' });
        }
    };
};

// Subscription Feature Guard Middleware
const checkFeatureLimit = (featureName) => {
    return (req, res, next) => {
        const tier = req.user.subscription_tier || 'starter'; 
        
        if (featureName === 'multi_branch' && tier !== 'pro') {
            return res.status(403).json({ error: 'Upgrade to Pro Plan to access Multi-Branch features.' });
        }
        if (featureName === 'qr_attendance' && tier === 'starter') {
            return res.status(403).json({ error: 'QR Attendance is locked on Starter Plan. Please upgrade to Growth.' });
        }
        next();
    };
};

module.exports = { verifyToken, checkFeatureLimit };