import { Icon } from '@iconify/react'
import React from 'react'

interface InputProps {
  type?: string
  value: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  className?: string
  additionalProps?: React.InputHTMLAttributes<HTMLInputElement>
  label?: string
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  onChange,
  onClick,
  disabled = false,
  icon,
  iconPosition = 'right',
  className = '',
  additionalProps = {},
  label,
}) => {
  return (
    <div className={`relative ${className}`}>
      {label && <label className="block text-sm text-gray-medium mb-1">{label}</label>}
      {icon && iconPosition === 'left' && (
        <Icon icon={icon} className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-medium" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        className={`w-full pl-6 py-[14px] ${icon && iconPosition === 'left' ? 'pl-12' : ''} ${icon && iconPosition === 'right' ? 'pr-12' : ''} border border-gray-light focus:outline-none`}
        {...additionalProps}
      />
      {icon && iconPosition === 'right' && (
        <Icon icon={icon} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-medium" />
      )}
    </div>
  )
}

export { Input }
