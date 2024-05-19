/** @format */

document
	.querySelector(".open-right-area")
	.addEventListener("click", function () {
		document.querySelector(".app-right").classList.add("show");
	});
document
	.querySelector(".open-right-area-1")
	.addEventListener("click", function () {
		document.querySelector(".app-right").classList.add("show");
	});
document
	.querySelector(".open-right-area-2")
	.addEventListener("click", function () {
		document.querySelector(".app-right").classList.add("show");
	});
document
	.querySelector(".open-right-area-3")
	.addEventListener("click", function () {
		document.querySelector(".app-right").classList.add("show");
	});
document
	.querySelector(".open-right-area-4")
	.addEventListener("click", function () {
		document.querySelector(".app-right").classList.add("show");
	});
document
	.querySelector(".open-right-area-5")
	.addEventListener("click", function () {
		document.querySelector(".app-right").classList.add("show");
	});
document
	.querySelector(".open-right-area-6")
	.addEventListener("click", function () {
		document.querySelector(".app-right").classList.add("show");
	});
document
	.querySelector(".open-right-area-7")
	.addEventListener("click", function () {
		document.querySelector(".app-right").classList.add("show");
	});

document.querySelector(".close-right").addEventListener("click", function () {
	document.querySelector(".app-right").classList.remove("show");
});

document.querySelector(".menu-button").addEventListener("click", function () {
	document.querySelector(".app-left").classList.add("show");
});
document.querySelector(".menu-button-1").addEventListener("click", function () {
	document.querySelector(".app-left").classList.add("show");
});
document.querySelector(".menu-button-2").addEventListener("click", function () {
	document.querySelector(".app-left").classList.add("show");
});
document.querySelector(".menu-button-3").addEventListener("click", function () {
	document.querySelector(".app-left").classList.add("show");
});
document.querySelector(".menu-button-4").addEventListener("click", function () {
	document.querySelector(".app-left").classList.add("show");
});
document.querySelector(".menu-button-5").addEventListener("click", function () {
	document.querySelector(".app-left").classList.add("show");
});
document.querySelector(".menu-button-6").addEventListener("click", function () {
	document.querySelector(".app-left").classList.add("show");
});
document.querySelector(".menu-button-7").addEventListener("click", function () {
	document.querySelector(".app-left").classList.add("show");
});

document.querySelector(".close-menu").addEventListener("click", function () {
	document.querySelector(".app-left").classList.remove("show");
});

// Function to close section and show dashboard
function closeSection(sectionId) {
	document.getElementById(sectionId).style.display = "none";
	document.getElementById("dashboard").style.display = "block";
}

// Function to show dashboard and hide all other sections
function showDashboard() {
	document.getElementById("dashboard").style.display = "block";
	document.querySelectorAll(".section").forEach(function (section) {
		section.style.display = "none";
	});
}

// Function to handle click on section buttons
function handleSectionButtonClick(sectionId) {
	showSection(sectionId);
}

// Attach click event listeners to section buttons
document.querySelectorAll(".section-button").forEach(function (button) {
	button.addEventListener("click", function () {
		const sectionId = button.dataset.sectionId;
		handleSectionButtonClick(sectionId);
	});
});

// Function to show a specific section and hide others
function showSection(sectionId) {
	showDashboard();
	document.getElementById(sectionId).style.display = "block";
	document.getElementById(sectionId).classList.add("active-section");
}

// Event listener for back button
document.querySelector(".back-button").addEventListener("click", function () {
	// Get the currently active section
	const activeSection = document.querySelector(".active-section");

	// Get the ID of the active section
	const activeSectionId = activeSection ? activeSection.id : null;

	if (activeSectionId) {
		// Close the active section and show dashboard
		closeSection(activeSectionId);
		activeSection.classList.remove("active-section");
	}
});

function closePhotosSection() {
	document.getElementById("photos").style.display = "none";
	document.getElementById("dashboard").style.display = "block";
}
function closeFilesSection() {
	document.getElementById("files").style.display = "none";
	document.getElementById("dashboard").style.display = "block";
}
function closeVideosSection() {
	document.getElementById("videos").style.display = "none";
	document.getElementById("dashboard").style.display = "block";
}
function closeAudiosSection() {
	document.getElementById("audios").style.display = "none";
	document.getElementById("dashboard").style.display = "block";
}
function closeSettingsSection() {
	document.getElementById("settings").style.display = "none";
	document.getElementById("dashboard").style.display = "block";
}
// function closeDownloadsSection() {
//     document.getElementById("download").style.display = "none";
//     document.getElementById("dashboard").style.display = "block";
// }
function closeDocumentsSection() {
	document.getElementById("documents").style.display = "none";
	document.getElementById("dashboard").style.display = "block";
}
function closeUploadsSection() {
	document.getElementById("upload").style.display = "none";
	document.getElementById("dashboard").style.display = "block";
}

function showDashboard() {
	document.getElementById("dashboard").style.display = "block";
	document.getElementById("files").style.display = "none";
	document.getElementById("videos").style.display = "none";
	document.getElementById("audios").style.display = "none";
	document.getElementById("photos").style.display = "none";
	document.getElementById("upload").style.display = "none";
	document.getElementById("download").style.display = "none";
	document.getElementById("documents").style.display = "none";
	document.getElementById("settings").style.display = "none";
}

function showFiles() {
	document.getElementById("dashboard").style.display = "none";
	document.getElementById("files").style.display = "block";
	document.getElementById("videos").style.display = "none";
	document.getElementById("audios").style.display = "none";
	document.getElementById("photos").style.display = "none";
	document.getElementById("upload").style.display = "none";
	document.getElementById("download").style.display = "none";
	document.getElementById("documents").style.display = "none";
	document.getElementById("settings").style.display = "none";
}

function showVideoFiles() {
	document.getElementById("dashboard").style.display = "none";
	document.getElementById("files").style.display = "none";
	document.getElementById("videos").style.display = "block";
	document.getElementById("audios").style.display = "none";
	document.getElementById("photos").style.display = "none";
	document.getElementById("upload").style.display = "none";
	document.getElementById("download").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("documents").style.display = "none";
}

function showAudioFiles() {
	document.getElementById("dashboard").style.display = "none";
	document.getElementById("files").style.display = "none";
	document.getElementById("videos").style.display = "none";
	document.getElementById("audios").style.display = "block";
	document.getElementById("photos").style.display = "none";
	document.getElementById("upload").style.display = "none";
	document.getElementById("download").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("documents").style.display = "none";
}

function showPhotos() {
	document.getElementById("dashboard").style.display = "none";
	document.getElementById("files").style.display = "none";
	document.getElementById("videos").style.display = "none";
	document.getElementById("audios").style.display = "none";
	document.getElementById("photos").style.display = "block";
	document.getElementById("upload").style.display = "none";
	document.getElementById("download").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("documents").style.display = "none";
}

function showUploadFiles() {
	document.getElementById("dashboard").style.display = "none";
	document.getElementById("files").style.display = "none";
	document.getElementById("videos").style.display = "none";
	document.getElementById("audios").style.display = "none";
	document.getElementById("photos").style.display = "none";
	document.getElementById("upload").style.display = "block";
	document.getElementById("download").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("documents").style.display = "none";
}

// function showDownloads() {
//     document.getElementById("dashboard").style.display = "none";
//     document.getElementById("files").style.display = "none";
//     document.getElementById("videos").style.display = "none";
//     document.getElementById("audios").style.display = "none";
//     document.getElementById("photos").style.display = "none";
//     document.getElementById("download").style.display = "block";
//     document.getElementById("settings").style.display = "none";
//     document.getElementById("documents").style.display = "none";
// }

function showDocuments() {
	document.getElementById("dashboard").style.display = "none";
	document.getElementById("files").style.display = "none";
	document.getElementById("videos").style.display = "none";
	document.getElementById("audios").style.display = "none";
	document.getElementById("photos").style.display = "none";
	document.getElementById("download").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("documents").style.display = "block";
}

function showSettings() {
	document.getElementById("dashboard").style.display = "none";
	document.getElementById("files").style.display = "none";
	document.getElementById("videos").style.display = "none";
	document.getElementById("audios").style.display = "none";
	document.getElementById("photos").style.display = "none";
	document.getElementById("download").style.display = "none";
	document.getElementById("settings").style.display = "block";
	document.getElementById("documents").style.display = "none";
}

function uploadFile() {
	// Your file upload logic here...
	// Once the upload is successful, you can display the success message

	// For example:
	var uploadMessage = document.getElementById("uploadMessage");
	uploadMessage.textContent = "Files uploaded successfully!";
	uploadMessage.className = "success"; // Apply the success class for styling
	uploadMessage.style.display = "block"; // Display the message
}

const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener("click", () => {
	localStorage.removeItem("token");

	window.location.href = "/";
});

const clearInput = () => {
	const input = document.getElementsByTagName("input")[0];
	input.value = "";
};
