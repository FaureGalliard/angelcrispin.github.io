import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import HamburgerMenu from '@/components/HamburgerMenu';
import TransitionProvider from '@/components/TransitionProvider';

const firaCode = Fira_Code({
    subsets: ['latin'],
    variable: '--font-fira-code',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Angel Crispin — Software Engineer',
        template: '%s | Angel Crispin',
    },
    description:
        'Software Engineer from Lima, Perú. I build scalable systems, ML-powered tools, and full-stack products. Currently building GRAMA at Industrias Roland Print.',
    keywords: ['Angel Crispin', 'Software Engineer', 'Full-Stack Developer', 'Next.js', 'TypeScript', 'Python', 'C++', 'Machine Learning', 'Lima', 'Perú'],
    authors: [{ name: 'Angel Crispin', url: 'https://angelcrispin.dev' }],
    creator: 'Angel Crispin',
    metadataBase: new URL('https://angelcrispin.dev'),
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: 'https://avatars.githubusercontent.com/u/92346624?v=4',
    },
    openGraph: {
        title: 'Angel Crispin — Software Engineer',
        description: 'Software Engineer from Lima, Perú. I build scalable systems, ML-powered tools, and full-stack products.',
        url: 'https://angelcrispin.dev',
        siteName: 'Angel Crispin',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Angel Crispin — Software Engineer',
        description: 'Software Engineer from Lima, Perú. I build scalable systems, ML-powered tools, and full-stack products.',
        creator: '@angelcrispin',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='es' className={`${inter.variable} ${firaCode.variable} antialiased`}>
            <body>
                <SmoothScroll>
                    <TransitionProvider>
                        <HamburgerMenu />
                        {children}
                    </TransitionProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}
