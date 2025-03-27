import axios, { AxiosInstance } from 'axios'
import config from '../constants/config'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setProfileToLs, setTokenToLS } from './auth'
import { RefreshTokenReponse } from '../types/auth.type'
import { store } from '../store'
import { logOut } from '../store/user.slice'

const { VITE_URL_REFRESH_TOKEN } = import.meta.env

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS() as string
    this.refreshToken = getRefreshTokenFromLS() as string
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
        } else {
          const accessToken = getAccessTokenFromLS()
          if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/users/login' || url === '/users/verify-email') {
          this.accessToken = response.data.data.access_token
          this.refreshToken = response.data.data.refresh_token
          setTokenToLS(this.accessToken, this.refreshToken)
          setProfileToLs(response.data.data.user)
        }
        return response
      },
      async (error) => {
        if (error.response.status === 401) {
          if (error.response.data.message === 'Access token has expired') {
            await this.handleRefreshToken()
          } else if (error.response.data.message === 'Refresh token has expired') {
            clearLS()
            this.accessToken = ''
            this.refreshToken = ''
            store.dispatch(logOut())
          } else {
            this.accessToken = ''
            this.refreshToken = ''
            store.dispatch(logOut())
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(VITE_URL_REFRESH_TOKEN as string, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data.data
        setTokenToLS(access_token, refresh_token)
        this.accessToken = access_token
        this.refreshToken = refresh_token
        console.log(res)
        // return access_token
      })
      .catch((error) => {
        console.log(error)
        // this.accessToken = ''
        // this.refreshToken = ''
        store.dispatch(logOut())
        throw error
      })
  }
}

const http = new Http().instance

export default http
