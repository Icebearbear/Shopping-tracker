import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../redux/actions';
import { getTodos } from '../redux/selectors';
import '../css/style.css'
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// class ViewTodo extends React.Component{
    const ViewTodo = ({values, toggleTodo}) => {

        //calculate percentage of finished task
        function progressValue(values){
            const arrNo = 100/values.length
            const notDoneNo = values.filter(todo => todo.completed === true).length
            return 0 + Math.round((notDoneNo*arrNo) * 10) / 10
            // return 100
        }
        
        return(
            <div class="column">
                {/* <div class="dropdown is-hoverable">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                        <span>Sort by</span>
                        <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                        <div class="dropdown-content">
                        <div class="dropdown-item">
                        <a href="#" class="dropdown-item">
                            Day
                        </a>
                        <a href="#" class="dropdown-item">
                            Week
                        </a>
                        <a href="#" class="dropdown-item">
                            Month
                        </a>
                        </div>
                        </div>
                    </div>
                </div> */}
                <progress class="progress is-primary is-medium show-value" value={progressValue(values)} max="100"></progress>

                <ul>{values && values.length ? 

                    values.map(todo => {
                        // debugger;
                        return(
                            <li className="todo-item" onClick={() => {
                                // debugger;
                                console.log(toggleTodo(todo.id));
                                // debugger;
                                console.log("tog ",todo.completed === true);
                            }}>
                                <span>   
                                    {todo.completed ? "yes" : "no"  }{" "}
                                    {todo.content}{" "}
                                    {todo.date.getDate()} {months[todo.date.getMonth()]} {todo.date.getFullYear()}
                                </span>
                            </li>
                        ) 
                })
                : "No tasks today"} 
                </ul> 
            </div>
        )
        }

// it takes the entire redux states and returns object, key -> props namees, value -> props value 
const mapStateToProps = (state) => {
    const val2 = getTodos(state)
    return {
        values : state.todoReducer.task
    }
  }
export default connect(mapStateToProps, {toggleTodo})(ViewTodo)