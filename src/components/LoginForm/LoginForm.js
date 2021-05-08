import React from 'react';
import './LoginForm.css'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in</h2>

      <form onSubmit={handleSubmit}>
        <div className='loginform-wrapper'>
          User name
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='loginform-wrapper'>
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm