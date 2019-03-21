const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 3
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
  username: {
    unique: true,
    type: String
  },
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: String,
  lockUntil: Number,
  loginAttemps: {
    type: Number,
    default: 0,
    required: true
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})
// 配置虚拟字段,判断是否锁定用户
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.new())
})

userSchema.pre('save', function(next) {
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)
      this.password = hash
      next()
    })
  })
  next()
})

userSchema.methods = {
  comparePassword: (_passwrod, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_passwrod, password, (err, isMatch) => {
        if (err) reject(err)
        resolve(isMatch)
      })
    })
  },
  incLoginAttempts: user => {
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update(
          {
            $set: {
              loginAttemps: 1
            },
            $unset: {
              lockUntil: 1
            }
          },
          err => {
            if (err) reject(err)
            else resolve(true)
          }
        )
      } else {
        let updates = {
          $inc: {
            loginAttemps: 1
          }
        }
      }
      if (this.loginAttemps + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = {
          lockUntil: Date.now() + LOCK_TIME
        }
      }
      this.update(updates, err => {
        if (err) reject(err)
        else resolve(true)
      })
    })
  }
}

mongoose.model('User', userSchema)
