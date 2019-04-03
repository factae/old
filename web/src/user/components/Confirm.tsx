import {useContext, useEffect} from 'react'

import AsyncContext from '../../common/contexts/async'
import useRouting from '../../common/hooks/routing'
import {get} from '../../common/utils/axios'

export default function() {
  const router = useRouting<{token: string}>()
  const async = useContext(AsyncContext)

  async function confirm() {
    async.start()

    try {
      const res = await get(`/confirm/${router.match.params.token}`)

      if (res.status === 204) {
        async.stop('Compte activé.')
      } else {
        console.error(res.statusText)
        async.stop(`Erreur : serveur`)
      }
    } catch (error) {
      console.log(error.toString())
      async.stop('Erreur : token invalide !')
    }

    router.goTo('login')
  }

  useEffect(() => {
    confirm()
  }, [])

  return null
}
