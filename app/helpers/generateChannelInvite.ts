export function generateChannelInvite() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  let code = '';

  for (let i = 0; i < 3; i++) {
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    code += randomLetter;
  }
  
  for (let i = 0; i < 3; i++) {
    const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
    code += randomNumber;
  }

  return code;
}