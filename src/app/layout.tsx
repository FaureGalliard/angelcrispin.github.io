import './globals.css'
import type { Metadata } from 'next'
import { Inter, Fira_Code, JetBrains_Mono, Roboto, Google_Sans } from 'next/font/google'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import Contact from '@/components/Contact'
import Services from '@/components/Services'
const firaCode = Fira_Code({
    subsets: ['latin'],
    variable: '--font-fira-code',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    display: 'swap',
})
const googleSans = Google_Sans({
    subsets: ['latin'],
    variable: '--font-google-sans',
    display: 'swap',
})
export const metadata: Metadata = {
    title: 'Ángel Crispín ',
    description: 'Ingeniero de Software, Data Science y Proyectos Tecnológicos',
    icons: {
        icon: 'https://avatars.githubusercontent.com/u/92346624?v=4',
    },
    openGraph: {
        title: 'Ángel Crispín | Ingeniero de Software',
        description: 'Ingeniero de Software, Data Science y Proyectos Tecnológicos',
        url: 'https://angelcrispin.dev',
        siteName: 'Ángel Crispín',
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
            className={`${inter.variable} ${firaCode.variable} ${jetbrainsMono.variable} ${roboto.variable} ${googleSans.variable}       antialiased`}>
            <body className="">
                <SmoothScroll>{children}</SmoothScroll>
            </body>
        </html>
    )
}
