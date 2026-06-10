'use client'
import { usePageTransition } from '@/context/TransitionContext'

interface TransitionLinkProps {
    href: string
    children: React.ReactNode
    className?: string
}

export default function TransitionLink({ href, children, className }: TransitionLinkProps) {
    const { navigate } = usePageTransition()

    return (
        <span
            className={className}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(href)}>
            {children}
        </span>
    )
}
