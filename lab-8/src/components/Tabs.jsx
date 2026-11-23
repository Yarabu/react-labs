import { createContext, use, useId, useState } from 'react'

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
  const baseId = useId()

  return (
    <TabsContext value={{ selected, setSelected, baseId }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function TabsList({ children, ...props }) {
  function handleKeyDown(e) {
    const tabs = [...e.currentTarget.querySelectorAll('[role="tab"]')]
    const index = tabs.indexOf(e.target)
    if (index === -1) return

    let next
    switch (e.key) {
      case 'ArrowRight':
        next = tabs[(index + 1) % tabs.length]
        break
      case 'ArrowLeft':
        next = tabs[(index - 1 + tabs.length) % tabs.length]
        break
      case 'Home':
        next = tabs[0]
        break
      case 'End':
        next = tabs[tabs.length - 1]
        break
      default:
        return
    }

    e.preventDefault()
    next.focus()
    next.click()
  }

  return (
    <div
      {...props}
      role="tablist"
      className="tab-list"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

function TabsTab({ value, children }) {
  const { selected, setSelected, baseId } = useTabs('Tabs.Tab')
  const isSelected = selected === value

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => setSelected(value)}
    >
      {children}
    </button>
  )
}

function TabsPanel({ value, children }) {
  const { selected, baseId } = useTabs('Tabs.Panel')
  const isSelected = selected === value

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      hidden={!isSelected}
    >
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Panel = TabsPanel
