export type LandingSectionType =
  | 'hero'
  | 'ticker'
  | 'about'
  | 'programs'
  | 'statement'
  | 'coach'
  | 'steps'
  | 'location'
  | 'apply'

export interface LandingSection {
  id: string
  type: LandingSectionType
}

export const landingSections: LandingSection[] = [
  { id: 'home', type: 'hero' },
  { id: 'ticker', type: 'ticker' },
  { id: 'about', type: 'about' },
  { id: 'programs', type: 'programs' },
  { id: 'statement', type: 'statement' },
  { id: 'coach', type: 'coach' },
  { id: 'steps', type: 'steps' },
  { id: 'location', type: 'location' },
  { id: 'apply', type: 'apply' }
]
