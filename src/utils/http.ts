import axios, { AxiosInstance } from 'axios'
import config from '../constants/config'
import { setTokenToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string

  constructor() {
    this.accessToken = ''
    this.refreshToken = ''
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
        if (url === '/users/login' || url === '/users/register') {
          this.accessToken = response.data.access_token
          this.refreshToken = response.data.refresh_token
          setTokenToLS(this.accessToken, this.refreshToken)
        }
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
