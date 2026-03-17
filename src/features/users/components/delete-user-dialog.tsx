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

interface DeleteUserDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: {
        id: number
        name: string
        email: string
        roleId: number
        roleName: string
    }
}

export function DeleteUserDialog({
    open,
    onOpenChange,
    user,
}: DeleteUserDialogProps) {
    const [value, setValue] = useState('')

    const expectedValue = user.name
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
                            Delete User
                        </span>
                    </AlertDialogTitle>

                    <AlertDialogDescription asChild>
                        <div className='space-y-4 text-sm'>
                            <p>
                                Are you sure you want to delete{' '}
                                <span className='font-bold'>{user.name}</span>?
                                <br />
                                This action will permanently remove this user with the role{' '}
                                <span className='font-bold'>{user.roleName}</span> from the
                                system. This cannot be undone.
                            </p>

                            <div className='space-y-2'>
                                <Label htmlFor='confirm-user-delete'>
                                    Type the username to confirm
                                </Label>
                                <Input
                                    id='confirm-user-delete'
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder='Enter username to confirm deletion'
                                />
                            </div>

                            <Alert variant='destructive'>
                                <AlertTitle>Warning!</AlertTitle>
                                <AlertDescription>
                                    Please be careful, this operation cannot be rolled back.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={!isValid}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}