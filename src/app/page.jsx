"use client"

import { useRouter } from "next/navigation"

export default function Home() {
	const { push } = useRouter()

	return (
		<main className="bg-neutral-900">
			Hello World!
			Data Visualization
			<button onClick={() => push('/sort/bubble')} className="px-2 py-1 bg-white border border-neutral-300 m-5">Bubble</button>
			<button onClick={() => push('/sort/gnome')}  className="px-2 py-1 bg-white border border-neutral-300 m-5">Gnome</button>
		</main>
	)
}