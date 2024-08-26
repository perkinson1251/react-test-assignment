export interface Country {
  name: string
  value: string
}

export interface Department {
  name: string
  value: string
}

export interface Status {
  name: string
  value: string
}

export interface User {
  name: string
  status: Status
  department: Department
  country: Country
}

interface Option {
  label: string
  value: string
}
