import React, { useContext, Dispatch } from 'react';
import { Station } from '../api';

enum DataActionType {
    Set = 'SET',
    SetLoading = 'SET_LOADING',
    Clear = 'CLEAR',
}

interface DataAction<T> {
    type: DataActionType,
    payload?: T,
}

interface DataState<T> {
    isLoading: Boolean,
    data?: T,
}

function dataReducer<T>(state: DataState<T>, action: DataAction<T>): DataState<T> {
    switch (action.type) {
        case DataActionType.SetLoading:
            return {
                ...state,
                isLoading: true,
            };
        case DataActionType.Set:
            return {
                isLoading: false,
                data: action.payload,
            };
        case DataActionType.Clear:
            return {
                isLoading: false,
            };
    }

    return state;
}

function useDataReducer<T>(): [DataState<T>, React.Dispatch<DataAction<T>>] {
	const reducer = (state: DataState<T>, action: DataAction<T>) => dataReducer<T>(state, action);
	return React.useReducer(reducer, {isLoading: false} as DataState<T>);
}

/**
 * Stations state
 */
type StationsData = Station[];
type StationsDataAction = DataAction<Station[]>;
type StationsDataState = DataState<Station[]>;

const StationsStateContext = React.createContext({isLoading: false} as StationsDataState);
const StationsDispatchContext = React.createContext({} as React.Dispatch<StationsDataAction>);

export function AppStateProvider(props: any) {
	const [stationsState, stationsDispatch] = useDataReducer<StationsData>();

	return (
		<StationsStateContext.Provider value={stationsState}>
			<StationsDispatchContext.Provider value={stationsDispatch}>
				{props.children}
			</StationsDispatchContext.Provider>
		</StationsStateContext.Provider>
	);
}

export const useStationsState = (): StationsDataState => {
	return useContext(StationsStateContext);
}

export const useStationsDispatch = (): Dispatch<StationsDataAction> => {
	return useContext(StationsDispatchContext);
}