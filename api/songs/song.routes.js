


import express from 'express'

import { log } from '../../middlewares/logger.middleware.js'
import { addSong, getSongById, getSongs, removeSong, updateSong } from './song.controller.js'

export const songRoutes = express.Router()

songRoutes.get('/', log, getSongs)
songRoutes.get('/:songId', log, getSongById)
songRoutes.post('/edit', log, addSong)
songRoutes.put('/edit/:songId', log, updateSong)
songRoutes.delete('/:songId', log, removeSong)


