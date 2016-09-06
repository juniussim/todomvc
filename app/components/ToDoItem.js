var React = require('react');
let PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');
require('../styles/main.css');

class ToDoItem extends React.Component {
	render(){
		var crossedOut;
		if (this.props.toDo.completed) {
			crossedOut = "toDoTask-completed"
		} else {
			crossedOut = ""
		}

		return (
			<div className="toDoItem">
				<div className="checkbox-container">
					<CheckBox completed={this.props.toDo.completed} selectCheckBox={this.props.selectCheckBox} toDo={this.props.toDo} />
				</div>
			 <p className={crossedOut} >{this.props.toDo.task}</p>
				<div className='cancel' onClick={this.props.deleteToDo.bind( this, this.props.toDo )}>
					X
				</div>
			</div>
		)
	}
}

ToDoItem.propTypes = {
	selectCheckBox: React.PropTypes.func.isRequired,
	deleteToDo: React.PropTypes.func.isRequired,
	toDo: React.PropTypes.object.isRequired
}

const CheckBox = (props) => {
	return (
		props.completed
		? <div className="checkbox checkbox-completed" onClick={ () => { props.selectCheckBox(props.toDo) } }></div>
		: <div className="checkbox" onClick={ () => { props.selectCheckBox(props.toDo) } }></div>
	)
}

CheckBox.propTypes = {
	selectCheckBox: React.PropTypes.func.isRequired,
	toDo: React.PropTypes.object.isRequired,
	completed: React.PropTypes.bool.isRequired
}

module.exports = ToDoItem;
