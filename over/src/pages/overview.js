import * as React from 'react';
import DataTable from '../components/tableau/tableau';
import AppHeader from '../components/appbar';
import AddButton from '../components/addoperateur';
import DELButton from '../components/   Delet';


export default function Overview(){
    return(<div>
        <AppHeader />
        <div style={{marginLeft:930,marginTop:10, marginBottom:10}} ><AddButton /></div>
        <div style={{marginLeft:930,marginTop:10, marginBottom:10}} ><DELButton /></div>
         <DataTable />
         
    </div> )   
}