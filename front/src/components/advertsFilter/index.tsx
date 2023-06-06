export default function AdvertsFilter() {
    //criar uma div para cada tipo de filtro
    //criar uma função para cada filtro afim de listar apenas os que existem. Trazer para essa página a partir do contexto
    //criar uma função para cada filtro afim de filtrar os anúncios e renderizar na tela. Função onClick em cada item da li
    // 2 opções:
        //criar conforme o figma, ou seja, filtra os anúncios somente por um filtro
        //criar checkboxs para fazer filtragem de mais de um filtro
    return (
        <section>
            <div>
                <h2>Marca</h2>
                <ul></ul>
            </div>
            <div>
                <h2>Modelo</h2>
                <ul></ul>
            </div>
            <div>
                <h2>Cor</h2>
                <ul></ul>
            </div>
            <div>
                <h2>Ano</h2>
                <ul></ul>
            </div>
            <div>
                <h2>Combustível</h2>
                <ul></ul>
            </div>
            <div>
                <h2>Km</h2>
            </div>
            <div>
                <h2>Preço</h2>
            </div>
        </section>
    )
}