// deleteFunction.js

function deleteFile(fileId, fileName) {
  const dellocalStorageToken = localStorage.getItem("token");
  console.log("Retrieved token Upload:", dellocalStorageToken);

  const confirmed = confirm(`Are you sure you want to delete "${fileName}"?`);
  if (confirmed) {
    fetch(`https://ishare-i8td.onrender.com/delete/${fileId}`, {
    // fetch(`http://192.168.74.8:5000/delete/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${dellocalStorageToken}`,
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

document.getElementById("deleteOption").addEventListener("click", function () {
  const selectedFiles = document.querySelectorAll(".card.selected");
  selectedFiles.forEach((card) => {
    const fileId = card.parentNode.dataset.fileId;
    const fileName = card.parentNode.dataset.fileName;
    deleteFile(fileId, fileName);
  });
});
