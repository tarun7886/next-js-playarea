const OPTIONS = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
}
const PREFIX = '/api'

const joinUrl = (url = "") => url.indexOf('://') > -1 ? url : PREFIX + url

const myFetch = (url, method, data, options = {}) => {
  let joinedUrl = joinUrl(url)
  return fetch(joinedUrl, {
    ...OPTIONS,
    ...options,
    method,
    body: JSON.stringify(data)
  }).then(res => res.json()).catch(err => {
    if (err.message === "The user aborted a request.") {
      throw err
    }
    return {error: true}
  })
}

const API = () => {
  return {
    get: (url, data, options) => myFetch(url, "GET", data, options),
    post: (url, data, options) => myFetch(url, "POST", data, options),
    put: (url, data, options) => myFetch(url, "PUT", data, options),
    delete: (url, data, options) => myFetch(url, "DELETE", data, options),
  }
}

export default API()