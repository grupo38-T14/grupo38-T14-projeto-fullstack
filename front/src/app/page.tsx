import Image from "next/image";
import { Input } from "./components/input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div>
        <h1>Testando tipos de Títulos H1</h1>
        <h2>Testando tipos de Títulos H2</h2>
        <h3>Testando tipos de Títulos H3</h3>
        <h3 className="font-medium"> Testando tipos de Títulos H3 MEDIUM</h3>
        <h4>Testando tipos de Títulos H4</h4>
        <h4 className="font-medium">Testando tipos de Títulos H4 MEDIUM</h4>
        <h5>Testando tipos de Títulos H5</h5>
        <h5 className="font-medium">Testando tipos de TítulosH5 MEDIUM</h5>
        <h6>Testando tipos de Títulos H6</h6>
        <h6 className="font-medium">Testando tipos de Títulos H6 MEDIUM</h6>
        <h6 className="h7">Testando tipos de Títulos H6 com a classe h7</h6>
        <h6 className="h7 font-medium">
          Testando tipos de Títulos H6 com a classe h7 MEDIUM
        </h6>
      </div>

      <div>
        <p className="body-1">Testando textos do tipo body</p>
        <p className="body-1 font-semibold">
          Testando textos do tipo body-1 semibold
        </p>
        <p className="body-2">Testando textos do tipo body-2</p>
        <p className="body-2 font-medium">
          Testando textos do tipo body-2 semibold
        </p>
        <button type="button" title="Testando" className="button-big-text">
          Button big text
        </button>{" "}
        <br />
        <button type="button" title="Testando" className="button-medium-text">
          Button medium text
        </button>
      </div> */}

      <Input />
    </main>
  );
}
