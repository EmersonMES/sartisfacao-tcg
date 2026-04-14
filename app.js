import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

// Criando o navegador de abas
const Tab = createBottomTabNavigator();

// --------------------------------------------------------
// Estas são telas provisórias. Mais para frente, vamos 
// separar cada uma em seu próprio arquivo para organizar.
// --------------------------------------------------------
function TelaColecoes() {
  return <View style={styles.tela}><Text style={styles.texto}>Minhas Coleções (Sartisfação TCG)</Text></View>;
}

function TelaProdutos() {
  return <View style={styles.tela}><Text style={styles.texto}>Lista de Produtos/Boosters</Text></View>;
}

function TelaPastas() {
  return <View style={styles.tela}><Text style={styles.texto}>Pastas e Decks</Text></View>;
}

function TelaScanner() {
  return <View style={styles.tela}><Text style={styles.texto}>Câmera / Scanner</Text></View>;
}

function TelaBusca() {
  return <View style={styles.tela}><Text style={styles.texto}>Pesquisar Cards</Text></View>;
}

// --------------------------------------------------------
// Aplicativo Principal
// --------------------------------------------------------
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Configurando a cor de fundo do menu e cabeçalho
          tabBarStyle: { backgroundColor: '#0a1929', borderTopColor: '#000' },
          headerStyle: { backgroundColor: '#0a1929' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#2196F3', // Cor do ícone selecionado (Azul)
          tabBarInactiveTintColor: '#888',  // Cor do ícone não selecionado (Cinza)
          
          // Escolhendo os ícones dinamicamente
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Coleções') iconName = focused ? 'albums' : 'albums-outline';
            else if (route.name === 'Produtos') iconName = focused ? 'cube' : 'cube-outline';
            else if (route.name === 'Pastas') iconName = focused ? 'folder' : 'folder-outline';
            else if (route.name === 'Scanner') iconName = focused ? 'camera' : 'camera-outline';
            else if (route.name === 'Busca') iconName = focused ? 'search' : 'search-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Coleções" component={TelaColecoes} />
        <Tab.Screen name="Produtos" component={TelaProdutos} />
        <Tab.Screen name="Pastas" component={TelaPastas} />
        <Tab.Screen name="Scanner" component={TelaScanner} />
        <Tab.Screen name="Busca" component={TelaBusca} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Estilos básicos para o fundo escuro das telas provisórias
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});