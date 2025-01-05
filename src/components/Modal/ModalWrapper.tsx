import { FC } from "react"
import Modal from "./index"
import CSSTransition from "./CSSTransition" // Import custom CSSTransition
import { useModal } from "../../hooks"
import "./ModalWrapper.css" // Import CSS for animations

const ModalWrapper: FC = () => {
    const { Modal: { isOpen } } = useModal() // Get isOpen state

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="modal"
            unmountOnExit
        >
            <Modal />
        </CSSTransition>
    )
}

export default ModalWrapper