import axios from 'axios'

const defaultAxuosConf = {
  timeout: 4000
}
const _request = (param = {}, fn = () => {}) => {
  return axios({ ...defaultAxuosConf, ...param })
    .then(res => {
      const { success, data, err, code } = res.data
      if (code === 401) {
        window.location.href = '/'
        return
      }
      if (success) {
        fn(false)
        return data
      }
      throw err
    })
    .catch(err => {
      fn(false)
      this.$message.error(String(err || '网络错误'))
    })
}
export default param => {
  const type = typeof param
  if (type === 'function') {
    param(true)
    return obj => _request(obj, param)
  } else if (type === 'object' && type !== null) {
    return _request(param)
  }
}
