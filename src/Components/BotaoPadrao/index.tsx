import styles from './styles.module.css'
import type { ButtonHTMLAttributes } from 'react'
interface BotaoPadraoProps extends ButtonHTMLAttributes<HTMLButtonElement>{}

export function BotaoPadrao({className, children, ...rest}:BotaoPadraoProps){
    return(
        <button
        className={`${styles.botao} ${className || ''}`}
        >
            {children}

        </button>
    )
}