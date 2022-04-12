const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

 router.post('/register', userCtrl.register)

 router.post('/login', userCtrl.login)

 router.post('/refreshToken', userCtrl.getAccessToken)

 router.get('/info', auth, userCtrl.getuserInfo)

 router.get('/logout', userCtrl.logout)

 router.get('/task', auth, userCtrl.getTask)

 router.post('/create', auth, userCtrl.addTask)

 router.patch('/update/:id', auth, userCtrl.updateTask)

 router.delete('/delete/:id', auth, userCtrl.deleteTask)

 router.get('/task/:id', auth, userCtrl.getSingleTask)

 router.patch('/status/:id', auth, userCtrl.statusUpdate)
 
 module.exports = router