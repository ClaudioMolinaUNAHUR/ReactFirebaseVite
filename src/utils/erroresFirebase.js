export const erroresFirebase = (code) => {
    switch(code){
        case "auth/email-already-in-use":
            return "este email ya esta en uso";
        case "auth/invalid-email":
            return "Formato email no valido";
        default:
            return "Ocurrio un error en el servidor";
    }
}