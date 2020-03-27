import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import styles from './styles';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);
        const response = await api.get('casos', {params:{page}});
        setIncidents([...incidents, ...response.data]);//copia todos os valor da 1ª página +
        //os valores das páginas seguintes à medida que forem carregadas.
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos </Text>.
                </Text>
            </View>
            
        <Text style={styles.title}>Bem vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

        <FlatList
            data={incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.1}
        renderItem={({item: incident}) => (
            
            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.nome}</Text>

                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text style={styles.incidentValue}>{incident.titulo}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR',{
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.valor)}
                </Text>

                <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => navigateToDetail(incident)}
                >
                    <Text style={styles.detailsButtonText}>Ver mais detalhes.</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
            </View>
        )}
        />
        </View>
    );
}