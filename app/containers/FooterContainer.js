var React = require('react');
let PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');
require('../styles/main.css');

class FooterContainer extends React.Component {
	render(){
		var footerTabs = this.getActiveTab()
		var item;
		if (this.props.toDoCounter === 0 || this.props.toDoCounter === 1) {
			item = 'item'
		} else {
			item = 'items'
		}
		var clearCompleted = this.getClearCompleted()
		return (
			<div className="footer">
				<p className="footerCounter">{`${this.props.toDoCounter} ${item} left to do`}</p>
				{footerTabs}
				{clearCompleted}
			</div>
		)
	}

	getActiveTab(){
		switch(this.props.filter) {
    case "active":
			return (
				<div className="footer-tabs-box">
					<div className="footer-tabs" onClick={this.props.changeFilter.bind(this,'all')}>all</div>
					<div className="footer-tabs active-tabs" onClick={this.props.changeFilter.bind(this,'active')}>active</div>
					<div className="footer-tabs" onClick={this.props.changeFilter.bind(this,'completed')}>completed</div>
				</div>
      )
    case "completed":
			return (
				<div className="footer-tabs-box">
					<div className="footer-tabs" onClick={this.props.changeFilter.bind(this,'all')}>all</div>
					<div className="footer-tabs" onClick={this.props.changeFilter.bind(this,'active')}>active</div>
					<div className="footer-tabs active-tabs" onClick={this.props.changeFilter.bind(this,'completed')}>completed</div>
				</div>
      )
    default:
			return (
				<div className="footer-tabs-box">
					<div className="footer-tabs active-tabs" onClick={this.props.changeFilter.bind(this,'all')}>all</div>
					<div className="footer-tabs" onClick={this.props.changeFilter.bind(this,'active')}>active</div>
					<div className="footer-tabs" onClick={this.props.changeFilter.bind(this,'completed')}>completed</div>
				</div>
			)
		}
	}

	getClearCompleted(){
		// if there are items that are completed show this button
		if (this.props.arrayOfCompletedItemsExist) {
			return (
				<p className="footerClearComplete"
					 onClick={this.props.clearCompleted.bind(this)}>
					Clear completed
				</p>
			)
		}
	}

}

FooterContainer.propTypes = {
	changeFilter: React.PropTypes.func.isRequired,
	filter: React.PropTypes.string.isRequired,
	toDoCounter: React.PropTypes.number.isRequired,
	arrayOfCompletedItemsExist: React.PropTypes.bool.isRequired,
	clearCompleted: React.PropTypes.func.isRequired
}

module.exports = FooterContainer
