/** @format */

const f1_token = localStorage.getItem("token");

// Function to handle image file search
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

// Function to handle video file search
const videosearch = () => {
	const searchbox = document
		.getElementById("videosearchBar")
		.value.toUpperCase();
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

// Function to handle audio file search
const audiosearch = () => {
	const searchbox = document
		.getElementById("audiosearchBar")
		.value.toUpperCase();
	const audioContainerDiv = document.querySelectorAll(".audio-container-box");

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

// Function to handle doc file search
const docsearch = () => {
	const searchbox = document.getElementById("docsearchBar").value.toUpperCase();
	const docContainerDiv = document.querySelectorAll(".doc-wrapper-container");

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
	const searchbox = document
		.getElementById("filessearchBar")
		.value.toUpperCase();
	const fileContainerDiv = document.querySelectorAll(".files-container-box");

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

// Add event listener to the search bar input
document.getElementById("searchBar").addEventListener("input", search);
document
	.getElementById("videosearchBar")
	.addEventListener("input", videosearch);
document
	.getElementById("audiosearchBar")
	.addEventListener("input", audiosearch);
document.getElementById("filessearchBar").addEventListener("input", filesearch);
document.getElementById("docsearchBar").addEventListener("input", docsearch);

fetch("https://ishare-i8td.onrender.com/files", {
	// Fetch files from the Flask backend
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
		const photosContainer = document.getElementById("photosfileList"); // Display image files
		const videoFileList = document.getElementById("videofileList"); // Display video files
		const audioFileList = document.getElementById("audiofileList"); // Display audio files
		const docFileList = document.getElementById("docfileList"); // Display document files
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
				imageContainerBox.id = `file-${file.id}`; // Use file ID

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

				// Add right-click event listener
				imageContainerBox.addEventListener("contextmenu", (event) => {
					event.preventDefault();
					showButtons(event, file.id, file.filename); // Call showButtons for both download and delete buttons
				});
			} else if (["mp4", "mov", "avi", "mkv"].includes(fileExtension)) {
				const videoContainerDiv = document.createElement("div");
				videoContainerDiv.className = "video-container-box";
				videoContainerDiv.id = `file-${file.id}`; // Use file ID

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

				// Add right-click event listener
				videoContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault();
					showButtons(event, file.id, file.filename);
				});
			} else if (["mp3", "wav", "ogg"].includes(fileExtension)) {
				const audioContainerDiv = document.createElement("div");
				audioContainerDiv.className = "audio-container-box";
				audioContainerDiv.id = `file-${file.id}`; // Use file ID

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

				// Add right-click event listener
				audioContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault();
					showButtons(event, file.id, file.filename);
				});
			} else if (
				["doc", "docx", "pdf", "xls", "xlsx", "ppt", "pptx"].includes(
					fileExtension
				)
			) {
				const docContainerDiv = document.createElement("div");
				docContainerDiv.className = "doc-wrapper-container";
				docContainerDiv.id = `file-${file.id}`; // Use file ID

				const fileDiv = document.createElement("div");
				fileDiv.className = "file-container";
				fileDiv.id = "file-container";

				const docElement = document.createElement("img");
				docElement.src = "/static/images/file-type-icons/doc-icon.png";
				fileDiv.appendChild(docElement);

				const fileNameDiv = document.createElement("h2");
				fileNameDiv.className = "file-name";
				fileNameDiv.id = "fileName"; // Add id attribute
				const truncatedFileName = truncateFileName(
					file.filename,
					MAX_FILE_NAME_LENGTH
				);
				fileNameDiv.textContent = truncatedFileName;
				fileDiv.appendChild(fileNameDiv);

				docContainerDiv.appendChild(fileDiv);
				docFileList.appendChild(docContainerDiv);

				// Add right-click event listener
				docContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault();
					showButtons(event, file.id, file.filename);
				});
			} else {
				const otherContainerDiv = document.createElement("div");
				otherContainerDiv.className = "files-container-box";
				otherContainerDiv.id = `file-${file.id}`; // Use file ID

				const fileElement = document.createElement("img");
				fileElement.src = "/static/images/file-type-icons/file-icon.png";
				otherContainerDiv.appendChild(fileElement);

				const fileNameDiv = document.createElement("h2");
				fileNameDiv.className = "file-name";
				fileNameDiv.id = "fileName"; // Add id attribute
				const truncatedFileName = truncateFileName(
					file.filename,
					MAX_FILE_NAME_LENGTH
				);
				fileNameDiv.textContent = truncatedFileName;
				otherContainerDiv.appendChild(fileNameDiv);

				otherFilesContainer.appendChild(otherContainerDiv);

				// Add right-click event listener
				otherContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault();
					showButtons(event, file.id, file.filename);
				});
			}
		});
	})
	.catch((error) => {
		console.error("Error fetching files:", error);
	});

const d_token = localStorage.getItem("token");

function createDownloadButton(fileId, filename) {
	const downloadButton = document.createElement("button");
	downloadButton.className = "context-menu-button";
	downloadButton.innerHTML = `<i class="fas fa-download icon"></i> Download`;
	downloadButton.addEventListener("click", () => {
		downloadFile(fileId, filename);
	});
	return downloadButton;
}

function createDeleteButton(fileId, filename) {
	const deleteButton = document.createElement("button");
	deleteButton.className = "context-menu-button";
	deleteButton.innerHTML = `<i class="fas fa-trash-alt icon"></i> Delete`;
	deleteButton.addEventListener("click", () => {
		deleteFile(fileId, filename);
	});
	return deleteButton;
}

function createShareButton(fileId, filename) {
	const shareButton = document.createElement("button");
	shareButton.className = "context-menu-button";
	shareButton.innerHTML = `<i class="fas fa-share-alt icon"></i> Share`;
	shareButton.addEventListener("click", () => {
		deleteFile(fileId, filename);
	});
	return shareButton;
}

function showButtons(event, fileId, filename) {
	const existingContainer = document.querySelector(".context-menu-container");
	if (existingContainer) {
		existingContainer.remove();
	}

	const menuContainer = document.createElement("div");
	menuContainer.className = "context-menu-container";
	menuContainer.style.left = `${event.pageX}px`;
	menuContainer.style.top = `${event.pageY}px`;

	const downloadButton = createDownloadButton(fileId, filename);
	const deleteButton = createDeleteButton(fileId, filename);
	const shareButton = createShareButton(fileId, filename);
	menuContainer.appendChild(downloadButton);
	menuContainer.appendChild(deleteButton);
	menuContainer.appendChild(shareButton);

	document.body.appendChild(menuContainer);
	document.addEventListener("click", hideButtons);
	menuContainer.addEventListener("click", (event) => event.stopPropagation());
}

function hideButtons() {
	const menuContainer = document.querySelector(".context-menu-container");
	if (menuContainer) {
		menuContainer.remove();
	}
	document.removeEventListener("click", hideButtons);
}

function downloadFile(fileId, filename) {
	fetch(`https://ishare-i8td.onrender.com/download/${fileId}`, {
		headers: {
			Authorization: `Bearer ${d_token}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.blob();
		})
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			a.remove();
		})
		.catch((error) => {
			console.error("Error downloading file:", error);
		});
}

function deleteFile(fileId, filename) {
	fetch(`https://ishare-i8td.onrender.com/delete/${fileId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${d_token}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			console.log(`File '${filename}' deleted successfully.`);

			const fileElement = document.getElementById(`file-${fileId}`);
			if (fileElement) {
				fileElement.remove();
				console.log(`File element '${filename}' removed from UI.`);
			} else {
				console.log(`File element '${filename}' not found in UI.`);
			}

			// Display a notification message
			showDeleteNotification(filename);
		})
		.catch((error) => {
			console.error("Error deleting file:", error);
		});
}

function showDeleteNotification(filename) {
	// Create a notification message element
	const notificationElement = document.createElement("div");
	notificationElement.className = "delete-notification";
	notificationElement.textContent = `File '${filename}' has been deleted.`;

	// Append the notification to the document body
	document.body.appendChild(notificationElement);

	// Automatically remove the notification after a certain duration
	setTimeout(() => {
		notificationElement.remove();
	}, 3000); // Remove after 3 seconds (adjust duration as needed)
}

function truncateFileName(fileName, maxLength) {
	if (fileName.length > maxLength) {
		return fileName.slice(0, maxLength - 3) + "...";
	} else {
		return fileName;
	}
}
