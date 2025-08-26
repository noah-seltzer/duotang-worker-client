import './App.css'
import { RootLayout } from './components/Layout/RootLayout'
import { DocumentManagementPage } from './components/Pages/DocumentManagerPage'

function App() {
    return (
        <RootLayout>
            <DocumentManagementPage />
        </RootLayout>
    )
}

export default App
