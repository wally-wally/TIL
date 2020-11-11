const jwt = require('jsonwebtoken')
const secret = 'token secret';
const expiresIn = 365 * 24 * 3600; // 365 days

const auth = {
  signToken(id) {
    return jwt.sign({ id }, secret, { expiresIn })
  },
  ensureAuth() {
    return (req, res, next) => {
      const { authorization } = req.headers
      if (!authorization) {
        res.status(401)
        throw Error('No Authorization headers')
      }

      try {
        req.user = this.verify(authorization)
      } catch (e) {
        res.status(401)
        throw e
      }

      next()
    }
  },
  verify(token) {
    return jwt.verify(token.replace(/^Bearer\s/, ''), secret)
  }
}

module.exports = auth
