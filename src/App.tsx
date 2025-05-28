import './App.css'
import styled from "styled-components";
import {Button} from "./components/Button.tsx";
import {useEffect, useState} from "react";
import {Input} from "./components/Input.tsx";

function App() {

    const [counter, setCounter] = useState<number>(0)

    const [valueNumberMax, setValueNumberMax] = useState<number>(0)
    const [valueNumberStart, setValueNumberStart] = useState<number>(0)

    const [error, setError] = useState<string | null>()

    const [errorStart, setErrorStart] = useState<boolean>(false);
    const [errorMax, setErrorMax] = useState<boolean>(false);

    const [hasChangeAfterError, setHasChangeAfterError] = useState(false);
    const [wasErrorBefore, setWasErrorBefore] = useState(false);

    const [showSettings, setShowSettings] = useState(true);

    useEffect(() => {
        const isStartInvalid = valueNumberStart < 0 || valueNumberStart >= valueNumberMax;
        const isMaxInvalid = valueNumberMax < 0 || valueNumberMax <= valueNumberStart;

        setErrorStart(isStartInvalid);
        setErrorMax(isMaxInvalid);

        if (isStartInvalid) {
            setError("Incorrect value!");
            setWasErrorBefore(true);
        } else if (isMaxInvalid) {
            setError("Max value is invalid!");
            setWasErrorBefore(true);
        } else {
            setError(null);
        }
    }, [valueNumberStart, valueNumberMax]);


    const setStartValueHandler = () => {
        localStorage.setItem('valueNumberMax', JSON.stringify(valueNumberMax))
        localStorage.setItem('valueNumberStart', JSON.stringify(valueNumberStart))
        setCounter(valueNumberStart);
        setHasChangeAfterError(false);
        setWasErrorBefore(false);
        setShowSettings(!showSettings);
    }

    useEffect(() => {
        const storeStart = localStorage.getItem('valueNumberStart');
        const storedMax = localStorage.getItem('valueNumberMax');

        if (storeStart && storedMax) {
            const start = JSON.parse(storeStart);
            const max = JSON.parse(storedMax);
            setValueNumberStart(start);
            setValueNumberMax(max);
        }
    }, []);
    
    useEffect(() => {
        const valueAsString = localStorage.getItem('counterValue')
        if (valueAsString) {
            const newValue = JSON.parse(valueAsString)
            setCounter(newValue)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(counter))
    }, [counter])

    const incrementCounterHandler = () => {
        const newCount: number = counter + 1
        setCounter(newCount)
    }

    const deleteIncrementCounterHandler = () => {
        setCounter(0)
    }

    return (
        <MainStyled>

            <MainBoxStyled>
                {showSettings ? (
                    <div id="setting_window">
                        <NumberFieldStyled maxValue={valueNumberMax} counter={counter}>
                            <ValueBoxField>
                                <DataBox>
                                    <TextField>Max value:</TextField>
                                    <Input value={valueNumberMax}
                                           onChange={(e) => {
                                               const rawValue = e.currentTarget.value;
                                               const cleaned = rawValue.replace(/^0+(?!$)/, '');
                                               setValueNumberMax(Number(cleaned));
                                               setHasChangeAfterError(true);
                                           }}
                                           style={{
                                               width: '70px',
                                               height: '25px',
                                               backgroundColor: errorStart ? 'salmon' : 'white',
                                               border: errorMax ? '2px solid red' : 'none',
                                               borderRadius: '5px',
                                               color: 'black',
                                               fontSize: '20px',
                                               fontWeight: 'bold',
                                               textAlign: 'center'
                                           }}/>
                                </DataBox>

                                <DataBox>
                                    <TextField>Start value:</TextField>
                                    <Input value={valueNumberStart}
                                           onChange={(e) => {
                                               const rawValue = e.currentTarget.value;
                                               const cleaned = rawValue.replace(/^0+(?!$)/, '');
                                               setValueNumberStart(Number(cleaned));
                                               setHasChangeAfterError(true);
                                           }}
                                           style={{
                                               width: '70px',
                                               height: '25px',
                                               backgroundColor: errorStart ? 'salmon' : 'white',
                                               border: errorStart ? '2px solid red' : 'none',
                                               borderRadius: '5px',
                                               color: 'black',
                                               fontSize: '20px',
                                               fontWeight: 'bold',
                                               textAlign: 'center'
                                           }}/>
                                </DataBox>

                            </ValueBoxField>

                        </NumberFieldStyled>

                        <ButtonFieldStyled>
                            <Button
                                title={'set'}
                                onClick={setStartValueHandler}
                                disabledButton={!!error}
                                style={{
                                    color: '#292C35',
                                    backgroundColor: error ? '#ccc' : '#63DBFD',
                                    fontSize: '35px',
                                    padding: '5px',
                                    width: '150px',
                                    cursor: error ? 'not-allowed' : 'pointer',
                                    opacity: error ? 0.5 : 1
                                }}
                            />
                        </ButtonFieldStyled>
                    </div>
                ) : (
                    <div id="counter_window">
                        <NumberFieldStyled counter={counter} maxValue={valueNumberMax}>
                            {error ? (
                                <ErrorText>{error}</ErrorText>
                            ) : wasErrorBefore && hasChangeAfterError ? (
                                <InfoText>enter value and press 'set'</InfoText>
                            ) : (counter)}
                        </NumberFieldStyled>

                        <ButtonFieldStyled>
                            <Button onClick={incrementCounterHandler}
                                    title={'inc'}
                                    disabledButton={counter >= valueNumberMax}
                                    className={counter >= valueNumberMax ? 'disabled-style' : ''}
                                    style={{
                                        color: '#292C35',
                                        backgroundColor: '#63DBFD',
                                        fontSize: '35px',
                                        padding: '5px',
                                        width: '150px',
                                        cursor: counter >= valueNumberMax ? 'not-allowed' : 'pointer',
                                        opacity: counter >= valueNumberMax ? 0.5 : 1
                                    }}/>
                            <Button
                                onClick={deleteIncrementCounterHandler}
                                title={'reset'}
                                disabledButton={counter == 0}
                                className={counter == 0 ? 'disabled-style' : ''}
                                style={{
                                    color: '#292C35',
                                    backgroundColor: '#63DBFD',
                                    fontSize: '35px',
                                    padding: '5px',
                                    width: '150px',
                                    cursor: counter == 0 ? 'not-allowed' : 'pointer',
                                    opacity: counter == 0 ? 0.5 : 1
                                }}/>
                            <Button
                                title={'set'}
                                onClick={() => setShowSettings(true)}
                                style={{
                                    color: '#292C35',
                                    backgroundColor: '#63DBFD',
                                    fontSize: '35px',
                                    padding: '5px',
                                    width: '150px'
                                }}
                            />
                        </ButtonFieldStyled>
                    </div>
                )}
            </MainBoxStyled>
        </MainStyled>
    )
}

const InfoText = styled.p`
    color: black;
    font-size: 25px;
    margin: auto;
    text-align: center;
`;
const ErrorText = styled.p`
    color: red;
    font-size: 25px;
    margin: auto;
    text-align: center;
    font-weight: bold;
`


const MainStyled = styled.main`
    background-color: #292C35;
    height: 100%;
    display: flex;
    gap: 50px;
    padding: 5px;
    justify-content: center;
    align-items: center;

    @media (max-width: 900px) {
        gap: 30px;
        padding: 20px;
        flex-direction: column;
    }

    @media (max-width: 600px) {
        gap: 20px;
    }
`
const MainBoxStyled = styled.div`
    background: none;
    border: 3px solid #63DBFD;
    padding: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 500px;

    @media (max-width: 900px) {
        width: 90%;
    }

    @media (max-width: 600px) {
        width: 100%;
        padding: 10px;
    }

`
type NumberFieldStyledTypeProps = {
    color?: string
    counter: number
    maxValue: number

}
const NumberFieldStyled = styled.div<NumberFieldStyledTypeProps>`
    color: ${(props) => props.counter >= props.maxValue ? 'red' : '#292C35'};
    background-color: #63DBFD;
    width: 100%;
    height: 200px;
    border-radius: 15px;
    margin-bottom: 30px;
    font-size: 70px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media (max-width: 900px) {
        height: 150px;
        font-size: 50px;
    }

    @media (max-width: 600px) {
        height: 200px;
        font-size: 40px;
    }
`

const ButtonFieldStyled = styled.div`
    border: 3px solid #63DBFD;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        padding: 10px;
        gap: 5px;
    }
`


const ValueBoxField = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-content: center;

    @media (max-width: 600px) {
        padding: 0 10px;
    }
`
const DataBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 600px) {
        align-items: center;
        align-content: center;
    }
`
const TextField = styled.p`
    color: #1a1a1a;
    font-size: 25px;
    margin-right: 10px;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`

export default App
