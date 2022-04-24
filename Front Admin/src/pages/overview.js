import * as React from 'react';
import DataTable from '../components/tableau/tableau';
import AppHeader from '../components/appbar';
import AddButton from '../components/addoperateur';
;


export default function Overview(){
    return(<div>
        <AppHeader />
        <div style={{marginLeft:1315,marginTop:10, marginBottom:10, }} ><AddButton /></div>
      
         <DataTable />
         
    </div> )   
}