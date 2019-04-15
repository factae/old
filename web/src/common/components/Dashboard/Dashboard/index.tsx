import React, {Fragment, MouseEvent} from 'react'
import {Link} from 'react-router-dom'
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

import useAuthContext from '../../../../auth/context'
import useUserContext from '../../../../user/context'
import Header from '../../../form/Header'
import Stepper from '../Stepper'

import {useStyles} from './styles'

export default function() {
  const auth = useAuthContext()
  const [user] = useUserContext()
  const classes = useStyles()

  if (!user) return null
  if (!user.ready) return <Stepper />

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

            <Link className={classes.link} to="/dashboard/client/edit">
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Ajouter un nouveau client</span>
            </Link>

            <Link className={classes.link} to="/dashboard/client">
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

            <Link className={classes.link} to="/dashboard/document/edit">
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Créer un devis, facture ou avoir</span>
            </Link>

            <Link className={classes.link} to="/dashboard/document">
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

            <Link className={classes.link} to="/dashboard/stats">
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

            <Link className={classes.link} to="/dashboard/profile">
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

            <Link className={classes.link} to="/dashboard/settings">
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

            <a
              className={classes.link}
              href="mailto:mail@soywod.me?subject=[factAE] - Proposer une amélioration"
            >
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Proposer une amélioration</span>
            </a>

            <a
              className={classes.link}
              href="mailto:mail@soywod.me?subject=[factAE] - Signaler un bug"
            >
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Signaler un bug</span>
            </a>

            <a
              className={classes.link}
              href="mailto:mail@soywod.me?subject=[factAE] - Demander de l'aide"
            >
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Demander de l'aide</span>
            </a>
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

            <a className={classes.link} href="" onClick={logout}>
              <IconLi className={classes.iconLink} fontSize="small" />
              <span>Se déconnecter</span>
            </a>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}
