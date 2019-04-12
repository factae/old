import React, {Suspense, useEffect, useState} from 'react'
import Step from '@material-ui/core/Step'
import Stepper from '@material-ui/core/Stepper'
import StepButton from '@material-ui/core/StepButton'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import useTheme from '@material-ui/styles/useTheme'
import {unstable_useMediaQuery as useMediaQuery} from '@material-ui/core/useMediaQuery'

import steps from './steps'
import {StepperContext} from './context'
import {useUserStep} from './hooks'
import {useStyles} from './styles'

export default function() {
  const [userStep, userNextStep] = useUserStep()
  const [step, setStep] = useState(userStep)
  const ActiveComponent = steps[step].component
  const theme = useTheme<Theme>()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()

  useEffect(() => {
    setStep(userStep)
  }, [userStep])

  function prevStep() {
    setStep(Math.max(0, step - 1))
  }

  function nextStep() {
    if (step === userStep) {
      userNextStep()
    } else {
      setStep(step + 1)
    }
  }

  return (
    <StepperContext.Provider value={{step, prevStep, nextStep}}>
      <Typography className={classes.title} component="h1" variant="h2">
        Bienvenue !
      </Typography>

      <Typography variant="subtitle1">
        Avant de pouvoir utiliser l'outil, vous devez le configurer. Suivez les
        étapes :
      </Typography>

      <Stepper
        className={classes.stepper}
        activeStep={step}
        orientation={isMobile ? 'vertical' : 'horizontal'}
        alternativeLabel={!isMobile}
        nonLinear
      >
        {steps.map(({label}, key) => {
          return (
            <Step
              key={key}
              completed={userStep > key}
              disabled={userStep < key}
            >
              <StepButton onClick={() => setStep(key)}>
                <StepLabel
                  classes={{label: classes.label, active: classes.labelActive}}
                >
                  {label}
                </StepLabel>
              </StepButton>
            </Step>
          )
        })}
      </Stepper>

      <Suspense fallback={null}>
        <ActiveComponent />
      </Suspense>
    </StepperContext.Provider>
  )
}
