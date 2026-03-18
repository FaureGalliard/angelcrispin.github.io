import './globals.css'
import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import HamburgerMenu from '@/components/HamburgerMenu'

const firaCode = Fira_Code({
    subsets: ['latin'],
    variable: '--font-fira-code',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Angel Crispin',
    description: 'Ingeniero de Software, Data Science y Proyectos Tecnológicos',
    icons: {
        icon: 'https://avatars.githubusercontent.com/u/92346624?v=4',
    },
    openGraph: {
        title: 'Angel Crispin | Ingeniero de Software',
        description: 'Ingeniero de Software, Data Science y Proyectos Tecnológicos',
        url: 'https://angelcrispin.dev',
        siteName: 'Angel Crispin',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="es"
            className={`${inter.variable} ${firaCode.variable} antialiased`}>
            <body>
                <SmoothScroll>
                    <HamburgerMenu />
                    {children}
                </SmoothScroll>
            </body>
        </html>
    )
}
