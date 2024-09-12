const {select, input, checkbox} = require ('@inquirer/prompts')

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

const ListarMetas = async () => {
    const respostas = await checkbox({
        message: "use as setas para mudar as metas, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })
    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return
    }

    metas.forEach ((m) => {
        m.checked = false
    })
    
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) concluida(s)! :)")
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
                await ListarMetas()
                console.log(metas)
                break
            case "Sair":
                console.log("Até a próxima :)")
                return
        }
    }
}

start()