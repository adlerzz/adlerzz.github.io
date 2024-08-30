let prm = false;
let port = null;

let reader, writer;

const [encoder, decoder] = [new TextEncoder(), new TextDecoder()];

const connectEl = document.getElementById("connect");
const commandEl = document.getElementById("command");
const terminalEl = document.getElementById("terminal");


connectEl.addEventListener("click", async () => {
	port = await navigator.serial.requestPort();

	await port.open({ baudRate: 9600 });
	[reader, writer] = [
		port.readable.getReader(),
		port.writable.getWriter(),
	];
	setTimeout(async () => {
		do {
			const { value, done } = await reader.read();
			if (done) {
				reader.releaseLock();
				break;
			}
			const response = decoder.decode(value)
			console.log(response);
			terminalEl.value = terminalEl.value + "\n" + `<< ${response}`;
		} while (true);
	}, 0);

});

commandEl.addEventListener("keyup", async (event) => {
	if (event.key === "Enter") {
		const commandText = commandEl.value;
		commandEl.value = "";
		terminalEl.value = terminalEl.value + "\n" + `>> ${commandText}`; 
		await writer.write(encoder.encode(commandText));
	}
});