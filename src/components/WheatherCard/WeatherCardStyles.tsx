import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  cardContent: {
    flex: 1,
    gap: 3,
    paddingRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 16,
  }
});