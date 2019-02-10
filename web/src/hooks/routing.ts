import get from 'lodash/fp/get'
import isNil from 'lodash/fp/isNil'
import useReactRouter from 'use-react-router'

type Routes = {[T in Route]: string | null}
export type Route =
  | 'login'
  | 'register'
  | 'dashboard'
  | 'quotation'
  | 'quotationEdit'
  | 'invoice'
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
  client: '/dashboard/client',
  clientEdit: '/dashboard/client/edit',
  profile: '/dashboard/profile',
}

export default function useRouting() {
  const {history, ...routerProps} = useReactRouter<{id: number}>()

  function goTo(route: Route, id?: number) {
    return () => {
      const url = get(route)(routes)
      return history.push(`${url}${isNil(id) ? '' : `/${id}`}`)
    }
  }

  function goBack() {
    return history.goBack()
  }

  return {...routerProps, history, goTo, goBack}
}
