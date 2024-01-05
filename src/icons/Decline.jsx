import './icons.css';

export default function Decline (props) {

    const callBack = props.callBack

    return (       
            <div className='cancelIcon menuButton' 
            onClick={callBack}/>
    )
}