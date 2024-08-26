import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Select } from '@/components/ui/Select'
import LocalStorageService from '@/services/localStorageService'
import { Option } from '@/types'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'

const UsersPage: React.FC = () => {
  const [countries, setCountries] = useState<Option[]>([])
  const [departments, setDepartments] = useState<Option[]>([])
  const [statuses, setStatuses] = useState<Option[]>([])
  const [selectedDepartments, setSelectedDepartments] = useState<Option[]>([])
  const [selectedCountries, setSelectedCountries] = useState<Option[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<Option[]>([])

  useEffect(() => {
    const fetchedCountries = LocalStorageService.getCountries().map((country) => ({
      label: country.name,
      value: country.value,
    }))

    const fetchedDepartments = LocalStorageService.getDepartments().map((department) => ({
      label: department.name,
      value: department.value,
    }))

    const fetchedStatuses = LocalStorageService.getStatuses().map((status) => ({
      label: status.name,
      value: status.value,
    }))

    setCountries(fetchedCountries)
    setDepartments(fetchedDepartments)
    setStatuses(fetchedStatuses)
  }, [])

  useEffect(() => {
    if (selectedDepartments.length < 3) {
      setSelectedCountries([])
      setSelectedStatuses([])
    }
  }, [selectedDepartments])

  const handleDepartmentChange = (selected: Option[]) => {
    setSelectedDepartments(selected)
  }

  const handleCountryChange = (selected: Option[]) => {
    setSelectedCountries(selected)
  }

  const handleStatusChange = (selected: Option[]) => {
    setSelectedStatuses(selected)
  }

  const clearFilters = () => {
    setSelectedDepartments([])
    setSelectedCountries([])
    setSelectedStatuses([])
  }

  const areFiltersDisabled = selectedDepartments.length < 3

  return (
    <div>
      <Heading level={1} className="text-center mb-10">
        Users
      </Heading>
      <p className="text-sm font-light text-accent mb-3">
        Please add at least 3 departments to be able to proceed to the next steps.
      </p>
      <div className="flex md:flex-row flex-col justify-between items-center">
        <div className="gap-1 flex items-center">
          <Select
            placeholder="Select departments"
            options={departments}
            isMultiSelect
            onChange={handleDepartmentChange}
            selectedOptions={selectedDepartments}
            onClear={() => setSelectedDepartments([])}
            disabled={false}
          />
          <Select
            placeholder="Select country"
            options={countries}
            isMultiSelect
            onChange={handleCountryChange}
            selectedOptions={selectedCountries}
            onClear={() => setSelectedCountries([])}
            disabled={areFiltersDisabled}
          />
          <Select
            placeholder="Select status"
            options={statuses}
            isMultiSelect
            onChange={handleStatusChange}
            selectedOptions={selectedStatuses}
            onClear={() => setSelectedStatuses([])}
            disabled={areFiltersDisabled}
          />
          <Button isIcon onClick={clearFilters}>
            <Icon className="size-8" icon="material-symbols:delete-forever-outline" />
          </Button>
        </div>
        <Button>Add User</Button>
      </div>
    </div>
  )
}

export default UsersPage
