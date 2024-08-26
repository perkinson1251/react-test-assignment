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
  selectedOptions?: Option[] // New prop for selected options
  onClear?: () => void // New prop for clear action
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  isMultiSelect = false,
  onChange,
  disabled = false,
  placeholder,
  selectedOptions = [], // Use the selectedOptions prop
  onClear, // Use the onClear prop
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Update internal state when selectedOptions changes
    setSearchTerm('')
  }, [selectedOptions])

  const toggleDropdown = () => setIsOpen((prev) => !prev)

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

  const sortedOptions = [
    ...selectedOptions,
    ...options.filter(
      (item) =>
        !selectedOptions.some((selectedItem) => selectedItem.value === item.value) &&
        item.label.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  ].sort((a, b) => {
    const aIsSelected = selectedOptions.some((selectedItem) => selectedItem.value === a.value)
    const bIsSelected = selectedOptions.some((selectedItem) => selectedItem.value === b.value)
    return aIsSelected === bIsSelected ? 0 : aIsSelected ? -1 : 1
  })

  useOutsideClick({
    ref: selectRef,
    handler: () => setIsOpen(false),
  })

  return (
    <div ref={selectRef} className="w-full max-w-xs">
      {label && <label className="block text-sm text-gray-medium mb-1">{label}</label>}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder={
              isMultiSelect && selectedOptions.length > 0
                ? `Selected (${selectedOptions.length})`
                : placeholder
                  ? placeholder
                  : isMultiSelect
                    ? 'Select options...'
                    : 'Select option...'
            }
            value={searchTerm}
            onChange={handleSearch}
            onClick={() => {
              if (!disabled) {
                setIsOpen(true)
              }
            }}
            disabled={disabled}
            className={`w-full pl-6 py-[14px] ${isOpen ? 'border-t border-x border-black' : 'border border-gray-light'}  focus:outline-none`}
          />
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                toggleDropdown()
              }
            }}
            className="absolute inset-y-0 right-0 px-6 text-gray-medium"
          >
            <Icon icon="material-symbols:keyboard-arrow-down" />
          </button>
        </div>
        {isOpen && (
          <div
            className={`absolute z-10 w-full bg-white max-h-60 text-sm overflow-auto focus:outline-none ${isOpen && 'border-b border-x border-black'}`}
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
