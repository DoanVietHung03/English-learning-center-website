import './globals.css'
import { metadata } from './metadata'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            <body className="bg-[#E0F7FE]" >
                {children}
            </body>
        </html >
    )
}