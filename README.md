# Breaking The Browser (BTB)

## How to Use

WIP

### Download

WIP

## How to Develop

WIP

### Setting

WIP

### Add Tool

1. public 폴더에 64px 의 png 이미지를 추가합니다.

- 필수: 독바 이미지
- 옵션: 커서 이미지
- 옵션: 마크 이미지

2. static/IMAGE.ts 에서 기존 코드를 참고하여 이미지 Url을 추가합니다.

3. 툴 타입을 추가합니다.

```tsx
// types/tool
export type ToolType = 'none' | 'highlighter' | ... | 'newTool'
```

4. 각 이미지를 필요한곳에 추가합니다.

- ContentWrapper.styled.ts 에서 커서 이미지를 추가합니다.
- IconButton.styled.ts 에서 독바 아이콘을 추가합니다.

5. Konva Layer 컴포넌트를 작성합니다.

```tsx
const MyNewTool = ({ stageRef }: MyNewToolProps) => {
  const layerRef = useRef<Konva.Layer>(null);
  const { ants, killIfInRange } = useAntKiller(MARK_SIZE, MARK_SIZE);
  const { shakeBrowser } = useShake();

  const callbackFunc = (clientX: number, clientY: number, offset: number) => {
    // ...
    shakeBrowser(100);
    killIfInRange(clientX - offset / 2, clientY);
  };
  useTurn({ stageRef, layerRef, callback: callbackFunc, offset }); // or useMove

  return <Layer ref={layerRef}>...</Layer>;
};

export default MyNewTool;
```

- 필요에 따라 `useAntKiller`, `useShake`, `useTurn`, `useMove` 등의 커스텀 훅을 사용합니다.

6. DockBar에 새로운 아이콘을 등록합니다.

```tsx
const DockBar = ({ selectTool }: DockBarProps) => {
  const onClickBtn = (tool: ToolType) => selectTool(tool);

  return (
    <S.DockBarWrapper>
      <IconButton icon="highlighter" onClickBtn={() => onClickBtn('highlighter')} />
      ///
      <IconButton icon="newTool" onClickBtn={() => onClickBtn('newTool')} />
    </S.DockBarWrapper>
  );
};
```
