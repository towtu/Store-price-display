// Paste your Firebase Config here from the Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456",
  appId: "1:12345:web:abcde"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// MAGIC: Enable offline persistence for Realtime Database
// This ensures that if the customer scanned it once, it stays on their phone.
firebase.database().goOnline(); 

// 1. Register the Service Worker for Offline Scan Support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// 2. Get Product ID from the URL (e.g., ?id=p01)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {
    const productRef = db.ref('products/' + productId);
    
    // Listen for data (works offline if previously cached)
    productRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            document.getElementById('product-name').innerText = data.n; // n = name
            document.getElementById('price').innerText = "₱" + data.p;    // p = price
        } else {
            document.getElementById('product-name').innerText = "Product Not Found";
        }
    });
}

// Check if user is offline to show the warning tag
window.addEventListener('offline', () => {
    document.getElementById('offline-msg').style.display = 'block';
});