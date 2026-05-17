export interface Job {
  id: number
  title: string
  company: string
  companyId: number
  salary: string
  salaryMin: number
  salaryMax: number
  experience: string
  education: string
  location: string
  industry: string
  description: string
  benefits: string[]
  tags: string[]
  publishTime: string
  isHot: boolean
  isNew: boolean
  lat?: number
  lng?: number
}

export interface Company {
  id: number
  name: string
  logo: string
  industry: string
  type: string
  scale: string
  location: string
  description: string
  benefits: string[]
  website: string
  lat?: number
  lng?: number
}

export interface User {
  id: number
  username: string
  email: string
  avatar: string
  phone: string
}

export interface Resume {
  id: number
  name: string
  phone: string
  email: string
  avatar: string
  education: Education[]
  experience: Experience[]
  skills: string[]
  introduction: string
  expectedSalary: string
  expectedPosition: string
  expectedCity: string
}

export interface Education {
  id: number
  school: string
  major: string
  degree: string
  startDate: string
  endDate: string
}

export interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Message {
  id: number
  senderId: number
  senderName: string
  senderAvatar: string
  receiverId: number
  content: string
  time: string
  isRead: boolean
}

export interface ChatSession {
  id: number
  userId: number
  userName: string
  userAvatar: string
  lastMessage: string
  lastTime: string
  unreadCount: number
}

export interface MapRegion {
  name: string
  companyCount: number
  lat: number
  lng: number
  zoom: number
}
