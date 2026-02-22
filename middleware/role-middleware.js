
function roleMiddleware(roles) {
    return function(req, resp, next) {
        try {
            let user = req.headers['user'];
            let role = '';
            if(user){
                 role = user.role;
            }
            if(req.url.includes('/register')&& req.method === 'POST') {
                role = req.body.role;
            }
            const hasRole = roles.includes(role);
            console.log('User role:', role , 'Required roles:', roles, 'Has role:', hasRole);
            if (!hasRole) {
                return resp.status(403).json({ message: 'You do not access to perform this operation!!' });
            }
            next()
        } catch (error) {
            resp.status(500).json({ message: 'Server error' });
        }
    }

}


module.exports = roleMiddleware;