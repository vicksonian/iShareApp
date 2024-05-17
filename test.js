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

// fetch("https://ishare-i8td.onrender.com/files", {
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

				// Add right-click event listener
				imageContainerBox.addEventListener("contextmenu", (event) => {
					event.preventDefault();
					showButtons(event, file.id, file.filename); // Call showButtons for both download and delete buttons
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

				// Add right-click event listener
				videoContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault();
					showButtons(event, file.id, file.filename);
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

				// Add right-click event listener
				audioContainerDiv.addEventListener("contextmenu", (event) => {
					event.preventDefault();
					showButtons(event, file.id, file.filename);
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

				// Add right-click event listener
				docWrapperContainer.addEventListener("contextmenu", (event) => {
					event.preventDefault();
					showButtons(event, file.id, file.filename);
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

				// Append the contents div to the file container div
				fileContainerDiv.appendChild(contentsDiv);

				// Append the file container div to the otherFilesContainer
				otherFilesContainer.appendChild(fileContainerDiv);

				// Add right-click event listener
				fileContainerDiv.addEventListener("contextmenu", (event) => {
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

// Function to create a download button
function createDownloadButton(fileId, filename) {
	const downloadButton = document.createElement("button");
	downloadButton.className = "download-button";
	downloadButton.innerHTML = `<i class="fas fa-download"></i> Download`;
	downloadButton.addEventListener("click", () => {
		downloadFile(fileId, filename);
	});
	return downloadButton;
}

// Function to create a delete button
function createDeleteButton(fileId, filename) {
	const deleteButton = document.createElement("button");
	deleteButton.className = "delete-button";
	deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i> Delete`;
	deleteButton.addEventListener("click", () => {
		deleteFile(fileId, filename);
	});
	return deleteButton;
}

// Function to create a share button
function createShareButton(fileId, filename) {
	const shareButton = document.createElement("button");
	shareButton.className = "share-button";
	shareButton.innerHTML = `<i class="fas fa-share-alt"></i> Share`;
	shareButton.addEventListener("click", () => {
		shareFile(fileId, filename);
	});
	return shareButton;
}

// Function to download the file using Fetch API
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

// Function to delete the file using Fetch API
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
		})
		.catch((error) => {
			console.error("Error deleting file:", error);
		});
}

// Function to share the file (placeholder function)
function shareFile(fileId, filename) {
	console.log(`Sharing file '${filename}' (ID: ${fileId})`);
}

// Function to show the download, delete, and share buttons
function showButtons(event, fileId, filename) {
	// Remove any existing menus
	const existingMenus = document.querySelectorAll(".context-menu");
	existingMenus.forEach((menu) => menu.remove());

	// Create the context menu container
	const menuContainer = document.createElement("div");
	menuContainer.className = "context-menu";

	// Create and add the buttons to the context menu
	const downloadButton = createDownloadButton(fileId, filename);
	const deleteButton = createDeleteButton(fileId, filename);
	const shareButton = createShareButton(fileId, filename);

	menuContainer.appendChild(downloadButton);
	menuContainer.appendChild(deleteButton);
	menuContainer.appendChild(shareButton);

	// Position the context menu
	menuContainer.style.left = `${event.pageX}px`;
	menuContainer.style.top = `${event.pageY}px`;

	// Add the context menu to the body
	document.body.appendChild(menuContainer);

	// Hide the context menu when clicking elsewhere
	document.addEventListener("click", hideButtons);

	// Prevent event propagation to avoid hiding buttons immediately
	menuContainer.addEventListener("click", (event) => event.stopPropagation());
}

// Function to hide the buttons
function hideButtons() {
	const menus = document.querySelectorAll(".context-menu");
	menus.forEach((menu) => menu.remove());
	document.removeEventListener("click", hideButtons);
}

// Add event listeners to your elements
document
	.querySelectorAll(
		".image-container-box, .video-container-box, .audio-container-box, .doc-wrapper-container, .files-container-box"
	)
	.forEach((element) => {
		element.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			const fileId = element.dataset.fileId;
			const filename = element.dataset.filename;
			showButtons(event, fileId, filename);
		});
	});

// Function to truncate file names
function truncateFileName(fileName, maxLength) {
	if (fileName.length > maxLength) {
		return fileName.slice(0, maxLength - 3) + "...";
	} else {
		return fileName;
	}
}

