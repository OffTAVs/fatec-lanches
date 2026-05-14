import { View , StyleSheet } from 'react-native'
import TextFont from '@/components/TextFont';

interface TitleHeaderTypes {
    title: string,
    subtitle?: string,
}

export default function TitleHeader( { title , subtitle }: TitleHeaderTypes ){
    return (
      <View style={styles.header}>
        <TextFont style={styles.headerTitle}>{title}</TextFont>
      {subtitle && <TextFont style={styles.headerSubtitle}>{subtitle}</TextFont>}
      </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        marginHorizontal: 0,
        width: '100%',
        alignSelf: 'stretch',
        position: 'relative',
        marginTop: 30,
        left: 0,
        right: 0,
    },
    headerTitle: {
        color: '#005C6D',
        fontSize: 36,
        fontFamily: 'Roboto_700Bold',
    },
    headerSubtitle: {
        color: '#000',
        fontSize: 20,
                fontFamily: 'Roboto_400Regular',
        marginTop: 2,
    },
})