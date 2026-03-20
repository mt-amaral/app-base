import Webcam from 'react-webcam'
import { Camera, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CameraSectionProps {
    photo: string | null
    webcamRef: React.RefObject<Webcam | null>
    onCapture: () => void
    onClear: () => void
}

export function CameraSection({ photo, webcamRef, onCapture, onClear }: CameraSectionProps) {
    return (
        <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-border aspect-video bg-indigo-50/20 flex items-center justify-center">
            {photo ? (
                <div className="relative w-full h-full animate-in fade-in zoom-in duration-300">
                    <img src={photo} alt="Capture" className="w-full h-full object-cover" />
                    <Button 
                        type="button" 
                        variant="secondary" 
                        size="sm" 
                        className="absolute bottom-3 right-3 gap-2 opacity-90 shadow-md hover:bg-white"
                        onClick={onClear}
                    >
                        <RotateCcw className="h-4 w-4" /> Nova Foto
                    </Button>
                </div>
            ) : (
                <div className="relative w-full h-full flex flex-col items-center group">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full object-cover"
                        videoConstraints={{ facingMode: 'user' }}
                    />
                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                        <Button 
                            type="button" 
                            className="gap-2 shadow-2xl ring-2 ring-white py-6 px-8 rounded-full font-bold bg-primary hover:bg-primary/90" 
                            onClick={onCapture}
                        >
                            <Camera className="h-5 w-5" /> Capturar Foto para Check-in
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
