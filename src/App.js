import { useState } from "react";
import "./App.css";
import { QRCodeSVG } from "qrcode.react";

function App() {
	const [Text, setText] = useState("");
	const [showQR, setShowQR] = useState(false);
	const [showInput, setShowInput] = useState(true);
	
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
				{showQR && 
					<div>
						<QRCodeSVG value={Text} size={256}></QRCodeSVG>
						<button onClick={()=>
              {
                setShowInput(true);
                setShowQR(false);
                setText("");
              }}>Generate Another One</button>
					</div>
				}
			</div>
		</div>
	);
}

export default App;
