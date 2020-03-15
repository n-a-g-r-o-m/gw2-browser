export const arrayToBase64String = (a) => {
    return btoa(String.fromCharCode(...a));
}

export const base64StringToArray = (s) => {
    let asciiString = atob(s);
    return new Uint8Array([...asciiString].map(char => char.charCodeAt(0)));
}