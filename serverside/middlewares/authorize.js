// const authorize = (roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Forbidden. You do not have access to this resource.' });
//         }
//         next();
//     };
// };

// export default authorize;


const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Authorization failed: You do not have the required permissions' });
    }
    next();
};

export default authorize;