import {LazyExoticComponent, lazy} from 'react'

type Step = {
  label: string
  component: LazyExoticComponent<any>
}

const steps: Step[] = [
  {
    label: 'Identification (personne)',
    component: lazy(() => import('./Person')),
  },
  {
    label: 'Identification (entreprise)',
    component: lazy(() => import('./Company')),
  },
  {
    label: 'TVA',
    component: lazy(() => import('./Tax')),
  },
  {
    label: 'RIB',
    component: lazy(() => import('./Bank')),
  },
  {
    label: 'Conclusion',
    component: lazy(() => import('./Conclusion')),
  },
]

export default steps
