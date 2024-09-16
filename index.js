const {select, input, checkbox} = require ('@inquirer/prompts')

const fs = require ("fs").promises

let Mensagem = "Bem vindo ao app de Metas";

let metas

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("Metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch (erro) {
        metas = []
    }
}

const SalvarMetas = async () => {
    await fs.writeFile("Metas.json", JSON.stringify(metas, null, 2))
}

const CadastrarMetas = async () => {
    const meta = await input({message: "Digite a meta:"})
    if (meta.length == 0) {
        Mensagem = "A meta não pode ser vazia!"
        return
    }

    metas.push(
        { value: meta, checked: false}
    )

    Mensagem = "Meta Cadastrada"
}

const ListarMetas = async () => {
    if (metas.length == 0){
        Mensagem = "Não tem Metas"
        return
    }
    const respostas = await checkbox({
        message: "use as setas para mudar as metas, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach ((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        Mensagem = "Nenhuma meta selecionada!"
        return
    }
    
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    Mensagem = "Meta(s) concluida(s)! :)"
}

const MetasRealizadas = async () => {
    if (metas.length == 0){
        Mensagem = "Não tem Metas"
        return
    }
    const Realizadas = metas.filter ((meta) => {
        return meta.checked
    })

    if (Realizadas.length == 0){
        Mensagem = ' Não tem metas realizadas :('
        return
    }

    await select({
        message: "Metas Realizadas :)",
        choices: [...Realizadas]
    })
}

const MetasAbertas = async () => {
    if (metas.length == 0){
        Mensagem = "Não tem Metas"
        return
    }
    const Abertas = metas.filter ((meta) => {
        return meta.checked != true
    })

    if (Abertas.length == 0){
        Mensagem = ' Não existe metas abertas :)'
        return
    }

    await select({
        message: "Metas Abertas",
        choices: [...Abertas]
    })
}

const DeletarMetas = async () => {
    if (metas.length == 0){
        Mensagem = "Não tem Metas"
        return
    }
    const metasdesmarcadas = metas.map ((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensDeletar = await checkbox({
        message: "selcione item para deletar",
        choices: [...metasdesmarcadas],
        instructions: false,
    })

    if (itensDeletar.length == 0){
        console.log ('Não existe item para deletar')
        return
    }

    itensDeletar.forEach ((item) => {
        metas = metas.filter ((meta) => {
            return meta.value != item
        })
    })
    
    console.log('Metas deletadas com sucesso!')
    
}

const MostrarMensagem = () => {
    console.clear();

    if (Mensagem != "") {
        console.log(Mensagem)
        console.log("")
        Mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()

    while (true){
        MostrarMensagem()
        await SalvarMetas()

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
                    name: "Metas Realizadas",
                    value: "Realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "Abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "Deletar"
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
                break
            case "Listar":
                await ListarMetas()
                break
            case "Realizadas":
                await MetasRealizadas()
                break
            case "Abertas":
                await MetasAbertas()
                break
            case "Deletar":
                await DeletarMetas()
                break
            case "Sair":
                console.log("Até a próxima :)")
                return
        }
    }
}

start()