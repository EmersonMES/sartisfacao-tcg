import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cartasOnePiece } from '../dados/cartasOnePiece';

export default function TelaDetalhes() {
  const router = useRouter();

  // 🧠 Memória do App
  const [modalVisivel, setModalVisivel] = useState(false);
  const [corSelecionada, setCorSelecionada] = useState('Todas');
  const [ordenacao, setOrdenacao] = useState('ID'); // ID, Maior Preço, Menor Preço

  // ⚙️ Motor de Processamento (Filtro + Ordenação)
  const cartasExibidas = [...cartasOnePiece]
    .filter((carta) => corSelecionada === 'Todas' || carta.cor === corSelecionada)
    .sort((a, b) => {
      if (ordenacao === 'ID') return 0; // Mantém a ordem original

      // Transforma "R$90.00" em 90.00 (Número)
      const precoA = parseFloat(a.preco.replace('R$', ''));
      const precoB = parseFloat(b.preco.replace('R$', ''));

      if (ordenacao === 'Maior Preço') return precoB - precoA; // Maior -> Menor
      if (ordenacao === 'Menor Preço') return precoA - precoB; // Menor -> Maior
      return 0;
    });

  const renderizarCarta = ({ item }) => (
    <View style={styles.cartaoWrapper}>
      <Image source={{ uri: item.imagem }} style={styles.imagemCarta} />
      <View style={styles.etiquetaPreco}>
        <Text style={styles.textoPreco}>{item.preco}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.barraSuperior}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
          <Text style={styles.textoVoltar}>← Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoFiltro} onPress={() => setModalVisivel(true)}>
          <Ionicons name="options" size={20} color="#fff" />
          <Text style={styles.textoBotaoFiltro}>Filtros e Ordem</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cabecalho}>
        <Text style={styles.textoValor}>Valor da sua coleção</Text>
        <Text style={styles.valorTotal}>R$122.35</Text>
        <Text style={styles.textoCards}>Exibindo {cartasExibidas.length} de {cartasOnePiece.length}</Text>
      </View>

      <FlatList
        data={cartasExibidas}
        keyExtractor={(item) => item.id}
        renderItem={renderizarCarta}
        numColumns={3}
        contentContainerStyle={styles.grade}
      />

      {/* 🛑 MODAL DE FILTROS E ORDENAÇÃO */}
      <Modal visible={modalVisivel} transparent={true} animationType="slide">
        <View style={styles.fundoModal}>
          <View style={styles.caixaModal}>
            
            <View style={styles.cabecalhoModal}>
              <Text style={styles.tituloModal}>Organizar Coleção</Text>
              <TouchableOpacity onPress={() => setModalVisivel(false)}>
                <Ionicons name="close-circle" size={32} color="#8898aa" />
              </TouchableOpacity>
            </View>

            {/* SEÇÃO 1: ORDENAÇÃO */}
            <Text style={styles.subtituloModal}>Ordenar por:</Text>
            <View style={styles.linhaBotoes}>
              {['ID', 'Maior Preço', 'Menor Preço'].map((item) => (
                <TouchableOpacity 
                  key={item}
                  style={[styles.botaoOpcao, ordenacao === item && styles.botaoAtivo]}
                  onPress={() => setOrdenacao(item)}
                >
                  <Text style={[styles.textoBotaoOpcao, ordenacao === item && styles.textoAtivo]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* SEÇÃO 2: FILTRO DE COR */}
            <Text style={styles.subtituloModal}>Filtrar por Cor:</Text>
            <View style={styles.linhaBotoes}>
              {['Todas', 'Azul', 'Vermelho', 'Verde', 'Preto'].map((cor) => (
                <TouchableOpacity 
                  key={cor}
                  style={[styles.botaoOpcao, corSelecionada === cor && styles.botaoAtivo]}
                  onPress={() => setCorSelecionada(cor)}
                >
                  <Text style={[styles.textoBotaoOpcao, corSelecionada === cor && styles.textoAtivo]}>{cor}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.botaoAplicar} onPress={() => setModalVisivel(false)}>
              <Text style={styles.textoBotaoAplicar}>Ver Resultados</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1929', paddingTop: 40 },
  barraSuperior: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 15 },
  botaoVoltar: { padding: 15 },
  textoVoltar: { color: '#2196F3', fontSize: 16, fontWeight: 'bold' },
  botaoFiltro: { flexDirection: 'row', backgroundColor: '#132f4c', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, alignItems: 'center' },
  textoBotaoFiltro: { color: '#fff', marginLeft: 5, fontWeight: 'bold' },
  cabecalho: { alignItems: 'center', marginBottom: 20 },
  textoValor: { color: '#8898aa', fontSize: 14 },
  valorTotal: { color: '#ffffff', fontSize: 36, fontWeight: 'bold', marginVertical: 5 },
  textoCards: { color: '#8898aa', fontSize: 14 },
  grade: { paddingHorizontal: 10, paddingBottom: 20 },
  cartaoWrapper: { flex: 1, margin: 5, aspectRatio: 0.7, backgroundColor: '#132f4c', borderRadius: 8, overflow: 'hidden' },
  imagemCarta: { width: '100%', height: '100%' },
  etiquetaPreco: { position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0, 0, 0, 0.8)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  textoPreco: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },

  // Modal Styles
  fundoModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  caixaModal: { backgroundColor: '#0a1929', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 40 },
  cabecalhoModal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  tituloModal: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subtituloModal: { color: '#8898aa', fontSize: 16, marginBottom: 15, marginTop: 10 },
  linhaBotoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  botaoOpcao: { backgroundColor: '#132f4c', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: 'transparent' },
  botaoAtivo: { borderColor: '#2196F3', backgroundColor: 'rgba(33, 150, 243, 0.1)' },
  textoBotaoOpcao: { color: '#8898aa', fontWeight: '600' },
  textoAtivo: { color: '#2196F3' },
  botaoAplicar: { backgroundColor: '#2196F3', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  textoBotaoAplicar: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});