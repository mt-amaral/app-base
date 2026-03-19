import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { EditRouterSupervisorForm } from './edit-router-supervisor-form'
import { DeleteRouterSupervisorDialog } from './delete-router-supervisor-dialog'
import { Badge } from '@/components/ui/badge'

export interface RouterSupervisorTableItem {
  id: number
  name: string
  cpf: string
  active: boolean
}

interface RouterSupervisorTableProps {
  items: RouterSupervisorTableItem[]
  currentPage: number
  totalPages: number
  totalCount: number
  onPageChange: (page: number) => void
}

export function RouterSupervisorTable({
  items,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: RouterSupervisorTableProps) {
  const [selectedItem, setSelectedItem] = useState<RouterSupervisorTableItem | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleEdit = (item: RouterSupervisorTableItem) => {
    setSelectedItem(item)
    setIsEditOpen(true)
  }

  const handleDelete = (item: RouterSupervisorTableItem) => {
    setSelectedItem(item)
    setIsDeleteOpen(true)
  }

  return (
    <>
      <div className='space-y-4'>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='w-[60px] text-right'>Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.cpf}</TableCell>
                    <TableCell>
                      {item.active ? (
                        <Badge variant='outline' className='text-green-600 bg-green-50 border-green-200'>Ativo</Badge>
                      ) : (
                        <Badge variant='outline' className='text-red-600 bg-red-50 border-red-200'>Inativo</Badge>
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(item)}>
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className='text-center'>
                    No supervisors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className='flex items-center justify-between'>
          <div className='text-sm text-muted-foreground'>
            Página {currentPage} de {totalPages} • {totalCount} registro(s)
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>

            <span className='text-sm'>{currentPage}</span>

            <Button
              variant='outline'
              size='sm'
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className='sm:max-w-lg'>
          {selectedItem && <EditRouterSupervisorForm item={selectedItem} />}
        </DialogContent>
      </Dialog>

      {selectedItem && (
        <DeleteRouterSupervisorDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          item={selectedItem}
        />
      )}
    </>
  )
}
