import React, {Fragment} from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconPrev from '@material-ui/icons/ArrowBack'
import IconNext from '@material-ui/icons/ArrowForward'
import IconFinish from '@material-ui/icons/Check'

import useStepperContext from '../context'
import {useStyles} from './styles'

const STEP_MAX = 4

type Props = {
  onNext: () => void
}

export default function({onNext: next}: Props) {
  const {step, prevStep} = useStepperContext()
  const classes = useStyles()

  return (
    <Grid className={classes.container} item xs={12}>
      {step > 0 && (
        <Button variant="outlined" onClick={prevStep}>
          <IconPrev className={classes.iconPrev} /> Étape précédente
        </Button>
      )}

      <div className={classes.next}>
        <Button variant="contained" color="secondary" onClick={next}>
          {step < STEP_MAX ? (
            <Fragment>
              Étape suivante <IconNext className={classes.iconNext} />
            </Fragment>
          ) : (
            <Fragment>
              Démarrer mon mois d'essai{' '}
              <IconFinish className={classes.iconNext} />
            </Fragment>
          )}
        </Button>
      </div>
    </Grid>
  )
}
