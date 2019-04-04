import axios from 'axios'
import isArray from 'lodash/isArray'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type MailParams = {
  from: string
  to: string | string[]
  templateId?: string
  templateData: object
}

async function logTransporter(params: MailParams) {
  console.log(params)
}

async function mailTransporter(params: MailParams) {
  const to = isArray(params.to) ? params.to : [params.to]
  const res = await axios({
    method: 'POST',
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    data: {
      template_id: params.templateId,
      from: {
        email: params.from,
      },
      personalizations: [
        {
          to: to.map(email => ({email})),
          dynamic_template_data: params.templateData,
        },
      ],
    },
  })

  if (res.status !== 202) {
    throw new Error(res.statusText)
  }
}

export async function send(params: Omit<MailParams, 'from'>) {
  switch (process.env.NODE_ENV) {
    case 'production':
      await mailTransporter({...params, from: 'noreply@factae.fr'})
      break

    case 'development':
    default:
      await logTransporter({...params, from: 'noreply@factae.local'})
      break
  }
}
