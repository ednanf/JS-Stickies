// Elements
const notesContainer = document.querySelector('#notes-container');
const noteInput = document.querySelector('#note-content');
const newNoteBtn = document.querySelector('.new-note');

// Functions
function addNote() {
	const notes = [];

	const noteObject = {
		id: generateId(),
		content: noteInput.value,
		fixed: false,
	};

	const noteElement = createNote(noteObject.id, noteObject.content);

	notesContainer.appendChild(noteElement);

	notes.push(noteObject);

	saveNotes(notes);

	noteInput.value = '';
}

function generateId() {
	return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {
	const element = document.createElement('div');
	element.classList.add('note');

	const textarea = document.createElement('textarea');
	textarea.value = content;

	textarea.placeholder = 'New note';

	textarea.id = 'note-textarea';

	element.appendChild(textarea);

	return element;
}

function saveNotes(notes) {
	localStorage.setItem('notes', JSON.stringify(notes));
}

// Events
newNoteBtn.addEventListener('click', () => {
	addNote();
});
