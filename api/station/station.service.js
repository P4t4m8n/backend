
import fs from 'fs'
import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

export const stationService = {
    query,
    getById,
    remove,
    add,
    update,
}

async function query(filterSortBy = {}) {
    try {

        const criteria = _buildCriteria(filterSortBy)

        const collection = await dbService.getCollection('station')
        var stations = await collection.find(criteria).toArray()
        console.log("stations:", stations)
        
        return stations
    }
    catch (err) {
        loggerService.error('cannot find station', err)
        throw err
    }
}

async function getById(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        const station = await collection.findOne({ _id: new ObjectId(stationId) })
        return station
    }
    catch (err) {
        loggerService.error(`while finding station ${stationId}`, err)
        throw err
    }
}

async function remove(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.deleteOne({ _id: new ObjectId(stationId) })
    }
    catch (err) {
        loggerService.error(`cannot remove station ${stationId}`, err)
        throw err
    }
}

async function add(station) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.insertOne(station)

        return station

    }
    catch (err) {

        loggerService.error('cannot add station', err)
        throw err
    }
}

async function update(station, stationId) {
    try {

        const collection = await dbService.getCollection('station')

        await collection.updateOne({ _id: new ObjectId(stationId) }, { $set: station })
        station._id = stationId

        return station

    }
    catch (err) {
        loggerService.error(`cannot update station ${station._id}`, err)
        throw err
    }
}

function _savestationsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/station.json', JSON.stringify(gstations, null, 2), (err) => {
            if (err) {
                reject('Cannot write to file')
            } else {
                resolve()
            }
        })
    })
}

function _buildCriteria(filterSortBy) {

    const criteria = {}

    criteria['createdBy.username'] = 'TubeFy'
    return criteria
}



