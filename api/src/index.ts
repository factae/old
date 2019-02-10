import 'dotenv/config'
import 'reflect-metadata'

import {handleError, start} from './api'
import {connect} from './database'

connect()
  .then(start)
  .catch(handleError)
