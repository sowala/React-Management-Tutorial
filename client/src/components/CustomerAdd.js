import React, {Component} from 'react';
import {post} from 'axios';

//axios()
class CustomerAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) =>{
        e.preventDefault()
        this.addCustomer()
            .then((response)=>{
                this.props.stateRefresh();
                // console.log(response.data)
            }) // then 함수 성공이냐 실패이냐를 확인하기 위한 
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        // window.location.reload();
        
    }

    handleFileChage = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value,
        })
    }

    handleValuechage = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    addCustomer = () =>{
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers:{
                'contend-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChage}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValuechage}/><br/>
                생일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValuechage}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValuechage}/><br />
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValuechage}/><br />
                <button type="submit">추가하기</button>
            </form>
        );
    }
}

export default CustomerAdd;