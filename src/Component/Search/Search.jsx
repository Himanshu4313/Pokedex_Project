import useDebounce from '../../hooks/useDebounce';
import './Search.css';
function Search({updateSearchTerm}){
    const useDebounceHooks = useDebounce((e) => updateSearchTerm(e.target.value) );
    return (
       <>
            <input type="text" placeholder="Pokemon Name...."
                onChange={useDebounceHooks}
             />
       </>
    );
}

export default Search;