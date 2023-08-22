import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { notesCollection, db } from "./firebase.js"
import { onSnapshot, addDoc, deleteDoc } from "firebase/firestore"
import { doc, setDoc } from "@firebase/firestore"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [tempNoteText, setTempNoteText] = React.useState("")
    
    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]
    const sortedNotes = notes.sort(
        (objA, objB) => Number(objB.updatedAt) - Number(objA.updatedAt),
      );

    React.useEffect(() => {
        // Sync up local notes array with the Snapshot (Firebase) Data
        const unsubscribe = onSnapshot(notesCollection, function(snapshot){
            const notesArray = snapshot.docs.map(doc => ({
                ...doc.data() ,
                id: doc.id
            }))
            setNotes(notesArray);
        })
        return unsubscribe
    }, [])

    //Only for the 1st time
    React.useEffect(() => {
        if(!currentNoteId){
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    //For Debouncing: tempNote State instead of updateNote
    React.useEffect(() => {
        if (currentNote) {
            setTempNoteText(prev => currentNote.body)
        }
    }, [currentNote])

    //DEBOUCING LOGIC
    //  * Create an effect that runs any time the tempNoteText changes
    //  * Delay the sending of the request to Firebase
    //  *  uses setTimeout
    //  * use clearTimeout to cancel the timeout
    React.useEffect(() => {
        const timeoutID = setTimeout(() => {
            if(tempNoteText !== currentNote.body){
                updateNote(tempNoteText)
            }
        }, 500)
        return () => clearTimeout(timeoutID)
    }, [tempNoteText])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const noteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(noteRef.id)
    }

    async function updateNote(text) {
        // WITH DATABASE
            const docRef = doc(db, "notes", currentNoteId)
            await setDoc(docRef,
                {body: text, updatedAt: Date.now()},
                {merge: true})
        // WITHOUT DATABASE
            // setNotes(oldNotes => {
            //     const newArray = []
            //     for (let i = 0; i < oldNotes.length; i++) {
            //         const oldNote = oldNotes[i]
            //         if (oldNote.id === currentNoteId) {
            //             // Put the most recently-modified note at the top
            //             newArray.unshift({ ...oldNote, body: text })
            //         } else {
            //             newArray.push(oldNote)
            //         }
            //     }
            //     return newArray
            // })
    }

    async function deleteNote(noteId) {
        const docRef = doc(db,"notes", noteId);
        await deleteDoc(docRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        <Editor
                            currentNote={tempNoteText}
                            updateNote={setTempNoteText}
                        />
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
