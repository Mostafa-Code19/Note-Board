const log = (code) => {
    console.log(code)
}

const fadeIn = (element) => {
    element.classList.remove('fade-out')
    element.classList.add('fade-in')
}

const fadeOut = (element) => {
    element.classList.remove('fade-in')
    element.classList.add('fade-out')
}

// define
const option__noteAdd = document.querySelector('.option__noteAdd')
const board = document.querySelector('.board')
const option__noteDetail = document.querySelector('.option__noteDetail')
const option__noteDetail__closeBtn = document.querySelector('.option__noteDetail__closeBtn')
const option__noteDetail__note = document.querySelector('.option__noteDetail__note')
const option__noteDetail__submit = document.querySelector('.option__noteDetail__submit')


const taggingNotes = () => {
    note__remove.forEach(each => {
        each.setAttribute('tag', tagNumber)
        tagNumber++
    })
}

const noteRemove = () => {
    note__remove.forEach(each => {
        each.addEventListener('click', () => {
            log('wsp')
            noteTag = each.getAttribute('tag')
            note[noteTag - 1].remove()
        })
    })
}

window.addEventListener('beforeunload', () => {
    note = document.querySelectorAll('.note')
    UpdateAndAddNoteToLocalStorage()
})

document.addEventListener('DOMNodeInserted', () => {
    tagNumber = 1
    note__remove = document.querySelectorAll('.note__remove')
    note = document.querySelectorAll('.note')
    taggingNotes()
    noteRemove()
})

const closeAddNote = () => {
    board.classList.remove('outOfFocus')
    fadeOut(option__noteDetail)
}

const UpdateAndAddNoteToLocalStorage = () => {
    let list = []
    note.forEach(each => {
        list.push(each.innerText)
    })
    window.localStorage.setItem('notes', list)
}

const removeAllNotes = () => {
    note = document.querySelectorAll('.note')
    note.forEach(each => {
        each.remove()
    })
}

const getNotesFromLocalStorage = () => {
    removeAllNotes()
    let localNotes = window.localStorage.getItem('notes')
    localNotes = localNotes.split(',')
    if (localNotes != '') {
        localNotes.forEach(each => {
            userInteract = new Note()
            userInteract.createNote(each)
        })
    }
}

//  Setting limit with calculating the amount of note that screen able to handle and not
const checkIfNotReachedNoteLimit = () => {
    const winX = window.innerWidth
    const winY = window.innerHeight
    const totalSpace = winX * winY
    const numberOfAllowedNotes = totalSpace / 47950
    if (note.length >= numberOfAllowedNotes) {
        alert('You Reached Note Limit')
        statue = 0
        return statue
    }
    else {
        statue = 1
        return statue
    }
}

option__noteAdd.addEventListener('click', () => {
    statue = checkIfNotReachedNoteLimit()
    if (statue == 1) {
        board.classList.add('outOfFocus')
        fadeIn(option__noteDetail)
    }
})

option__noteDetail__closeBtn.addEventListener('click', () => {
    closeAddNote()
})

option__noteDetail__submit.addEventListener('click', () => {
    const note = option__noteDetail__note.value
    closeAddNote()
    option__noteDetail__note.value = ''
    userInteract = new Note()
    userInteract.createNote(note)
})

class Note {
    constructor(self) {
    }

    createNote(note) {
        this.noteText = note
        this.addNote()
    }

    addNote() {
        const newNote = document.createElement('DIV')
        newNote.innerHTML = this.noteText
        newNote.setAttribute('class', 'note')

        const removeBtn = document.createElement('BUTTON')
        removeBtn.innerHTML = ''
        removeBtn.setAttribute('class', 'note__remove')

        board.appendChild(newNote)
        newNote.appendChild(removeBtn)
    }

    changeNote() {

    }
}

getNotesFromLocalStorage()
log('js working')