const belumListBook = "belum";
const selesaiListBook = "selesai";
const bookId = "bookId";
const btnYakin = document.getElementById("yakin");
const btnTidak = document.getElementById("tidak");
const btnBatal = document.getElementById("batal");
const modalCustom = document.getElementById("myModal");
const modalEdit = document.getElementById("modalEdit");

function tambahBuku() {
	const belumBook = document.getElementById(belumListBook);
	const sudahBook = document.getElementById(selesaiListBook);
	const titleBook = document.getElementById("title").value;
	const authorBook = document.getElementById("author").value;
	const yearBook = document.getElementById("year").value;
	const isCompleted = document.getElementById("check").checked;
	const membuatBook = membuatShelfBook(
		titleBook,
		authorBook,
		yearBook,
		isCompleted
	);
	if (isCompleted === true) {
		sudahBook.append(membuatBook);
	} else {
		belumBook.append(membuatBook);
	}
	const bookData = bukuData(titleBook, authorBook, yearBook, isCompleted);
	membuatBook[bookId] = bookData.id;
	books.push(bookData);

	updateStorage();
}

function membuatShelfBook(title, author, year, isCompleted) {
	const titleBook = document.createElement("p");
	titleBook.innerText = title;
	titleBook.classList.add("title-buku");
	const authorBook = document.createElement("p");
	authorBook.innerText = author;
	authorBook.classList.add("author-buku");
	const yearBook = document.createElement("p");
	yearBook.innerText = year;
	yearBook.classList.add("year-buku");
	const batas = document.createElement("div");
	const container = document.createElement("div");
	container.classList.add("book");
	container.append(titleBook, authorBook, yearBook);
	if (isCompleted === true) {
		batas.classList.add("border-bot-selesai");
		container.append(btnSelesai(), btnEdit(), btnHapus(), batas);
	} else {
		batas.classList.add("border-bot");
		container.append(btnBelum(), btnEdit(), btnHapus(), batas);
	}

	return container;
}

function tambahBukuSelesai(elementBook) {
	const bukuSelesai = document.getElementById(selesaiListBook);
	const titleBook = elementBook.querySelector(".title-buku").innerText;
	const authorBook = elementBook.querySelector(".author-buku").innerText;
	const yearBook = elementBook.querySelector(".year-buku").innerText;
	const bookBaru = membuatShelfBook(titleBook, authorBook, yearBook, true);
	const bookData = findBook(elementBook[bookId]);
	bookData.isCompleted = true;
	bookBaru[bookId] = bookData.id;

	bukuSelesai.append(bookBaru);
	elementBook.remove();
	updateStorage();
}

function bukuBelumSelesai(elementBook) {
	const belumSelesai = document.getElementById(belumListBook);
	const titleBook = elementBook.querySelector(".title-buku").innerText;
	const authorBook = elementBook.querySelector(".author-buku").innerText;
	const yearBook = elementBook.querySelector(".year-buku").innerText;
	const bookBaru = membuatShelfBook(titleBook, authorBook, yearBook, false);
	const bookData = findBook(elementBook[bookId]);
	bookData.isCompleted = false;
	bookBaru[bookId] = bookData.id;
	belumSelesai.append(bookBaru);
	elementBook.remove();
	updateStorage();
}

function editBuku(elementBook) {
	const belumBook = document.getElementById(belumListBook);
	const sudahBook = document.getElementById(selesaiListBook);
	const titleBook = document.getElementById("title-edit").value;
	const authorBook = document.getElementById("author-edit").value;
	const yearBook = document.getElementById("year-edit").value;
	const isCompleted = document.getElementById("check-edit").checked;
	const membuatBook = membuatShelfBook(
		titleBook,
		authorBook,
		yearBook,
		isCompleted
	);
	const bookData = findBook(elementBook[bookId]);
	bookData.title = titleBook;
	bookData.author = authorBook;
	bookData.year = yearBook;
	bookData.isCompleted = isCompleted;
	if (isCompleted === true) {
		elementBook.remove();
		sudahBook.append(membuatBook);
	} else {
		elementBook.remove();
		belumBook.append(membuatBook);
	}
	// elementBook.remove();
	updateStorage();
}

function buatBtn(title, classType, eventListener) {
	const button = document.createElement("button");
	button.innerText = title;
	button.classList.add(classType);
	button.addEventListener("click", function (event) {
		eventListener(event);
	});
	return button;
}

function removeFromShelf(book) {
	const bookPosition = findBookIndex(book[bookId]);
	books.splice(bookPosition, 1);

	book.remove();
	updateStorage();
}

function btnBelum() {
	return buatBtn("Selesai", "btn-done", function (event) {
		tambahBukuSelesai(event.target.parentElement);
	});
}

function btnEdit() {
	return buatBtn("Edit", "btn-edit", function (event) {
		const editForm = document.getElementById("form-edit");
		const targetElement = event.target.parentElement.children;
		modalEdit.style.display = "block";
		document.getElementById("title-edit").value = targetElement[0].innerText;
		document.getElementById("author-edit").value = targetElement[1].innerText;
		document.getElementById("year-edit").value = targetElement[2].innerText;
		if (
			event.target.parentElement.lastChild.className == "border-bot-selesai"
		) {
			document.getElementById("check-edit").checked = true;
		} else {
			document.getElementById("check-edit").checked = false;
		}
		editForm.addEventListener("submit", () => {
			editBuku(event.target.parentElement);
			modalEdit.style.display = "none";
		});
	});
}

function btnHapus() {
	return buatBtn("Hapus", "btn-hapus", function (event) {
		modalCustom.style.display = "block";
		btnYakin.onclick = () => {
			removeFromShelf(event.target.parentElement);
			modalCustom.style.display = "none";
		};
	});
}

function btnSelesai() {
	return buatBtn("Belum Selesai", "btn-done", function (event) {
		bukuBelumSelesai(event.target.parentElement);
	});
}

btnBatal.onclick = () => {
	modalEdit.style.display = "none";
};

btnTidak.onclick = () => {
	modalCustom.style.display = "none";
};

window.onclick = (event) => {
	if (event.target == modalCustom || event.target == modalEdit) {
		modalCustom.style.display = "none";
		modalEdit.style.display = "none";
	}
};
