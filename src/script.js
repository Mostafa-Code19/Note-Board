const log = (code) => {
    console.log(code)
}

// define
const add = document.querySelector('.add')
const board = document.querySelector('.board')


add.addEventListener('click', () => {
    log('add clicked.')
    userInteract = new Note()
    userInteract.createNote()
})

class Note {
    constructor(self) {
    }

    createNote() {
        this.noteText = 'this is js note'
        this.addNote()
    }

    addNote() {
        const newNote = document.createElement('DIV')
        newNote.innerHTML = this.noteText
        newNote.setAttribute('class', 'note')
        board.appendChild(newNote)
    }

    removeNote() {

    }

    changeNote() {

    }
}

userInteract = new Note()
userInteract.createNote()

log('js working')