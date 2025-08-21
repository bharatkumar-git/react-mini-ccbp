import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [showErrMsg, setShowErrMsg] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const loginFormOnSubmitHandler = async event => {
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      setShowErrMsg(false)
      Cookies.set('jwt_token', data.jwt_token, {expires: 10})
      const {history} = props
      history.replace('/')
    } else {
      setShowErrMsg(true)
      setErrMsg(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token') !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-main-box">
      <form onSubmit={loginFormOnSubmitHandler} className="login-secondary-box">
        <h1 className="login-mood-tracker-heading">Daily Mood Tracker</h1>
        <div className="login-username-input-box">
          <label className="login-username-label-text" htmlFor="username">
            USERNAME
          </label>
          <input
            className="login-username-input-field"
            id="username"
            placeholder="Enter Your Username"
            onChange={event => {
              setUsername(event.target.value)
            }}
            value={username}
          />
        </div>
        <div className="login-username-input-box">
          <label className="login-username-label-text" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="login-username-input-field"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={event => {
              setPassword(event.target.value)
            }}
            value={password}
          />
        </div>
        <div className="login-checkbox-box">
          <input
            className="login-checkbox-field"
            id="checkbox"
            type="checkbox"
            onChange={() => {
              setShowPassword(prev => !prev)
            }}
          />
          <label className="login-checkbox-label-text" htmlFor="checkbox">
            Show Password
          </label>
        </div>
        <button className="login-login-button" type="submit">
          Login
        </button>
        {showErrMsg ? <p className="login-error-msg-text">{errMsg}</p> : ''}
      </form>
    </div>
  )
}
export default Login
