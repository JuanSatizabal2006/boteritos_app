import { jwtDecode } from 'jwt-decode';

export const defRol = () =>{

    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const token = jwtDecode(access_token);
        
    let rol;

    switch (token.rol.toString()) {
        case "1":
            rol = "admin"
            break;
        case "2":
            rol = "profesor"
            break;
        case "3":
            rol = "estudiante"
            break;
        default:
            rol = "general"
            break;
    }
    return rol
}