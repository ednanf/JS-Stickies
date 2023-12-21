// Elementos
const notesContainer = document.querySelector('#notes-container');
const notesInput = document.querySelector('#note-contents');
const newNoteButton = document.querySelector('.button-new-note');

// Funções
function addNote() {
	const noteObject = {
		id: generateId(),
		content: notesInput.value,
		fixed: false,
	};

	const noteElement = createNote(noteObject.id, noteObject.content);

	notesContainer.appendChild(noteElement);
}

function generateId() {
	return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {
	const element = document.createElement('div');
	element.classList.add('note');

	const textArea = document.createElement('textarea');
	textArea.value = content;
	textArea.placeholder = 'Write here...';
	element.appendChild(textArea);

	return element;
}

// Eventos
newNoteButton.addEventListener('click', () => addNote());
