import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProductById } from '../../store/slices/productsSlice';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';
import { RootStackParamList } from '../../navigation/types';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const { width } = Dimensions.get('window');

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { productId } = route.params;

  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector(
    state => state.products,
  );
  const favorites = useAppSelector(state => state.favorites.favorites);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const isFavorite = selectedProduct
    ? favorites.some(fav => fav.id === selectedProduct.id)
    : false;

  const handleToggleFavorite = () => {
    if (selectedProduct) {
      if (isFavorite) {
        dispatch(removeFavorite(selectedProduct.id));
      } else {
        dispatch(addFavorite(selectedProduct));
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Cargando producto...</Text>
      </View>
    );
  }

  if (error || !selectedProduct) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error al cargar el producto</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}>
        {selectedProduct.images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{selectedProduct.title}</Text>
            <Text style={styles.brand}>{selectedProduct.brand}</Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite ? '#FF3B30' : '#8E8E93'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              ⭐ {selectedProduct.rating.toFixed(1)}
            </Text>
          </View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{selectedProduct.category}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${selectedProduct.price}</Text>
          {selectedProduct.discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                -{selectedProduct.discountPercentage.toFixed(0)}%
              </Text>
            </View>
          )}
        </View>

        <View style={styles.stockContainer}>
          <Text style={styles.stockLabel}>Disponibilidad:</Text>
          <Text
            style={[
              styles.stockText,
              selectedProduct.stock > 0
                ? styles.stockAvailable
                : styles.stockUnavailable,
            ]}>
            {selectedProduct.stock > 0
              ? `${selectedProduct.stock} unidades disponibles`
              : 'Agotado'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.actionButton,
            selectedProduct.stock === 0 && styles.actionButtonDisabled,
          ]}
          disabled={selectedProduct.stock === 0}>
          <Text style={styles.actionButtonText}>
            {selectedProduct.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.error,
  },
  imageGallery: {
    height: 300,
  },
  image: {
    width: width,
    height: 300,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  favoriteButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  categoryBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.surface,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stockLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stockAvailable: {
    color: COLORS.success,
  },
  stockUnavailable: {
    color: COLORS.error,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  actionButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
});

export default DetailScreen;