import { atom } from "jotai";
import { ReactNode } from "react";

const modalAtom = atom<{ isOpen: boolean; children: ReactNode }>({
    isOpen: false,
    children: null,
})

export default modalAtom