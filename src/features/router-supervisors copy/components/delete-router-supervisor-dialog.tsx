import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DeleteRouterSupervisorDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    item: {
        id: number
        name: string
        cpf: string
    }
}

export function DeleteRouterSupervisorDialog({
    open,
    onOpenChange,
    item,
}: DeleteRouterSupervisorDialogProps) {
    const [value, setValue] = useState('')

    const expectedValue = item.name
    const isValid = value.trim() === expectedValue

    return (
        <AlertDialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                    setValue('')
                }
                onOpenChange(nextOpen)
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-destructive'>
                        <span className='inline-flex items-center gap-2'>
                            <AlertTriangle className='h-5 w-5' />
                            Delete Router Supervisor
                        </span>
                    </AlertDialogTitle>

                    <AlertDialogDescription asChild>
                        <div className='space-y-4 text-sm'>
                            <p>
                                Are you sure you want to delete{' '}
                                <span className='font-bold'>{item.name}</span> (CPF: {item.cpf})?
                                <br />
                                This operation cannot be undone.
                            </p>

                            <div className='space-y-2'>
                                <Label htmlFor='confirm-delete'>
                                    Type the name to confirm
                                </Label>
                                <Input
                                    id='confirm-delete'
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder='Enter name to confirm deletion'
                                />
                            </div>

                            <Alert variant='destructive'>
                                <AlertTitle>Warning!</AlertTitle>
                                <AlertDescription>
                                    Please be careful, this delete is permanent.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={!isValid} onClick={() => console.log('Deleting...', item.id)}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
