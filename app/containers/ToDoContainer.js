var React = require('react');
var ReactDOM = require('react-dom');
var ToDoItem = require('../components/ToDoItem');
var FooterContainer = require('./FooterContainer');
require('../styles/main.css');

class ToDoContainer extends React.Component {
	constructor(){
		super();
		this.state = {
			toDos: [],
			filter: "all"
		}
	}

	render(){
		const toDoList = this._getToDos()
		const footer = this._getFooter()
		const checkAll = this._getCheckAll()
		return (
			<div className="container">
				<h1 className="main-header">todos</h1>
				<div className="toDoBox">
					{checkAll}
					<input
						className="toDoInput"
						onKeyPress={this._submitToDo.bind(this)}
						placeholder="What needs to be done?" />
					{toDoList}
					{footer}
				</div>
			</div>
		)
	}

	_filterArrayHelper(){
		var filteredArray;
		switch(this.state.filter) {
			case "active":
				filteredArray = this.state.toDos.filter((toDo ) => {
					return ( toDo.completed === false )
				})
				break;
			case "completed":
				filteredArray = this.state.toDos.filter((toDo ) => {
					return ( toDo.completed === true )
				})
				break;
			default:
				filteredArray = this.state.toDos
		}
		return filteredArray;
	}

	_getToDos(){
		var filteredArray = this._filterArrayHelper();
		return (
				filteredArray.map((toDo, index) => {
				return (
					<ToDoItem
						deleteToDo = {this._handleDeleteToDo.bind(this)}
						selectCheckBox = {this._handleCheckBoxes.bind(this)}
						toDo = {toDo}
						key = {index} />
				)
			})
		)
	}

	_getFooter(){
		var arrayOfActiveItems = this.state.toDos.filter((toDo ) => {
			return ( toDo.completed === false )
		})
		var arrayOfCompletedItems = this.state.toDos.filter((toDo ) => {
			return ( toDo.completed === true )
		})

		if (this.state.toDos.length > 0) {
			return <FooterContainer
				filter={this.state.filter}
				changeFilter={this._handleChangeFilter.bind(this)}
				toDoCounter={arrayOfActiveItems.length}
				arrayOfCompletedItemsExist={arrayOfCompletedItems.length > 0}
				clearCompleted={this._handleClearCompleted.bind(this)}/>
		}
	}

	_getCheckAll(){
		var arrayOfActiveItems = this.state.toDos.filter((toDo ) => {
			return ( toDo.completed === false )
		})
		if (this.state.toDos.length > 0 && arrayOfActiveItems.length === 0) {
			return (
				<span className="glyphicon glyphicon-chevron-down check-all-icon darker-icon" onClick={this._handleSelectAllCheckBoxes.bind(this)} aria-hidden="true"></span>
			)
		} else if (this.state.toDos.length > 0) {
			return (
				<span className="glyphicon glyphicon-chevron-down check-all-icon" onClick={this._handleSelectAllCheckBoxes.bind(this)} aria-hidden="true"></span>
			)
		}
	}

	_submitToDo(event){
		if (event.which == 13) {
			this.setState({
				toDos: this.state.toDos.concat([{
					task: event.target.value,
					completed: false
				}])
			})
			event.target.value = ""
		}
	}

	_handleDeleteToDo(deletedToDo,event){
		// Create a new array of toDos with spread operator
		// -> Does not modify existing toDo state (thus complying w functional programming principles & allows us to use the existing state of toDos for comparison)
		// -> React knows that there has been a change in the DOM (if you are simply referencing the existing DOM, it would have to check for changes)
		var toDos = [...this.state.toDos]
		var deletedToDoIndex = toDos.indexOf(deletedToDo)
		toDos.splice(deletedToDoIndex,1)
		this.setState({
			toDos: toDos
		})
	}

	_handleCheckBoxes(toDo,event){
		var toDos = [...this.state.toDos]
		var checkedToDo = {
			task: toDo.task,
			completed: !toDo.completed
		}
		var toDoIndex = toDos.indexOf(toDo)
		toDos.splice(toDoIndex,1,checkedToDo)
		this.setState({
			toDos: toDos
		})
	}

	_handleSelectAllCheckBoxes(){
		// if everything is checked, uncheck everything
		var arrayOfActiveItems = this.state.toDos.filter((toDo ) => {
			return ( toDo.completed === false )
		})
		var modifiedToDos;
		if (arrayOfActiveItems.length === 0) {
			var modifiedToDos = this.state.toDos.map( (toDo)=>{
				toDo.completed	= false
				return toDo
			})
		} else {
			// else check everything
			var modifiedToDos = this.state.toDos.map( (toDo)=>{
				toDo.completed	= true
				return toDo
			})
		}
		this.setState({
			toDos: modifiedToDos
		})
	}

	_handleChangeFilter(filterSelection){
		this.setState({
			filter: filterSelection
		})
	}

	_handleClearCompleted(){
		// remove all elements in the completed array from the to do array
		function difference(source, toRemove) {
			//returns the items which satisfy the condition
			return source.filter(function(toDo){
				//ret true for elements not in toremovve
					return toRemove.indexOf(toDo) == -1;
			});
		}

		var arrayOfCompletedItems = this.state.toDos.filter((toDo ) => {
			return ( toDo.completed === true )
		})

		var arrayExcludingCompletedItems = difference(this.state.toDos,arrayOfCompletedItems)

		this.setState({
			toDos: arrayExcludingCompletedItems
		})

	}

}

module.exports = ToDoContainer
