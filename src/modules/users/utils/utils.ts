export function validatePassword(password: string): boolean {
  const hasLength = password?.trim() !== "" && password.length > 3;
  const hasLettersAndNumbers = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/.test(password);
  return hasLength && hasLettersAndNumbers;
}
export function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}
