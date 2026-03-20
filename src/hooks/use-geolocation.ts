import { useState, useCallback } from 'react'

interface GeolocationState {
    latitude: number | null
    longitude: number | null
    error: string | null
    loading: boolean
}

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error: null,
        loading: false,
    })

    const getLocation = useCallback(() => {
        if (typeof window === 'undefined' || !navigator.geolocation) {
            setState(prev => ({ ...prev, error: 'Geolocalização não suportada.' }))
            return
        }

        setState(prev => ({ ...prev, loading: true, error: null }))

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    loading: false,
                })
            },
            (error) => {
                let msg = 'Erro ao obter localização.'
                if (error.code === 1) msg = 'Permissão de localização negada.'
                if (error.code === 2) msg = 'Posição indisponível.'
                if (error.code === 3) msg = 'Tempo esgotado ao obter localização.'
                
                setState(prev => ({ ...prev, error: msg, loading: false }))
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        )
    }, [])

    const clearLocation = useCallback(() => {
        setState({ latitude: null, longitude: null, error: null, loading: false })
    }, [])

    return { ...state, getLocation, clearLocation }
}
