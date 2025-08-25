import './App.css'
import { DocumentTable } from './components/DocumentTable/DocumentTable'
import { RootLayout } from './components/Layout/RootLayout'

function App() {
    // return <DocumentTable />
    return (
        <RootLayout>
            <DocumentTable />
        </RootLayout>
    )
}

export default App
