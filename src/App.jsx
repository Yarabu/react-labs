import ProfileCard from './components/ProfileCard.jsx'

function App() {
  const technologies = ['React', 'React Hooks', 'Vite']

  return (
    <main>
      <ProfileCard name="Ярослава" group="КН-312" technologies={technologies} />
    </main>
  )
}

export default App
