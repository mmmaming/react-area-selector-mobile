## 基于React的移动端地区选择器组件

### Installation

npm 
> npm install react-area-selector


### Example

```js
<AreaSelector
    itemHeight={34}
    rowCount={7}
    show={true}
    onChange={this.changeHandle}
    onCancel={this.cancelHandle}
    defaultText={['陕西省', '西安市', '雁塔区']}/>

```

![react-area-selector](https://github.com/mmmaming/react-area-selector-mobile/blob/master/image/area.png?raw=true)


### Props

Props            | Type            | Default Value                   | Description                                                 
---------------- | --------------- | ------------------------------- | -----------                                                 
`show`           | `boolean`       | `false`                         | 组件的显示状态                                                 
`onChange`       | `function`      | `null`                          | 确认回调函数
`onCancel`       | `function`      | `null`                          | 取消回调函数                                                            
`itemHeight`     | `number`        | `34`                            | 每行显示高度                                                            
`rowCount`       | `number`        | `7`                             | 行数                                                            
`defaultText`    | `array`         | `[]`                            | 默认显示地区                                                         