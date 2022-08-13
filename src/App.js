import React from 'react'
import { useState } from 'react'
import TopAppBar from './components/TopAppBar'
import FloatingActionButton from './components/FloatingActionButton'
import MediaCard from './components/MediaCard'
import AddFragment from './components/AddFragment'
import { ThemeProvider } from '@mui/material/styles'
import myTheme from './myTheme'
import EditingDraft from './components/EditingDraft'

const App = () => {
    const [fragmentStatus, setFragmentStatus] = useState("main")
    const [currentEditingDraft, setCurrentEditingDraft] = useState()

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

    const editDraft = (draft) => {
        setFragmentStatus("edit")
        setCurrentEditingDraft(draft)
    }

    const renderMainFragment = () => {
        switch (fragmentStatus) {
            case "add":
                return <AddFragment drafts={sampleData} onEdit={editDraft}/>
            case "edit":
                return <EditingDraft draft={currentEditingDraft}/>
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