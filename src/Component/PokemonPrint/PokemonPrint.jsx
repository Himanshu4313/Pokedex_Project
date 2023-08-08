import { Link } from "react-router-dom";
import "./PokemonPrint.css";
function PokemonPrint({ name, Image , id}) {
  return (
    <>
      <div className="Pokemon-print-wrapper">
        <Link to={`/pokemon/${id}`}>
        <div>
          <span>{name}</span>
        <div className="pokemon-image">
          <img src={Image} />
        </div>
        </div>
        </Link>
        
        
      </div>
    </>
  );
}
export default PokemonPrint;
