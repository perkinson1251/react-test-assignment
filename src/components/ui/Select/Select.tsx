import { Input } from '@/components/ui/Input'
import useOutsideClick from '@/hooks/useOutsideClick'
import { Option } from '@/types'
import { Icon } from '@iconify/react'
import React, { useEffect, useRef, useState } from 'react'

interface SelectProps {
  label?: string
  options: Option[]
  isMultiSelect?: boolean
  onChange: (selected: Option[]) => void
  disabled?: boolean
  placeholder?: string
  selectedOptions?: Option[]
  isFullWidth?: boolean
  onClear?: () => void
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  isMultiSelect = false,
  onChange,
  disabled = false,
  placeholder,
  selectedOptions = [],
  isFullWidth = false,
  onClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearchTerm('')
  }, [selectedOptions])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    if (!isOpen) setIsOpen(true)
  }

  const handleOptionToggle = (option: Option) => {
    let updatedOptions: Option[]
    if (isMultiSelect) {
      updatedOptions = selectedOptions.some((o) => o.value === option.value)
        ? selectedOptions.filter((o) => o.value !== option.value)
        : [...selectedOptions, option]
    } else {
      updatedOptions = selectedOptions.some((o) => o.value === option.value) ? [] : [option]
      setIsOpen(false)
    }
    onChange(updatedOptions)
    setSearchTerm('')
  }

  const filteredOptions = options.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const sortedOptions = [
    ...selectedOptions,
    ...filteredOptions.filter((item) => !selectedOptions.some((selectedItem) => selectedItem.value === item.value)),
  ].sort((a, b) => {
    const aIsSelected = selectedOptions.some((selectedItem) => selectedItem.value === a.value)
    const bIsSelected = selectedOptions.some((selectedItem) => selectedItem.value === b.value)
    return aIsSelected === bIsSelected ? 0 : aIsSelected ? -1 : 1
  })

  useOutsideClick({
    ref: selectRef,
    handler: () => setIsOpen(false),
  })

  const getPlaceholder = () => {
    if (isMultiSelect) {
      return selectedOptions.length > 0 ? `Selected (${selectedOptions.length})` : placeholder || 'Select options...'
    } else {
      return selectedOptions.length > 0 ? selectedOptions[0].label : placeholder || 'Select option...'
    }
  }

  return (
    <div ref={selectRef} className={`w-full ${isFullWidth || 'max-w-xs'}`}>
      {label && <label className="block text-sm text-gray-medium mb-1">{label}</label>}
      <div className="relative">
        <Input
          value={searchTerm}
          placeholder={getPlaceholder()}
          onChange={handleSearch}
          onClick={() => {
            if (!disabled) setIsOpen(true)
          }}
          disabled={disabled}
          icon="material-symbols:keyboard-arrow-down"
          iconPosition="right"
          className={isOpen ? 'border-t border-x border-black' : 'border border-gray-light'}
        />
        {isOpen && (
          <div
            className={`absolute z-10 w-full bg-white max-h-60 text-sm overflow-auto border-b border-x border-black`}
          >
            {sortedOptions.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer select-none relative py-2 pl-6 gap-3 hover:bg-gray-light flex items-center transition-all"
                onClick={() => handleOptionToggle(option)}
              >
                {isMultiSelect && (
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedOptions.some((o) => o.value === option.value)}
                      onChange={() => handleOptionToggle(option)}
                      className="size-6 appearance-none border-2 border-black checked:bg-black checked:border-black"
                    />
                    {selectedOptions.some((o) => o.value === option.value) && (
                      <Icon
                        icon="material-symbols:check"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black"
                        style={{ fontSize: '16px' }}
                      />
                    )}
                  </div>
                )}
                <span className="block truncate text-sm font-light">{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { Select }
