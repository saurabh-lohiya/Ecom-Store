import { useAtom } from "jotai"
import modalAtom from "../jotai/modal"
import { useCallback, useEffect } from "react"

export function useModal() {
    const [Modal, toggleModal] = useAtom(modalAtom)
    
    function afterModalOpen() {
        document.body.style.overflow = "hidden"
    }

    const closeModal = useCallback(() => {
        toggleModal({ isOpen: false, children: null })
    }, [toggleModal])
    
    function toggleModalState(children: React.ReactNode = null) {
        if (Modal.isOpen) {
            closeModal()
        } else {
            openModal(children)
        }
    }

    function openModal(children: React.ReactNode) {
        toggleModal({ isOpen: true, children })
    }

    useEffect(() => {
        if (Modal.isOpen) {
            afterModalOpen()
        }
        return () => closeModal()
    }, [Modal.isOpen, closeModal])

    return {
        toggleModalState,
    }
}