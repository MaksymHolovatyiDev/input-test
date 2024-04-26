import { useEffect, useState } from "react";

import { Tag } from "../Tag";
import { getData } from "../../services/axios";

import styles from './index.module.scss'

interface ICategoryItem {
    value: string | number;
    id: string;
    category: string;
    name: string;
}

interface IProps {
    inputRef: null | HTMLElement; 
    text: string; 
    data: React.JSX.Element[]; 
    setData: React.Dispatch<React.SetStateAction<JSX.Element[]>>; 
    clearText: () => void;
}

export const TagSelectList = ({inputRef, text, data, setData, clearText}: IProps) => {
    const [tagsList, setTagsList] = useState<ICategoryItem[] | []>([]);
    const [tags, setTags] = useState<ICategoryItem[] | []>([]);

    useEffect(()=>{
        getData().then(setTagsList);
    }, []);

    useEffect(()=>{
        if(!text) {
            setTags([]);
            return;
        }

        const splittedText = text.split(' ');

        setTags(tagsList.
            filter(el=>el.category.toLocaleUpperCase()
            .includes(splittedText[splittedText.length - 1].trim()
            .toLocaleUpperCase())));
    }, [text]);

    const onDeleteItem = (id: string | number) =>{
        const newArr = data.filter((el)=>el.props.id !== id);
        setData(newArr);
    }

    const onListItemClick = ({id, value, category}: ICategoryItem) => {
        if(!inputRef) return;

        const nodes = inputRef.childNodes;        

        if(!nodes.length) return;

        const lastNode = nodes[nodes.length - 1];

        lastNode.textContent = text.split(' ').slice(0, -1).join(' ') + ' ';
        
        clearText();

        setData((prevState)=>([
            ...prevState, 
            <Tag value={value} label={category} onDelete={()=>onDeleteItem(id)}/>
        ]));
    }

    return (
        <ul className={styles.list}>
            {
                tags.map((el, idx)=>(
                    <li 
                        key={el.id + idx} 
                        className={styles.item} 
                        onClick={()=>onListItemClick(el)}>
                            {el.category}
                    </li>
                ))
            }
        </ul>
    )
}