const customDialog = document.getElementById('customDialog');
const dialogMessage = document.getElementById('dialogMessage');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');

function showCustomDialog(message, confirmCallback, cancelCallback) {
  dialogMessage.textContent = message;
  customDialog.style.display = 'block';

  confirmButton.onclick = function () {
    customDialog.style.display = 'none';
    if (typeof confirmCallback === 'function') {
      confirmCallback();
    }
  };

  cancelButton.onclick = function () {
    customDialog.style.display = 'none';
    if (typeof cancelCallback === 'function') {
      cancelCallback();
    }
  };
}

// Usage example:
showCustomDialog(
  'Are you sure you want to delete this file?',
  function () {
    // Code to execute when "Confirm" button is clicked
    console.log('File deletion confirmed.');
  },
  function () {
    // Code to execute when "Cancel" button is clicked
    console.log('File deletion cancelled.');
  }
);

function showContextMenu(event, x, y, fileId, fileName) {
  event.preventDefault(); // Prevent the default browser context menu

  const contextMenu = document.getElementById('contextMenu');
  contextMenu.style.top = `${y}px`;
  contextMenu.style.left = `${x}px`;
  contextMenu.style.display = 'block';

  // Pass fileId and fileName to the context menu
  contextMenu.dataset.fileId = fileId;
  contextMenu.dataset.fileName = fileName;
}

cardContainer.addEventListener('contextmenu', function (event) {
    showContextMenu(event, event.clientX, event.clientY, file.id, file.filename);
});
