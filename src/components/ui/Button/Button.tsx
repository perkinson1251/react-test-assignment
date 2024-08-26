import { forwardRef } from 'react'

interface ButtonOptions {
  isIcon?: boolean
}

type Ref = HTMLButtonElement

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  ButtonOptions

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const { type = 'button', children, isIcon = false, ...rest } = props

  return (
    <button
      ref={ref}
      type={type}
      className={`border border-main text-black hover:bg-main active:bg-main transition-all disabled:text-main disabled:pointer-events-none disabled:cursor-default ${isIcon ? 'p-2 flex items-center justify-center' : ' w-[200px] py-[14px] text-sm font-light'}`}
      {...rest}
    >
      {children}
    </button>
  )
})

export { Button }
