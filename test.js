/** @format */

const f1_token = localStorage.getItem("token");
console.log("Files Upload Retrieved token:\n", f1_token);
console.log("Files Upload Retrieved Token", f1_token);
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
		const otherFilesContainer = document.getElementById("otherFilesList");

		// Clear any existing content in the containers
		photosContainer.innerHTML = "";
		videoFileList.innerHTML = "";
		audioFileList.innerHTML = "";
		otherFilesContainer.innerHTML = "";

		// Iterate over each file in the response data
		data.files.forEach((file) => {
			// Check the file extension
			const fileExtension = file.filename.split(".").pop().toLowerCase();

			// Create an appropriate HTML element based on the file type
			if (["jpg", "jpeg", "png"].includes(fileExtension)) {
				// If it's an image file, create an img element
				const imageDiv = document.createElement("div");
				imageDiv.className = "image";

				const imageElement = document.createElement("img");
				imageElement.src = `data:${file.content_type};base64,${file.content}`;
				imageDiv.appendChild(imageElement);

				const fileNameDiv = document.createElement("div");
				fileNameDiv.textContent = file.filename;
				imageDiv.appendChild(fileNameDiv);

				photosContainer.appendChild(imageDiv);
			} else if (["mp4", "mov", "avi", "mkv"].includes(fileExtension)) {
				// If it's a video file, create a video element
				const videoContainerDiv = document.createElement("div");
				videoContainerDiv.className = "video-container-box"; // Add the class "video-container-box"

				const videoElement = document.createElement("video");
				videoElement.src = `data:${file.content_type};base64,${file.content}`;
				videoElement.controls = true; // Ensure controls are enabled
				videoContainerDiv.appendChild(videoElement);

				const fileNameDiv = document.createElement("div");
				fileNameDiv.textContent = file.filename;
				videoContainerDiv.appendChild(fileNameDiv);

				videoFileList.appendChild(videoContainerDiv);
			} else if (["mp3", "wav"].includes(fileExtension)) {
				// If it's an audio file, create an audio element
				const audioDiv = document.createElement("div");
				audioDiv.className = "audio";

				const audioElement = document.createElement("audio");
				audioElement.src = `data:${file.content_type};base64,${file.content}`;
				audioElement.controls = true; // Enable audio controls
				audioDiv.appendChild(audioElement);

				const fileNameDiv = document.createElement("div");
				fileNameDiv.textContent = file.filename;
				audioDiv.appendChild(fileNameDiv);

				audioFileList.appendChild(audioDiv);
			} else {
				// For other file types, create a generic file element with an icon based on the file type
				const fileDiv = document.createElement("div");
				fileDiv.className = "file";

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
				fileDiv.appendChild(iconElement);

				const fileNameDiv = document.createElement("div");
				fileNameDiv.textContent = file.filename;
				fileDiv.appendChild(fileNameDiv);

				otherFilesContainer.appendChild(fileDiv);
			}


		});
	})
	.catch((error) => {
		console.error("Error fetching files:", error);
	});
