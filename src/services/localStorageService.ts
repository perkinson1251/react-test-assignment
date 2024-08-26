import { Country, Department, Status, User } from '@/types'

class LocalStorageService {
  private static readonly COUNTRIES_KEY = 'countries'
  private static readonly DEPARTMENTS_KEY = 'departments'
  private static readonly STATUSES_KEY = 'statuses'
  private static readonly USERS_KEY = 'users'

  private static initializeStorage(): void {
    const countries: Country[] = [
      { name: 'Ukraine', value: 'UA' },
      { name: 'United States', value: 'US' },
      { name: 'Canada', value: 'CA' },
      { name: 'Germany', value: 'DE' },
      { name: 'France', value: 'FR' },
      { name: 'Australia', value: 'AU' },
      { name: 'Japan', value: 'JP' },
      { name: 'United Kingdom', value: 'GB' },
      { name: 'China', value: 'CN' },
      { name: 'India', value: 'IN' },
    ]

    const departments: Department[] = [
      { name: 'Human Resources', value: 'HR' },
      { name: 'Finance', value: 'FIN' },
      { name: 'Information Technology', value: 'IT' },
      { name: 'Marketing', value: 'MKT' },
      { name: 'Sales', value: 'SAL' },
      { name: 'Customer Support', value: 'CS' },
      { name: 'Research and Development', value: 'R&D' },
      { name: 'Operations', value: 'OPS' },
      { name: 'Legal', value: 'LEG' },
      { name: 'Product Management', value: 'PM' },
    ]

    const statuses: Status[] = [
      { name: 'All statuses', value: 'ALL' },
      { name: 'Active', value: 'ACTIVE' },
      { name: 'Disabled', value: 'DISABLED' },
    ]

    const users: User[] = []

    if (!localStorage.getItem(LocalStorageService.COUNTRIES_KEY)) {
      localStorage.setItem(LocalStorageService.COUNTRIES_KEY, JSON.stringify(countries))
    }

    if (!localStorage.getItem(LocalStorageService.DEPARTMENTS_KEY)) {
      localStorage.setItem(LocalStorageService.DEPARTMENTS_KEY, JSON.stringify(departments))
    }

    if (!localStorage.getItem(LocalStorageService.STATUSES_KEY)) {
      localStorage.setItem(LocalStorageService.STATUSES_KEY, JSON.stringify(statuses))
    }

    if (!localStorage.getItem(LocalStorageService.USERS_KEY)) {
      localStorage.setItem(LocalStorageService.USERS_KEY, JSON.stringify(users))
    }
  }

  static getCountries(): Country[] {
    LocalStorageService.initializeStorage()
    const countries = localStorage.getItem(LocalStorageService.COUNTRIES_KEY)
    return countries ? JSON.parse(countries) : []
  }

  static getDepartments(): Department[] {
    LocalStorageService.initializeStorage()
    const departments = localStorage.getItem(LocalStorageService.DEPARTMENTS_KEY)
    return departments ? JSON.parse(departments) : []
  }

  static getStatuses(): Status[] {
    LocalStorageService.initializeStorage()
    const statuses = localStorage.getItem(LocalStorageService.STATUSES_KEY)
    return statuses ? JSON.parse(statuses) : []
  }

  static getUsers(): User[] {
    const users = localStorage.getItem(LocalStorageService.USERS_KEY)
    return users ? JSON.parse(users) : []
  }

  static addUser(user: User): void {
    const users = LocalStorageService.getUsers()
    users.push(user)
    localStorage.setItem(LocalStorageService.USERS_KEY, JSON.stringify(users))
  }

  static deleteUser(userName: string): void {
    let users = this.getUsers()
    users = users.filter((user) => user.name !== userName)
    localStorage.setItem('users', JSON.stringify(users))
  }

  static getUserByName(name: string): User | undefined {
    const users = LocalStorageService.getUsers()
    return users.find((user) => user.name === name)
  }

  static updateUser(updatedUser: User): void {
    const users = LocalStorageService.getUsers()
    const userIndex = users.findIndex((user) => user.name === updatedUser.name)

    if (userIndex !== -1) {
      users[userIndex] = updatedUser
      localStorage.setItem(LocalStorageService.USERS_KEY, JSON.stringify(users))
    }
  }
}

export default LocalStorageService
