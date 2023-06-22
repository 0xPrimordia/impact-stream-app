import React, { useEffect } from 'react';
import Image from 'next/image'

export const Navbar = () => {
    return (
        <div className="mb-8">
            <Image
                src="/impact-stream-logo.svg"
                alt="Impact Stream"
                className="dark:invert"
                width={161}
                height={63}
                priority
            />
        </div> 
    )
}