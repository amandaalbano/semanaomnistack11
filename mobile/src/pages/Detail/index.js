import React from 'react';
import {Feather} from '@expo/vector-icons';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import logoImg from '../../assets/logo.png';
import {useNavigation, useRoute} from '@react-navigation/native'; 
import * as MailComposer from 'expo-mail-composer';
import styles from './styles';


export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.nome}, estou entrando em contato para ajudar no caso da ${incident.titulo} no valor de ${Intl.NumberFormat('pt-BR',{
        style: 'currency', currency: 'BRL'}).format(incident.valor)}`;

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.titulo}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    function navigateBack(){
        navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress = {navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041"/>
                </TouchableOpacity>
            </View>  
        

             <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG</Text>
                <Text style={styles.incidentValue}>{incident.nome} de {incident.cidade}/ {incident.uf} </Text>

                <Text style={styles.incidentProperty}>Caso</Text>
                <Text style={styles.incidentValue}>{incident.titulo}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR',{
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.valor)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato.</Text>
            </View>
            
            <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                    <Text style={styles.actionText}>Whatsapp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={sendEmail}>
                    <Text style={styles.actionText}>Email</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}