/** @format */
const d_token = localStorage.getItem("token");


function downloadFile(fileId, fileName) {
	const url = `https://ishare-i8td.onrender.com/download/${fileId}`;
	fetch(url, {
		headers: {
			Authorization: `Bearer ${d_token}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.blob();
		})
		.then((blob) => {
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = fileName;
			link.click();
			URL.revokeObjectURL(link.href);
		})
		.catch((error) => {
			console.error("Error downloading file:", error);
		});
}