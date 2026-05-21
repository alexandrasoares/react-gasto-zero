import Dashboard from './pages/dashboard.page'
import BehavioralHistory from './pages/behavioral-history.page'
import CreateGoal from './pages/create-goal.page'
import EmotionalSupport from './pages/emotional-support.page'
import Gamification from './pages/gamification.page'
import Rewards from './pages/rewards.page'
import { NavigationProvider, useNavigation } from './hooks/navigation.context'

function AppContent() {
  const { currentPath, navigate } = useNavigation()

  const renderPage = () => {
    switch (currentPath) {
      case '/dashboard':
        return <Dashboard onNavigate={navigate} />
      case '/history':
        return <BehavioralHistory onNavigate={navigate} />
      case '/goals':
        return <CreateGoal onNavigate={navigate} />
      case '/support':
        return <EmotionalSupport onNavigate={navigate} />
      case '/gamification':
        return <Gamification onNavigate={navigate} />
      case '/rewards':
        return <Rewards onNavigate={navigate} />
      case '/community':
      case '/settings':
      case '/transactions':
      case '/track':
      case '/learn':
      case '/challenges':
      default:
        return <Dashboard onNavigate={navigate} />
    }
  }

  return renderPage()
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  )
}

export default App
