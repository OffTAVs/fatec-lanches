import BasePage from "@/components/BasePage";
import Btn from "@/components/Btn";
import Input from "@/components/Input";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import TextFont from "@/components/TextFont";
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from "expo-router";

export default function EditProfile() {
    const router = useRouter()
    const user = {
        nome: 'Fulano da Silva Souza',
        email: 'fulano.silva@fatec.sp.gov.br',
    };

    const [profileImage, setProfileImage] = useState<string | null>(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão negada!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    return (
        <BasePage title='Edite seu perfil'>
            <View style={styles.edit}>
                <Image 
                    source={profileImage ? { uri: profileImage } : { uri: 'https://cdn-icons-png.flaticon.com/512/3106/3106921.png'}}
                    style={styles.imagem}
                />
                <Btn variant="cyan" onPress={pickImage}>Alterar Foto</Btn>
                <Input label="Nome" value={user.nome}/>
                <Input label="E-Mail" value={user.email}/>
                <View style={styles.container}>     
                    <Btn>Salvar edição</Btn>               
                    <TouchableOpacity onPress={ () =>(router.push('/cart'))}>
                        <TextFont style={{fontSize:20}}>Voltar <Octicons name="undo" size={20} color="black" /></TextFont>
                    </TouchableOpacity>
                </View>
            </View>
        </BasePage>
    );
}

const styles = StyleSheet.create({
    edit:{
        gap: 12,
        alignItems: 'center'
    },
    imagem:{
        width: 250,
        height: 250,
        borderRadius: 50
    },
    container:{
        flexDirection:'row', 
        alignItems:'center',
        gap: 20,
    }
})
