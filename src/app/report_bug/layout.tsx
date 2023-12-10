export default function RPLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-[#EBEBE6]">
                {children}
            </body>
        </html >
    )
}