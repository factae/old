import axios, {AxiosRequestConfig} from 'axios'

type Config = Partial<AxiosRequestConfig>

const baseConfig: Config = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
}

// --------------------------------------------------------------------- # Get #

export function get(url: string) {
  return axios({...baseConfig, url, method: 'GET'})
}
// -------------------------------------------------------------------- # Post #

export function post(url: string, data?: {}) {
  return axios({...baseConfig, url, data, method: 'POST'})
}

// --------------------------------------------------------------------- # Put #

export function put(url: string, data?: {}) {
  return axios({...baseConfig, url, data, method: 'PUT'})
}
