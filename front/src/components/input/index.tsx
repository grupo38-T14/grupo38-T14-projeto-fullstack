export function Input() {
  return (
    <fieldset className="flex flex-col gap-2">
      <label htmlFor="test" className="input-label">
        Testando
      </label>
      <input
        type="text"
        id="test"
        className="input-placeholder p-4 rounded border-gray-70 border-[1.5px] border-solid hover:bg-gray-80 focus:outline-none focus:border-brand-2"
        placeholder="Testando estilos"
      />
    </fieldset>
  );
}
