'use client'
import { createContext, useContext } from 'react'

type TransitionContextType = {
    navigate: (href: string) => void
}

export const TransitionContext = createContext<TransitionContextType>({
    navigate: () => {},
})

export const usePageTransition = () => useContext(TransitionContext)
