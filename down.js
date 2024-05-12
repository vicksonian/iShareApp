/** @format */

// Function to handle file selection
function selectFile(filename) {
	const fileElement = document.querySelector(`[data-filename="${filename}"]`);
	if (!fileElement) {
		console.error("File element not found for filename:", filename);
		return;
	}
	const isSelected = fileElement.classList.contains("selected");
	if (!isSelected) {
		fileElement.classList.add("selected");
	} else {
		fileElement.classList.remove("selected");
	}
}

// Function to handle file download
function handleDownload(files, token) {
	const selectedFiles = [];

	// Iterate over files to get selected ones
	files.forEach((file) => {
		const isSelected = file.classList.contains("selected");
		if (isSelected) {
			selectedFiles.push(file.dataset.filename);
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

	const downloadUrls = selectedFiles.map(
		(filename) => `https://ishare-i8td.onrender.com/download/${filename}`
	);
	console.log("Download URLs:", downloadUrls); // Debug statement

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
	console.log("Initializing download functionality."); // Debug statement
	const fileNames = document.querySelectorAll(".file-name");
	console.log("File names found:", fileNames); // Debug statement
	const fg_token = localStorage.getItem("token");
	console.log("Token:", fg_token); // Debug statement

	// Add click event listener to each file name div for selection
	fileNames.forEach((fileName) => {
		console.log("Adding click event listener to file name:", fileName); // Debug statement
		fileName.addEventListener("click", () => {
			console.log("File name clicked:", fileName); // Debug statement
			const filename = fileName.dataset.filename;
			console.log("Selected filename:", filename); // Debug statement
			selectFile(filename);
		});
	});

	// Add click event listener to the download button
	const downloadButton = document.getElementById("downloadButton");
	console.log("Download button:", downloadButton); // Debug statement
	downloadButton.addEventListener("click", () => {
		handleDownload(fileNames, fg_token);
	});
}

// Initialize download functionality when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
	initializeDownload();
});
