export default function AdvertsFilter() {
    //criar uma div para cada tipo de filtro
    //criar uma função para cada filtro afim de listar apenas os que existem. Trazer para essa página a partir do contexto
    //criar uma função para cada filtro afim de filtrar os anúncios e renderizar na tela. Função onClick em cada item da li
    // 2 opções:
        //criar conforme o figma, ou seja, filtra os anúncios somente por um filtro
        //criar checkboxs para fazer filtragem de mais de um filtro
    return (
        <section className="py-16 px-8">
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Marca</h2>
                <ul></ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Modelo</h2>
                <ul></ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Cor</h2>
                <ul></ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Ano</h2>
                <ul></ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Combustível</h2>
                <ul></ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Km</h2>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Preço</h2>
            </div>
        </section>
    )
}