import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { type FreelanceScheduleItem } from '../types'

const DIAS_SEMANA: Record<number, string> = {
    1: 'Segunda-feira',
    2: 'Terça-feira',
    3: 'Quarta-feira',
    4: 'Quinta-feira',
    5: 'Sexta-feira',
    6: 'Sábado',
    7: 'Domingo'
}

interface FreelanceScheduleTableProps {
    items: FreelanceScheduleItem[]
}

export function FreelanceScheduleTable({ items }: FreelanceScheduleTableProps) {
    return (
        <div className="rounded-md border border-border/50 bg-white overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow>
                        <TableHead className="font-semibold text-foreground text-left pl-6">Dia da semana</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Horário estabelecido</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Check-in Entrada</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Check-in Saída</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.length === 0 ? (
                         <TableRow>
                             <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhum dado encontrado.</TableCell>
                         </TableRow>
                    ) : (
                        items.map((item) => (
                            <TableRow key={item.id} className="border-b border-border/40 hover:bg-muted/30">
                                <TableCell className="font-medium text-foreground/80 pl-6">
                                    {DIAS_SEMANA[item.diaSemana]}
                                </TableCell>
                                <TableCell className="text-center text-muted-foreground">
                                    {item.horarioEstabelecido}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    {item.horarioEntradaRealizado}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    {item.horarioSaidaRealizado}
                                </TableCell>
                                <TableCell className="text-center">
                                    {item.status === 'Realizado' && <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Realizado</Badge>}
                                    {item.status === 'Atrasado' && <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200">Atrasado</Badge>}
                                    {item.status === 'Pendente' && <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">Pendente</Badge>}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
