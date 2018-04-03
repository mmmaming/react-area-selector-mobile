import React from 'react';
import PropTypes from 'prop-types';
import PickerView from './picker-view';
import './picker.css';
export default class Picker extends React.Component {
  
	static defaultProps = {
		itemHeight: 34,
		rowCount: 7
	};

	constructor(props) {
		super(props);
		const { data, defaultSelected, defaultText } = props;
		let lists;
		let text = '';
		let listsLength = this.splitData(data).length;
		let selected = new Array(listsLength).fill(0);

		if (defaultText && defaultText.length > 0) {
			selected = this.defaultTextToIndex(data, defaultText, listsLength);
		} else if (defaultSelected && defaultSelected.length > 0) {
			selected = this.defaultSelectedToIndex(data, defaultSelected, listsLength);
		}
		lists = this.splitData(data, selected);

		lists.forEach((item, key) => {
			text += `${item['list'][selected[key]].name} `;
		});
		text = text.split(' ');
		text.pop();
		this.state = {
			lists,
			selected,
			text: text
		}
	}
	defaultSelectedToIndex(data, defaultSelected, listsLength) {
		let selected = new Array(listsLength).fill(0);
		let key = 0;
		let index = 0;
		while(defaultSelected.length > 0) {
			index = defaultSelected.shift();
			if (data[index] && typeof data[index] !== 'undefined') {
				selected[key] = index;
				data = data[index].sub || [];
				key++;
			} else {
				break;
			}
		}
		return selected;
	}
	defaultTextToIndex(data, defaultText, listsLength) {
		let selected = new Array(listsLength).fill(0);
		let key = 0;
		let index = -1;
		while(defaultText.length > 0) {
			let value = defaultText.shift();
			index = data.findIndex(item => item.name === value);
			if (index === -1) index = 0;
			selected[key] = index;
			data[index] && typeof data[index].sub !== 'undefined' && (data = data[index].sub);
			key++;
		}
		return selected;

	}

	splitData = (data, defaultSelected, list = []) => {
		let _index;
		if (Array.isArray(defaultSelected) && defaultSelected.length > 0) {
			let _cloneIndex = defaultSelected.slice();
			_index = _cloneIndex.shift();
			defaultSelected = _cloneIndex;
		}

		if (typeof data[_index] === 'undefined') _index = 0;

		let item = data[_index];
		let _list = JSON.parse(JSON.stringify(data));

		_list.forEach(item => delete item.sub);
		list.push({list: _list});
		if (typeof item.sub !== 'undefined' && Array.isArray(item.sub)) {
			return this.splitData(item.sub, defaultSelected, list);
		} else {
			return list;
		}
	}

	handleChange = (item, i, pickerViewIndex) => {
		let { selected } = this.state;
		let text = '';
		const { data } = this.props;
		const resetSelected = (arr, key) => {
			var k = key;
			while (arr[k + 1] || arr[k + 1] === 0) {
				arr[k + 1] = 0;
				k++;
			}
			return arr;
		}
		selected[pickerViewIndex] = i;
		selected = resetSelected(selected, pickerViewIndex);
		const newLists = this.splitData(data, selected);
		newLists.forEach((item, key) => {
			text += `${item['list'][selected[key]].name} `
		});
		text = text.split(' ');
		text.pop();
		this.setState({ selected, lists: newLists, text });
	}

	renderProvinceCityArea() {
		const { itemHeight, rowCount } = this.props;

		return this.state.lists.map(({list}, key) => {
			return <PickerView key={key} onChange={this.handleChange} defaultIndex={this.state.selected[key]} itemHeight={itemHeight} rowCount={rowCount} list={list} pickerViewIndex={key}/>;
		})
	}

	confirm = () => {
		const { onChange } = this.props;
		onChange && onChange(this.state.text, this.state.selected);
	}

	cancel = (e) => {
		const { onCancel } = this.props;
		onCancel && onCancel(e);
	}

	render() {
		const { itemHeight, rowCount } = this.props;
		return (
		<div className="picker-container">
			<div className="picker-button-panel">
				<button onClick={this.cancel}>取消</button>
				<button onClick={this.confirm}>确定</button>
			</div>
			<div className="picker-wrapper" style={{height: `${itemHeight * rowCount}px`}}>
				{this.renderProvinceCityArea()}
			</div>
		</div>
		);
	}
}
Picker.propTypes = {
  defaultText: PropTypes.array,
  defaultSelected: PropTypes.array,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  rowCount: PropTypes.number,
  itemHeight: PropTypes.number,
}