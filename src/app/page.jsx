"use client"

import { useRouter } from "next/navigation"

import { sort } from "@/constants/sort"
import { path } from "@/constants/path"

export default function Home() {
	const { push } = useRouter()

	

	return (
		<main className="bg-gray-950 h-screen p-20">
			<div className="w-full h-full flex flex-col bg-gray-800 rounded-xl shadow-xl">
				<div className="h-full relative">
					<h2 className="text-3xl my-5 text-slate-400 text-center px-4 py-2 font-bold">Sorting Algorithms</h2>
					<div className="h-full flex flex-wrap flex-row justify-center gap-5 items-start">
						{sort.map(e => (
							<div onClick={() => push(e.link)} className="cursor-pointer hover:bg-slate-500 hover:text-slate-200 transition-colors flex flex-row px-5 py-2 bg-slate-600 rounded-md shadow-md text-slate-300">
								<p>{e.title}</p>
							</div>
						))}
					</div>
				</div>
				<span className="h-px w-11/12 bg-gray-700 mx-auto"/>
				<div className="h-full">
					<h2 className="text-3xl text-slate-400 text-center px-4 py-2 font-bold my-5">Path Finding Algorithms</h2>
					<div className="h-full">

					</div>
				</div>
			</div>
		</main>
	)
}