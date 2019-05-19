import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import useThresholds from '../../../../common/hooks/thresholds'
import {toEuro} from '../../../../common/utils/currency'
import Link from '../../../../common/components/Link'

const links = [
  'https://www.service-public.fr/professionnels-entreprises/vosdroits/F32353',
  'https://www.shine.fr/blog/assujetti-tva-auto-entrepreneur',
  'https://www.portail-autoentrepreneur.fr/actualites/comment-faire-declaration-tva',
  'https://www.auto-entrepreneur.fr/statut-auto-entrepreneur/limites/plafonds.html',
]

export default function() {
  const [lowTVA, highTVA, AE] = useThresholds()

  return (
    <Grid item xs={12}>
      <Typography component="div" variant="body1">
        <strong>Le plafond de TVA bas</strong> <em>({toEuro(lowTVA)} HT)</em> correspond au plafond
        à partir du quel vous pouvez devenir redevable de la TVA (en fonction de votre chiffre
        d'affaire passé). Un dépassement implique :
      </Typography>
      <ul>
        <Typography component="li" variant="body1">
          - de vérifier votre chiffre d'affaire de l'année passée :
          <ul>
            <Typography component="li" variant="body1">
              - si votre chiffre d'affaire de l'année passée est inférieur au plafond de TVA bas =>
              non redevable
            </Typography>
            <Typography component="li" variant="body1">
              - si votre chiffre d'affaire de l'année passée est supérieur au plafond de TVA haut =>
              redevable
            </Typography>
            <Typography component="li" variant="body1">
              - si votre chiffre d'affaire de l'année passée est entre le plafond de TVA bas et haut
              => vérifier l'année encore d'avant
            </Typography>
          </ul>
        </Typography>
      </ul>
      <Typography variant="body1">
        <strong>Le plafond de TVA haut</strong> <em>({toEuro(highTVA)} HT)</em> correspond au
        plafond à partir du quel vous devenez redevable de la TVA. Ceci prend effet le premier jour
        du mois dont le chiffre d'affaire hors taxe dépasse ce seuil. Un dépassement implique :
      </Typography>
      <ul>
        <Typography component="li" variant="body1">
          - d'inscrire la TVA sur vos nouvelles factures + refacturer toutes celles du mois en cours
        </Typography>
        <Typography component="li" variant="body1">
          - de créer un compte pro sur impot.gouv.fr
        </Typography>
        <Typography component="li" variant="body1">
          - de faire une demande de numéro de TVA intracommunautaire auprès du SIE (Service des
          Impôts des Entreprises)
        </Typography>
      </ul>
      <Typography variant="body1">
        <strong>Le plafond micro-entrepreneur</strong> <em>({toEuro(AE)} HT)</em> correspond au
        plafond maximum autorisé par le micro-entrepreneur. Un dépassement sur deux années
        consécutives implique :
      </Typography>
      <ul>
        <Typography component="li" variant="body1">
          - la perte de votre statut mirco-entrepreneur (basculement dans le régime de l'entreprise
          individuelle)
        </Typography>
      </ul>
      <Typography variant="body1">Liens utiles :</Typography>
      <ul>
        {links.map((link, key) => (
          <Typography key={key} component="li" variant="body1">
            - <Link to={link} />
          </Typography>
        ))}
      </ul>
    </Grid>
  )
}
