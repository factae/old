import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import useReactRouter from 'use-react-router'

type Routes = {[T in Route]: string | null}
export type Route =
  | 'landing'
  | 'register'
  | 'reset'
  | 'login'
  | 'dashboard'
  | 'quotation'
  | 'quotationEdit'
  | 'invoice'
  | 'invoiceEdit'
  | 'client'
  | 'clientEdit'
  | 'profile'
  | 'settings'

const routes: Routes = {
  landing: '',
  register: '/register',
  reset: '/password/reset',
  login: '/login',
  dashboard: '/dashboard',
  quotation: '/dashboard/quotation',
  quotationEdit: '/dashboard/quotation/edit',
  invoice: '/dashboard/invoice',
  invoiceEdit: '/dashboard/invoice/edit',
  client: '/dashboard/client',
  clientEdit: '/dashboard/client/edit',
  profile: '/dashboard/profile',
  settings: '/dashboard/settings',
}

export default function useRouting<T>() {
  const {history, ...routerProps} = useReactRouter<T>()

  function goTo(route: Route, params?: any) {
    const url = get(routes, route)
    return history.push(`${url}${isNumber(params) ? `/${params}` : ''}`, params)
  }

  function goBack() {
    return history.goBack()
  }

  return {...routerProps, history, goTo, goBack}
}
