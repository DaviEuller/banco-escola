import styles from './styles.module.css'
import type { InputHTMLAttributes } from 'react'
interface InputPadraoProps extends InputHTMLAttributes<HTMLInputElement>{

}


export function InputPadrao({className, ...rest }:InputPadraoProps){
    return(
        <>
        <input className={`${styles.input}${className || ''} `}
        {...rest} />

        
        
        </>
    )
}