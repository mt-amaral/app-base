import { cn } from '@/lib/utils'
import { type RotaItem } from '../types'

interface RouteTimelineProps {
    items: RotaItem[]
}

export function RouteTimeline({ items }: RouteTimelineProps) {
    if (!items || items.length === 0) return null

    return (
        <div className="flex items-start">
            {items.map((item, index) => {
                const isExecuted = !!item.rotaExecucao
                const isLast = index === items.length - 1
                
                const nextItemExecuted = !isLast && !!items[index + 1].rotaExecucao

                return (
                    <div key={item.id} className={cn("relative flex flex-col items-center flex-shrink-0", !isLast ? "w-[6.5rem]" : "w-[4rem]")}>
                        {/* Connecting line */}
                        {!isLast && (
                            <div 
                                className={cn(
                                    "absolute top-[7px] left-[50%] h-[2px] w-full",
                                    (isExecuted && nextItemExecuted) ? "bg-[#8BC34A]" : "bg-[#E0E0E0]"
                                )}
                                style={{ zIndex: 0 }}
                            />
                        )}
                        
                        {/* Circle node */}
                        <div 
                            className={cn(
                                "relative z-10 h-[16px] w-[16px] rounded-full flex-shrink-0 transition-colors",
                                isExecuted 
                                    ? "bg-[#8BC34A]" 
                                    : "bg-[#E0E0E0]"
                            )}
                        />
                        
                        {/* Label */}
                        <div className="mt-2 text-center w-full px-1">
                            <span className="text-[10px] leading-tight text-foreground/80 inline-block w-full" title={item.localUnidadeNome}>
                                {item.localUnidadeNome}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
