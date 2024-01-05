import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import NavigationRouter from '../navigation/NavigationRouter';
import { SUCCEEDED } from '../../const/constNames';
import Loading from '../../icons/Loading';
import { cleanupData, initData } from './appDataAction';

export default function AppData () {

    const dispatch = useDispatch();
    const dataInitStatus = useSelector((state) => state.appData.status)
    const dataRefreshNeeded = useSelector((state) => state.appData.refresh)


    useEffect(()=>{
        !dataInitStatus && dispatch(initData())
        return () => {dispatch(cleanupData())}
    },[])

    useEffect(()=>{
        dataRefreshNeeded && dispatch(initData())
    },[dataRefreshNeeded])

    return (<>{ 
        dataInitStatus===SUCCEEDED && <NavigationRouter/> || <Loading/> 
        }</>)
}
