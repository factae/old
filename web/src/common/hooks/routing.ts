import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import useReactRouter from 'use-react-router'

type Routes = {[T in Route]: string | null}
export type Route =
  | 'login'
  | 'register'
  | 'dashboard'
  | 'quotation'
  | 'quotationEdit'
  | 'invoice'
  | 'invoiceEdit'
  | 'client'
  | 'clientEdit'
  | 'profile'

const routes: Routes = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  quotation: '/dashboard/quotation',
  quotationEdit: '/dashboard/quotation/edit',
  invoice: '/dashboard/invoice',
  invoiceEdit: '/dashboard/invoice/edit',
  client: '/dashboard/client',
  clientEdit: '/dashboard/client/edit',
  profile: '/dashboard/profile',
}

export default function useRouting() {
  const {history, ...routerProps} = useReactRouter<{id: number}>()

  function goTo(route: Route, params?: any) {
    return () => {
      const url = get(routes, route)
      return history.push(
        `${url}${isNumber(params) ? `/${params}` : ''}`,
        params,
      )
    }
  }

  function goBack() {
    return history.goBack()
  }

  return {...routerProps, history, goTo, goBack}
}
