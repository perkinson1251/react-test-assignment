import React from 'react'

interface HeadingProps {
  level: 1 | 2
  className?: string
  children: React.ReactNode
}

const Heading: React.FC<HeadingProps> = ({ level, className, children }) => {
  const baseStyles = {
    1: 'text-2xl text-black uppercase font-medium tracking-[6px]',
    2: 'text-xl leading-8',
  }

  const styles = `${baseStyles[level]} ${className ? className : ''}`

  switch (level) {
    case 1:
      return <h1 className={styles}>{children}</h1>
    case 2:
      return <h2 className={styles}>{children}</h2>
    default:
      return null
  }
}

export { Heading }
