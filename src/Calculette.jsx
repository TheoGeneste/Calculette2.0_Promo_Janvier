import React, { useCallback, useEffect, useState } from 'react'

const Calculette = () => {
    // Crée un état total 
    const [total, setTotal] = useState("");
    const [randomValue, setRandomValue] = useState(0.0);
    const [currentKey, setCurrentKey] = useState("");

    //Variable
    let reg = new RegExp("^[\\d\\W]+$");

    //Comportements

    const registerKeyPress = useCallback((e) => {
        setCurrentKey(e.key);
        setRandomValue(Math.random());
    })

    const caracterToAdd = (e) => {
        // console.log(e.target.innerHTML);
        // Met à jour l'état total
        setTotal(total + e.target.innerHTML)
    }

    const calc = () => {
        if (total !== "") {
            setTotal(eval(total).toString());
        }
    }

    const resetTotal = () => {
        setTotal("");
    } 

    const deleteTotal = () => {
        setTotal(total.slice(0, -1));
    }
    // Création d'une fonction qui fait le calcul et met a jour l'état total, 
    // cette fonction devra être appeler sur le onClick du bouton =

    useEffect( () => {
        switch (currentKey) {
            case "Enter":
                calc(total)
                break;
            case "Backspace":
                deleteTotal();
                break;
            case "Delete":
                resetTotal();
                break;
            default:
                if (reg.test(currentKey)) {
                    setTotal(total + currentKey)
                    // result.value += e.key
                }
                break;
        }
    }, [randomValue])
    
    useEffect( () => {
        document.addEventListener("keyup", registerKeyPress)
    }, [])


    //Affichage
    return <>
        <div className="container">
            <h1 className='text-success text-center'> Calculatrice</h1>
            <div className='col-6 offset-3 d-flex align-items-center'>
                <div className='input-group mb-3'>
                    <span className='input-group-text' id="totalCalculette" >Total</span>
                    <input type="text" className='form-control col-5' placeholder='Total'
                        aria-label='Total'
                        aria-describedby='totalCalculette'
                        id="result" disabled value={total} />
                </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-3 mb-3">
                <div className="d-flex flex-row gap-2 col-5">
                    <button type="button" className="btn btn-primary col-3" onClick={caracterToAdd}>1</button>
                    <button type="button" className="btn btn-primary col-3" onClick={caracterToAdd}>2</button>
                    <button type="button" className="btn btn-primary col-3" onClick={caracterToAdd}>3</button>
                    <button type="button" className="btn btn-info col-3" onClick={caracterToAdd}>+</button>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-3 mb-3">
                <div className="d-flex flex-row gap-2 col-5">
                    <button type="button" className="btn btn-primary col-3" onClick={caracterToAdd}>4</button>
                    <button type="button" className="btn btn-primary col-3" onClick={caracterToAdd}>5</button>
                    <button type="button" className="btn btn-primary col-3" onClick={caracterToAdd}>6</button>
                    <button type="button" className="btn btn-info col-3" onClick={caracterToAdd}>-</button>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-3 mb-3">
                <div className="d-flex flex-row gap-2 col-5">
                    <button type="button" className="btn btn-primary col-3" onClick={caracterToAdd}>7</button>
                    <button type="button" className="btn btn-primary col-3" onClick={caracterToAdd}>8</button>
                    <button type="button" className="btn btn-primary col-3" onClick={caracterToAdd}>9</button>
                    <button type="button" className="btn btn-info col-3" onClick={caracterToAdd}>*</button>
                </div>
                <div class="d-flex flex-row gap-2 col-5 mb-3">
                    <button type="button" className="btn btn-primary col-3 caracterToAdd" onClick={caracterToAdd}>.</button>
                    <button type="button" className="btn btn-primary col-3 caracterToAdd" onClick={caracterToAdd}>0</button>
                    <button type="button" className="btn btn-danger col-3" id="reset" onClick={resetTotal}>C</button>
                    <button type="button" className="btn btn-info col-3 caracterToAdd" onClick={caracterToAdd}>/</button>
                </div>
                <div class="d-flex flex-row gap-4 col-5">
                    <button type="button" className="btn btn-danger col-9" id="delete" onClick={deleteTotal}>DELETE</button>
                    <button type="button" className="btn btn-info col-3" id="egal" onClick={calc}>=</button>
                </div>
            </div>

        </div>
    </>
}

export default Calculette;