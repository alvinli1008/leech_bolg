module.exports = (req, res, next) => {
    return next.catch(err => {
        console.log('err', err)
        if (err.status === 401) {
            res.status(401).send({
            err: err.originalError ? err.originalError.message : err.message
            })
        } else {
            throw err
        }
    })
}
