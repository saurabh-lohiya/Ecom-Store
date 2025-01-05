import { useState, useEffect } from "react"

type DeviceType = "mobile" | "tablet" | "desktop"

const useDevice = (): DeviceType => {
    const [device, setDevice] = useState<DeviceType>(getDeviceType())

    function getDeviceType(): DeviceType {
        const width = window.innerWidth
        if (width < 640) return "mobile"
        if (width >= 640 && width < 1024) return "tablet"
        return "desktop"
    }

    useEffect(() => {
        const handleResize = () => {
            const currentDevice = getDeviceType()
            if (currentDevice !== device) {
                setDevice(currentDevice)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [device])

    return device
}

export default useDevice
