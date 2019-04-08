import React from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import useRouting from '../../common/hooks/routing'

import {useStyles} from './styles'

export default function() {
  const classes = useStyles()
  const {goTo} = useRouting()

  function goToRegister() {
    goTo('register')
  }

  return (
    <section className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography component="h2" variant="h3" className={classes.title}>
            Tarification
          </Typography>

          <Grid container justify="center" spacing={32}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.pricing} elevation={8}>
                <div style={{flex: 1}}>
                  <Typography
                    className={classes.pricingHead}
                    component="h3"
                    variant="h5"
                  >
                    Standard
                  </Typography>
                  <Typography
                    className={classes.pricingHead}
                    component="h4"
                    variant="body1"
                  >
                    <em>Gratuit</em>
                  </Typography>
                  <Divider className={classes.pricingDivider} />
                  <Typography variant="body2" gutterBottom>
                    Accès à toutes les fonctionnalités de base :
                  </Typography>
                  <Typography variant="body2">- Gestion des clients</Typography>
                  <Typography variant="body2">- Gestion des devis</Typography>
                  <Typography variant="body2">
                    - Gestion des factures
                  </Typography>
                  <Typography variant="body2">- CA en temps réel</Typography>
                  <Typography variant="body2">- Support</Typography>
                </div>
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.button}
                  onClick={goToRegister}
                >
                  Créer un compte
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.pricingPremium} elevation={8}>
                <div style={{flex: 1}}>
                  <Typography
                    className={classes.pricingPremiumHead}
                    component="h3"
                    variant="h5"
                  >
                    Premium
                  </Typography>
                  <Typography
                    className={classes.pricingPremiumHead}
                    component="h4"
                    variant="body1"
                  >
                    <em>2€/mois</em>
                  </Typography>
                  <Divider className={classes.pricingPremiumDivider} />
                  <Typography
                    className={classes.pricingPremiumText}
                    variant="body2"
                    gutterBottom
                  >
                    Accès à toutes les fonctionnalités standard, plus :
                  </Typography>
                  <Typography
                    className={classes.pricingPremiumText}
                    variant="body2"
                  >
                    - Transformation devis en facture
                  </Typography>
                  <Typography
                    className={classes.pricingPremiumText}
                    variant="body2"
                  >
                    - Envoi auto factures
                  </Typography>
                  <Typography
                    className={classes.pricingPremiumText}
                    variant="body2"
                  >
                    - Relance auto
                  </Typography>
                  <Typography
                    className={classes.pricingPremiumText}
                    variant="body2"
                  >
                    - Toutes fonctionnalités futures
                  </Typography>
                </div>

                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.button}
                  onClick={goToRegister}
                >
                  Créer un compte
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.pricingCustom} elevation={8}>
                <div style={{flex: 1}}>
                  <Typography
                    className={classes.pricingCustomHead}
                    component="h3"
                    variant="h5"
                  >
                    Autonome
                  </Typography>
                  <Typography
                    className={classes.pricingCustomHead}
                    component="h4"
                    variant="body1"
                  >
                    <em>Gratuit</em>
                  </Typography>
                  <Divider className={classes.pricingCustomDivider} />
                  <Typography
                    className={classes.pricingCustomText}
                    variant="body2"
                    gutterBottom
                  >
                    Pour les utilisateurs plus avancés, gérez votre propre
                    instance Premium de factAE !
                  </Typography>
                </div>
                <Button
                  className={classes.button}
                  href="https://github.com/soywod/factae"
                  variant="contained"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lire la documentation
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </section>
  )
}
