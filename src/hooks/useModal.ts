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
    
    const openModal = useCallback((children: React.ReactNode) => {
        toggleModal({ isOpen: true, children })
    }, [toggleModal])

    const toggleModalState = useCallback((children: React.ReactNode = null) => {
        if (children) {
            openModal(children)
        } else {
            closeModal()
        }
    }, [openModal, closeModal])

    useEffect(() => {
        if (Modal.isOpen) {
            afterModalOpen()
        } else {
            document.body.style.overflow = "auto"
        }
        // Removed the cleanup function that was closing the modal
    }, [Modal.isOpen])

    return {
        Modal,
        toggleModalState,
    }
}