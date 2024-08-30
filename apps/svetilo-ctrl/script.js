const port = await navigator.serial.requestPort();
await port.open({baudRate: 9600});
const [reader, writer, encoder, decoder] = [
	port.readable.getReader(), 
	port.writable.getWriter(), 
	new TextEncoder(),
	new TextDecoder(),
];
setTimeout( async () => {
	do{ 
		const {value, done } = await reader.read(); 
		if(done) { 
			reader.releaseLock(); 
			break;
		}
		console.log(decoder.decode(value));
	} while(true); 
}, 0);

const inputElement = document.getElementById("command_input");

inputElement.addEventListener("input", async (event) => {
  await writer.write(encoder.encode("inputElement.value")); 
});

inputElement.addEventListener("keyup", (event) => {
  if(event.key === "Enter"){
    inputElement.value = "";
  }
});

