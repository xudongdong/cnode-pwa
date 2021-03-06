import { fetchAPI } from '../utils'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const SHOW_LOGIN = 'SHOW_LOGIN'
export const HIDE_LOGIN = 'HIDE_LOGIN'
export const INPUT_TOKEN = 'INPUT_TOKEN'

export const inputToken = value => ({
  type: INPUT_TOKEN,
  value,
})

export const showLogin = () => ({
  type: SHOW_LOGIN,
})

export const hideLogin = () => ({
  type: HIDE_LOGIN,
})

const loginSuccess = (token, json) => ({
  type: LOGIN_SUCCESS,
  token,
  name: json.loginname,
  avatar: json.avatar_url,
})

const loginFail = message => ({
  type: LOGIN_FAIL,
  message,
})

async function fetchAuth(token) {
  const json = await fetchAPI('/accesstoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `accesstoken=${token}`,
  })
  return json
}

// Check auth state at app loaded
export const load = () => async (dispatch, getState) => {
  const { token } = getState().auth

  // If there is no token, exit
  if (!token) return

  try {
    const json = await fetchAuth(token)
    dispatch(loginSuccess(token, json))
  } catch (err) {
    //
  }
}

export const login = () => async (dispatch, getState) => {
  const state = getState()
  const token = state.auth.input.trim()

  // If there is no token, exit
  if (!token) {
    dispatch(loginFail('请填写 Access Token'))
    return
  }

  dispatch({
    type: LOGIN_START,
  })

  try {
    const json = await fetchAuth(token)
    dispatch({
      type: LOGIN_SUCCESS,
      token,
      name: json.loginname,
      avatar: json.avatar_url,
      message: '登录成功',
    })
  } catch (err) {
    dispatch(loginFail(err.message))
  }
}
