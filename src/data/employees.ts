import type { Company, Employee } from '../types'

export const COMPANY: Company = {
  name:    'delaguía & luzón',
  website: 'https://delaguialuzon.com',
  logo:    '/logo.png',
  color:   '#2c2416',
}

export const employees: Employee[] = [
  {
    slug:     'felix-delaguia-munoz',
    name:     'Félix de la Guía Muñoz',
    title:    'Abogado - Tax attorney',
    phone:    '+34 96 352 32 91',
    email:    'felix.delaguiamunoz@delaguialuzon.com',
    website:  'https://delaguialuzon.com',
    photo:    '/photos/felix.jpg',
    initials: 'FM',
  },
   {
    slug:     'rola-tabech',
    name:     'Rola Tabech',
    title:    'Abogada extranjería',
    phone:    '+34 664 725 402',
    email:    'rola.tabech@delaguialuzon.com',
    website:  'https://delaguialuzon.com',
    photo:    '/photos/rola.jpg',
    initials: 'RT',
  },
   {
    slug:     'sonia-gomez-luzon',
    name:     'Sonia Gomez Luzon',
    title:    'Abogada - Avocate',
    phone:    '+34 664 725 402',
    email:    'sonia.gomezluzon@delaguialuzon.com',
    website:  'https://delaguialuzon.com',
    photo:    '/photos/sonia.jpg',
    initials: 'SG',
  },
   {
    slug:     'cristina-garcia-zapeter',
    name:     'Cristina Garcia Zapeter',
    title:    'Directora de customer success',
    phone:    '+34 651 96 50 65',
    email:    'comercial-internacional01@delaguialuzon.com',
    website:  'https://delaguialuzon.com',
    photo:    '/photos/cristina-garcia.jpg',
    initials: 'CG',
  },
]