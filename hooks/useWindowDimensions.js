// borrowed from stackoverflow
// https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs/59185109#59185109

import { useState, useEffect } from "react"

export default function useWindowDimensions() {

    const hasWindow = typeof window !== 'undefined'

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;        
        
        return {
            width,
            height,
        }
    }

    const [windowDimensions, setWindowDimensions] = useState({ width: null, height: null })

    useEffect(() => {
         if (hasWindow) {
            setWindowDimensions(getWindowDimensions())
            function handleResize() {
                setWindowDimensions(getWindowDimensions())
            }

            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
         }
    }, [hasWindow])

    return windowDimensions
}