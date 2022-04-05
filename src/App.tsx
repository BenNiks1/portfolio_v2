import { Desktop } from './pages'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Desktop />
    </QueryClientProvider>
  )
}
