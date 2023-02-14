
export const Login = (onNavigate) => {

    const div = document.createElement("div");
    const title = document.createElement("h2");
    const buttonLogin = document.createElement("button");
    const buttonPassword = document.createElement("button");
    const buttonBack = document.createElement("button");

    buttonLogin.textContent = "Ingresa con e-mail";
    buttonPassword.textContent = "Contraseña";
    buttonBack.textContent = "Regresar";
    title.textContent = "Ingresa";

    buttonBack.addEventListener("click", () =>  {
        onNavigate("/enter");
      });

    div.append(title,buttonLogin,buttonPassword, buttonBack);

    return div; 

};

