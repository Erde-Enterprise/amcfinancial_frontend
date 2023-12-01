export function validatePassword(password: string): boolean {
  const hasLength = password?.trim() !== "" && password.length > 3;
  const hasLettersAndNumbers = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/.test(
    password
  );
  return hasLength && hasLettersAndNumbers;
}
export function passwordsMatch(
  password: string,
  confirmPassword: string
): boolean {
  return password === confirmPassword;
}

export function validateUpdatePassword(password: string): boolean {
  const hasLength = password.length === 0 && password.length > 3;
  const hasLettersAndNumbers = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/.test(
    password
  );
  return hasLength && hasLettersAndNumbers;
}

export function base64ToBlob(base64: string, type: string) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], {type});
}
