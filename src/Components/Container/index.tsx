import type {ReactNode} from 'react'
import styles from './styles.module.css'

interface ContainerProps{
    children: React.ReactNode;
}


export function Container({children}:ContainerProps){
    return(
        <>

            <div className={styles.Container}>
                {children}
            </div>
        
        </>
    )
}