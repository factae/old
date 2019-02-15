import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconClient from '@material-ui/icons/AssignmentInd'
import IconInvoice from '@material-ui/icons/AssignmentTurnedIn'
import IconProfile from '@material-ui/icons/AccountCircle'
import IconQuotation from '@material-ui/icons/Assignment'

import useRouting from '../../../../common/hooks/routing'

import {useStyles} from './styles'

export default function() {
  const classes = useStyles()
  const {goTo} = useRouting()

  return (
    <Grid container spacing={16} className={classes.cards}>
      <Grid item xs={12} sm={6} lg={3}>
        <Card>
          <CardActionArea onClick={goTo('quotation')}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                className={classes.cardTitle}
              >
                <IconQuotation className={classes.icon} />
                Devis
              </Typography>
              <Typography component="p">Gérez vos devis.</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card>
          <CardActionArea onClick={goTo('invoice')}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                className={classes.cardTitle}
              >
                <IconInvoice className={classes.icon} />
                Factures
              </Typography>
              <Typography component="p">Gérez vos factures.</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card>
          <CardActionArea onClick={goTo('client')}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                className={classes.cardTitle}
              >
                <IconClient className={classes.icon} />
                Clients
              </Typography>
              <Typography component="p">Gérez vos clients.</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card>
          <CardActionArea onClick={goTo('profile')}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                className={classes.cardTitle}
              >
                <IconProfile className={classes.icon} />
                Profil
              </Typography>
              <Typography component="p">Gérez votre profil.</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}
