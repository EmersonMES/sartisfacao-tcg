import { Ionicons } from '@expo/vector-icons'; // Para os ícones!
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 🗃️ Banco de Dados (Agora com cores!)
const cartasIniciais = [
  { id: '1', nome: 'Trafalgar Law', preco: 'R$22.18', cor: 'Azul', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544321_200w.jpg' },
  { id: '2', nome: 'Marco', preco: 'R$90.00', cor: 'Azul', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544318_200w.jpg' },
  { id: '3', nome: 'Monkey.D.Luffy', preco: 'R$1.50', cor: 'Vermelho', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544320_200w.jpg' },
  { id: '4', nome: 'Kaku', preco: 'R$0.20', cor: 'Preto', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544321_200w.jpg' },
  { id: '5', nome: 'Monkey.D.Luffy (V)', preco: 'R$2.51', cor: 'Vermelho', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544318_200w.jpg' },
  { id: '6', nome: 'Roronoa Zoro', preco: 'R$5.96', cor: 'Verde', imagem: 'https://tcgplayer-cdn.tcgplayer.com/product/544320_200w.jpg' },
];

export default function TelaDetalhes() {
  const router = useRouter();

  // 🧠 A "Memória" do nosso aplicativo (useState)
  const [modalVisivel, setModalVisivel] = useState(false);
  const [corSelecionada, setCorSelecionada] = useState('Todas');

  // ⚙️ O Motor do Filtro: Lê a memória e cria uma nova lista
  const cartasFiltradas = cartasIniciais.filter((carta) => {
    if (corSelecionada === 'Todas') return true; // Mostra tudo
    return carta.cor === corSelecionada; // Mostra só a cor escolhida
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
      {/* 🔙 Cabeçalho com Botão Voltar e Botão de Filtro */}
      <View style={styles.barraSuperior}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
          <Text style={styles.textoVoltar}>← Voltar</Text>
        </TouchableOpacity>

        {/* 🎛️ Botão que ABRIRÁ o Modal */}
        <TouchableOpacity style={styles.botaoFiltro} onPress={() => setModalVisivel(true)}>
          <Ionicons name="filter" size={20} color="#fff" />
          <Text style={styles.textoBotaoFiltro}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cabecalho}>
        <Text style={styles.textoValor}>Valor da sua coleção</Text>
        <Text style={styles.valorTotal}>R$122.35</Text>
        <Text style={styles.textoCards}>Cards exibidos: {cartasFiltradas.length}</Text>
      </View>

      <FlatList
        data={cartasFiltradas} // 👈 Agora usamos a lista FILTRADA, não a original!
        keyExtractor={(item) => item.id}
        renderItem={renderizarCarta}
        numColumns={3}
        contentContainerStyle={styles.grade}
      />

      {/* 🛑 COMEÇO DO MODAL (Fica invisível até setModalVisivel ser TRUE) */}
      <Modal visible={modalVisivel} transparent={true} animationType="slide">
        <View style={styles.fundoModal}>
          <View style={styles.caixaModal}>
            
            <View style={styles.cabecalhoModal}>
              <Text style={styles.tituloModal}>Filtrar Coleção</Text>
              <TouchableOpacity onPress={() => setModalVisivel(false)}>
                <Ionicons name="close" size={28} color="#8898aa" />
              </TouchableOpacity>
            </View>

            <Text style={styles.subtituloModal}>Escolha uma Cor:</Text>
            
            {/* Botões de Cores */}
            <View style={styles.linhaBotoesCor}>
              {['Todas', 'Azul', 'Vermelho', 'Verde', 'Preto'].map((cor) => (
                <TouchableOpacity 
                  key={cor}
                  // Muda a cor do botão se ele for o selecionado!
                  style={[styles.botaoCor, corSelecionada === cor && styles.botaoCorAtivo]}
                  onPress={() => setCorSelecionada(cor)}
                >
                  <Text style={[styles.textoBotaoCor, corSelecionada === cor && styles.textoBotaoCorAtivo]}>
                    {cor}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Botão para Fechar e ver o resultado */}
            <TouchableOpacity style={styles.botaoAplicar} onPress={() => setModalVisivel(false)}>
              <Text style={styles.textoBotaoAplicar}>Aplicar Filtros</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
      {/* 🛑 FIM DO MODAL */}

    </View>
  );
}

// 🖌️ Estilos
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

  // --- Estilos do Modal ---
  fundoModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }, // Escurece o fundo e joga o modal pra baixo
  caixaModal: { backgroundColor: '#0a1929', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, minHeight: '40%' },
  cabecalhoModal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  tituloModal: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  subtituloModal: { color: '#8898aa', fontSize: 16, marginBottom: 15 },
  
  linhaBotoesCor: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  botaoCor: { backgroundColor: '#132f4c', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: '#132f4c' },
  botaoCorAtivo: { borderColor: '#2196F3', backgroundColor: 'rgba(33, 150, 243, 0.2)' }, // Destaca o botão escolhido
  textoBotaoCor: { color: '#8898aa', fontWeight: 'bold' },
  textoBotaoCorAtivo: { color: '#2196F3' },

  botaoAplicar: { backgroundColor: '#2196F3', padding: 15, borderRadius: 10, alignItems: 'center' },
  textoBotaoAplicar: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});