const token = localStorage.getItem("token");
// console.log("Retrieved token:\n", token);
// console.log("Token",token)
fetch("https://ishare-i8td.onrender.com/files", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    console.log("Response status:\n", response.status); // Verify response status

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse response as JSON
  })
  .then((data) => {
    console.log("Response data:", data);
    try {
      const fileList = document.getElementById("fileList");
      const photosFileList = document.getElementById("photosfileList");
      const videoFileList = document.getElementById("videofileList");
      const audioFileList = document.getElementById("audiofileList");

      data.files.forEach((file) => {
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";
        cardContainer.dataset.fileId = file.id;
        cardContainer.dataset.fileName = file.filename;

        const card = document.createElement("div");
        card.className = "card";

        const fileExtension = file.filename.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png"].includes(fileExtension)) {
          const image = document.createElement("img");
          image.src = `https://ishare-i8td.onrender.com/files/${file.id}`;
          image.alt = file.filename;
          image.onerror = function () {
            console.error("Error loading image:", file.filename);
          };
          card.appendChild(image);
        } else {
          const downloadLink = `<a href="https://ishare-i8td.onrender.com/files/${file.id}" download>${file.filename}</a>`;
          //   const downloadLink = `<a href="http://192.168.74.8:5000/files/${file.id}" download>${file.filename}</a>`;
          card.innerHTML = downloadLink;
        }

        // Append card to the card container
        cardContainer.appendChild(card);

        // Create a div to contain the filename and selection checkbox
        const fileInfoContainer = document.createElement("div");

        // Create a checkbox for file selection
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "file-checkbox";
        checkbox.dataset.fileId = file.id;
        checkbox.dataset.fileName = file.filename;
        fileInfoContainer.appendChild(checkbox);

        // Add the filename as text inside a <p> element
        const fileNameText = document.createElement("p");
        fileNameText.textContent = truncateFileName(file.filename);
        fileNameText.title = file.filename; // Show full filename on hover
        fileNameText.id = "card-content-name"; // Add id attribute
        fileInfoContainer.appendChild(fileNameText);

        // Append the file info container to the card container
        cardContainer.appendChild(fileInfoContainer);

        // Append card container to the appropriate list
        if (["mp4", "avi", "mov"].includes(fileExtension)) {
          videoFileList.appendChild(cardContainer);
        } else if (["mp3", "wav", "ogg"].includes(fileExtension)) {
          audioFileList.appendChild(cardContainer);
        } else if (["jpg", "jpeg", "png"].includes(fileExtension)) {
          photosFileList.appendChild(cardContainer);
        } else {
          fileList.appendChild(cardContainer);
        }

        // Add event listener to show context menu on right-click
        cardContainer.addEventListener("contextmenu", function (event) {
          event.preventDefault();
          showContextMenu(event.clientX, event.clientY, file.id, file.filename);
        });

        // Add event listener to toggle selected state on card double click
        card.addEventListener("dblclick", function (event) {
          toggleSelectState(card);
        });

        // Function to toggle selected state
        function toggleSelectState(card) {
          card.classList.toggle("selected");
          const checkbox = cardContainer.querySelector(".file-checkbox");
          checkbox.checked = !checkbox.checked; // Manually toggle checkbox state
        }
      });

      // Function to show context menu
      function showContextMenu(x, y, fileId, fileName) {
        const contextMenu = document.getElementById("contextMenu");
        contextMenu.style.top = `${y}px`;
        contextMenu.style.left = `${x}px`;
        contextMenu.style.display = "block";

        // Pass fileId and fileName to the context menu
        contextMenu.dataset.fileId = fileId;
        contextMenu.dataset.fileName = fileName;
      }

      // Hide context menu when clicking outside
      document.addEventListener("click", function (event) {
        const contextMenu = document.getElementById("contextMenu");
        if (!contextMenu.contains(event.target)) {
          contextMenu.style.display = "none";
        }
      });

      // Add event listener for context menu options
      document
        .getElementById("downloadOption")
        .addEventListener("click", function () {
          const selectedFiles = document.querySelectorAll(".card.selected");
          selectedFiles.forEach((card) => {
            const fileId = card.parentNode.dataset.fileId;
            window.location.href = `https://ishare-i8td.onrender.com/files/${fileId}`;
          });
        });

      // Add event listener for the Share option
      document
        .getElementById("shareOption")
        .addEventListener("click", function () {
          const contextMenu = document.getElementById("contextMenu");
          const fileId = contextMenu.dataset.fileId;
          const fileName = contextMenu.dataset.fileName;

          // Show the share dialog
          const shareDialog = document.getElementById("shareDialog");
          shareDialog.style.display = "block";
          // Optionally, populate the dialog with file information
          // (e.g., display the file name)
          // You can use fileName variable here
        });



      document
        .getElementById("deleteOption")
        .addEventListener("click", function () {
          const fileId = document.getElementById("contextMenu").dataset.fileId;
          const fileName =
            document.getElementById("contextMenu").dataset.fileName;
          deleteFile(fileId, fileName);
        });

      function deleteFile(fileId, fileName) {
        const confirmed = confirm(
          `Are you sure you want to delete "${fileName}"?`
        );
        if (confirmed) {
          const token = localStorage.getItem("token");
          fetch(`https://ishare-i8td.onrender.com/delete/${fileId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to delete file: ${response.status}`);
              }
              // Remove the deleted file from the DOM
              document.querySelector(`[data-file-id="${fileId}"]`).remove();
              console.log(`File "${fileName}" deleted successfully.`);
            })
            .catch((error) => {
              console.error("Error deleting file:", error);
            });
        }
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
    }
  })
  .catch((error) => console.error("Error fetching files:", error));

// Function to truncate file name
function truncateFileName(fileName) {
  const maxLength = 15; // Adjust the maximum length as needed
  if (fileName.length <= maxLength) {
    return fileName;
  } else {
    return fileName.substr(0, maxLength) + "...";
  }
}

// Function to center the modal
function centerModal() {
  var modal = document.querySelector(".modal");
  var modalWidth = modal.offsetWidth;
  var modalHeight = modal.offsetHeight;

  // Calculate top and left positions for centering
  var topPosition = Math.max(0, (window.innerHeight - modalHeight) / 2);
  var leftPosition = Math.max(0, (window.innerWidth - modalWidth) / 2);

  // Set modal's top and left positions
  modal.style.top = topPosition + "px";
  modal.style.left = leftPosition + "px";
}

// Call centerModal function when window is resized
window.addEventListener("resize", centerModal);

// Call centerModal function initially to center the modal
centerModal();

// Get the close button inside the modal
var closeButton = document.querySelector(".modal .close");

// Add click event listener to the close button
closeButton.addEventListener("click", function () {
  // Hide the modal
  var modal = document.querySelector(".modal");
  modal.style.display = "none";
});



document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the input field in the share dialog
    const recipientInput = document.getElementById("recipientInput");
    const sendButton = document.getElementById("shareButton");
    const messageHolder = document.getElementById("messageHolder");

    recipientInput.addEventListener("input", function () {
        const recipientIdentifier = recipientInput.value.trim();

        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        fetch("https://ishare-i8td.onrender.com/validate_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ recipient_identifier: recipientIdentifier })
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                // If the username or email exists, enable the share button
                sendButton.disabled = false;
                messageHolder.textContent = "User is Available.";
            } else {
                // If the username or email does not exist, disable the share button
                sendButton.disabled = true;
                messageHolder.textContent = "No user Available by that Username.";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle error (e.g., display an error message)
        });
    });
});




// // Add event listener to the send button
// sendButton.addEventListener("click", function () {
//     // Retrieve the recipient's identifier from the dataset
//     const recipientIdentifier = sendButton.dataset.recipientIdentifier;
//     if (!recipientIdentifier) {
//         // Handle case where recipient's identifier is not available
//         return;
//     }

//     // Retrieve other necessary data (e.g., file ID)
//     const fileId = ...; // Retrieve file ID from somewhere (e.g., a data attribute)

//     // Make a POST request to share the file
//     fetch("https://ishare-i8td.onrender.com/share", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ file_id: fileId, recipient_identifier: recipientIdentifier })
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Handle success response
//         console.log(data);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//         // Handle error (e.g., display an error message)
//     });
// });


document.addEventListener("DOMContentLoaded", function() {
  // Add event listener to the send button
  const sendButton = document.getElementById("shareButton");

  sendButton.addEventListener("click", function () {
      // Retrieve the recipient's identifier from the input field
      const recipientIdentifier = document.getElementById("recipientInput").value.trim();

      // Retrieve the selected files
      const selectedFiles = document.querySelectorAll(".card.selected");

      // If no files are selected, return
      if (selectedFiles.length === 0) {
          console.log("No files selected for sharing.");
          return;
      }

      // Retrieve the file IDs of the selected files
      const fileIds = Array.from(selectedFiles).map(card => card.parentNode.dataset.fileId);

      // Make a POST request to share the files
      const token = localStorage.getItem("token");
      fetch("https://ishare-i8td.onrender.com/share", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ file_ids: fileIds, recipient_identifier: recipientIdentifier })
      })
      .then(response => response.json())
      .then(data => {
          // Handle success response
          console.log(data);
      })
      .catch(error => {
          console.error("Error:", error);
          // Handle error (e.g., display an error message)
      });
  });
});