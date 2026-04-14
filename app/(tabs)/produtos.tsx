import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 📦 Nosso Banco de Dados com Imagens (URLs provisórias)
const colecoesOnePiece = [
  { 
    id: '1', 
    nome: "Adventure on KAMI's Island", 
    codigo: 'OP15', 
    sigla: 'OP15-EB04',
    imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544321_200w.jpg' 
  },
  { 
    id: '2', 
    nome: 'Heroines Edition', 
    codigo: 'EB03', 
    sigla: 'EB03',
    imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544318_200w.jpg' 
  },
  { 
    id: '3', 
    nome: "The Azure Sea's Seven", 
    codigo: 'OP14', 
    sigla: 'OP14-EB04',
    imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544320_200w.jpg' 
  },
];

export default function TelaProdutos() {

  const renderizarItem = ({ item }) => (
    <TouchableOpacity style={styles.cartaoProduto}>
      {/* 🖼️ Nova imagem adicionada aqui */}
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