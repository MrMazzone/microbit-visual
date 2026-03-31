export type FeatureCategory =
  | 'output'
  | 'input'
  | 'sensor'
  | 'connectivity'
  | 'power'
  | 'processor'

export interface Feature {
  id: string
  name: string
  category: FeatureCategory
  shortDescription: string
  description: string
  technicalDetails: string[]
  funFacts: string[]
  color: string
}

export const CATEGORY_COLORS: Record<FeatureCategory, string> = {
  output: '#10B981',
  input: '#3B82F6',
  sensor: '#8B5CF6',
  connectivity: '#F59E0B',
  power: '#EF4444',
  processor: '#06B6D4',
}

export const CATEGORY_LABELS: Record<FeatureCategory, string> = {
  output: 'Output',
  input: 'Input',
  sensor: 'Sensor',
  connectivity: 'Connectivity',
  power: 'Power',
  processor: 'Processor',
}
