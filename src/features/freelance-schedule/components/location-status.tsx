import { MapPin, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

interface LocationStatusProps {
    latitude: number | null
    longitude: number | null
    loading: boolean
    error: string | null
}

export function LocationStatus({ latitude, longitude, loading, error }: LocationStatusProps) {
    const getStatusStyles = () => {
        if (error) return 'bg-red-50 text-red-600 border-red-100'
        if (loading && !latitude) return 'bg-amber-50 text-amber-600 border-amber-100'
        if (latitude) return 'bg-green-50 text-green-700 border-green-100'
        return 'bg-muted/30 border-border/50 text-muted-foreground'
    }

    return (
        <div className={`p-3 rounded-lg border flex items-center gap-3 text-xs font-medium transition-all ${getStatusStyles()}`}>
            {error ? (
                <>
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{error}</span>
                </>
            ) : (loading && !latitude) ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                    <span className="flex-1">Buscando sua localização...</span>
                </>
            ) : latitude ? (
                <>
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span className="flex-1 text-left">
                        Localização confirmada! ({latitude.toFixed(4)}, {longitude?.toFixed(4)})
                    </span>
                </>
            ) : (
                <>
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">Localização pendente.</span>
                </>
            )}
        </div>
    )
}
