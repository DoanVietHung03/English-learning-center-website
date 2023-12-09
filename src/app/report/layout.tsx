export default function RPLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-[#E0F7FE]">
                {children}
            </body>
        </html >
    )
}