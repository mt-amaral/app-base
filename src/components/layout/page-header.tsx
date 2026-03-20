import { ChevronRight } from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { usePageBreadcrumb } from '@/hooks/use-page-breadcrumb'

type PageHeaderProps = {
    fixed?: boolean
}

export function PageHeader({ fixed }: PageHeaderProps) {
    const breadcrumb = usePageBreadcrumb()

    return (
        <Header fixed={fixed}>
            <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2 text-sm'>
                    {breadcrumb.map((item, index) => {
                        const isLast = index === breadcrumb.length - 1

                        return (
                            <div key={`${item.label}-${index}`} className='flex items-center gap-2'>
                                <span
                                    className={
                                        isLast
                                            ? 'font-medium text-foreground'
                                            : 'text-muted-foreground'
                                    }
                                >
                                    {item.label}
                                </span>

                                {!isLast ? (
                                    <ChevronRight className='h-4 w-4 text-muted-foreground' />
                                ) : null}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='ms-auto flex items-center space-x-4'>
                {/* <Search /> */}
                {/* <ThemeSwitch /> */}
            </div>
        </Header>
    )
}