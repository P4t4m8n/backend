import express from 'express'

import { deleteUser, updateUser } from './user.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

export const userRoutes = express.Router()

userRoutes.put('/:userId', requireAuth, updateUser)
userRoutes.delete('/:userId', requireAuth, deleteUser)
