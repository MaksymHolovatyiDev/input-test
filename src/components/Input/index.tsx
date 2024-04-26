import { useRef, useState } from "react";
import { evaluate } from 'mathjs'

import styles from './index.module.scss'

import { TagSelectList } from "../TagsList";

const Input = () => {
    const inputRef = useRef(null);

    const [dataArray, setDataArray] = useState<React.JSX.Element[]>([]);
    const [selectText, setSelectText] = useState("");
    const [res, setRes] = useState(0);

    const onCalculation = ()=>{
            if(!inputRef.current) return;

            const nodes = (inputRef.current as HTMLElement)?.childNodes;

            let textValue = '';
            let number: number;


            nodes.forEach(el=> {
                if(el.nodeName === "#text"){
                    textValue += el.textContent;

                    return;
                }
                textValue += (el as HTMLSpanElement).dataset?.value;
            });

            try{
                number = evaluate(textValue);
            }catch{
                number = NaN;
            }

            setRes(number);
    };

    const clearText = () => {
        setSelectText("");
    }

    const onInput = (evt: React.FormEvent<HTMLDivElement>) => {
        const nodes = (evt.target as HTMLElement).childNodes;
        
        if(!nodes.length){
            setSelectText('');
            return;
        }
        
        const lastNode = nodes[nodes.length - 1];
        
        if(lastNode.nodeName === "#text"){
            setSelectText(lastNode.textContent?.trim() || '');
            return;
        }
            
        setSelectText('');
    }

    return  (
        <div className={styles.container}>
            <p>Res: {Number.isNaN(res) ? "Error" : res}</p>
            <div className={styles["container--flex"]}>
                <div 
                    ref={inputRef}
                    className={styles["text-area"]}
                    contentEditable="true" 
                    onInput={onInput}> 
                    {dataArray} 
                </div>
                <button type="button" onClick={onCalculation}>Calculate</button>
            </div>
            <TagSelectList inputRef={inputRef.current} text={selectText} data={dataArray} clearText={clearText} setData={setDataArray} />
        </div>
    )
}

export default Input;