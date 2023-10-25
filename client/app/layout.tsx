'use client'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		require('preline')
		console.log('preline')
	}, [])
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
