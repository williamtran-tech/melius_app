# 1. Issues might be raised during development process of Mobile App

## **1.1. Error:** [Reanimated] Mismatch between JavaScript part and native part of Reanimated (3.2.0 vs. 2.14.4).

> Did you forget to re-build the app after upgrading react-native-reanimated? If you use Expo Go, you must downgrade to 2.14.4 which is bundled into Expo SDK., js engine: hermes

**Solution:**

To resolve this issue, you need to make sure that the JavaScript and native parts of react-native-reanimated are in sync. Here are the steps you can follow:

First, make sure you have the correct version of react-native-reanimated installed. You can check your package.json file or run the following command to verify:

```
npm ls react-native-reanimated
```

If the version is incorrect, update the version of react-native-reanimated in your package.json file to match the native version (2.14.4 in this case). Then, run the following command to install the correct version:

```
npm install
```

After updating the package, you need to rebuild your app to ensure the changes take effect. Run the following commands based on your development environment:

If you're using Expo Go, you may need to downgrade to the version of react-native-reanimated that is bundled with the Expo SDK (2.14.4 in this case). Run the following command:

```
expo install react-native-reanimated@2.14.4
```

If you're using React Native CLI, run the following commands to rebuild the app:

```
npx react-native clean
```

## **1.2. babel.config.js**

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

**_Note:_** run >> npm uninstall @react-native-community/async-storage >> npm install @react-native-async-storage/async-storage\_
