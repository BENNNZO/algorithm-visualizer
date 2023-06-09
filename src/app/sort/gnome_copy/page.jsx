"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toner } from '@/utils/playTone';

export default function page(props) {
    const { push } = useRouter()

    const [speed, setSpeed] = useState(50)
    const [amount, setAmount] = useState(50)
    const [array, setArray] = useState([])

    const [iterationState, setIterationState] = useState(0)
    const [indexState, setIndexState] = useState(0)

    const [sorting, setSorting] = useState(false)

    useEffect(() => {
        setArray(shuffle([...Array(amount).keys()]))
    }, [amount])

    useEffect(() => {
        if (sorting) {
            setSorting(true)
            let tone = new toner
            let iteration = iterationState
            let index = indexState
            let newArray = [...array]
    
            function frame() {
                if (index < array.length) {
                    let num1 = newArray[index]
                    let num2 = newArray[index - 1]
                    if (num1 < num2) {
                        newArray[index - 1] = num1
                        newArray[index] = num2
                        index--
                        setIndexState(index)
                        setArray(newArray)
                        tone.freq((200 / amount) * (index * 7) + 150)
                    } else {
                        iteration++
                        index = iteration
                        setIndexState(index)
                        setIterationState(iteration)
                        setArray(newArray)
                        tone.freq((200 / amount) * (index * 7) + 150)
                    }
                } else {
                    setIterationState(0)
                    setIndexState(0)
                    clearInterval(frameInterval)
                    setSorting(false)
                    tone.stop()
                }
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
    }, [sorting, speed])

    
    function shuffle(array) { // shuffle function was found on bost.ocks.org/mike/shuffle
        var copy = [], n = array.length, i;

        while (n) {
            i = Math.floor(Math.random() * n--);
            copy.push(array.splice(i, 1)[0]);
        }

        return copy;
    }

    return (
        <div className='flex flex-row items-end h-full w-full justify-around gap-0.5'>
            <p>{props.title}</p>
            <p>{props.randomNumber}</p>
            {array.map((e, i) => {
                return (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${(e + 1) * (100 / amount)}%` }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className={`transition-color shadow-md w-full ${indexState === i ? 'bg-red-400' : e !== i ? 'bg-slate-600' : 'bg-green-400'} rounded-md`}
                    />
                )
            })}
        </div>
    )
}