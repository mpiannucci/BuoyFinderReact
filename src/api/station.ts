import {isDigit, capitalize} from './../extensions';

export function parseActive(active: string) {
    if (active == null) {
        return false;
    }
    
    switch (active) {
        case 'y':
            return true;
        default:
            return false;
    }
}

export function cleanName(name: string) {
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

export enum StationType {
    Buoy = 'buoy', 
    Fixed = 'fixed', 
    OilRig = 'oilrig', 
    Dart = 'dart', 
    Tao = 'tao',
    Other = 'other',
}

export interface Station {
    id: string,
    lat: number, 
    lon: number,
    name: string,
    owner: string, 
    pgm: string, 
    type: StationType,
    met?: boolean,
    currents?: boolean, 
    waterquality?: boolean,
    dart?: boolean,
}