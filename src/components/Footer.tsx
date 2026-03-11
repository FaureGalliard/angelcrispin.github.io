'use client'
import { useState, useEffect } from 'react'

const TIMEZONE = 'America/Lima'
const TIMEZONE_LABEL = 'GMT-5'
const EDITION = '2026 © Edition'

function LocalTime() {
    const [time, setTime] = useState('')

    useEffect(() => {
        const update = () =>
            setTime(
                new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: TIMEZONE,
                }),
            )

        update()
        const id = setInterval(update, 1000)
        return () => clearInterval(id)
    }, [])

    return <>{time}</>
}

export default function Footer() {
    return (
        <footer className="py-8">
            <div className="mx-auto px-6 flex justify-between text-[12px] text-gray">
                <div>
                    Version
                    <br />
                    <span className="text-[13px] text-black">{EDITION}</span>
                </div>
                <div>
                    LocalTime
                    <br />
                    <span className="text-[13px] text-black">
                        <LocalTime /> {TIMEZONE_LABEL}
                    </span>
                </div>
            </div>
        </footer>
    )
}
