import { ReactNode } from 'react'

interface FilterHeaderTopProps {
  children?: ReactNode;

}

export const FilterHeaderTop = ({ children }: FilterHeaderTopProps) => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      {children}
    </div>
  )
}
