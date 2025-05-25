import { useRef, useState } from "react";
import "./App.css";
import { QRCodeSVG } from "qrcode.react";

function App() {
	const [Text, setText] = useState("");
	const [showQR, setShowQR] = useState(false);
	const [showInput, setShowInput] = useState(true);
	const qrRef = useRef(null);

	const downloadQRCode = () => {
		const svgElement = qrRef.current.querySelector("svg");
		if (!svgElement) {
			alert("QR Code not found!");
			return;
		}
		const svgData = new XMLSerializer().serializeToString(svgElement);
		const canvas = document.createElement("canvas");
		const img = new Image();

		img.onload = () => {
			const padding = 50;
			const originalWidth = img.width;
			const originalHeight = img.height;

			canvas.width = originalWidth + padding * 2;
			canvas.height = originalHeight + padding * 2;
			const ctx = canvas.getContext("2d");

			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.drawImage(img, padding, padding);

			const pngFile = canvas.toDataURL("image/png");

			const link = document.createElement("a");
			link.download = "qr-code.png";
			link.href = pngFile;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		};

		img.src =
			"data:image/svg+xml;base64," +
			btoa(unescape(encodeURIComponent(svgData)));
	};

	const QrGenerate = () => {
		if (Text) {
			setShowQR(true);
			setShowInput(false);
		} else {
			alert("Please enter some text to generate QR Code");
			setShowQR(false);
		}
	};

	return (
		<div className="App">
			<div className="main-area">
				<h1>QR Code Generator</h1>
				{showInput && (
					<div className="input-area">
						<input
							type="text"
							value={Text}
							onChange={(e) => {
								setText(e.target.value);
								setShowQR(false);
							}}></input>
						<button onClick={QrGenerate}>Generate QR Code</button>
					</div>
				)}
				<div className="qr-area">
					{showQR && (
						<div>
							<div ref={qrRef}>
								<QRCodeSVG value={Text} size={256} />
							</div>
							<br />
							<button onClick={downloadQRCode}>Download QR Code</button>
							<button
								onClick={() => {
									setShowInput(true);
									setShowQR(false);
									setText("");
								}}>
								Generate Another One
							</button>
						</div>
					)}
				</div>
				<br />
				<br />
				<span className="bottom-span">
					Developed by Mahabul Alom Santo | 2025
				</span>
			</div>
		</div>
	);
}

export default App;
