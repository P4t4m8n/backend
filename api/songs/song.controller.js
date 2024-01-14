import { loggerService } from "../../services/logger.service.js"
import { songService } from "./song.service.js"

export async function getSongs(req, res) {

    try {
        const { name, artist, song } = req.query
        const filterSortBy = {
            name,
            artist,
        }
        loggerService.debug('Getting songs', filterSortBy)
        const songs = await songService.query(filterSortBy)
        res.json(songs)
    }
    catch (err) {
        loggerService.error('Failed to get songs', err)
        res.status(500).send({ err: 'Failed to get songs' })
    }
}

export async function getSongById(req, res) {

    try {
        const { songId } = req.params

        const song = await songService.getById(songId)
        res.json(song)

    }
    catch (err) {
        loggerService.error('Failed to get song', err)
        res.status(500).send({ err: 'Failed to get song' })
    }
}

export async function addSong(req, res) {
    const { name, artist, duration, addedBy, imgUrl, trackId } = req.body
    console.log("duration:", duration)


    try {

        const songToSave = {

            name: name || 'Unknown',
            artist: artist || 'Unknown',
            type: 'song',
            duration: duration || '99:99',
            trackId: trackId,
            imgUrl: imgUrl || '',
            addedBy: addedBy || 'YoutubeFy',
            addedAt: Date.now(),
            likedByUsers: []
        }

        const addedsong = await songService.add(songToSave)
        res.json(addedsong)

    }
    catch (err) {
        loggerService.error('Failed to add song', err)
        res.status(500).send({ err: 'Failed to add song' })
    }
}

export async function updateSong(req, res) {
    const { name, artist, imgUrl, duration, trackId, addedAt, likedByUsers } = req.body
    try {

        const songToSave = {

            name: name || 'Unknown',
            artist: artist || 'Unknown',
            type: 'song',
            duration: duration || '99:99',
            trackId: trackId,
            imgUrl: imgUrl || '',
            addedBy: addedBy || 'YoutubeFy',
            addedAt: addedAt,
            likedByUsers: likedByUsers
        }


        const updatedsong = await songService.update(songToSave)
        res.json(updatedsong)

    }
    catch (err) {
        loggerService.error('Failed to update song', err)
        res.status(500).send({ err: 'Failed to update song' })
    }
}

export async function removeSong(req, res) {

    try {
        const { songId } = req.params

        await songService.remove(songId)
        res.send()

    }
    catch (err) {

        loggerService.error('Failed to remove song', err)
        res.status(500).send({ err: 'Failed to remove song' })

    }
}




