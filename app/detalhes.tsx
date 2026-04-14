import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 🗃️ Nosso Banco de Dados Falso para as cartas (baseado na sua imagem!)
const cartasOnePiece = [
  { id: '1', nome: 'Trafalgar Law', preco: 'R$22.18', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544321_200w.jpg' },
  { id: '2', nome: 'Marco', preco: 'R$90.00', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544318_200w.jpg' },
  { id: '3', nome: 'Monkey.D.Luffy', preco: 'R$1.50', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544320_200w.jpg' },
  { id: '4', nome: 'Kaku', preco: 'R$0.20', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544321_200w.jpg' },
  { id: '5', nome: 'Monkey.D.Luffy (Velho)', preco: 'R$2.51', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544318_200w.jpg' },
  { id: '6', nome: 'Roronoa Zoro', preco: 'R$5.96', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544320_200w.jpg' },
];

export default function TelaDetalhes() {
  const router = useRouter();

  // 🎨 Desenhando cada carta individual
  const renderizarCarta = ({ item }) => (
    <View style={styles.cartaoWrapper}>
      <Image source={{ uri: item.imagem }} style={styles.imagemCarta} />
      
      {/* Etiqueta de Preço preta no canto inferior direito */}
      <View style={styles.etiquetaPreco}>
        <Text style={styles.textoPreco}>{item.preco}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔙 Botão simples para voltar */}
      <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
        <Text style={styles.textoVoltar}>← Voltar</Text>
      </TouchableOpacity>

      {/* Resumo da Coleção */}
      <View style={styles.cabecalho}>
        <Text style={styles.textoValor}>Valor da sua coleção</Text>
        <Text style={styles.valorTotal}>R$122.35</Text>
        <Text style={styles.textoCards}>Cards possuídos: 6</Text>
      </View>

      {/* 🖼️ A Grade de Cartas */}
      <FlatList
        data={cartasOnePiece}
        keyExtractor={(item) => item.id}
        renderItem={renderizarCarta}
        numColumns={3} // 👈 A mágica que divide em 3 colunas!
        contentContainerStyle={styles.grade}
      />
    </View>
  );
}

// 🖌️ Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1929', paddingTop: 40 },
  botaoVoltar: { padding: 15 },
  textoVoltar: { color: '#2196F3', fontSize: 16, fontWeight: 'bold' },
  
  cabecalho: { alignItems: 'center', marginBottom: 20 },
  textoValor: { color: '#8898aa', fontSize: 14 },
  valorTotal: { color: '#ffffff', fontSize: 36, fontWeight: 'bold', marginVertical: 5 },
  textoCards: { color: '#8898aa', fontSize: 14 },

  grade: { paddingHorizontal: 10, paddingBottom: 20 },
  
  cartaoWrapper: {
    flex: 1,
    margin: 5, // Espaço entre as cartas
    aspectRatio: 0.7, // Mantém a proporção retangular da carta
    backgroundColor: '#132f4c',
    borderRadius: 8,
    overflow: 'hidden', // Faz a imagem respeitar o arredondamento
    position: 'relative',
  },
  imagemCarta: {
    width: '100%',
    height: '100%',
  },
  etiquetaPreco: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  textoPreco: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  }
});