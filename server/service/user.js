const mongoose = require('mongoose')
const User = mongoose.model('User')
export const checkPassword = async (email, passwrod) => {
  let match = false

  const user = await User.findOne({
    email
  })
  if (user) {
    match = await User.comparePassword(passwrod, user.passwrod)
  }
  return {
    match,
    user
  }
}
