/** @format */

// Function to handle file download
function handleDownload(files, token) {
	const selectedFiles = [];

	// Iterate over files to get selected ones
	files.forEach((file) => {
		if (file.selected) {
			selectedFiles.push(file.id);
		}
	});

	if (selectedFiles.length === 0) {
		alert("Please select at least one file to download.");
		return;
	}

	// Create headers with authorization token
	const headers = new Headers({
		Authorization: `Bearer ${token}`,
	});

	const downloadUrls = selectedFiles.map((id) => `/download/${id}`);
	downloadUrls.forEach((url) => {
		fetch(url, {
			method: "GET",
			headers: headers,
		})
			.then((response) => {
				// Handle response
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.blob(); // Convert response to Blob object
			})
			.then((blob) => {
				// Create a temporary link and trigger the download
				const link = document.createElement("a");
				link.href = URL.createObjectURL(blob);
				link.target = "_blank";
				link.download = "";
				link.click();
			})
			.catch((error) => {
				console.error("Error downloading files:", error);
			});
	});
}

// Function to initialize download functionality
function initializeDownload() {
	const files = document.querySelectorAll(".file");
	const f1_token = localStorage.getItem("token");

	// Add click event listener to each file for selection
	files.forEach((file) => {
		file.addEventListener("click", () => {
			selectFile(file);
		});
	});

	// Add click event listener to the download button
	const downloadButton = document.getElementById("downloadButton");
	downloadButton.addEventListener("click", () => {
		handleDownload(files, f1_token);
	});
}

// Initialize download functionality when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
	initializeDownload();
});
