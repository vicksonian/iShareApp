/** @format */

const f1_token = localStorage.getItem("token");
console.log("Files Upload Retrieved token:\n", f1_token);
console.log("Files Upload Retrieved Token", f1_token);

// Function to handle file search
const search = () => {
	const searchbox = document.getElementById("searchBar").value.toUpperCase();
	const imagecontainerbox = document.querySelectorAll(".image-container-box");

	for (let i = 0; i < imagecontainerbox.length; i++) {
		const file_name = imagecontainerbox[i].getElementsByTagName("h2")[0];
		if (file_name) {
			const textvalue = file_name.textContent || file_name.innerHTML;
			if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
				imagecontainerbox[i].style.display = "block";
			} else {
				imagecontainerbox[i].style.display = "none";
			}
		} else {
			console.log("h2 tag inside imagecontainerbox[" + i + "] is undefined");
		}
	}
};

// Add event listener to the search bar input
document.getElementById("searchBar").addEventListener("input", search);

fetch("https://ishare-i8td.onrender.com/files", {
	// Fetch files from the Flask backend
	// fetch("http://192.168.74.8:5000/files", {
	headers: {
		Authorization: `Bearer ${f1_token}`,
	},
})
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.json(); // Parse response as JSON
	})
	.then((data) => {
		// Get the photos and other files containers div
		const photosContainer = document.getElementById("photosfileList"); //display image files
		const videoFileList = document.getElementById("videofileList"); //display video files
		const audioFileList = document.getElementById("audiofileList"); //display audio files
		const docFileList = document.getElementById("docfileList"); //display audio files
		const otherFilesContainer = document.getElementById("otherFilesList");

		// Clear any existing content in the containers
		photosContainer.innerHTML = "";
		videoFileList.innerHTML = "";
		audioFileList.innerHTML = "";
		docFileList.innerHTML = "";
		otherFilesContainer.innerHTML = "";

		// Iterate over each file in the response data
		data.files.forEach((file) => {
			console.log(data);
			// Check the file extension
			const fileExtension = file.filename.split(".").pop().toLowerCase();

			const MAX_FILE_NAME_LENGTH = 20;

			// Create an appropriate HTML element based on the file type
			if (["jpg", "jpeg", "svg", "png"].includes(fileExtension)) {
				const imageContainerBox = document.createElement("div");
				imageContainerBox.className = "image-container-box";
				imageContainerBox.id = "image-container-box";

				const imageDiv = document.createElement("div");
				imageDiv.className = "image";
				imageDiv.id = "image";

				const imageElement = document.createElement("img");
				imageElement.src = `data:${file.content_type};base64,${file.content}`;
				imageDiv.appendChild(imageElement);

				const fileNameDiv = document.createElement("h2");
				fileNameDiv.className = "file-name";
				fileNameDiv.id = "fileName"; // Add id attribute
				const truncatedFileName = truncateFileName(
					file.filename,
					MAX_FILE_NAME_LENGTH
				);
				fileNameDiv.textContent = truncatedFileName;
				imageDiv.appendChild(fileNameDiv);

				imageContainerBox.appendChild(imageDiv);
				photosContainer.appendChild(imageContainerBox);
				// Add context menu event listener
				imageContainerBox.addEventListener("contextmenu", (event) => {
					event.preventDefault(); // Prevent default browser context menu
					// Download logic here
					downloadFile(file);
				});

				// Add context menu event listener
				imageContainerBox.addEventListener("contextmenu", (event) => {
					event.preventDefault(); // Prevent default browser context menu
					// Position the context menu
					contextMenu.style.top = `${event.clientY}px`;
					contextMenu.style.left = `${event.clientX}px`;
				});
			} else if (["mp4", "mov", "avi", "mkv"].includes(fileExtension)) {
				const videoContainerDiv = document.createElement("div");
				videoContainerDiv.className = "video-container-box";

				const videoElement = document.createElement("video");
				videoElement.src = `data:${file.content_type};base64,${file.content}`;
				videoElement.controls = true;
				videoContainerDiv.appendChild(videoElement);

				const fileNameDiv = document.createElement("h2");
				fileNameDiv.className = "file-name";
				fileNameDiv.id = "fileName"; // Add id attribute
				const truncatedFileName = truncateFileName(
					file.filename,
					MAX_FILE_NAME_LENGTH
				);
				fileNameDiv.textContent = truncatedFileName;

				videoContainerDiv.appendChild(fileNameDiv);

				videoFileList.appendChild(videoContainerDiv);

				// Add context menu event listener
				videoContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault(); // Prevent default browser context menu
					// Download logic here
					downloadFile(file);
				});

				// Add context menu event listener
				videoContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault(); // Prevent default browser context menu
					// Position the context menu
					contextMenu.style.top = `${event.clientY}px`;
					contextMenu.style.left = `${event.clientX}px`;
				});
			} else if (["mp3", "wav"].includes(fileExtension)) {
				const audioContainerDiv = document.createElement("div");
				audioContainerDiv.className = "audio-container-box";

				const audioElement = document.createElement("audio");
				audioElement.src = `data:${file.content_type};base64,${file.content}`;
				audioElement.controls = true;
				audioContainerDiv.appendChild(audioElement);

				const fileNameDiv = document.createElement("h2");
				fileNameDiv.className = "file-name";
				fileNameDiv.id = "fileName"; // Add id attribute
				const truncatedFileName = truncateFileName(
					file.filename,
					MAX_FILE_NAME_LENGTH
				);
				fileNameDiv.textContent = truncatedFileName;

				audioContainerDiv.appendChild(fileNameDiv);

				audioFileList.appendChild(audioContainerDiv);

				// Add context menu event listener
				audioContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault(); // Prevent default browser context menu
					// Download logic here
					downloadFile(file);
				});

				// Add context menu event listener
				audioContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault(); // Prevent default browser context menu
					// Position the context menu
					contextMenu.style.top = `${event.clientY}px`;
					contextMenu.style.left = `${event.clientX}px`;
				});
			} else if (["doc", "pdf", "docx"].includes(fileExtension)) {
				// Create a wrapper container div
				const docWrapperContainer = document.createElement("div");
				docWrapperContainer.className = "doc-wrapper-container";

				// Create a container div
				const docContainerDiv = document.createElement("div");
				docContainerDiv.className = "doc-container-box";

				// Create an icon element for the document
				const iconElement = document.createElement("i");
				iconElement.className = "far fa-file"; // Default file icon
				switch (fileExtension) {
					case "pdf":
						iconElement.className = "far fa-file-pdf"; // PDF icon
						break;
					case "doc":
					case "docx":
						iconElement.className = "far fa-file-word"; // Word document icon
						break;
					case "xls":
					case "xlsx":
						iconElement.className = "far fa-file-excel"; // Excel document icon
						break;
					// Add cases for other file types as needed
				}

				// Create a div for the file name
				const fileNameDiv = document.createElement("h2");
				fileNameDiv.className = "file-name";
				fileNameDiv.id = "fileName"; // Add id attribute
				const truncatedFileName = truncateFileName(
					file.filename,
					MAX_FILE_NAME_LENGTH
				);
				fileNameDiv.textContent = truncatedFileName;

				// Append the icon element and the file name div to the container div
				fileNameDiv.prepend(iconElement); // Prepend the icon to the file name
				docContainerDiv.appendChild(fileNameDiv);

				// Append the container div to the wrapper container div
				docWrapperContainer.appendChild(docContainerDiv);

				// Append the wrapper container div to the document file list
				docFileList.appendChild(docWrapperContainer);

				// Add context menu event listener
				docWrapperContainer.addEventListener("contextmenu", (event) => {
					event.preventDefault(); // Prevent default browser context menu
					// Download logic here
					downloadFile(file);
				});
			} else {
				const fileContainerDiv = document.createElement("div");
				fileContainerDiv.className = "files-container-box";

				// Create a div for the contents of the file container
				const contentsDiv = document.createElement("div");
				contentsDiv.className = "files-container-box-contents";

				// Determine the appropriate icon class based on the file extension
				let iconClass;
				switch (fileExtension) {
					case "pdf":
						iconClass = "far fa-file-pdf"; // Font Awesome class for PDF icon
						break;
					case "doc":
					case "docx":
						iconClass = "far fa-file-word"; // Font Awesome class for Word document icon
						break;
					case "xls":
					case "xlsx":
						iconClass = "far fa-file-excel"; // Font Awesome class for Excel document icon
						break;
					// Add cases for other file types as needed
					default:
						iconClass = "far fa-file"; // Default file icon
						break;
				}

				// Create an icon element with the appropriate class
				const iconElement = document.createElement("i");
				iconElement.className = iconClass;

				// Create a div for the icon
				const iconDiv = document.createElement("div");
				iconDiv.className = "icon";
				iconDiv.appendChild(iconElement);

				// Create a div for the file name
				const fileNameDiv = document.createElement("h2");
				fileNameDiv.className = "file-name";
				fileNameDiv.id = "fileName"; // Add id attribute
				const truncatedFileName = truncateFileName(
					file.filename,
					MAX_FILE_NAME_LENGTH
				);
				fileNameDiv.textContent = truncatedFileName;

				// Append the icon div and file name div to the contents div
				contentsDiv.appendChild(iconDiv);
				contentsDiv.appendChild(fileNameDiv);

				// Add context menu event listener
				fileContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault(); // Prevent default browser context menu
					// Download logic here
					downloadFile(file);
				});

				// Append the contents div to the file container div
				fileContainerDiv.appendChild(contentsDiv);

				// Append the file container div to the otherFilesContainer
				otherFilesContainer.appendChild(fileContainerDiv);
			}
		});
	})
	.catch((error) => {
		console.error("Error fetching files:", error);
	});

// Function to truncate file names
function truncateFileName(fileName, maxLength) {
	console.log("Truncating filename:", fileName);
	if (fileName.length > maxLength) {
		return fileName.slice(0, maxLength - 3) + "..."; // Truncate and add ellipsis
	} else {
		return fileName; // Return original name if it's not longer than maxLength
	}
}

// Function to download a file
function downloadFile(file) {
	// Create a temporary anchor element
	const link = document.createElement("a");
	link.href = `data:${file.content_type};base64,${file.content}`;
	link.download = file.filename;
	// Append the anchor to the body
	document.body.appendChild(link);
	// Trigger a click event on the anchor
	link.click();
	// Remove the anchor from the body
	document.body.removeChild(link);
}

// Create the context menu container
const contextMenu = document.createElement("div");
contextMenu.className = "context-menu";

// Create buttons for download, delete, and share
const downloadButton = document.createElement("button");
downloadButton.textContent = "Download";
downloadButton.addEventListener("click", () => {
	downloadFile(file);
});

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.addEventListener("click", () => {
	deleteFile(file);
});

const shareButton = document.createElement("button");
shareButton.textContent = "Share";
shareButton.addEventListener("click", () => {
	shareFile(file);
});

// Append buttons to the context menu
contextMenu.appendChild(downloadButton);
contextMenu.appendChild(deleteButton);
contextMenu.appendChild(shareButton);

// Append the context menu to the document body
document.body.appendChild(contextMenu);

// Hide the context menu when clicking outside of it
document.addEventListener("click", () => {
	contextMenu.style.display = "none";
});

function deleteFile(fileId, fileName) {
	const dellocalStorageToken = localStorage.getItem("token");
	console.log("Retrieved token Upload:", dellocalStorageToken);

	const confirmed = confirm(`Are you sure you want to delete "${fileName}"?`);
	if (confirmed) {
		fetch(`https://ishare-i8td.onrender.com/delete/${fileId}`, {
			// fetch(`http://192.168.74.8:5000/delete/${fileId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${dellocalStorageToken}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Failed to delete file: ${response.status}`);
				}
				// Remove the deleted file from the DOM
				document.querySelector(`[data-file-id="${fileId}"]`).remove();
				console.log(`File "${fileName}" deleted successfully.`);
			})
			.catch((error) => {
				console.error("Error deleting file:", error);
			});
	}
}

document.getElementById("deleteOption").addEventListener("click", function () {
	const selectedFiles = document.querySelectorAll(".card.selected");
	selectedFiles.forEach((card) => {
		const fileId = card.parentNode.dataset.fileId;
		const fileName = card.parentNode.dataset.fileName;
		deleteFile(fileId, fileName);
	});
});

// Function to share a file
function shareFile(file) {
	// Share logic here
}


// Function to handle file search
const videosearch = () => {
	const searchbox = document.getElementById("videosearchBar").value.toUpperCase();
	const videoContainerDiv = document.querySelectorAll(".video-container-box");

	for (let i = 0; i < videoContainerDiv.length; i++) {
		const file_name = videoContainerDiv[i].getElementsByTagName("h2")[0];
		if (file_name) {
			const textvalue = file_name.textContent || file_name.innerHTML;
			if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
				videoContainerDiv[i].style.display = "block";
			} else {
				videoContainerDiv[i].style.display = "none";
			}
		} else {
			console.log("h2 tag inside videoContainerDiv[" + i + "] is undefined");
		}
	}
};
// Function to handle file search
const audeosearch = () => {
	const searchbox = document.getElementById("audiosearchBar").value.toUpperCase();
	const audioContainerDiv = document.querySelectorAll(".video-container-box");

	for (let i = 0; i < audioContainerDiv.length; i++) {
		const file_name = audioContainerDiv[i].getElementsByTagName("h2")[0];
		if (file_name) {
			const textvalue = file_name.textContent || file_name.innerHTML;
			if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
				audioContainerDiv[i].style.display = "block";
			} else {
				audioContainerDiv[i].style.display = "none";
			}
		} else {
			console.log("h2 tag inside audioContainerDiv[" + i + "] is undefined");
		}
	}
};
// Function to handle file search
const docsearch = () => {
	const searchbox = document.getElementById("docsearchBar").value.toUpperCase();
	const docContainerDiv = document.querySelectorAll(".video-container-box");

	for (let i = 0; i < docContainerDiv.length; i++) {
		const file_name = docContainerDiv[i].getElementsByTagName("h2")[0];
		if (file_name) {
			const textvalue = file_name.textContent || file_name.innerHTML;
			if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
				docContainerDiv[i].style.display = "block";
			} else {
				docContainerDiv[i].style.display = "none";
			}
		} else {
			console.log("h2 tag inside docContainerDiv[" + i + "] is undefined");
		}
	}
};
// Function to handle file search
const filesearch = () => {
	const searchbox = document.getElementById("filessearchBar").value.toUpperCase();
	const fileContainerDiv = document.querySelectorAll(".video-container-box");

	for (let i = 0; i < fileContainerDiv.length; i++) {
		const file_name = fileContainerDiv[i].getElementsByTagName("h2")[0];
		if (file_name) {
			const textvalue = file_name.textContent || file_name.innerHTML;
			if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
				fileContainerDiv[i].style.display = "block";
			} else {
				fileContainerDiv[i].style.display = "none";
			}
		} else {
			console.log("h2 tag inside fileContainerDiv[" + i + "] is undefined");
		}
	}
};