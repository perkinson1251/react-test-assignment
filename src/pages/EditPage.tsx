import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import LocalStorageService from '@/services/localStorageService'
import { Option, User } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'

const EditPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [fullName, setFullName] = useState('')
  const [selectedDepartmentForUser, setSelectedDepartmentForUser] = useState<Option | undefined>(undefined)
  const [selectedCountryForUser, setSelectedCountryForUser] = useState<Option | undefined>(undefined)
  const [selectedStatusForUser, setSelectedStatusForUser] = useState<Option | undefined>(undefined)
  const [departments, setDepartments] = useState<Option[]>([])
  const [countries, setCountries] = useState<Option[]>([])
  const [statuses, setStatuses] = useState<Option[]>([])

  const fetchOptions = useCallback(() => {
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
    fetchOptions()
    setUsers(LocalStorageService.getUsers())
  }, [fetchOptions])

  const handleUserSelect = (selected: Option | Option[]) => {
    const userName = (Array.isArray(selected) ? selected[0]?.value : selected?.value) as string
    const user = users.find((user) => user.name === userName)
    if (user) {
      setSelectedUser(user)
      setFullName(user.name)
      setSelectedDepartmentForUser({ value: user.department.value, label: user.department.name })
      setSelectedCountryForUser({ value: user.country.value, label: user.country.name })
      setSelectedStatusForUser({ value: user.status.value, label: user.status.name })
    } else {
      setSelectedUser(undefined)
    }
  }

  const save = () => {
    if (!selectedUser || !selectedDepartmentForUser || !selectedCountryForUser || !selectedStatusForUser) return

    const updatedUser: User = {
      ...selectedUser,
      name: fullName,
      department: {
        name: selectedDepartmentForUser.label,
        value: selectedDepartmentForUser.value,
      },
      country: {
        name: selectedCountryForUser.label,
        value: selectedCountryForUser.value,
      },
      status: {
        name: selectedStatusForUser.label,
        value: selectedStatusForUser.value,
      },
    }

    LocalStorageService.updateUser(updatedUser)

    const updatedUsers = users.map((user) => (user.name === updatedUser.name ? updatedUser : user))
    setUsers(updatedUsers)
    setSelectedUser(updatedUser)
    alert('Information updates successfully!')
  }

  const undo = () => {
    if (selectedUser) {
      setFullName(selectedUser.name)
      setSelectedDepartmentForUser({ value: selectedUser.department.value, label: selectedUser.department.name })
      setSelectedCountryForUser({ value: selectedUser.country.value, label: selectedUser.country.name })
      setSelectedStatusForUser({ value: selectedUser.status.value, label: selectedUser.status.name })
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <Heading level={1} className="text-center">
        Edit User
      </Heading>
      <Select
        label="User"
        options={users.map((user) => ({ label: user.name, value: user.name }))}
        onChange={handleUserSelect}
        placeholder="Select a user"
      />
      {selectedUser && (
        <>
          <Heading level={2}>User Information</Heading>
          <div className="grid gap-[40px] gap-y-3 grid-cols-2 grid-rows-2">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter the full name"
            />
            <Select
              isFullWidth
              label="Department"
              placeholder="Select department"
              options={departments}
              onChange={(selected: Option[]) => setSelectedDepartmentForUser(selected[0] || undefined)}
              selectedOptions={selectedDepartmentForUser ? [selectedDepartmentForUser] : []}
              onClear={() => setSelectedDepartmentForUser(undefined)}
              disabled={false}
            />
            <Select
              isFullWidth
              label="Country"
              placeholder="Select country"
              options={countries}
              onChange={(selected: Option[]) => setSelectedCountryForUser(selected[0] || undefined)}
              selectedOptions={selectedCountryForUser ? [selectedCountryForUser] : []}
              onClear={() => setSelectedCountryForUser(undefined)}
              disabled={false}
            />
            <Select
              isFullWidth
              label="Status"
              placeholder="Select status"
              options={statuses}
              onChange={(selected: Option[]) => setSelectedStatusForUser(selected[0] || undefined)}
              selectedOptions={selectedStatusForUser ? [selectedStatusForUser] : []}
              onClear={() => setSelectedStatusForUser(undefined)}
              disabled={false}
            />
          </div>
          <div className="flex gap-x-3 justify-center">
            <Button onClick={undo}>Undo</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default EditPage
