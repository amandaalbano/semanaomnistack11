import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function Profile(){
    const [incidents,setIncidents] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');
    
    useEffect(() => {
        api.get('perfilOng' , {
            headers:{
                Authorization: ongId,
            }
        }).then(response=>{
            setIncidents(response.data);
        })
    }, [ongId]);
    async function handleDeleteIncident(id){
        try{
            await api.delete(`casos/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id != id)); 
        }catch(err){
            alert('Erro ao deletar caso. Tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
    <span>Bem vinda, {ongNome}</span>
                <Link className="button" to = "incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
               {incidents.map(incident =>(
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.titulo}</p>

                    <strong>Descrição:</strong>
                    <p>{incident.descricao}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.valor)}</p>
                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color= "#a8a8b3"/>
                    </button>
                </li>
               ))} 
               
            </ul>
        </div>
    )
}