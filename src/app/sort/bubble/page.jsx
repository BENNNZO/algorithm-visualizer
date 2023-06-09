"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toner } from '@/utils/playTone';

export default function page() {
    const { push } = useRouter()

    const [array, setArray] = useState(shuffle([...Array(50).keys()]))
    const [amount, setAmount] = useState(50)
    const [speed, setSpeed] = useState(75)
    const [sorting, setSorting] = useState(false)

    const [iterationState, setIterationState] = useState(0)
    const [indexState, setIndexState] = useState(0)

    useEffect(() => {
        setArray(prev => shuffle(prev))   
    }, [])
    
    useEffect(() => {
        setArray(shuffle([...Array(amount).keys()]))
    }, [amount])

    function shuffle(array) { // shuffle function was found on bost.ocks.org/mike/shuffle
        var copy = [], n = array.length, i;

        while (n) {
            i = Math.floor(Math.random() * n--);
            copy.push(array.splice(i, 1)[0]);
        }

        return copy;
    }

    useEffect(() => {
        if (sorting) {
            let tone = new toner
            let iteration = iterationState
            let index = indexState
            let newArray = [...array]

            function frame() {
                if (iteration < array.length) {
                    if (index < array.length - 1 - iteration) {
                        let num1 = newArray[index]
                        let num2 = newArray[index + 1]
    
                        if (num1 > num2) {
                            newArray[index] = num2
                            newArray[index + 1] = num1
                        }
                        
                        index++
                        setIndexState(index)
                        setArray([...newArray])
                        tone.freq((200 / amount) * (index * 7) + 150)
                    } else {
                        iteration++
                        index = 0
                        setIterationState(iteration)
                        setIndexState(index)
                        tone.freq((100 / amount) * (index * 7) + 150)
                    }
                } else {
                    clearInterval(frameInterval)
                    setSorting(false)
                    tone.stop()
                }
                setArray(newArray)
            }

            const frameInterval = setInterval(() => {
                frame()
            }, Math.abs(100 - speed));
    
            frame()

            return () => {
                tone.stop()
                clearInterval(frameInterval)
            }
        }
    }, [speed, sorting])

    return (
        <div className='flex flex-col p-20 bg-gray-950 h-screen items-start justify-around'>
            <div className='flex flex-col w-full h-full bg-gray-800 shadow-lg p-5 rounded-lg border-gray-700 gap-5'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row gap-5 h-full'>
                        <button 
                            onClick={() => {
                                if (!sorting) {
                                    setIterationState(0)
                                    setIndexState(0)
                                    setArray(prev => shuffle(prev))
                                }
                            }}
                            className={`bg-slate-700 border-slate-500 px-3 py-1 rounded-md text-slate-300 transition-all ${sorting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            SHUFFLE
                        </button>
                        <button 
                            onClick={() => {
                                if (!sorting) {
                                    setIterationState(0)
                                    setIndexState(0)
                                    setSorting(true)
                                }
                            }}
                            className={`bg-slate-700 border-slate-500 px-3 py-1 rounded-md text-slate-300 transition-all ${sorting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            SORT
                        </button>
                        <div className={`flex flex-row gap-2 items-center h-full bg-slate-700 border-slate-500 rounded-md px-3 ${sorting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <p className='text-slate-300'>AMOUNT</p>
                            <input
                                className={`appearance-none bg-slate-800 h-2 rounded-full ${sorting ? 'pointer-events-none' : ''}`}
                                type="range"
                                min={5}
                                max={100}
                                value={amount}
                                onChange={e => {
                                    if (!sorting) {
                                        setAmount(parseInt(e.target.value))
                                    }
                                }} 
                            />
                        </div>
                        <div className='flex flex-row gap-2 items-center h-full bg-slate-700 border-slate-500 rounded-md px-3'>
                            <p className='text-slate-300'>SPEED</p>
                            <input
                                className='appearance-none bg-slate-800 h-2 rounded-full'
                                type="range"
                                min={1}
                                max={100}
                                value={speed}
                                onChange={e => setSpeed(parseInt(e.target.value))} 
                            />
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            push('/')
                        }}
                        className={`bg-slate-500 border-slate-400 px-3 py-1 rounded-md text-slate-200 transition-all`}
                    >
                        BACK
                    </button>
                </div>
                <span className='block w-full h-px bg-slate-600' />
                <div className='flex flex-row items-end h-full w-full justify-around gap-1'>
                    {array.map((e, i) => {
                        return (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${(e + 1) * (100 / amount)}%` }}
                                transition={{ duration: 0.1, ease: "easeOut" }}
                                className={`transition-color shadow-md w-full ${indexState === i ? 'bg-red-400' : array.length - iterationState > i ? 'bg-slate-600' : 'bg-green-400'} rounded-md`}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}