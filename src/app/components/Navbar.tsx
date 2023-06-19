import React, { useEffect } from 'react';
import Image from 'next/image'

export const Navbar = () => {
    return (
        <Image
            src="/impact-stream-logo.svg"
            alt="Impact Stream"
            className="dark:invert"
            width={100}
            height={24}
            priority
        />
    )
}