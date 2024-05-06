document.querySelector('.open-right-area').addEventListener('click', function () {
    document.querySelector('.app-right').classList.add('show');
});
document.querySelector('.open-right-area-2').addEventListener('click', function () {
    document.querySelector('.app-right').classList.add('show');
});
document.querySelector('.open-right-area-3').addEventListener('click', function () {
    document.querySelector('.app-right').classList.add('show');
});
document.querySelector('.open-right-area-4').addEventListener('click', function () {
    document.querySelector('.app-right').classList.add('show');
});
document.querySelector('.open-right-area-5').addEventListener('click', function () {
    document.querySelector('.app-right').classList.add('show');
});
document.querySelector('.open-right-area-6').addEventListener('click', function () {
    document.querySelector('.app-right').classList.add('show');
});

document.querySelector('.close-right').addEventListener('click', function () {
    document.querySelector('.app-right').classList.remove('show');
});




document.querySelector('.menu-button').addEventListener('click', function () {
    document.querySelector('.app-left').classList.add('show');
});
document.querySelector('.menu-button-2').addEventListener('click', function () {
    document.querySelector('.app-left').classList.add('show');
});
document.querySelector('.menu-button-3').addEventListener('click', function () {
    document.querySelector('.app-left').classList.add('show');
});
document.querySelector('.menu-button-4').addEventListener('click', function () {
    document.querySelector('.app-left').classList.add('show');
});
document.querySelector('.menu-button-5').addEventListener('click', function () {
    document.querySelector('.app-left').classList.add('show');
});
document.querySelector('.menu-button-6').addEventListener('click', function () {
    document.querySelector('.app-left').classList.add('show');
});

document.querySelector('.close-menu').addEventListener('click', function () {
    document.querySelector('.app-left').classList.remove('show');
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
function closeDownloadsSection() {
    document.getElementById("download").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}
function closeDocsSection() {
    document.getElementById("docs").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}
function closeUploadsSection() {
    document.getElementById("docs").style.display = "none";
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
}

function showDownloads() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("files").style.display = "none";
    document.getElementById("videos").style.display = "none";
    document.getElementById("audios").style.display = "none";
    document.getElementById("photos").style.display = "none";
    document.getElementById("download").style.display = "block";
    document.getElementById("settings").style.display = "none";
}

function showSettings() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("files").style.display = "none";
    document.getElementById("videos").style.display = "none";
    document.getElementById("audios").style.display = "none";
    document.getElementById("photos").style.display = "none";
    document.getElementById("download").style.display = "none";
    document.getElementById("settings").style.display = "block";
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


