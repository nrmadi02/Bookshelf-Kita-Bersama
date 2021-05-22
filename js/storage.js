const keyStorage = "BOOK_SHELF";

let books = [];

function isStorageExist() {
	if (typeof Storage === undefined) {
		alert("Browser kamu tidak mendukung local storage");
		return false;
	}
	return true;
}

function simpanBuku() {
	const parsed = JSON.stringify(books);
	localStorage.setItem(keyStorage, parsed);
	document.dispatchEvent(new Event("ondatasaved"));
}

function loadBookFromStorage() {
	const setData = localStorage.getItem(keyStorage);
	let data = JSON.parse(setData);
	if (data !== null) books = data;
	document.dispatchEvent(new Event("ondataloaded"));
}

function updateStorage() {
	if (isStorageExist()) {
		simpanBuku();
	}
}

function bukuData(title, author, year, isCompleted) {
	return {
		id: +new Date(),
		title,
		author,
		year,
		isCompleted,
	};
}

function findBook(bookId) {
	for (book of books) {
		if (book.id === bookId) return book;
	}
	return null;
}

function findBookIndex(bookId) {
	let index = 0;
	for (book of books) {
		if (book.id === bookId) return index;

		index++;
	}

	return -1;
}

function reloadRefreshBook() {
	const listUncompleted = document.getElementById(belumListBook);
	let listCompleted = document.getElementById(selesaiListBook);

	for (book of books) {
		const bukuBaru = membuatShelfBook(
			book.title,
			book.author,
			book.year,
			book.isCompleted
		);
		bukuBaru[bookId] = book.id;

		if (book.isCompleted) {
			listCompleted.append(bukuBaru);
		} else {
			listUncompleted.append(bukuBaru);
		}
	}
}
