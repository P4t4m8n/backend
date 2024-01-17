import { loggerService } from '../../services/logger.service.js'
import { stationService } from './station.service.js'

export async function getStations(req, res) {

    try {
        const filterSortBy = {          
        }
        loggerService.debug('Getting stations', filterSortBy)
        const stations = await stationService.query(filterSortBy)
        console.log("stations:", stations)
        res.json(stations)
    }
    catch (err) {
        loggerService.error('Failed to get stations', err)
        res.status(500).send({ err: 'Failed to get stations' })
    }
}

export async function getStationById(req, res) {

    try {
        const { stationId } = req.params
        console.log("stationId:", stationId)

        const station = await stationService.getById(stationId)
        res.json(station)

    }
    catch (err) {
        loggerService.error('Failed to get station', err)
        res.status(500).send({ err: 'Failed to get station' })
    }
}

export async function addStation(req, res) {

    const { name, stationListTitle, type, tags, imgUrl, createdBy, duration, likedByUsers, songs, description} = req.body

    try {

        const stationToSave = {
            name: name || '',
            stationListTitle: stationListTitle || '',
            type: type || 'playlist',
            tags: tags || [],
            imgUrl: imgUrl || '',
            createdBy: createdBy || 'YoutubeFy',
            likedByUsers: +likedByUsers,
            songs: songs,
            duration: duration,
            description:description,
        }

        const addedstation = await stationService.add(stationToSave)
        res.json(addedstation)

    }
    catch (err) {
        loggerService.error('Failed to add station', err)
        res.status(500).send({ err: 'Failed to add station' })
    }
}

export async function updatestation(req, res) {
    const { name, stationListTitle, type, tags, imgUrl, createdBy, likedByUsers, duration, songs, _id,description } = req.body
    console.log("duration:", duration)
    try {

        const stationToSave = {
            name: name,
            stationListTitle: stationListTitle,
            type: type,
            tags: tags,
            imgUrl: imgUrl,
            createdBy: createdBy,
            likedByUsers: +likedByUsers,
            songs: songs,
            duration: duration,
            description,
        }
        const stationId = _id


        const updatedstation = await stationService.update(stationToSave, stationId)
        res.json(updatedstation)

    }
    catch (err) {
        loggerService.error('Failed to update station', err)
        res.status(500).send({ err: 'Failed to update station' })
    }
}

export async function removeStation(req, res) {

    try {
        const { stationId } = req.params

        await stationService.remove(stationId)
        res.send()

    }
    catch (err) {

        loggerService.error('Failed to remove station', err)
        res.status(500).send({ err: 'Failed to remove station' })

    }
}




