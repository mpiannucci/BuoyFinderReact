import { parseString } from 'react-native-xml2js';
import { Station, parseActive, cleanName } from './station';

const activeStationsUrl = 'https://www.ndbc.noaa.gov/activestations.xml';

export async function fetchStations(): Promise<Station[]> {
    const rawStationsResponse = await fetch(activeStationsUrl);
    const rawStationsData = await rawStationsResponse.text();

    return new Promise((resolve, reject) => {
        parseString(rawStationsData, (err: any, result: any) => {
            if (result === undefined) {
                return reject(err);
            }

            let stations: Station[] = result.stations.station.map((station: any) => ({
                ...station.$,
                name: cleanName(station.$.name),
                met: parseActive(station.$.met),
                currents: parseActive(station.$.currents),
                waterquality: parseActive(station.$.waterquality),
                dart: parseActive(station.$.dart),
            }));

            return resolve(stations);
        })
    });
}