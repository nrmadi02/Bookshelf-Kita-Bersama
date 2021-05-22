document.addEventListener("DOMContentLoaded", () => {
	const submitForm = document.getElementById("form");
	const searchForm = document.getElementById("search-form");
	submitForm.addEventListener("submit", (event) => {
		event.preventDefault();
		tambahBuku();
	});
	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();
		cariBukuBelum();
		cariBukuSelesai();
	});
	if (isStorageExist()) {
		loadBookFromStorage();
	}
});

document.addEventListener("ondatasaved", () => {
	console.log("Buku berhasil ditambahkan.");
});
document.addEventListener("ondataloaded", () => {
	reloadRefreshBook();
});

function cariBukuBelum() {
	const filter = document.getElementById("search").value.toUpperCase();
	const listBook = document.getElementById("belum");
	const div = listBook.getElementsByClassName("book");
	for (i = 0; i < div.length; i++) {
		title = div[i].getElementsByClassName("title-buku")[0];
		txtValue = title.textContent || title.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			div[i].style.display = "";
		} else {
			div[i].style.display = "none";
		}
	}
}

function cariBukuSelesai() {
	const filter = document.getElementById("search").value.toUpperCase();
	const listBook = document.getElementById("selesai");
	const div = listBook.getElementsByClassName("book");
	for (i = 0; i < div.length; i++) {
		title = div[i].getElementsByClassName("title-buku")[0];
		txtValue = title.textContent || title.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			div[i].style.display = "";
		} else {
			div[i].style.display = "none";
		}
	}
}
