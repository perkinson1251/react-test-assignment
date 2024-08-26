import { forwardRef } from 'react'

interface ButtonOptions {}

type Ref = HTMLButtonElement

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  ButtonOptions

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const { type = 'button', children, ...rest } = props
  return (
    <button
      ref={ref}
      className="border border-main text-black w-[200px] font-light text-sm py-[14px] hover:bg-main active:bg-main transition-all disabled:text-main disabled:pointer-events-none disabled:cursor-default"
      {...rest}
    >
      {children}
    </button>
  )
})

export { Button }
