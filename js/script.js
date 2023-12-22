// Elements
const notesContainer = document.querySelector('#notes-container');
const noteInput = document.querySelector('#note-content');
const newNoteBtn = document.querySelector('.new-note');

// Functions
function showNotes() {
	cleanNotes();

	getNotes().forEach((note) => {
		const noteElement = createNote(note.id, note.content, note.fixed);
		notesContainer.appendChild(noteElement);
	});
}

function cleanNotes() {
	notesContainer.replaceChildren([]);
}

function addNote() {
	const notes = getNotes();

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
	textarea.name = 'note-textarea';
	element.appendChild(textarea);

	const pinIcon = document.createElement('i');
	pinIcon.classList.add(...['bi', 'bi-pin-angle']);
	element.appendChild(pinIcon);

	const xIcon = document.createElement('i');
	xIcon.classList.add(...['bi', 'bi-x-lg']);
	element.appendChild(xIcon);

	const duplicateIcon = document.createElement('i');
	duplicateIcon.classList.add(...['bi', 'bi-copy']);
	element.appendChild(duplicateIcon);

	if (fixed) {
		element.classList.add('fixed');
	}

	// Note events (pin, delete and duplicate)
	element.querySelector('textarea').addEventListener('keyup', (e) => {
		const noteContent = e.target.value;
		updateNote(id, noteContent);
	});

	element.querySelector('.bi-pin-angle').addEventListener('click', () => {
		toggleFixNote(id);
	});

	element.querySelector('.bi-x-lg').addEventListener('click', () => {
		deleteNote(id, element);
	});

	element.querySelector('.bi-copy').addEventListener('click', () => {
		copyNote(id);
	});

	return element;
}

function toggleFixNote(id) {
	const notes = getNotes();
	const targetNote = notes.filter((note) => note.id === id)[0];

	targetNote.fixed = !targetNote.fixed;

	saveNotes(notes);

	showNotes();
}

function deleteNote(id, element) {
	const notes = getNotes().filter((note) => note.id !== id);

	saveNotes(notes);

	notesContainer.removeChild(element);
}

function copyNote(id) {
	const notes = getNotes();
	const targetNote = notes.filter((note) => note.id === id)[0];

	const noteObject = {
		id: generateId(),
		content: targetNote.content,
		fixed: false,
	};

	const noteElement = createNote(
		noteObject.id,
		noteObject.content,
		noteObject.fixed
	);

	notesContainer.appendChild(noteElement);

	notes.push(noteObject);

	saveNotes(notes);
}

function updateNote(id, newContent) {
	const notes = getNotes();
	const targetNote = notes.filter((note) => note.id === id)[0];
	targetNote.content = newContent;

	saveNotes(notes);
}

// Local storage
function saveNotes(notes) {
	localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
	const notes = JSON.parse(localStorage.getItem('notes') || '[]');
	const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));
	return orderedNotes;
}

// Events
newNoteBtn.addEventListener('click', () => {
	addNote();
});

// Initialization
showNotes();
