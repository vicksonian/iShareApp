/** @format */

const localStorageToken = localStorage.getItem("token");
console.log("Retrieved token Upload:", localStorageToken);

function uploadFile() {
	const fileInput = document.getElementById("fileInput");
	const files = fileInput.files;

	if (files.length === 0) {
		console.error("No files selected.");
		return;
	}

	// Retrieve token from localStorage
	const token = localStorage.getItem("token");
	console.log("Token:", token);

	const formData = new FormData();

	for (let i = 0; i < files.length; i++) {
		formData.append("file", files[i]);
	}

	const xhr = new XMLHttpRequest();
	// xhr.open("POST", "http://192.168.74.8:5000/upload", true);
	xhr.open("POST", "https://ishare-i8td.onrender.com/upload", true);

	// Set Authorization header with the token
	xhr.setRequestHeader("Authorization", `Bearer ${token}`);
	console.log("Authorization header set with token:", `Bearer ${token}`);

	xhr.upload.onprogress = function (event) {
		if (event.lengthComputable) {
			const percentComplete = (event.loaded / event.total) * 100;
			const progressBar = document.getElementById("progressBar");
			progressBar.style.width = percentComplete + "%";
		}
	};

	xhr.onload = function () {
		console.log("Response status:", xhr.status);
		if (xhr.status === 200) {
			// File(s) uploaded successfully
			displaySuccessMessage("File(s) uploaded successfully");

			// Hide the progress bar after 5 seconds
			setTimeout(function () {
				document.getElementById("progressBarContainer").style.display = "none";
			}, 5000);

			// Add the recently uploaded files to the recentlyUploadedfileList div
			const recentlyUploadedfileList = document.getElementById(
				"recentlyUploadedfileList"
			);
			for (let i = 0; i < files.length; i++) {
				const fileItem = document.createElement("div");
				fileItem.textContent = files[i].name; // You can customize this to display more information about the file
				recentlyUploadedfileList.appendChild(fileItem);
			}

			// Show the recently uploaded files section
			document.getElementById("recentlyuploadedfiles").style.display = "block";
		} else if (xhr.status === 400) {
			// Server returned a bad request status (400)
			displayErrorMessage(
				"Error uploading file(s): Exceeded maximum table size"
			);
		} else {
			// Error uploading file(s)
			displayErrorMessage("Error uploading file(s)");
		}
	};

	xhr.onerror = function () {
		// Error uploading file
		displayErrorMessage("Error uploading file");
	};

	xhr.send(formData);
}

// Function to display error message
function displayErrorMessage(message) {
	const uploadMessage = document.getElementById("uploadMessage");
	uploadMessage.textContent = message;
	uploadMessage.className = "error";
	uploadMessage.style.display = "block";
}

// function to remove added files from the selected list
function displaySelectedFiles() {
	const fileInput = document.getElementById("fileInput");
	const selectedFiles = fileInput.files;
	const selectedFilesContainer = document.getElementById("selectedFiles");
	selectedFilesContainer.innerHTML = ""; // Clear previous selections

	if (selectedFiles.length === 0) {
		selectedFilesContainer.textContent = "No files selected.";
	} else {
		for (let i = 0; i < selectedFiles.length; i++) {
			const fileName = selectedFiles[i].name;
			const fileItem = document.createElement("div");
			fileItem.classList.add("file-item");

			// Create a checkbox for file selection
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.className = "file-checkbox";
			checkbox.dataset.fileId = selectedFiles[i].id; // Assuming the file id is available
			checkbox.dataset.fileName = fileName;

			// Add the filename as text inside a <p> element
			const fileNameText = document.createElement("p");
			fileNameText.textContent = fileName;
			fileNameText.id = "card-content-name"; // Add id attribute

			// Create a button to remove the selected file
			const removeButton = document.createElement("button");
			removeButton.textContent = "Remove";
			removeButton.classList.add("remove-button");

			removeButton.onclick = function () {
				const indexToRemove = Array.from(selectedFiles).findIndex(
					(file) => file.name === fileName
				);
				if (indexToRemove > -1) {
					const newFiles = Array.from(selectedFiles);
					newFiles.splice(indexToRemove, 1);
					const newFileList = new DataTransfer();
					newFiles.forEach((file) => newFileList.items.add(file));
					fileInput.files = newFileList.files;
					displaySelectedFiles();
				}
			};

			// Append the checkbox, filename, and remove button to the file item
			fileItem.appendChild(checkbox);
			fileItem.appendChild(fileNameText);
			fileItem.appendChild(removeButton);

			// Append the file item to the selected files container
			selectedFilesContainer.appendChild(fileItem);
		}
	}
}
