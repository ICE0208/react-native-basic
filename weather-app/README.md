## react native의 기본 규칙

1. react native는 웹사이트가 아니다. HTML이 아니기 때문에 `div`는 쓸 수 없다. 대신 `View`를 사용한다.
2. react native에 있는 모든 text는 text component에 들어가야한다.
3. style은 웹처럼 자유롭게 줄 수 있다. 웹의 스타일과 거의 비슷하지만 다른 것도 있다.

## 스타일 주는 법

### 첫 번째

```js
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "red",
  },
});
```

> stylesheet object를 따로 만들어서 스타일을 지정할 수 있다. 가독성이 좋고 자동완성을 기본으로 제공한다.

### 두 번째

```js
export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 42,
          color: "blue",
          fontWeight: "bold",
        }}
      >
        Hello!!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

> Text 컴포넌트처럼 stylesheet object를 따로 만들지 않고 직접 스타일을 지정할 수 있다.

## Status Bar

Status Bar는 상단에 있는 시계, 배터리, WiFi 등 의 아이콘을 의미한다. 기본으로 되어있는 `auto`를 `light`로 바꾸면 아이콘이 하얀색이 된다. 이처럼 몇몇 컴포넌트는 화면에 표시되지 않고 `운영체제와 소통` 하기 위해 사용된다.

## 관련 자료

React Native Doc
https://reactnative.dev/docs/components-and-apis

React Native Directory
https://reactnative.directory/

Expo Doc
https://docs.expo.dev/versions/latest/

## Layout System

기본적으로 View는 `flex`이다. flex direction의 기본값은 `column`이다.  
반응형 레이아웃을 위해 width나 height는 잘 사용하지 않고, 보통 `flex`로 반응형 레이아웃을 구성한다.

## Expo Go 새로고침 안될 때?

expo를 실행시킨 터미널에서 `r`을 누르면 `reload app`이 되면서 다시 정상작동한다.

## 스크롤 구현하기

```js
import { ScrollView } from "react-native";
```

> react-native의 `ScrollView` 컴포넌트를 이용하여 스크롤을 구현할 수 있다.

```js
export default function App() {
  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </ScrollView>
    </View>
  );
}
```

> `horizontal` props를 이용하면 수평으로 스크롤하게도 할 수 있다.  
> ScrollView에 스타일을 주고 싶을 때는 style props 대신 `contentContainerStyle` props 를 이용한다.

> `pagingEnabled` props를 true로 설정하면 스크롤뷰가 스크롤 아이템들의 크기에 맞게 멈춘다. horizontal 일 때 적용할 수 있다.  
> [원문] When true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination.

> `showsHorizontalScrollIndicator`를 False로 설정하면 수평방향으로 스크롤 할 때 인디케이터를 숨길 수 있다.

## 디바이스의 크기 가져오기

```js
import { View, useWindowDimensions } from "react-native";

export default function App() {
  const { width, height } = useWindowDimensions();

  return <View></View>;
}
```

> `useWindowDimensions` 을 이용하면 디바이스의 크기를 가져올 수 있다.

## 위치 가져오기

`Expo Location`을 이용하면 위치 정보를 쉽게 가져올 수 있다.  
[https://docs.expo.dev/versions/latest/sdk/location/](https://docs.expo.dev/versions/latest/sdk/location/)

### 위치의 우편 주소 가져오기

1. `requestForegroundPermissionsAsync`로 위치 권한을 요청한다.
2. `getCurrentPositionAsync`로 `위도`와 `경도`의 정보를 가져올 수 있음. `accuracy` 옵션을 이용해서 위치 정확도를 지정할 수 있다.
3. `reverseGeocodeAsync`를 이용하여 `위도`와 `경도`의 정보를 가지고 `우편 주소`를 얻을 수 있다.

## 로딩 인디케이터

react native의 `ActivityIndicator`를 사용하면 로딩바를 쉽게 만들 수 있다.
