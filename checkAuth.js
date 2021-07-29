function checkAuth(req, res, next) {
    // check if the user exist on session
    if (req.session.username){
        next()
        // if the request is on login page
    } else if (req.path === '/users/login') {
        next()
    // if not, send an error
    } else {
        res.status(401).json({ error: 'not logged in'})
        
    }
    }
    
    module.exports = checkAuth