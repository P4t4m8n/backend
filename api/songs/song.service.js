
import fs from 'fs'
import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

export const songService = {
    query,
    getById,
    remove,
    add,
    update,
}

async function query(filterSortBy = {}) {
    try {

        const criteria = _buildCriteria(filterSortBy)
        const { sortBy } = filterSortBy

        const collection = await dbService.getCollection('song')
        var songs = await collection.find(criteria).sort({ [sortBy]: 1 }).toArray()
        return songs
    }
    catch (err) {
        loggerService.error('cannot find song', err)
        throw err
    }
}

async function getById(songId) {
    try {
        const collection = await dbService.getCollection('song')
        const song = await collection.findOne({ _id: new ObjectId(songId) })
        return song
    }
    catch (err) {
        loggerService.error(`while finding song ${songId}`, err)
        throw err
    }
}

async function getbyTrackId(trackId) {
    try {
        const collection = await dbService.getCollection('song')
        const isTrack = await collection.findOne({ trackId: trackId })
        return isTrack
    }
    catch (err) {
        loggerService.error(`while finding trackId ${trackId}`, err)
        throw err
    }

}

async function remove(songId) {
    try {
        const collection = await dbService.getCollection('song')
        await collection.deleteOne({ _id: new ObjectId(songId) })
    }
    catch (err) {
        loggerService.error(`cannot remove song ${songId}`, err)
        throw err
    }
}

async function add(song) {

    try {

        const isTrack = await getbyTrackId(song.trackId)
        if (isTrack) return isTrack
        const collection = await dbService.getCollection('song')
        await collection.insertOne(song)

        return song

    }
    catch (err) {

        loggerService.error('cannot add song', err)
        throw err
    }
}

async function update(song) {
    try {

        const collection = await dbService.getCollection('song')

        await collection.updateOne({ _id: new ObjectId(song._id) }, { $set: song })
        return song

    }
    catch (err) {
        loggerService.error(`cannot update song ${song._id}`, err)
        throw err
    }
}

function _savesongsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/song.json', JSON.stringify(gsongs, null, 2), (err) => {
            if (err) {
                reject('Cannot write to file')
            } else {
                resolve()
            }
        })
    })
}

function _buildCriteria(filterSortBy) {

    const { name, artist } = filterSortBy
    const criteria = {}

    if (name) criteria.name = { $regex: filterSortBy.name, $options: 'i' }

    return criteria
}



