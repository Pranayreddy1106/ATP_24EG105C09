// 2.OTP Countdown Simulator (Console App)
// ------------------------------------
        
//         Simulate OTP sending flow in Node.js:
        
//         Show “OTP Sent Successfully”
        
//         Start 10-second countdown
        
//         Allow resend only after countdown ends

console.log("OTP Sent Successfully");
let seconds = 10;
const countdown = setInterval(() => {
  console.log(`Resend OTP in ${seconds} seconds`);
  seconds--;
  if (seconds < 0) {
    clearInterval(countdown);
    console.log("Resend otp now");
  }
}, 1000);