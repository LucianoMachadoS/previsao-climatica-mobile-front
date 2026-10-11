# 📱 Previsão Climática — Mobile

Versão **mobile** do projeto Previsão Climática, feita com **React Native + Expo**: pesquise o tempo de uma cidade e gerencie suas cidades favoritas pelo celular.

| Parte | Repositório |
|---|---|
| API | [api-wheather](https://github.com/LucianoMachadoS/api-wheather) |
| Web (React) | [front-wheather](https://github.com/LucianoMachadoS/front-wheather) |
| Mobile (este) | [previsao-climatica-mobile-front](https://github.com/LucianoMachadoS/previsao-climatica-mobile-front) |

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

<!-- Coloque aqui prints do celular lado a lado -->

## ✨ Funcionalidades

- Campo de busca e cartão com temperatura, condição e ícone do tempo
- Cidades favoritas: estrela (`@expo/vector-icons`) para adicionar ou remover
- Estilos separados por componente (`*Styles.tsx`)
- Mesma API e mesmos modelos de dados da versão web

## 🚀 Como rodar

Suba primeiro a [API](https://github.com/LucianoMachadoS/api-wheather).

```bash
git clone https://github.com/LucianoMachadoS/previsao-climatica-mobile-front.git
cd previsao-climatica-mobile-front
npm install
npx expo start
```

Abra no emulador Android (tecla `a`) ou no app **Expo Go**. No emulador, o app acessa a API em `http://10.0.2.2:3333`, que é o `localhost` do computador. No celular físico, troque esse endereço em `src/lib/axios.ts` pelo IP do seu computador na rede.

---
Feito por [Luciano Machado](https://github.com/LucianoMachadoS) · [LinkedIn](https://www.linkedin.com/in/luciano-machado-9253a1265/)
