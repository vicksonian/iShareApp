/** @format */

const d_token = localStorage.getItem("token");

// Function to create a download button
function createDownloadButton(fileId) {
	const downloadButton = document.createElement("button");
	downloadButton.className = "download-button";
	downloadButton.textContent = "Download";
	downloadButton.addEventListener("click", () => {
		downloadFile(fileId);
	});
	return downloadButton;
}

// Function to download the file using Fetch API
function downloadFile(fileId) {
	// Fetch the download URL with the token included in the headers
	fetch(`https://ishare-i8td.onrender.com/download/${fileId}`, {
		headers: {
			Authorization: `Bearer ${d_token}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.blob(); // Get the response as a blob
		})
		.then((blob) => {
			// Create a URL for the blob
			const url = window.URL.createObjectURL(blob);

			// Retrieve filename from the response headers
			const filename = response.headers
				.get("Content-Disposition")
				.split("filename=")[1];

			// Create an anchor element to trigger the download
			const a = document.createElement("a");
			a.href = url;
			a.download = filename; // Set the filename for download
			document.body.appendChild(a);
			a.click(); // Simulate a click event to trigger the download
			a.remove(); // Remove the anchor element
		})
		.catch((error) => {
			console.error("Error downloading file:", error);
		});
}

// Function to show the download button
function showDownloadButton(event, fileId) {
	// Remove any existing download button
	const existingButton = document.querySelector(".download-button");
	if (existingButton) {
		existingButton.remove();
	}

	// Create and position the new download button
	const downloadButton = createDownloadButton(fileId);
	downloadButton.style.position = "absolute";
	downloadButton.style.left = `${event.pageX}px`;
	downloadButton.style.top = `${event.pageY}px`;

	document.body.appendChild(downloadButton);

	// Hide the download button when clicking elsewhere
	document.addEventListener("click", hideDownloadButton);
}

// Function to hide the download button
function hideDownloadButton() {
	const downloadButton = document.querySelector(".download-button");
	if (downloadButton) {
		downloadButton.remove();
	}

	// Remove the event listener
	document.removeEventListener("click", hideDownloadButton);
}

// Function to truncate file names
function truncateFileName(fileName, maxLength) {
	if (fileName.length > maxLength) {
		return fileName.slice(0, maxLength - 3) + "..."; // Truncate and add ellipsis
	} else {
		return fileName;
	}
}
