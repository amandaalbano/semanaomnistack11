import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NovoCaso from './pages/NovoCaso';


//switch garante que apenas uma rota seja executada por momento
export default function Routes(){
    return (
        <BrowserRouter>
            <Switch> 
                <Route path="/" exact component={Logon}/>
                <Route path="/cadastro" component={Register}/>
                <Route path="/perfil" component={Profile}/>
                <Route path="/incidents/new" component={NovoCaso}/>

            </Switch>
        </BrowserRouter>
    )
}