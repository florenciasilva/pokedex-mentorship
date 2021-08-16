import { useState } from 'react'
import { Dialog, DialogContent } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import "@reach/dialog/styles.css";


const Modal = ({pokemonDetail}) => {
    const [showDialog, setShowDialog] = useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
    const { abilities, stats, weight, height } = pokemonDetail

    const getAbilities = () => abilities.map(ability => <p>{ability.ability.name}</p>)
    
    const getStats = () => stats.map(stat => <p>{stat.stat.name}: {stat.base_stat}</p>)

    return (
        <>
            <button onClick={open}>Open Dialog</button>
            <Dialog isOpen={showDialog} onDismiss={close}>
            <button className="close-button" onClick={close}>
                <VisuallyHidden>Close</VisuallyHidden>
                <span aria-hidden>×</span>
            </button>
            <DialogContent>
                Weight:{ weight}

                Height:{ height}

                Abilities:
                {getAbilities()}
                Stats: 
                {getStats()}
            </DialogContent>
            
            </Dialog>
        </>
    )
}

export default Modal