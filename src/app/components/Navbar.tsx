'use client'
import React, { useState } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image'

export const Navbar = () => {
    const [overlay, setOverlay] = useState(false);

    return (
        <>
            <div className="mb-8 z-50 relative inline-block">
                <Image
                    src="/impact-stream-logo.svg"
                    alt="Impact Stream"
                    className="dark:invert"
                    width={161}
                    height={63}
                    priority
                />
            </div>
            {overlay && (
                <nav className='brand-bg-color text-3xl font-bold fixed top-0 bottom-0 right-0 left-0 p-10 pt-40 z-40'>
                    <ul>
                        <li><a href="/proposals">Proposals</a></li>
                    </ul>
                    <XMarkIcon onClick={() => setOverlay(false)} className='h-8 absolute right-12 top-12' />
                </nav>
            )}
            {!overlay && (
                <div onClick={() => setOverlay(true)}>
                    <Bars3Icon className="h-8 absolute right-12 top-12" />
                </div>
            )}
            
        </>  
    )
}