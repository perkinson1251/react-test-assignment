import React from 'react'

interface Props {
  children: React.ReactNode
  open?: boolean
  className?: string
}

const Modal: React.FC<Props> = ({ children, open = true, className }) => {
  return (
    <div
      className={`fixed inset-0 z-10 bg-gray-600/90 ${open ? 'flex items-center justify-center' : 'hidden'} ${className}`}
    >
      <div className="relative w-[720px] mx-auto bg-white border border-black px-[60px] py-[40px] m">{children}</div>
    </div>
  )
}

export { Modal }
