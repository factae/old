import nodemailer, {SendMailOptions} from 'nodemailer'

const logTransporter = nodemailer.createTransport({
  jsonTransport: true,
  from: 'noreply@factae.local',
})

export async function send(options: SendMailOptions) {
  options.from = logTransporter.options.from
  const info = await logTransporter.sendMail(options)
  console.log(info.message)
}
