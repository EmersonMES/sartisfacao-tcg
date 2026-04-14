import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TelaScanner() {
  // Aqui nós gerenciamos a permissão de hardware
  const [permissao, pedirPermissao] = useCameraPermissions();

  // 1. O aplicativo ainda está checando se tem permissão
  if (!permissao) {
    return <View style={styles.container} />;
  }

  // 2. O usuário ainda não deu permissão
  if (!permissao.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>O Sartisfação TCG precisa de acesso à câmera para escanear suas cartas.</Text>
        <TouchableOpacity style={styles.botao} onPress={pedirPermissao}>
          <Text style={styles.textoBotao}>Liberar Câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. Permissão concedida! Mostramos a câmera
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        
        {/* Camada transparente por cima da câmera para desenhar a mira */}
        <View style={styles.overlay}>
          <View style={styles.miraCarta} />
          <Text style={styles.textoMira}>Alinhe a carta dentro do quadro</Text>
        </View>

      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  texto: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  botao: {
    backgroundColor: '#2196F3', // Azul padrão Logia
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 50,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Escurece o fundo levemente
    justifyContent: 'center',
    alignItems: 'center',
  },
  miraCarta: {
    width: 250,
    height: 350,
    borderWidth: 3,
    borderColor: '#2196F3',
    borderRadius: 15,
    backgroundColor: 'transparent',
    // 'vaza' o fundo escuro para destacar apenas o meio
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 100,
  },
  textoMira: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});