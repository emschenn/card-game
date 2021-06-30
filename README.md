<p align="center">
  <img src="demo.gif" width="600" >
  Demo in Gather.Town
</p>

## README
腸胃淸道夫 is a board game. Through that players are secretly assigned either friendly or naughty roles, the game aims at using a different perspectives to help players understand how daily diet would affect the production of poop 💩   <br/> This repository is a web-version of the game for demo. [click here to try it out ](https://card-game-three.vercel.app/) 😆

### 👷🏻‍♀️ Built with
* [NEXT.js](https://nextjs.org/): with image optimization by next/image and depolyed to Vercel
  * [react-card-flip](https://github.com/AaronCCWong/react-card-flip): to create flippable card
  * [framer-motion](https://www.framer.com/motion/): to create animation 
* [Firebase - Realtime Database](https://firebase.google.com/products/realtime-database?gclid=Cj0KCQjw5uWGBhCTARIsAL70sLKo0T-JG_SZloOtyD3EsDHui0EcC_WoK2k5U7nyZA6vTMmkzANna6MaAhukEALw_wcB&gclsrc=aw.ds): to create real time interaction


### 👩🏻‍💻 Setup
1. Create a .env file in the root directory: 
```
NEXT_PUBLIC_FIREBASE_API_KEY="your firebase api key"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your firebase project id"
```
2. Run `npm run dev`✨
