import { Button } from '@/components/ui/button'
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

interface EditRouterSupervisorFormProps {
    item: {
        id: number
        name: string
        cpf: string
        active: boolean
    }
}

export function EditRouterSupervisorForm({
    item,
}: EditRouterSupervisorFormProps) {
    const [active, setActive] = useState(item.active)

    return (
        <>
            <DialogHeader className='text-start'>
                <DialogTitle>Edit Router Supervisor</DialogTitle>
                <DialogDescription>
                    Update the router supervisor details here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>

            <div className='space-y-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-right'>
                        Name
                    </Label>
                    <Input
                        id='name'
                        defaultValue={item.name}
                        className='col-span-3'
                    />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='cpf' className='text-right'>
                        CPF
                    </Label>
                    <Input
                        id='cpf'
                        defaultValue={item.cpf}
                        className='col-span-3'
                    />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='active' className='text-right'>
                        Status
                    </Label>
                    <div className='flex items-center space-x-2 col-span-3'>
                        <Switch
                            id='active'
                            checked={active}
                            onCheckedChange={setActive}
                        />
                        <Label htmlFor='active'>{active ? 'Ativo' : 'Inativo'}</Label>
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button type='submit' onClick={() => console.log('Saving...', { ...item, active })}>
                    Save changes
                </Button>
            </DialogFooter>
        </>
    )
}
