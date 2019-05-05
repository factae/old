import React, {Fragment, MouseEvent} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconClient from '@material-ui/icons/People'
import IconDocument from '@material-ui/icons/AssignmentOutlined'
import IconProfile from '@material-ui/icons/Face'
import IconStats from '@material-ui/icons/BarChart'
import IconSettings from '@material-ui/icons/Settings'
import IconSupport from '@material-ui/icons/ContactSupport'
import IconSession from '@material-ui/icons/PowerSettingsNew'
import IconLi from '@material-ui/icons/ArrowForward'

import Link from '../../../../common/components/Link'
import useAuthContext from '../../../../auth/context'
import Header from '../../../form/Header'

import {useStyles} from './styles'

export default function() {
  const auth = useAuthContext()
  const classes = useStyles()

  function logout(event: MouseEvent) {
    event.preventDefault()
    auth.logout()
  }

  return (
    <Fragment>
      <Header title="Activité" />

      <Grid
        className={classes.main}
        container
        spacing={16}
        alignItems="stretch"
      >
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.subtitle}
              component="h3"
              variant="h5"
            >
              <IconClient className={classes.iconSubtitle} />
              Clients
            </Typography>

            <Link className={classes.link} to="/client/edit">
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Ajouter un nouveau client</span>
            </Link>

            <Link className={classes.link} to="/client">
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Lister les clients</span>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.subtitle}
              component="h3"
              variant="h5"
            >
              <IconDocument className={classes.iconSubtitle} />
              Documents
            </Typography>

            <Link className={classes.link} to="/document/edit">
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Créer un devis, facture ou avoir</span>
            </Link>

            <Link className={classes.link} to="/document">
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Lister les documents</span>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.subtitle}
              component="h3"
              variant="h5"
            >
              <IconStats className={classes.iconSubtitle} />
              Statistiques
            </Typography>

            <Link className={classes.link} to="/stats">
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Chiffre d'affaire en temps réel</span>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.subtitle}
              component="h3"
              variant="h5"
            >
              <IconProfile className={classes.iconSubtitle} />
              Profil
            </Typography>

            <Link className={classes.link} to="/profile">
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Mettre à jour son profil</span>
            </Link>
          </Paper>
        </Grid>
      </Grid>

      <Header title="Compte" />

      <Grid
        className={classes.main}
        container
        spacing={16}
        alignItems="stretch"
      >
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.subtitle}
              component="h3"
              variant="h5"
            >
              <IconSettings className={classes.iconSubtitle} />
              Paramètres
            </Typography>

            <Link className={classes.link} to="/settings">
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Modifier ses paramètres</span>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.subtitle}
              component="h3"
              variant="h5"
            >
              <IconSupport className={classes.iconSubtitle} />
              Support
            </Typography>

            <Link
              className={classes.link}
              to="mailto:clement.douin@posteo.net?subject=[factAE] - Proposition d'amélioration"
            >
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Proposer une amélioration</span>
            </Link>

            <Link
              className={classes.link}
              to="mailto:clement.douin@posteo.net?subject=[factAE] - Potentiel bug"
            >
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Signaler un bug</span>
            </Link>

            <Link
              className={classes.link}
              to="mailto:clement.douin@posteo.net?subject=[factAE] - Besoin d'aide"
            >
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Demander de l'aide</span>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.subtitle}
              component="h3"
              variant="h5"
            >
              <IconSession className={classes.iconSubtitle} />
              Session
            </Typography>

            <Link className={classes.link} onClick={logout}>
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Se déconnecter</span>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}
