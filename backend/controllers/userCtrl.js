const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('../models/taskModel')



const userCtrl = {
    register: async (req, res) => {
        try {

            const { name, email, password } = req.body

            if (!name || !email || !password) {
                return res.status(400).json({msg: 'Please enter all the details'})
            }

            if (!validateEmail(email)) {
                return res.status(400).json({msg: 'Please enter valid email address'})
            }

            if (!validPassword(password)) {
                return res.status(400).json({msg: 'Password must be minimum eight characters, at least one letter, one number and one special character'})
            }
            
            const user = await Users.findOne({email})
            if (user) {
                return res.status(400).json({msg: "This email address is already registered"})
            }
            
            const passwordHash = await bcrypt.hash(password,12)
         console.log(passwordHash)
         const newUser = new Users({
        name, email, password: passwordHash
    })

    await newUser.save()

    res.json({msg: 'Registration Successful!'})



        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async (req, res) => {
   
        try {
        const {email, password} =req.body 

        const user = await Users.findOne({email})
         if (!user) {
        return res.status(400).json({msg: 'This email address is not registered'})
    }
 
 
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({msg: "Incorrect password"})
    }
 
 
    const refreshToken = createRefreshToken({id: user._id})

    res.cookie('refreshToken', refreshToken, {
     httpOnly: true,
     path: "/user/refreshToken",
     message: 7*24*60*60*1000
 
   })

   res.json({msg: 'Login successfull'})

    } catch (err)
    {
        return res.status(500).json({msg: err.message})
    }
    
    
},

     getAccessToken: (req, res) => {

       try {
        rftoken = req.cookies.refreshToken 
        
        if (!rftoken) {
return res.status(400).json({msg: 'Please login'})
        }

        jwt.verify(rftoken, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) {
                return res.status(400).json({msg: "Please login"})

            }
       const accessToken = createAccessToken({id: user.id})
     res.json({accessToken})
         })

         } catch (error) {
           return res.status(400).json({msg: err.message})
           
       }
     
    },

    getuserInfo: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
            
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', {
                path: '/user/refreshToken'
            })

            return res.json({msg: err.message})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    getTask: async (req, res) => {

    
        try {
            const task = await Task.find({user: req.user.id})
         
            res.json(task)
           
            
        } catch (err) {
           return res.status(500).json({msg: err.message}) 
        }
    },

       
    addTask: async (req, res) => {
   try {

    const {title, desc} = req.body
    if(!title || !desc) {
        return res.status(400).json({msg: "Please enter all the details"})
    }
    const newTask = new Task({
        title,
        desc
    })
    newTask.user = req.user.id

    await newTask.save()
    res.json({msg: "Task created"})
    
} catch (err) {
  return res.status(500).json({msg: err.message})
    
}
 },
 updateTask: async (req, res) => {
      try {
         
        const {title, desc, status} = req.body

        await Task.findByIdAndUpdate({_id: req.params.id}, {
            title,
            desc,
            status
        })

       res.json({msg: "Task updated"})


      } catch (err) {
          return res.status(500).json({msg: err.message})
          
      }
  },

  
  deleteTask: async (req, res) => {
      try {
        await Task.findByIdAndDelete(req.params.id) 
        res.json({msg: 'Task deleted'}) 
        

      } catch (err) {
          return res.status(500).json({msg: err.message})
          
      }
  },

  statusUpdate: async (req, res) => {
    try {
      await Task.findByIdAndUpdate({_id: req.params.id}, {
          status: false
      } )
      res.json({msg: 'Status Updated'}) 
      

    } catch (err) {
        return res.status(500).json({msg: err.message})
        
    }
},

  getSingleTask:  async (req, res) => {
      try {
          const task = await Task.findById(req.params.id)
          res.json(task)
          
      } catch (err) {
          return res.status(500).json({msg: err.message})
          
      }
  }

}

updateStatusTask: async (req, res) => {
    try {
       
      const {title, desc, status} = req.body

      await Task.findByIdAndUpdate({_id: req.params.id}, {
          status: false
      })

     res.json({msg: "Task updated"})


    } catch (err) {
        return res.status(500).json({msg: err.message})
        
    }
},
    


    function validateEmail(email) {
    const rs = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return rs.test(email)
    }


    function validPassword(password) {
        const rs = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        return rs.test(password)
    }

   const createAccessToken = (payload) => {
       return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '15m'})
   }
    
   const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: '7d'})
   }



module.exports = userCtrl