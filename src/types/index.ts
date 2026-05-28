export interface Employee {
  slug:     string
  name:     string
  title:    string
  phone:    string
  email:    string
  website:  string
  photo:    string | null
  initials: string
}

export interface Company {
  name:    string
  website: string
  logo:    string
  color:   string
}