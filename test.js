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
						iconClass = "far fa-file-pdf";
						break;
					case "html":
						iconClass = "fab fa-html5";
						break;
					case "css":
						iconClass = "far fa-css3-alt";
						break;
					case "py":
						iconClass = "fab fa-python";
						break;
					case "js":
						iconClass = "fab fa-js-square";
						break;
					case "xlsx":
						iconClass = "far fa-file-excel";
						break;
					case "gif":
						iconClass = "fas fa-file-video";
						break;
					default:
						iconClass = "far fa-file";
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

function truncateFileName(fileName, maxLength) {
	if (fileName.length > maxLength) {
		return fileName.slice(0, maxLength - 3) + "...";
	} else {
		return fileName;
	}
}

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
	shareButton.addEventListener("click", (event) => {
		event.preventDefault();
		showShareMenu(event, fileId, filename);
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

	// Add event listener to hide menu when any button is clicked
	downloadButton.addEventListener("click", hideButtons);
	deleteButton.addEventListener("click", hideButtons);
	shareButton.addEventListener("click", hideButtons);

	document.body.appendChild(menuContainer);

	// Add event listener to hide menu when clicking outside the menu
	document.addEventListener("click", hideButtonsOutside);
	menuContainer.addEventListener("click", (event) => event.stopPropagation());
}

function hideButtons() {
	const menuContainer = document.querySelector(".context-menu-container");
	if (menuContainer) {
		menuContainer.remove();
	}
	document.removeEventListener("click", hideButtonsOutside);
}

function hideButtonsOutside(event) {
	const menuContainer = document.querySelector(".context-menu-container");
	if (menuContainer && !menuContainer.contains(event.target)) {
		menuContainer.remove();
	}
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

function showShareMenu(event, fileId, filename) {
	// Remove any existing menu container
	const existingContainer = document.querySelector(
		".share-context-menu-container"
	);
	if (existingContainer) {
		existingContainer.remove();
	}

	// Create the menu container
	const menuContainer = document.createElement("div");
	menuContainer.className = "share-context-menu-container";

	// Create and append the header container and its elements
	const headerContainer = document.createElement("div");
	headerContainer.className = "header-container";

	const header = document.createElement("h3");
	header.className = "share-context-menu-header";
	header.textContent = "Enter recipient's username or email";
	headerContainer.appendChild(header);

	const clbtn = document.createElement("button");
	clbtn.className = "context-menu-button";
	clbtn.innerHTML = `<i class="fas fa-times icon"></i>`;
	clbtn.addEventListener("click", () => {
		menuContainer.remove();
		document.removeEventListener("click", hideMenuOnClickOutside);
	});
	headerContainer.appendChild(clbtn);

	menuContainer.appendChild(headerContainer);

	// Create and append the input field
	const input = document.createElement("input");
	input.id = "recipientInput";
	input.className = "context-menu-input";
	menuContainer.appendChild(input);

	// Create and append the share button
	const sharebtn = document.createElement("button");
	sharebtn.className = "shareButton";
	sharebtn.id = "shareButton";
	sharebtn.innerHTML = `<i class="fas fa-share-alt icon"></i>`;
	menuContainer.appendChild(sharebtn);

	const msg = document.createElement("div");
	msg.className = "msgContainer";
	msg.id = "msgContainer";
	msg.style.display = "flex";
	msg.style.marginTop = "10px";
	msg.textContent = " ";
	menuContainer.appendChild(msg);

	// Append the menu container to the body
	document.body.appendChild(menuContainer);

	// Make the menu container visible
	menuContainer.style.display = "block";

	// Center the menu on the screen
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;
	const menuWidth = menuContainer.offsetWidth;
	const menuHeight = menuContainer.offsetHeight;

	menuContainer.style.left = `${(viewportWidth - menuWidth) / 2}px`;
	menuContainer.style.top = `${(viewportHeight - menuHeight) / 2}px`;

	// Add event listener to hide menu when clicking outside the menu
	document.addEventListener("click", hideMenuOnClickOutside);

	// Add event listener to input for real-time validation
	input.addEventListener("input", () => {
		const recipientIdentifier = input.value;
		const fv_token = localStorage.getItem("token");
		if (recipientIdentifier.length > 0) {
			fetch("https://ishare-i8td.onrender.com/validate_user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${fv_token}`,
				},
				body: JSON.stringify({
					recipient_identifier: recipientIdentifier,
				}),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					console.log("API Response:", data);
					const msgContainer = document.getElementById("msgContainer");
					if (msgContainer) {
						console.log("Message Holder Found:", msgContainer);
						const message = data.exists
							? `${recipientIdentifier} is available for sharing`
							: `${recipientIdentifier} is not available for sharing`;
						msgContainer.textContent = message;
						msgContainer.style.color = data.exists ? "green" : "red";
					} else {
						console.error("Message Holder not found in the DOM");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
					const msgContainer = document.getElementById("msgContainer");
					if (msgContainer) {
						msgContainer.textContent = "Error validating user";
						msgContainer.style.color = "red";
					}
				});
		} else {
			const msgContainer = document.getElementById("msgContainer");
			if (msgContainer) {
				msgContainer.textContent = "";
			}
		}
	});
}

function hideMenuOnClickOutside(event) {
	const menuContainer = document.querySelector(".share-context-menu-container");
	if (menuContainer && !menuContainer.contains(event.target)) {
		menuContainer.remove();
		document.removeEventListener("click", hideMenuOnClickOutside);
	}
}

const fs_token = localStorage.getItem("token");
function shareFile(fileId, recipient) {
	const payload = {
		file_ids: [fileId],
		recipient_identifier: recipient,
	};

	fetch("https://ishare-i8td.onrender.com/share", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${fs_token}`,
		},
		body: JSON.stringify(payload),
	})
		.then((response) => response.json())
		.then((data) => {
			const messageHolder = document.getElementById("messageHolder");
			if (data.error) {
				messageHolder.textContent = data.error;
				messageHolder.style.color = "red";
			} else {
				messageHolder.textContent = data.message;
				messageHolder.style.color = "green";
			}
		})
		.catch((error) => {
			console.error("Error sharing file:", error);
			const messageHolder = document.getElementById("messageHolder");
			messageHolder.textContent = "An error occurred while sharing the file";
			messageHolder.style.color = "red";
		});
}
