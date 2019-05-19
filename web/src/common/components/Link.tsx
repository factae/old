import React, {MouseEvent, ReactNode} from 'react'
import Link from '@material-ui/core/Link'
import {Link as RouterLink} from 'react-router-dom'
import _ from 'lodash/fp'

type Props = {
  to?: string
  onClick?: (e: MouseEvent) => void
  color?: 'primary' | 'secondary'
  className?: string
  children?: ReactNode
}

export default function(props: Props) {
  const {className, children} = props
  const to = props.to || '#'
  const color = props.color || 'primary'
  const handleClick = props.onClick || _.noop

  return to.startsWith('/') ? (
    <Link
      className={className}
      color={color}
      onClick={handleClick}
      component={linkProps => (
        <RouterLink to={to} {..._.pick(['className', 'onClick'], linkProps)}>
          {children}
        </RouterLink>
      )}
    >
      {children}
    </Link>
  ) : (
    <Link
      className={className}
      href={to}
      color={color}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children || to}
    </Link>
  )
}
