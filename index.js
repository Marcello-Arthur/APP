const {select} = require ('@inquirer/prompts')

const start = async () => {
    while (true){

        const opcao = await select ({
            message: "Menu >",
            choices: [
                {
                    nome: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "Listar"
                },
                {
                    name: "Sair",
                    value: "Sair"
                }
            ]
        })

    
        switch (opcao) {
            case "cadastrar":
                console.log("Vamos Cadastrar")
            break
            case "Listar":
                console.log("Vamos listar")
            break
            case "Sair":
                console.log("Até a próxima :)")
                return
        }
    }
}

start()