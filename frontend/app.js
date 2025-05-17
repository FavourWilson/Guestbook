const contractAddress = "YOUR_CONTRACT_ADDRESS";
const  contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "NewEntry",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "entries",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllEntries",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct Guestbook.Entry[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "sign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

let provider, signer, guestbook;

async function init() {
 if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    guestbook = new ethers.Contract(contractAddress, contractABI, signer);
    loadEntries();
  } else {
    alert("Please install MetaMask!");
  }
}

async function loadEntries() {
  const entries = await guestbook.getAllEntries();
  const container = document.getElementById("entries");
  container.innerHTML = "";

  entries.slice().reverse().forEach(entry => {
    const div = document.createElement("div");
    div.className = "bg-gray-800 p-4 rounded shadow";
    div.innerHTML = `
      <p class="font-semibold">${entry.name}</p>
      <p>${entry.message}</p>
      <small class="text-gray-400">${new Date(entry.timestamp * 1000).toLocaleString()}</small>
    `;
    container.appendChild(div);
  });
}

document.getElementById("guestbookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  try {
    const tx = await guestbook.sign(name, message);
    await tx.wait();
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    loadEntries();
  } catch (err) {
    alert("Error: " + err.message);
  }
});

init();
