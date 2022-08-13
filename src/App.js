import React from 'react'
import { useState } from 'react'
import TopAppBar from './components/TopAppBar'
import FloatingActionButton from './components/FloatingActionButton'
import MediaCard from './components/MediaCard'
import AddFragment from './components/AddFragment'
import { ThemeProvider } from '@mui/material/styles'
import myTheme from './myTheme'

const App = () => {
    const [fragmentStatus, setFragmentStatus] = useState("main")

    const sampleData = [{
            title: "test1",
            description: "test1 desc",
        },
        {
            title: "test2",
            description: "test2 desc",
        },
    ]

    const fabOnClick = () => {
        setFragmentStatus("add")
    }

    const editDraft = () => {
        setFragmentStatus("edit")
    }

    const renderMainFragment = () => {
        switch (fragmentStatus) {
            case "add":
                return <AddFragment drafts={sampleData} onEdit={editDraft}/>
            case "main":
            default:
                return <h1>main</h1>
        }
    }

    return (
        <ThemeProvider theme={myTheme}>
            <TopAppBar />
            <div onClick={fabOnClick}>
                <FloatingActionButton/>
            </div>
            {renderMainFragment()}
        </ThemeProvider>
    )
}

export default App