import React from 'react';
import ReactDOM from 'react-dom';
import areaData from './area-data';
import Picker from './picker';
import './index.css';
export default class AreaSelector extends React.Component {
	state = {close: false};
	confirm = (text, selected) => {
		const { onChange } = this.props;
		this.setState({close: true}, () => {
			setTimeout(() => {
				this.setState({close: false});
				onChange && onChange(text, selected);
			}, 300);
		});
	}

	cancel = (e) => {
		const { onCancel } = this.props;
		this.setState({close: true}, () => {
			setTimeout(() => {
				this.setState({close: false});
				onCancel && onCancel(e);
			}, 300);
		});
  }

  rendPicker() {
    const { defaultText, itemHeight, rowCount, defaultSelected, show } = this.props;
		return ReactDOM.createPortal(
      <div className="area-selector-container">
        <div className="mask" onClick={this.cancel} />
        <div className={`picker ${show && !this.state.close ? "animation-open" : null} ${this.state.close ? "animation-close": null}`}>
          <Picker defaultText={defaultText}
                  itemHeight={itemHeight}
                  rowCount={rowCount}
                  data={areaData}
                  defaultSelected={defaultSelected}
                  onChange={this.confirm}
                  onCancel={this.cancel}/>
        </div>
			</div>,
			document.querySelector('body')
		);
	}

	render() {
    const { show } = this.props;
    return (
      <React.Fragment>
        { show ? this.rendPicker() : null }
      </React.Fragment> 
    )
	}
}
