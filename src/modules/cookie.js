export function getCookie(name) {
    const cookiesTable = {};
    document.cookie.split('; ').forEach( cookie => {
        const splitted = cookie.split('=');
        const name = splitted[0];
        splitted.shift();
        const property = splitted.join('');
        cookiesTable[name] = property;
    });
    return cookiesTable[name] || null;
};