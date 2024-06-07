## To run game on local server follow these steps:

1. Run game backend service and use using npm run dev after cloning "jungle_queen_backend".<br />
2. Open command prompt and hit ipconfig command.<br />
3. Copy your IPv4 Address.<br />
4. Paste that address into proxy section in package.json file for ex: "proxy": "http://192.168.0.206:8080".<br />
5. Hit npm start.<br />
6. You are good to go Happy Coding😊<br />



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Cheat Panel
You can access the cheat panel By adding this flag: www.localhost:3000?DebugMode=true.
Add this line in the .env file: REACT_APP_DEBUG_MODE = true
You can modify cheat option title and value. please go to the file: src\slot\data\config\index.ts
export const mockDataCheats : IMockOnlineCheat =  [
    { name: "No Win", data: "771, 175, 42, 134, 13, 109, 131, 0" },
    { name: "high win ", data: "11,1,141,45,115,83,81,888,13 " },
    { name: "Big win", data: "24,1,152,31,103,31,96,708,48,17,702,10,996,51,2037,97,1167,424,2360,2275,428" },
    { name: "Single Line Cheat", data: "10,0,64,116,140,145,35,104,55" },
    { name: "Reveal Feature Trigger", data: "34, 0, 120, 4, 157, 28, 84, 878, 30" },
    { name: "reveal wih coin win", data: "31, 1, 21, 36, 127, 155, 65, 164, 82, 6, 953, 71, 2829, 72, 2849" },
    { name: "Full Board win", data: "0,0,15,27,15,70,13,0,89" },
    { name: "Free Game Trigger", data: "500, 0, 5, 0, 0, 0, 6" }
  ];

## Steps for adding text on the Reel Symbol:
Please follow step:-
* Please go to the file:- src\components\symbol\configuration\gofSymbolconfiguration.tsx 
* For adding BitMapText or Text on the symbol
* For BitMapText Please do add below script on the symbol child:-
{
  id: "textOnSymbol",
  name: "textOnSymbol",
  type: "BitMapText",
  alpha: 0,
  x: 126,
  y: 111,
  width: 100,
  visible: true,
  text: "999",
  scaleToFit: true,
  anchor: [0.5, 0.5],
  textStyle: {
    font: "100px coin_digits-export"
  }
}
* For Text Please do add below script on the symbol child:-
* Show example:- 
{
    "name": "textOnSymbol",
    "type": "Text",
    "x": 106,
    "y": 111,
    "width": 500,
    "visible": true,
    "scaleToFit": true,
    "text": "1",
    "anchor": [0.5, 0.5],
    "textStyle": {
        fontFamily: 'Impact',
        fontSize: 120,
        fill: ['#ffffff'],
        stroke: ['#984800'],
        strokeThickness: 4,
        dropShadow: true,
        dropShadowColor: '#210c02',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 3,
        letterSpacing: 2
    }
}
* Refer this example
{
  "id": "15",
  "name": "symbol_Coin",
  "width": configGame.SYMBOL_WIDTH,
  "height": configGame.SYMBOL_HEIGHT,
  "anchor": [0, 0],
  "offsetX": 0,
  "offsetY": 0,
  "child": [
      {
          "type": "Image",
          "width": 250,
          "height": 250,
          "image": "symbol_Coin",
          "visible": true,
      },
      {
          id: "textOnSymbol",
          name: "textOnSymbol",
          type: "BitMapText",
          alpha: 0,
          x: 126,
          y: 111,
          width: 100,
          visible: true,
          text: "999",
          scaleToFit: true,
          anchor: [0.5, 0.5],
          textStyle: {
            font: "100px coin_digits-export",
          },
        },
      // {
      //     "name": "textOnSymbol",
      //     "type": "Text",
      //     "x": 106,
      //     "y": 111,
      //     "width": 500,
      //     "visible": true,
      //     "scaleToFit": true,
      //     "text": "1",
      //     "anchor": [0.5, 0.5],
      //     "textStyle": {
      //         fontFamily: 'Impact',
      //         fontSize: 120,
      //         fill: ['#ffffff'],
      //         stroke: ['#984800'],
      //         strokeThickness: 4,
      //         dropShadow: true,
      //         dropShadowColor: '#210c02',
      //         dropShadowAngle: Math.PI / 6,
      //         dropShadowDistance: 3,
      //         letterSpacing: 2,
      //     }
      // },
  ],
  "visible": true,
}
