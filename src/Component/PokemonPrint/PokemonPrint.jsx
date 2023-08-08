import "./PokemonPrint.css";
function PokemonPrint({ name, Image }) {
  return (
    <>
      <div className="Pokemon-print-wrapper">
        <span>{name}</span>
        <div className="pokemon-image">
          <img src={Image} />
        </div>
      </div>
    </>
  );
}
export default PokemonPrint;
