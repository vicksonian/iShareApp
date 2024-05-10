/** @format */

document
	.getElementById("downloadOption")
	.addEventListener("click", async function () {
		const selectedFiles = document.querySelectorAll(".card.selected");
		for (const card of selectedFiles) {
			const fileId = card.parentNode.dataset.fileId;
			try {
				const token = localStorage.getItem("token"); // Retrieve token from localStorage
				const response = await fetch(
					//`http://192.168.74.8:5000/download/${fileId}`,
					`https://ishare-i8td.onrender.com/download/${fileId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Include token in Authorization header
						},
					}
				);
				if (!response.ok) {
					throw new Error(`Failed to download file ${fileId}`);
				}
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download =
					response.headers.get("Content-Disposition") || `file_${fileId}.bin`;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
				a.remove();
			} catch (error) {
				console.error(error);
				// Handle error: display message to user, log, etc.
			}
		}
	});
