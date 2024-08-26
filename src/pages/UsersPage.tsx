import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Select'
import LocalStorageService from '@/services/localStorageService'
import { Option, User } from '@/types'
import { Icon } from '@iconify/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const UsersPage: React.FC = () => {
  const [countries, setCountries] = useState<Option[]>([])
  const [departments, setDepartments] = useState<Option[]>([])
  const [statuses, setStatuses] = useState<Option[]>([])

  const [selectedDepartment, setSelectedDepartment] = useState<Option | Option[] | undefined>(undefined)
  const [selectedCountry, setSelectedCountry] = useState<Option | Option[] | undefined>(undefined)
  const [selectedStatus, setSelectedStatus] = useState<Option | Option[] | undefined>(undefined)

  const [selectedDepartmentForUser, setSelectedDepartmentForUser] = useState<Option | undefined>(undefined)
  const [selectedCountryForUser, setSelectedCountryForUser] = useState<Option | undefined>(undefined)
  const [selectedStatusForUser, setSelectedStatusForUser] = useState<Option | undefined>(undefined)

  const [isModalOpen, setModalOpen] = useState(false)
  const [fullName, setFullName] = useState('')

  const [users, setUsers] = useState<User[]>([])

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
  }, [fetchOptions])

  useEffect(() => {
    setUsers(LocalStorageService.getUsers())
  }, [])

  const clearFilters = () => {
    setSelectedDepartment(undefined)
    setSelectedCountry(undefined)
    setSelectedStatus(undefined)
  }

  const areFiltersDisabled = useMemo(() => !selectedDepartment, [selectedDepartment])

  const handleAddUser = () => {
    if (!selectedDepartmentForUser || !selectedCountryForUser || !selectedStatusForUser) return

    const user: User = {
      name: fullName,
      status: {
        name: statuses.find((status) => status.value === selectedStatusForUser.value)?.label || '',
        value: selectedStatusForUser.value,
      },
      department: {
        name: departments.find((dept) => dept.value === selectedDepartmentForUser.value)?.label || '',
        value: selectedDepartmentForUser.value,
      },
      country: {
        name: countries.find((country) => country.value === selectedCountryForUser.value)?.label || '',
        value: selectedCountryForUser.value,
      },
    }
    LocalStorageService.addUser(user)
    setUsers(LocalStorageService.getUsers())
    closeModal()
  }

  const openModal = () => setModalOpen(true)

  const closeModal = () => {
    setModalOpen(false)
    setFullName('')
    setSelectedDepartmentForUser(undefined)
    setSelectedCountryForUser(undefined)
    setSelectedStatusForUser(undefined)
  }

  const handleDeleteUser = (userName: string) => {
    LocalStorageService.deleteUser(userName)
    setUsers(LocalStorageService.getUsers())
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesDepartment =
        !selectedDepartment ||
        (Array.isArray(selectedDepartment)
          ? selectedDepartment.some((dept) => dept.value === user.department.value)
          : selectedDepartment.value === user.department.value)
      const matchesCountry =
        !selectedCountry ||
        (Array.isArray(selectedCountry)
          ? selectedCountry.some((country) => country.value === user.country.value)
          : selectedCountry.value === user.country.value)
      const matchesStatus =
        !selectedStatus ||
        (Array.isArray(selectedStatus)
          ? selectedStatus.some((status) => status.value === user.status.value)
          : selectedStatus.value === user.status.value)

      return matchesDepartment && matchesCountry && matchesStatus
    })
  }, [users, selectedDepartment, selectedCountry, selectedStatus])

  return (
    <div>
      <Heading level={1} className="text-center mb-10">
        Users
      </Heading>
      <p className="text-sm font-light text-accent mb-3">Please add at least 1 department to proceed.</p>
      <div className="flex md:flex-row flex-col justify-between items-center">
        <div className="gap-1 flex items-center">
          <Select
            placeholder="Select department"
            options={departments}
            onChange={setSelectedDepartment}
            isMultiSelect
            selectedOptions={
              Array.isArray(selectedDepartment) ? selectedDepartment : selectedDepartment ? [selectedDepartment] : []
            }
            onClear={() => setSelectedDepartment(undefined)}
            disabled={false}
          />
          <Select
            placeholder="Select country"
            options={countries}
            onChange={setSelectedCountry}
            isMultiSelect
            selectedOptions={
              Array.isArray(selectedCountry) ? selectedCountry : selectedCountry ? [selectedCountry] : []
            }
            onClear={() => setSelectedCountry(undefined)}
            disabled={areFiltersDisabled}
          />
          <Select
            placeholder="Select status"
            options={statuses}
            onChange={setSelectedStatus}
            isMultiSelect
            selectedOptions={Array.isArray(selectedStatus) ? selectedStatus : selectedStatus ? [selectedStatus] : []}
            onClear={() => setSelectedStatus(undefined)}
            disabled={areFiltersDisabled}
          />
          <Button isIcon onClick={clearFilters}>
            <Icon className="size-8" icon="material-symbols:delete-forever-outline" />
          </Button>
        </div>
        <Button onClick={openModal}>Add User</Button>
      </div>
      <div className="mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.name}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.department.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.country.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.status.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button onClick={() => handleDeleteUser(user.name)} isIcon>
                    <Icon className="size-6" icon="material-symbols:delete-outline" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={isModalOpen}>
        <div className="flex flex-col gap-y-[60px]">
          <Heading level={1} className="text-center">
            Add User
          </Heading>
          <div className="grid gap-[40px] gap-y-3 grid-cols-2 grid-rows-2">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter the full name"
            />
            <Select
              label="Department"
              placeholder="Select department"
              options={departments}
              onChange={(selected: Option[]) => setSelectedDepartmentForUser(selected[0] || undefined)}
              selectedOptions={selectedDepartmentForUser ? [selectedDepartmentForUser] : []}
              onClear={() => setSelectedDepartmentForUser(undefined)}
              disabled={false}
            />
            <Select
              label="Country"
              placeholder="Select country"
              options={countries}
              onChange={(selected: Option[]) => setSelectedCountryForUser(selected[0] || undefined)}
              selectedOptions={selectedCountryForUser ? [selectedCountryForUser] : []}
              onClear={() => setSelectedCountryForUser(undefined)}
              disabled={false}
            />
            <Select
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
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={handleAddUser}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UsersPage
