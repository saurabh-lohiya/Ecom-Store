import React, { ReactNode } from "react"

const FormWrapper: React.FC<{children: ReactNode}> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-sm">
        {props.children}
      </div>
    </div>
  )
}

export default FormWrapper
