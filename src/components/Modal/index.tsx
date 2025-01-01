import { FC } from "react"
import { useModal } from "../../hooks/useModal"
import CloseIcon from "./CloseIcon"

const Modal: FC = () => {
    const {
        Modal: { children },
        toggleModalState,
    } = useModal()

    return (
        <div
            id="modal"
            className="fixed top-0 left-0 h-[100%] w-[100%] bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
        >
            <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-md m-auto z-60">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 rounded-full p-1 border-2 border-gray-600 hover:border-gray-800"
                    onClick={() => toggleModalState()}
                >
                    <CloseIcon />
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
