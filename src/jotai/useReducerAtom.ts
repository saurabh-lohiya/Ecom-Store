import { PrimitiveAtom } from "jotai"
import { useAtom } from "jotai"
import { useCallback } from "react"

export default function useReducerAtom<Value, Action>(
    anAtom: PrimitiveAtom<Value>,
    reducer: (state: Value, action: Action) => Value
) {
    const [state, setState] = useAtom(anAtom)
    const dispatch = useCallback(
        (action: Action) => {
            setState((prev) => reducer(prev, action))
        },
        [setState, reducer]
    )
    return [state, dispatch] as const
}
