import React, {useEffect, useMemo, useRef} from 'react'
import {Chart} from 'chart.js'
import _ from 'lodash/fp'
import {DateTime} from 'luxon'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import * as colors from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import {useTheme} from '@material-ui/styles'

import useThresholds from '../../../../common/hooks/thresholds'
import useDocumentContext from '../../../../document/context'
import {Document} from '../../../../document/model'
import {Invoice} from '../../../../invoice/model'
import {toEuro} from '../../../utils/currency'

import {useStyles} from './styles'

const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

function getFirstAndLastDayOfYear() {
  const now = DateTime.local()

  const firstDayOfYear = now.set({
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  })

  const lastDayOfYear = firstDayOfYear
    .plus({year: 1})
    .minus({day: 1})
    .set({hour: 23, minute: 59, second: 59, millisecond: 999})

  return [firstDayOfYear, lastDayOfYear]
}

export default function() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const {documents} = useDocumentContext()
  const theme: Theme = useTheme()
  const chart = useRef<Chart | null>(null)
  const [lowTVA, highTVA, AE] = useThresholds()
  const classes = useStyles()
  const invoices = _.isNull(documents)
    ? null
    : _.filter({type: 'invoice'}, documents)

  function isNullOrEmpty(invoices: Document[] | null) {
    return _.pipe([
      _.filter({status: 'paid'}),
      _.overSome([_.isNull, _.isEmpty]),
    ])(invoices)
  }

  const totals = useMemo(() => {
    if (isNullOrEmpty(invoices)) return []

    const [firstDayOfYear, lastDayOfYear] = getFirstAndLastDayOfYear()
    const monthIds = _.range(1, 13)
    const totals = _.fill(0)(12)([])(null)
    const defaultData = _.zipObject(monthIds, totals)

    function byStatusAndCreatedAt(invoice: Invoice) {
      if (_.isNull(invoice.createdAt)) return false
      if (invoice.status !== 'paid') return false
      if (DateTime.fromISO(invoice.createdAt) < firstDayOfYear) return false
      if (DateTime.fromISO(invoice.createdAt) > lastDayOfYear) return false

      return true
    }

    function byMonth(invoice: Invoice) {
      if (_.isNull(invoice.createdAt)) {
        return null
      }

      return {
        month: DateTime.fromISO(invoice.createdAt).month,
        total: invoice.total,
      }
    }

    return _.pipe([
      _.filter(byStatusAndCreatedAt),
      _.map(byMonth),
      _.groupBy('month'),
      _.mapValues(_.sumBy('total')),
      _.defaults(defaultData),
      _.values,
    ])(invoices)
  }, [invoices])

  const turnovers = useMemo(() => {
    if (isNullOrEmpty(invoices)) return []

    function bySum(sums: number[], total: number) {
      const currTotal = total || 0
      const lastSum = _.last(sums) || 0
      return [...sums, currTotal + lastSum]
    }

    function byMask(sum: number, index: number) {
      return totals[index] ? sum : null
    }

    return totals.reduce(bySum, []).map(byMask)
  }, [totals])

  const theoricTurnovers = useMemo(() => {
    if (isNullOrEmpty(invoices)) return []

    const currCreatedAt = _.pipe([
      _.filter({status: 'paid'}),
      _.sortBy('createdAt'),
      _.first,
      _.get('createdAt'),
    ])(invoices)

    const currMonth = DateTime.fromISO(currCreatedAt).month

    const prevMonth = Math.max(0, currMonth - 1)
    const emptyTurnovers = _.fill(0, prevMonth, null, Array(prevMonth))
    const turnoversMean = _.pipe([_.compact, _.mean])(totals)
    const turnoversSum = _.range(0, 12 - prevMonth)
      .map(_.multiply(turnoversMean))
      .map(_.add(Math.round(turnovers[prevMonth])))

    return _.concat(emptyTurnovers)(turnoversSum)
  }, [totals])

  useEffect(() => {
    if (_.isNull(ref.current)) return
    if (chart.current) chart.current.destroy()

    chart.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            data: _.fill(0)(12)(lowTVA)(Array(12)),
            label: `Plafond TVA (bas)`,
            fill: false,
            borderWidth: 1,
            borderColor: colors.orange[400],
            pointHitRadius: 20,
            pointBorderWidth: 0,
            pointRadius: 0,
            hidden: true,
          },
          {
            data: _.fill(0)(12)(highTVA)(Array(12)),
            label: `Plafond TVA (haut)`,
            fill: false,
            borderWidth: 1,
            borderColor: colors.deepOrange[400],
            pointHitRadius: 20,
            pointBorderWidth: 0,
            pointRadius: 0,
            hidden: true,
          },
          {
            data: _.fill(0)(12)(AE)(Array(12)),
            label: `Plafond micro-entrepreneur`,
            fill: false,
            borderWidth: 1,
            borderColor: colors.red[400],
            pointHitRadius: 20,
            pointBorderWidth: 0,
            pointRadius: 0,
            hidden: true,
          },
          {
            data: totals,
            label: `CA réel`,
            fill: false,
            borderWidth: 3,
            borderColor: theme.palette.primary.main,
            pointBackgroundColor: theme.palette.primary.dark,
            pointBorderColor: theme.palette.primary.dark,
            pointHitRadius: 20,
            pointBorderWidth: 2,
            pointRadius: 2,
            pointHoverBorderWidth: 3,
            pointHoverRadius: 3,
          },
          {
            data: turnovers,
            label: `CA cumulé`,
            fill: false,
            borderWidth: 3,
            borderColor: theme.palette.secondary.main,
            pointBackgroundColor: theme.palette.secondary.dark,
            pointBorderColor: theme.palette.secondary.dark,
            pointHitRadius: 20,
            pointBorderWidth: 2,
            pointRadius: 2,
            pointHoverBorderWidth: 3,
            pointHoverRadius: 3,
          },
          {
            data: theoricTurnovers,
            label: `CA cumulé théorique`,
            fill: false,
            borderWidth: 2,
            borderDash: [5, 5],
            borderColor: theme.palette.grey[300],
            pointBackgroundColor: theme.palette.grey[400],
            pointBorderColor: theme.palette.grey[400],
            pointBorderWidth: 2,
            pointRadius: 2,
            pointHoverBorderWidth: 3,
            pointHoverRadius: 3,
            pointHitRadius: 20,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: label => toEuro(label.yLabel),
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: toEuro,
              },
            },
          ],
        },
      },
    })
  }, [invoices, lowTVA])

  return (
    <Grid className={classes.container} item xs={12}>
      <canvas ref={ref} height="400" />
    </Grid>
  )
}
