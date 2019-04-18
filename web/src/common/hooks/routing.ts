import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import useReactRouter from 'use-react-router'

type Routes = {[T in Route]: string | null}
export type Route =
  | 'register'
  | 'reset'
  | 'login'
  | 'dashboard'
  | 'document'
  | 'documentEdit'
  | 'client'
  | 'clientEdit'
  | 'profile'
  | 'settings'

const routes: Routes = {
  register: '/register',
  reset: '/password/reset',
  login: '/login',
  dashboard: '/',
  document: '/document',
  documentEdit: '/document/edit',
  client: '/client',
  clientEdit: '/client/edit',
  profile: '/profile',
  settings: '/settings',
}

export default function useRouting<T>() {
  const {history, ...routerProps} = useReactRouter<T>()

  function goTo(route: Route, params = {}) {
    const url = get(routes, route)
    return history.push(`${url}${isNumber(params) ? `/${params}` : ''}`, params)
  }

  function goBack() {
    return history.goBack()
  }

  return {...routerProps, history, goTo, goBack}
}
