import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface RoleOption {
    id: number
    name: string
}

interface EditUserFormProps {
    user: {
        id: number
        name: string
        email: string
        roleId: number
    }
    roles?: RoleOption[]
}

export function EditUserForm({
    user,
    roles = [],
}: EditUserFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [roleId, setRoleId] = useState(String(user.roleId))

    return (
        <>
            <DialogHeader className='text-start'>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                    Update the user here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>

            <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
                <div className='space-y-4 px-0.5'>
                    <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                        <Label htmlFor='username' className='col-span-2 text-end'>
                            Username
                        </Label>
                        <Input
                            id='username'
                            value={user.name}
                            readOnly
                            className='col-span-4'
                        />
                    </div>

                    <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                        <Label htmlFor='email' className='col-span-2 text-end'>
                            Email
                        </Label>
                        <Input
                            id='email'
                            type='email'
                            value={user.email}
                            readOnly
                            className='col-span-4'
                        />
                    </div>

                    <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                        <Label className='col-span-2 text-end'>Role</Label>
                        <div className='col-span-4'>
                            <Select value={roleId} onValueChange={setRoleId}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select a role' />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.length > 0 ? (
                                        roles.map((role) => (
                                            <SelectItem key={role.id} value={String(role.id)}>
                                                {role.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value='no-role' disabled>
                                            No roles available
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                        <Label htmlFor='password' className='col-span-2 text-end'>
                            Password
                        </Label>
                        <div className='relative col-span-4'>
                            <Input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='e.g. S3cur3P@ssw0rd'
                                className='pr-10'
                                readOnly
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute right-3 top-1/2 -translate-y-1/2'
                            >
                                {showPassword ? (
                                    <EyeOff className='h-4 w-4' />
                                ) : (
                                    <Eye className='h-4 w-4' />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                        <Label htmlFor='confirmPassword' className='col-span-2 text-end'>
                            Confirm Password
                        </Label>
                        <div className='relative col-span-4'>
                            <Input
                                id='confirmPassword'
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='e.g. S3cur3P@ssw0rd'
                                className='pr-10'
                                readOnly
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className='absolute right-3 top-1/2 -translate-y-1/2'
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className='h-4 w-4' />
                                ) : (
                                    <Eye className='h-4 w-4' />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button type='button' disabled>
                    Save changes
                </Button>
            </DialogFooter>
        </>
    )
}