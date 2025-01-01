import { useState, useEffect, ReactNode, FC } from "react"

interface CSSTransitionProps {
    in: boolean
    timeout: number
    classNames: string
    children: ReactNode
    unmountOnExit?: boolean
}

const CSSTransition: FC<CSSTransitionProps> = ({
    in: inProp,
    timeout,
    classNames,
    children,
    unmountOnExit = true,
}) => {
    const [show, setShow] = useState(inProp)
    const [state, setState] = useState<string>("")

    useEffect(() => {
        let enterTimeout: NodeJS.Timeout
        let exitTimeout: NodeJS.Timeout
        let unmountTimeout: NodeJS.Timeout

        if (inProp) {
            setShow(true)
            setState(`${classNames}-appear`)
            enterTimeout = setTimeout(() => {
                setState(`${classNames}-appear-active`)
            }, 10) // Slight delay to allow CSS transition
        } else if (show) {
            setState(`${classNames}-exit`)
            exitTimeout = setTimeout(() => {
                setState(`${classNames}-exit-active`)
            }, 10)

            if (unmountOnExit) {
                unmountTimeout = setTimeout(() => {
                    setShow(false)
                }, timeout)
            }
        }

        return () => {
            clearTimeout(enterTimeout)
            clearTimeout(exitTimeout)
            clearTimeout(unmountTimeout)
        }
    }, [inProp, classNames, timeout, show, unmountOnExit])

    if (!show && unmountOnExit) return null

    return (
        <div className={state +"w-[100%] h-[100%]"}>
            {children}
        </div>
    )
}

export default CSSTransition