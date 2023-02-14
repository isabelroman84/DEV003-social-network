

export const Welcome = (onNavigate) => {

    const div = document.createElement("div");
    const title = document.createElement("h2");
    const buttonWelcome = document.createElement("button");
  

    buttonWelcome.textContent = "Bienvenido";
    title.textContent = "Eventos a un clic";

    buttonWelcome.addEventListener("click", () =>  {
        onNavigate("/enter");
      });

    div.append(title,buttonWelcome);


    return div;

};