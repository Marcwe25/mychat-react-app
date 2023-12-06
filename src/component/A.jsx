import React from 'react'
import { useDispatch } from 'react-redux'
import {goToWindow} from  '../containers/navigation/navigationAction'

export default function A () {
    const dispatch = useDispatch()

    function gotoB () {
        dispatch(goToWindow("B"))
    }

    function gotoC () {
        dispatch(goToWindow("C"))
    }

    return <div >
        
            <div onClick={gotoB}>B</div>
            <div onClick={gotoC}>C</div>

        </div>
}