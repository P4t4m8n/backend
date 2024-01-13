


import express from 'express'

import { log } from '../../middlewares/logger.middleware.js'
import { addStation, getStationById, getStations, removeStation, updatestation } from './station.controller.js'

export const stationRoutes = express.Router()

stationRoutes.get('/', log, getStations)
stationRoutes.get('/:stationId', log, getStationById)
stationRoutes.post('/edit', log, addStation)
stationRoutes.put('/edit/:stationId', log, updatestation)
stationRoutes.delete('/:stationId', log, removeStation)


