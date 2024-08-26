import { TonClient4 } from "@ton/ton";
import {tonlib}

const client4 = new TonClient4({
    endpoint: "https://sandbox-v4.tonhubapi.com",
});

async function sendMintCloseMessage(contractAddress, messageBody) {
    try {
        const message = {
            header: "Owner: MintClose",
            body: messageBody,
        };

        // Sign the message using the owner's private key (replace with your actual key)
        const signedMessage = await client.crypto.sign(message, {
            signer: {
                type: 'PrivateKey',
                value: 'YOUR_PRIVATE_KEY', // Replace with your actual private key
            },
        });

        // Send the message to the smart contract
        const result = await client.processing.send_message({
            message: signedMessage,
            send_events: true,
            abi: {
                // ... ABI of the smart contract
            },
            address: contractAddress,
        });

        console.log('Message sent successfully:', result);
    } catch (error) {
        console.error('Error sending message:', error);
    } finally {
        await client.close();
    }
}

// Example usage:
const contractAddress = 'YOUR_SMART_CONTRACT_ADDRESS'; // Replace with your actual address
const messageBody = {
    // ... any additional data or arguments
};

sendMintCloseMessage(contractAddress, messageBody);