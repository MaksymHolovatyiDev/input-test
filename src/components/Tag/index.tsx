import { useState } from 'react';
import styles from './index.module.scss'

interface IProps {
    value: string | number;
    label: string;
    onDelete: ()=>void;
}

export const Tag = ({ value, label, onDelete }: IProps) => {
  const [inputValue, setInputValue] = useState('');

  const onValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  return (
    <span
      className={styles.tag}
      contentEditable="false"
      data-value={inputValue? +inputValue : value}      
    >
      <span>{label}</span>
      <input placeholder='x' className={styles.input} value={inputValue} onChange={onValueChange} type='text'/>
      <svg
        onClick={onDelete}
        className={styles.image}
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
      </svg>
    </span>
  );
};