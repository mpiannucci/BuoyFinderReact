import { parseString } from 'react-native-xml2js';
import { isDigit, capitalize } from '../extensions';

const activeStationsUrl = 'https://www.ndbc.noaa.gov/activestations.xml';

function cleanName(name) {
    if (name === null || name === '') {
        return 'Unknown';
    }

    if (name.includes('-')) {
        name = name.split('-').map((raw) => raw.trim()).filter((raw) => !isDigit(raw)).join(' ');
    }

    if (name.includes('(')) {
        name = name.split('(')[0].trim();
    }

    if (name.includes('NM')) {
        name = name.split(' ').map((raw) => raw.trim()).filter((raw) => {
            return !isDigit(raw);
        }).join(' ').split('NM')[0].trim();
    }

    return capitalize(name);
}

export async function fetchStations() {
    const rawStationsResponse = await fetch(activeStationsUrl);
    const rawStationsData = await rawStationsResponse.text();

    return new Promise((resolve, reject) => {
        parseString(rawStationsData, (err, result) => {
            if (result === undefined) {
                return reject(err);
            }

            stations = result.stations.station.map((station) => ({
                ...station.$,
                name: cleanName(station.$.name),
            }));

            return resolve(stations);
        })
    });
}