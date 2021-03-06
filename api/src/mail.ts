import axios from 'axios'
import FormData from 'form-data'
import isArray from 'lodash/isArray'

type SendParams = {
  to: string | string[]
  bcc?: string
  attachment?: {
    filename: string
    data: Buffer
  }
  subject: string
  template: {
    name: string
    data: object
  }
}

const API_URL = process.env.MAILGUN_API_URL || ''
const API_DOMAIN = process.env.MAILGUN_API_DOMAIN || ''
const API_KEY = process.env.MAILGUN_API_KEY || ''
const API_FROM = process.env.MAILGUN_API_FROM || ''

export async function send(params: SendParams) {
  const to = isArray(params.to) ? params.to : [params.to]
  const form = new FormData()

  form.append('from', API_FROM)
  form.append('to', to.join(';'))
  form.append('subject', params.subject)
  form.append('template', params.template.name)
  form.append('h:X-Mailgun-Variables', JSON.stringify(params.template.data))

  if (params.bcc) {
    form.append('bcc', params.bcc)
  }

  if (params.attachment) {
    form.append('attachment', params.attachment.data, {
      filename: params.attachment.filename,
    })
  }

  const res = await axios(`${API_URL}/${API_DOMAIN}/messages`, {
    auth: {
      username: 'api',
      password: API_KEY,
    },
    method: 'POST',
    headers: form.getHeaders(),
    data: form,
  })

  if (res.status !== 200) {
    console.error(res.statusText)
    throw new Error(`impossible d'envoyer le mail de confirmation`)
  }
}
