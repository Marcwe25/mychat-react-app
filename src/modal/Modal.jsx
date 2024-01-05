import './modal.css';


export function Modal ({content}) {

    function getcontent () {
        if(content) return (<>
        <div class="modal-content">{content}</div>
        </>)
    }
    return <>
              <div className="modal">
              {getcontent()}
                </div>
    </>
}