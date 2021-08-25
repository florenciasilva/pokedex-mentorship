import { useState } from 'react'
import { Dialog, DialogContent } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { colorByType } from '../../constants'
import { StyledDialog } from './Modal.module'
import "@reach/dialog/styles.css";


const Modal = ({pokemonDetail}) => {
    const [showDialog, setShowDialog] = useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
    const { abilities, stats, weight, height, types } = pokemonDetail

    const getAbilities = () => abilities.map(ability => <p>{ability.ability.name}</p>)
    
    const getStats = () => stats.map(stat => <p>{stat.stat.name}: {stat.base_stat}</p>)
    const colorOfFirstType = colorByType(types)[0]

    return (
        <>
            <button onClick={open}>Open Dialog</button>
            <Dialog isOpen={showDialog} onDismiss={close} style={{backgroundColor: colorOfFirstType}}>
            <button className="close-button" onClick={close}>
                <VisuallyHidden>Close</VisuallyHidden>
                <span aria-hidden>×</span>
            </button>
            <StyledDialog typeColor={colorOfFirstType}>
                <p>Weight:{ weight}</p>
                <p>Height:{ height}</p>
                <p>Abilities: {getAbilities()}</p>
                Stats: 
                {getStats()}
            
            </StyledDialog>
        </Dialog>
        </>
    )
}

export default Modal