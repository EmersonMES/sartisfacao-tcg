import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 🏴‍☠️ Base de Dados Real de Coleções de One Piece
const colecoesOnePiece = [
  { id: 'OP01', nome: 'Romance Dawn', sigla: 'OP-01', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/282241_200w.jpg' },
  { id: 'OP02', nome: 'Paramount War', sigla: 'OP-02', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/454593_200w.jpg' },
  { id: 'OP03', nome: 'Pillars of Strength', sigla: 'OP-03', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/476831_200w.jpg' },
  { id: 'OP04', nome: 'Kingdoms of Intrigue', sigla: 'OP-04', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/490483_200w.jpg' },
  { id: 'EB01', nome: 'Memorial Collection', sigla: 'EB-01', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544315_200w.jpg' },
];

export default function TelaProdutos() {
  const router = useRouter();

  const renderizarItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cartaoProduto} 
      onPress={() => router.push('/detalhes')}
    >
      <Image source={{ uri: item.imagem }} style={styles.imagemBooster} />
      
      <View style={styles.infoProduto}>
        <Text style={styles.nomeProduto}>{item.nome}</Text>
        <Text style={styles.codigoProduto}>{item.sigla}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Booster Packs</Text>
      </View>

      <FlatList
        data={colecoesOnePiece}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

// 🖌️ Estilos atualizados para acomodar a imagem
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1929' },
  cabecalho: { padding: 20, paddingTop: 50 },
  titulo: { color: '#ffffff', fontSize: 22, fontWeight: 'bold' },
  lista: { paddingHorizontal: 15, paddingBottom: 20 },
  
  cartaoProduto: {
    backgroundColor: '#132f4c',
    borderRadius: 15,
    padding: 15, // Diminui um pouco para a imagem caber melhor
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Estilo da nossa imagem
  imagemBooster: {
    width: 50,
    height: 70,
    borderRadius: 5,
    marginRight: 15,
    backgroundColor: '#0a1929', // Fundo escuro enquanto carrega
  },
  infoProduto: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nomeProduto: { color: '#ffffff', fontSize: 16, fontWeight: '600', flexShrink: 1 },
  codigoProduto: { color: '#8898aa', fontSize: 14, marginLeft: 10 }
});