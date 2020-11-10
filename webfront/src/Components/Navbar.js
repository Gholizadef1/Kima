
import AsyncSelect from 'react-select/async';
import React, {PureComponent} from 'react';
class Navbar extends PureComponent{
  state = {selectedUsers:[]}
  onChange = selectedUsers => {
    this.setState({
      selectedUsers: selectedUsers || []
    })
  }
  loadOptions = async (inputText,callback) =>{
    const response = await fetch(`http://localhost:3001/api/users?first_name_like=${inputText}`)
    const json = await response.json()
    callback (json.map(i =>({label:i.first_name,value:i.id,avatar:i.avatar})))
  }
  renderEveryUser = user =>{
    return <img src= {user.avatar} alt='user avatar'/>
  }
  render(){
    return(<div className = 'users'>
      <div className = 'avatar'>
        {this.state.selectedUsers.map(this.renderEveryUser)}
      </div>
      <AsyncSelect
      isMulti
      value = {this.state.selectedUsers}
      onChange = {this.onChange}
      placeholder = {'type sth...'}
      loadOptions = {this.loadOptions}
     />
    </div>)
  }
}
export default Navbar;