const start = () => {
    while (true){
        let opcao = ("Sair")
        switch (opcao) {
            case "cadastrar":
                console.log("Vamos Cadastrar")
            break
            case "Listar":
                console.log("Vamos listar")
            break
            case "Sair":
                return
        }
    }
}

start()