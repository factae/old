import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import useThresholds from '../../../../common/hooks/thresholds'
import {toEuro} from '../../../../common/utils/currency'

export default function() {
  const [lowTVA, highTVA, AE] = useThresholds()

  return (
    <Grid item xs={12}>
      <Typography component="div" variant="body1">
        <strong>Le plafond de TVA bas</strong> <em>({toEuro(lowTVA)} HT)</em>{' '}
        correspond au plafond à partir du quel vous pouvez devenir redevable de
        la TVA (en fonction de votre chiffre d'affaire passé). Un dépassement
        implique :
      </Typography>
      <ul>
        <Typography component="li" variant="body1">
          - de vérifier votre chiffre d'affaire de l'année passée :
          <ul>
            <Typography component="li" variant="body1">
              - si votre chiffre d'affaire de l'année passée est inférieur au
              plafond de TVA bas => non redevable
            </Typography>
            <Typography component="li" variant="body1">
              - si votre chiffre d'affaire de l'année passée est supérieur au
              plafond de TVA haut => redevable
            </Typography>
            <Typography component="li" variant="body1">
              - si votre chiffre d'affaire de l'année passée est entre le
              plafond de TVA bas et haut => vérifier l'année encore d'avant
            </Typography>
          </ul>
        </Typography>
      </ul>
      <Typography variant="body1">
        <strong>Le plafond de TVA haut</strong> <em>({toEuro(highTVA)} HT)</em>{' '}
        correspond au plafond à partir du quel vous devenez redevable de la TVA.
        Ceci prend effet le premier jour du mois dont le chiffre d'affaire hors
        taxe dépasse ce seuil. Un dépassement implique :
      </Typography>
      <ul>
        <Typography component="li" variant="body1">
          - d'inscrire la TVA sur vos nouvelles factures + refacturer toutes
          celles du mois en cours
        </Typography>
        <Typography component="li" variant="body1">
          - de créer un compte pro sur impot.gouv.fr
        </Typography>
        <Typography component="li" variant="body1">
          - de faire une demande de numéro de TVA intracommunautaire auprès du
          SIE (Service des Impôts des Entreprises)
        </Typography>
      </ul>
      <Typography variant="body1">
        <strong>Le plafond micro-entrepreneur</strong>{' '}
        <em>({toEuro(AE)} HT)</em> correspond au plafond maximum autorisé par
        l'auto-entrepreneur. Un dépassement implique :
      </Typography>
      <ul>
        <Typography component="li" variant="body1">
          - la perte de votre statut auto-entrepreneur
        </Typography>
      </ul>
      <Typography variant="body1">Liens utiles :</Typography>
      <ul>
        <Typography component="li" variant="body1">
          -{' '}
          <a
            href="https://www.shine.fr/blog/assujetti-tva-auto-entrepreneur"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.shine.fr/blog/assujetti-tva-auto-entrepreneur
          </a>
        </Typography>
        <Typography component="li" variant="body1">
          -{' '}
          <a
            href="https://www.portail-autoentrepreneur.fr/actualites/comment-faire-declaration-tva"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.portail-autoentrepreneur.fr/actualites/comment-faire-declaration-tva
          </a>
        </Typography>
        <Typography component="li" variant="body1">
          -{' '}
          <a
            href="https://www.auto-entrepreneur.fr/statut-auto-entrepreneur/limites/plafonds.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.auto-entrepreneur.fr/statut-auto-entrepreneur/limites/plafonds.html
          </a>
        </Typography>
      </ul>
    </Grid>
  )
}
