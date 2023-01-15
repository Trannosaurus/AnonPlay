import "../styles/globals.css";
import {AnalyticsWrapper } from './analytics'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head></head>
            <body >
                {children}
                <AnalyticsWrapper />
            </body>
        </html>
    )
}

