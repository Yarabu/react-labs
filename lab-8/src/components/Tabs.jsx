import { createContext, use, useState } from 'react'

const TabsContext = createContext(null)

function useTabs(partName) {
  const context = use(TabsContext)
  if (context === null) {
    throw new Error(`${partName} можна використовувати лише всередині <Tabs>`)
  }
  return context
}

export default function Tabs({ defaultValue, children }) {
  const [selected, setSelected] = useState(defaultValue)

  return (
    <TabsContext value={{ selected, setSelected }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function TabsList({ children, ...props }) {
  return (
    <div className="tab-list" {...props}>
      {children}
    </div>
  )
}

function TabsTab({ value, children }) {
  const { selected, setSelected } = useTabs('Tabs.Tab')
  const isSelected = selected === value

  return (
    <button
      type="button"
      className={isSelected ? 'active' : undefined}
      onClick={() => setSelected(value)}
    >
      {children}
    </button>
  )
}

function TabsPanel({ value, children }) {
  const { selected } = useTabs('Tabs.Panel')

  return <div hidden={selected !== value}>{children}</div>
}

Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Panel = TabsPanel
