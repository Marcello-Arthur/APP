const {select, input} = require ('@inquirer/prompts')

let meta = {
    value: "Tomar 3L de agua por dia",
    checked: false,

}

let metas = [meta]

const CadastrarMetas = async () => {
    const meta = await input({message: "Digite a meta:"})
    if (meta.length == 0) {
        console.log("A meta não pode ser vazia!")
        return
    }

    metas.push(
        { value: meta, checked: false}
    )
}

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
                await CadastrarMetas()
                console.log(metas)
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