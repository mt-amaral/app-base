import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function WeekNavigation() {
    return (
        <div className="p-6 pb-2">
            <div className="flex justify-center mb-6">
                <div className="inline-flex items-center rounded-lg border border-border/60 p-1 bg-white shadow-sm">
                    <Button variant="ghost" size="sm" className="rounded-full text-[12px] font-normal text-primary px-4 h-8 hover:bg-primary/10 hover:text-primary">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Semana Anterior
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-full text-[12px] font-semibold bg-muted/60 text-foreground px-6 h-8 hover:bg-muted/80">
                        Semana Atual
                    </Button>
                    <Button variant="ghost" size="sm" disabled className="rounded-full text-[12px] font-normal text-muted-foreground px-4 h-8">
                        Próxima Semana
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
