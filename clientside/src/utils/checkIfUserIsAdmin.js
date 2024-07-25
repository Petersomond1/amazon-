// export function checkIfUserIsAdmin() {
//     const token = document.cookie.split('; ').find(row => row.startsWith('token='));
//     if (!token) return false;

//     const payload = token.split('=')[1].split('.')[1];
//     const decodedToken = JSON.parse(atob(payload));
//     return decodedToken.isAdmin;
// }


export function checkIfUserIsAdmin() {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) return false;

    const payload = token.split('=')[1].split('.')[1];
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decodedPayload.isAdmin;
}
