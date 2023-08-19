import './Search.css';
function Search({updateSearchTerm}){
    return (
       <>
            <input type="text" placeholder="Pokemon Name...."
                onChange={(e) => updateSearchTerm(e.target.value) }
             />
       </>
    );
}

export default Search;