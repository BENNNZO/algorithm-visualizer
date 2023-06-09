"use client"

import { useRouter } from "next/navigation"

import { sort } from "@/constants/sort"
import { path } from "@/constants/path"

export default function Home() {
	const { push } = useRouter()

	

	return (
		<main className="bg-gray-950 h-screen p-20">
			<div className="w-full h-full flex flex-col bg-gray-800 rounded-xl shadow-xl">
				<h2 className="text-2xl text-gray-400 text-center px-4 py-2 font-bold">Sorting Algorithms</h2>
				<div className="h-full">

				</div>
				<span className="h-px w-11/12 bg-gray-700 mx-auto"/>
				<h2 className="text-2xl text-gray-400 text-center px-4 py-2 font-bold">Path Finding Algorithms</h2>
				<div className="h-full">

				</div>
			</div>
		</main>
	)
}