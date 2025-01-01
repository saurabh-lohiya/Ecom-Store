import { FC } from "react"
import modalAtom from "../../jotai/modal"
import { useAtom } from "jotai"

const Modal: FC = () => {
    const [modal, toggleModal] = useAtom(modalAtom)
    const { children } = modal
    if (!modal.isOpen) return null
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <button
                className="absolute bg-white top-2 right-4 px-4 py-2 rounded"
                onClick={() => toggleModal({ isOpen: false, children: null })}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            {children}
        </div>
    )
}

export default Modal
