import { useState, useEffect } from "react"


const useDebounce = <T>(value: T, delay: number = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedValue(value)
        }, delay)

        return()=>{
            clearTimeout(timer)
        }
    })

    return debouncedValue
}

export default useDebounce