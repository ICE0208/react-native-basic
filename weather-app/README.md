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
