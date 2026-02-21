export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <body className="bg-black text-white antialiased overflow-x-hidden">
            {children}
        </body>
    )
}