/** @format */
const d_token = localStorage.getItem("token");

// Function to handle file download
const downloadFile = (fileId) => {
	// Send a request to download the file with the specified fileId
	fetch(`https://ishare-i8td.onrender.com/download/${fileId}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${d_token}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to download file. Status: ${response.status}`);
			}
			return response.blob(); // Parse response as Blob
		})
		.then((blob) => {
			// Create a temporary anchor element to trigger the download
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = url;
			a.download = ""; // You can set the filename here if needed
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		})
		.catch((error) => {
			console.error("Error downloading file:", error);
		});
};

// Add event listener to file names to show the context menu
const addContextMenu = (fileNameElement, fileId) => {
	fileNameElement.addEventListener("click", (event) => {
		// Show the context menu associated with this file name
		const contextMenu = fileNameElement.nextElementSibling;
		if (contextMenu) {
			contextMenu.style.display = "block";
		}
		console.log("File name clicked:", fileNameElement.textContent); // Debug statement
		// Prevent the default action of clicking on the file name
		event.preventDefault();
		event.stopPropagation();
	});

	// Add event listener to download button in the context menu
	const downloadButton =
		fileNameElement.nextElementSibling.querySelector(".download-button");
	if (downloadButton) {
		downloadButton.addEventListener("click", (event) => {
			// Download the file associated with this download button
			downloadFile(fileId);
			// Hide the context menu after downloading
			const contextMenu = fileNameElement.nextElementSibling;
			if (contextMenu) {
				contextMenu.style.display = "none";
			}
			// Prevent the default action of clicking on the download button
			event.preventDefault();
			event.stopPropagation();
		});
	}
};

// Add context menu for each file type
const photosContainer = document
	.getElementById("photosfileList")
	.querySelectorAll(".image-container-box");
photosContainer.forEach((imageContainerBox, index) => {
	const fileNameElement = imageContainerBox.querySelector(".file-name");
	addContextMenu(fileNameElement, index + 1); // Assuming file IDs start from 1
});

const videoFileList = document
	.getElementById("videofileList")
	.querySelectorAll(".video-container-box");
videoFileList.forEach((videoContainerDiv, index) => {
	const fileNameElement = videoContainerDiv.querySelector(".file-name");
	addContextMenu(fileNameElement, index + 1); // Assuming file IDs start from 1
});

const audioFileList = document
	.getElementById("audiofileList")
	.querySelectorAll(".audio-container-box");
audioFileList.forEach((audioContainerDiv, index) => {
	const fileNameElement = audioContainerDiv.querySelector(".file-name");
	addContextMenu(fileNameElement, index + 1); // Assuming file IDs start from 1
});

const docFileList = document
	.getElementById("docfileList")
	.querySelectorAll(".doc-wrapper-container");
docFileList.forEach((docWrapperContainer, index) => {
	const fileNameElement = docWrapperContainer.querySelector(".file-name");
	addContextMenu(fileNameElement, index + 1); // Assuming file IDs start from 1
});

const otherFilesContainer = document
	.getElementById("otherFilesList")
	.querySelectorAll(".files-container-box");
otherFilesContainer.forEach((fileContainerDiv, index) => {
	const fileNameElement = fileContainerDiv.querySelector(".file-name");
	addContextMenu(fileNameElement, index + 1); // Assuming file IDs start from 1
});
