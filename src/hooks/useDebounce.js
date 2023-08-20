function useDebounce(callbackFun , delay = 2000){
     let timerId ;
     return (...args) => {
        console.log(...args);
        clearTimeout(timerId);
       timerId = setTimeout(() => {
           callbackFun(...args);
       },delay)
     }
}
export default useDebounce;