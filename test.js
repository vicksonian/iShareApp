/** @format */

const f1_token = localStorage.getItem("token");

const showSpinner = () => {
	const spinner = document.getElementById("spinner");
	spinner.style.display = "block";
};

const hideSpinner = () => {
	const spinner = document.getElementById("spinner");
	spinner.style.display = "none";
};

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
			// console.log("h2 tag inside imagecontainerbox[" + i + "] is undefined");
			console.log("");
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
			// console.log("h2 tag inside videoContainerDiv[" + i + "] is undefined");
			console.log("");
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
			// console.log("h2 tag inside audioContainerDiv[" + i + "] is undefined");
			console.log();
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
			// console.log("h2 tag inside docContainerDiv[" + i + "] is undefined");
			console.log("");
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
			// console.log("h2 tag inside fileContainerDiv[" + i + "] is undefined");
			console.log("");
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

// Function to handle image clicks
function handleImageClick(event) {
	const imageElement = event.target;
	if (!document.fullscreenElement) {
		imageElement.requestFullscreen().catch((err) => {
			console.error("Error attempting to enable full-screen mode:", err);
		});
	} else {
		document.exitFullscreen();
	}
}

// Function to handle video clicks
function handleVideoClick(event) {
	const videoElement = event.target;
	if (!document.fullscreenElement) {
		videoElement.requestFullscreen().catch((err) => {
			console.error("Error attempting to enable full-screen mode:", err);
		});
	} else {
		document.exitFullscreen();
	}
}

// Define a function to fetch and display files
function fetchAndDisplayFiles() {
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
			return response.json();
		})
		.then((data) => {
			const photosContainer = document.getElementById("photosfileList");
			const videoFileList = document.getElementById("videofileList");
			const audioFileList = document.getElementById("audiofileList");
			const docFileList = document.getElementById("docfileList");
			const otherFilesContainer = document.getElementById("otherFilesList");
			const MsgBoxContainer = document.querySelector(".msg");

			photosContainer.innerHTML = "";
			videoFileList.innerHTML = "";
			audioFileList.innerHTML = "";
			docFileList.innerHTML = "";
			otherFilesContainer.innerHTML = "";

			if (data.files.length === 0) {
				MsgBoxContainer.textContent = "No files found...";
			} else {
				MsgBoxContainer.textContent = "";
			}

			// Check if each section has any content
			if (
				photosContainer.children.length === 0 &&
				videoFileList.children.length === 0 &&
				audioFileList.children.length === 0 &&
				docFileList.children.length === 0 &&
				otherFilesContainer.children.length === 0
			) {
				MsgBoxContainer.textContent = "No files found...";
			} else {
				MsgBoxContainer.textContent = "";
			}

			data.files.forEach((file) => {
				const fileExtension = file.filename.split(".").pop().toLowerCase();

				const MAX_FILE_NAME_LENGTH = 20;

				const checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.className = "file-checkbox";
				checkbox.id = `checkbox-${file.id}`;
				checkbox.name = `checkbox-${file.id}`;
				checkbox.style.display = "none";
				checkbox.value = file.filename;

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
					const fileNameDiv = document.createElement("div");
					fileNameDiv.className = "image-name";
					const fileNameHeading = document.createElement("h2");
					fileNameHeading.className = "file-name";
					fileNameHeading.id = "fileName"; // Add id attribute
					const truncatedFileName = truncateFileName(
						file.filename,
						MAX_FILE_NAME_LENGTH
					);
					fileNameHeading.textContent = truncatedFileName;
					fileNameDiv.appendChild(fileNameHeading);
					imageContainerBox.appendChild(imageDiv);
					imageContainerBox.appendChild(fileNameDiv);
					imageContainerBox.appendChild(checkbox);
					photosContainer.appendChild(imageContainerBox);
					imageContainerBox.addEventListener("contextmenu", (event) => {
						event.preventDefault();
						showButtons(event, file.id, file.filename);
					});
					imageElement.addEventListener("click", handleImageClick);
				} else if (["mp4", "mov", "avi", "mkv"].includes(fileExtension)) {
					const videoContainerDiv = document.createElement("div");
					videoContainerDiv.className = "video-container-box";
					videoContainerDiv.id = `file-${file.id}`;
					const videoElement = document.createElement("video");
					videoElement.src = `data:${file.content_type};base64,${file.content}`;
					videoElement.controls = true;
					videoContainerDiv.appendChild(videoElement);
					const fileNameDiv = document.createElement("h2");
					fileNameDiv.className = "file-name";
					fileNameDiv.id = "fileName";
					const truncatedFileName = truncateFileName(
						file.filename,
						MAX_FILE_NAME_LENGTH
					);
					fileNameDiv.textContent = truncatedFileName;
					videoContainerDiv.appendChild(fileNameDiv);
					videoFileList.appendChild(videoContainerDiv);
					videoContainerDiv.addEventListener("contextmenu", (event) => {
						event.preventDefault();
						showButtons(event, file.id, file.filename);
					});
					videoElement.addEventListener("click", handleVideoClick);
				} else if (["mp3", "wav", "ogg"].includes(fileExtension)) {
					const audioContainerDiv = document.createElement("div");
					audioContainerDiv.className = "audio-container-box";
					audioContainerDiv.id = `file-${file.id}`;

					const audioElement = document.createElement("audio");
					audioElement.src = `data:${file.content_type};base64,${file.content}`;
					audioElement.controls = true;
					audioContainerDiv.appendChild(audioElement);

					const fileNameDiv = document.createElement("h2");
					fileNameDiv.className = "file-name";
					fileNameDiv.id = "fileName";
					const truncatedFileName = truncateFileName(
						file.filename,
						MAX_FILE_NAME_LENGTH
					);
					fileNameDiv.textContent = truncatedFileName;
					audioContainerDiv.appendChild(fileNameDiv);
					audioFileList.appendChild(audioContainerDiv);
					audioContainerDiv.addEventListener("contextmenu", (event) => {
						event.preventDefault();
						showButtons(event, file.id, file.filename);
					});
				} else if (["doc", "pdf", "docx"].includes(fileExtension)) {
					const docWrapperContainer = document.createElement("div");
					docWrapperContainer.className = "doc-wrapper-container";
					const docContainerDiv = document.createElement("div");
					docContainerDiv.className = "doc-container-box";
					const iconElement = document.createElement("i");
					iconElement.className = "far fa-file";
					switch (fileExtension) {
						case "pdf":
							iconElement.className = "far fa-file-pdf";
							break;
						case "doc":
						case "docx":
							iconElement.className = "far fa-file-word";
							break;
						case "xls":
						case "xlsx":
							iconElement.className = "far fa-file-excel";
							break;
					}
					const fileNameDiv = document.createElement("h2");
					fileNameDiv.className = "file-name";
					fileNameDiv.id = "fileName";
					const truncatedFileName = truncateFileName(
						file.filename,
						MAX_FILE_NAME_LENGTH
					);
					fileNameDiv.textContent = truncatedFileName;
					fileNameDiv.prepend(iconElement);
					docContainerDiv.appendChild(fileNameDiv);
					docWrapperContainer.appendChild(docContainerDiv);
					docFileList.appendChild(docWrapperContainer);
					docWrapperContainer.addEventListener("contextmenu", (event) => {
						event.preventDefault();
						showButtons(event, file.id, file.filename);
					});
				} else {
					const fileContainerDiv = document.createElement("div");
					fileContainerDiv.className = "files-container-box";
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

					const iconElement = document.createElement("i");
					iconElement.className = iconClass;
					const iconDiv = document.createElement("div");
					iconDiv.className = "icon";
					iconDiv.appendChild(iconElement);
					const fileNameDiv = document.createElement("h2");
					fileNameDiv.className = "file-name";
					fileNameDiv.id = "fileName";
					const truncatedFileName = truncateFileName(
						file.filename,
						MAX_FILE_NAME_LENGTH
					);
					fileNameDiv.textContent = truncatedFileName;
					contentsDiv.appendChild(iconDiv);
					contentsDiv.appendChild(fileNameDiv);
					fileContainerDiv.appendChild(contentsDiv);
					otherFilesContainer.appendChild(fileContainerDiv);
					fileContainerDiv.addEventListener("contextmenu", (event) => {
						event.preventDefault();
						showButtons(event, file.id, file.filename);
					});
				}
			});
			const fileNameElements = document.querySelectorAll(".file-name");

			fileNameElements.forEach((fileNameElement) => {
				fileNameElement.addEventListener("dblclick", () => {
					const checkbox =
						fileNameElement.parentNode.querySelector(".file-checkbox");
					if (checkbox) {
						checkbox.checked = !checkbox.checked;
					}
				});
			});
		})
		.catch((error) => {
			console.error("Error fetching files:", error);
		})
		.finally(() => {
			hideSpinner(); // Hide the spinner
		});
}

fetchAndDisplayFiles();
const intervalId = setInterval(fetchAndDisplayFiles, 600000);

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

function createRenameButton(fileId, filename) {
	const renamebtn = document.createElement("button");
	renamebtn.className = "context-menu-button";
	renamebtn.innerHTML = `<i class="fas fa-edit icon"></i> Rename`; // Use 'fa-edit' for the rename icon
	renamebtn.addEventListener("click", (event) => {
		event.preventDefault();
		showRenameMenu(event, fileId, filename); // Assuming you have a function to handle renaming
	});
	return renamebtn;
}


// Example rename menu function (you need to implement the details)
function showRenameMenu(event, fileId, filename) {
	// Your code to show the rename menu or prompt goes here
	// For example, you could prompt the user to enter a new name for the file
	const newName = prompt("Enter new name for the file:", filename);
	if (newName) {
		// Call a function to handle the renaming process
		renameFile(fileId, newName);
	}
}

// Example function to handle renaming (you need to implement the details)
function renameFile(fileId, newName) {
	console.log(`Renaming file ${fileId} to ${newName}`);
	// Your code to rename the file on the server goes here
	// For example, you could make an API call to rename the file
}


function createSelectAllButton(fileId, filename) {
	const selectAllButton = document.createElement("button");
	selectAllButton.className = "context-menu-button";
	selectAllButton.innerHTML = `<i class="fas fa-share-alt icon"></i> Select All`;
	selectAllButton.addEventListener("click", (event) => {
		event.preventDefault();
		showShareMenu(event, fileId, filename);
	});
	return selectAllButton;
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
	const renameButton = createRenameButton(fileId, filename);
	const selectAllButton = createSelectAllButton(fileId, filename);
	menuContainer.appendChild(downloadButton);
	menuContainer.appendChild(deleteButton);
	menuContainer.appendChild(shareButton);
	menuContainer.appendChild(renameButton);
	menuContainer.appendChild(selectAllButton);

	// Add event listener to hide menu when any button is clicked
	downloadButton.addEventListener("click", hideButtons);
	deleteButton.addEventListener("click", hideButtons);
	shareButton.addEventListener("click", hideButtons);
	renameButton.addEventListener("click", hideButtons);
	selectAllButton.addEventListener("click", hideButtons);

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
			console.log("");
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
			showDeleteNotification(filename);
		})
		.catch((error) => {
			console.error("Error deleting file:", error);
		});
}

function showDeleteNotification(filename) {
	const notificationElement = document.createElement("div");
	notificationElement.className = "delete-notification";
	notificationElement.textContent = `File '${filename}' has been deleted.`;
	document.body.appendChild(notificationElement);
	setTimeout(() => {
		notificationElement.remove();
	}, 3000);
}

function showShareMenu(event, fileId, filename) {
	const existingContainer = document.querySelector(
		".share-context-menu-container"
	);
	if (existingContainer) {
		existingContainer.remove();
	}
	const menuContainer = document.createElement("div");
	menuContainer.className = "share-context-menu-container";
	const headerContainer = document.createElement("div");
	headerContainer.className = "header-container";
	const header = document.createElement("h3");
	header.className = "share-context-menu-header";
	header.textContent = "Enter recipient's username or email";
	headerContainer.appendChild(header);
	const clbtn = document.createElement("button");
	clbtn.className = "context-menu-closeButton";
	clbtn.id = "context-menu-close-btn";
	clbtn.innerHTML = `<i class="fas fa-times icon"></i>`;
	clbtn.addEventListener("click", () => {
		menuContainer.remove();
		document.removeEventListener("click", hideMenuOnClickOutside);
	});
	headerContainer.appendChild(clbtn);
	menuContainer.appendChild(headerContainer);

	const input = document.createElement("input");
	input.id = "recipientInput";
	input.className = "context-menu-input recipient-input";
	menuContainer.appendChild(input);

	const sharebtn = document.createElement("button");
	sharebtn.className = "shareButton";
	sharebtn.id = "shareButton";
	const icon = document.createElement("i");
	icon.className = "fas fa-share-alt icon";
	icon.id = "shareButtonicon";
	sharebtn.appendChild(icon);

	// Create the spinner element dynamically
	const spinner = document.createElement("div");
	spinner.className = "spinner-container";
	spinner.style.position = "absolute";
	spinner.innerHTML = `
  <div class="share-button-spinner"></div>
`;
	spinner.style.display = "none";
	sharebtn.appendChild(spinner);

	menuContainer.appendChild(sharebtn);

	const msg = document.createElement("div");
	msg.className = "msgContainer";
	msg.id = "msgContainer";
	msg.style.display = "flex";
	msg.style.marginTop = "10px";
	msg.textContent = " ";
	menuContainer.appendChild(msg);

	const confirmationMsg = document.createElement("div");
	const maxLength = 50;
	const truncatedFilename =
		filename.length > maxLength
			? filename.substring(0, maxLength) + "..."
			: filename;
	confirmationMsg.textContent = `File '${truncatedFilename}' selected for sharing.`;
	confirmationMsg.className = "confirmation-message";
	menuContainer.appendChild(confirmationMsg);
	setTimeout(() => {
		confirmationMsg.remove();
	}, 1440000);
	document.body.appendChild(menuContainer);

	menuContainer.style.display = "block";
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;
	const menuWidth = menuContainer.offsetWidth;
	const menuHeight = menuContainer.offsetHeight;

	menuContainer.style.left = `${(viewportWidth - menuWidth) / 2}px`;
	menuContainer.style.top = `${(viewportHeight - menuHeight) / 2}px`;
	document.addEventListener("click", hideMenuOnClickOutside);
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

	let recipientIdentifier = "";

	input.addEventListener("input", () => {
		recipientIdentifier = input.value.trim();

		// Log the recipient identifier for debugging
		console.log("Recipient identifier:", recipientIdentifier);
	});

	// Modify shareFile function to accept additional parameters for message and color
	function shareFile(fileId, recipient, message, color) {
		const payload = {
			file_ids: [fileId],
			recipient_identifier: recipient,
		};

		// Show spinner
		const spinner = document.querySelector(".spinner-container");
		spinner.style.display = "block";

		const fs_token = localStorage.getItem("token");

		fetch("https://ishare-i8td.onrender.com/share", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${fs_token}`,
			},
			body: JSON.stringify(payload),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				if (data.error) {
					showShareMenuMessage(message, color);
				} else {
					showShareMenuMessage(`File shared with ${recipient}`, color);
				}
				console.log("File shared successfully:", data);
			})
			.catch((error) => {
				console.error("Error sharing file:", error);
				showShareMenuMessage("Error sharing file", "red");
			})
			.finally(() => {
				// Hide spinner after request completion
				spinner.style.display = "none";
			});
	}

	function showShareMenuMessage(message, color) {
		let msgContainer = document.getElementById("msgContainer");
		if (!msgContainer) {
			msgContainer = document.createElement("div");
			msgContainer.id = "msgContainer";
			msgContainer.className = "msgContainer";
			msgContainer.style.display = "flex";
			msgContainer.style.marginTop = "10px";
			document.body.appendChild(msgContainer);
		}
		// Update message container
		msgContainer.textContent = message;
		msgContainer.style.color = color;
	}

	// Add event listener to the share button
	sharebtn.addEventListener("click", (e) => {
		e.stopPropagation();
		const recipient = recipientIdentifier;
		console.log("Recipient identifier:", recipient);

		if (recipient === "") {
			msgContainer("Recipient cannot be empty", "red");
			return;
		}
		shareFile(fileId, recipient, "", "");
	});
}

function hideMenuOnClickOutside(event) {
	const menuContainer = document.querySelector(".share-context-menu-container");
	if (menuContainer && !menuContainer.contains(event.target)) {
		menuContainer.remove();
		document.removeEventListener("click", hideMenuOnClickOutside);
	}
}
