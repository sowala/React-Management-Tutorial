import React,{Component} from 'react';
import './App.css';
import Customer from './components/Customer'

const customers=[
  {
    id: 1,
    image: 'https://placeimg.com/64/64/1',
    name: '도라에몽',
    birthday: '19/12/14',
    gender: "남자",
    job: '대학생'
  },
  {
    id: 2,
    image: 'https://placeimg.com/64/64/2',
    name: '홍길동',
    birthday: '19/12/14',
    gender: "남자",
    job: '대학생'
  },
  {
    id: 3,
    image: 'https://placeimg.com/64/64/3',
    name: '피카츄',
    birthday: '19/12/14',
    gender: "몬스터",
    job: '대학생'
  }
]


class App extends Component{
  render(){
    return(
      <div>
        {
          customers.map(c =>{
            console.log(c)
            return(
              <Customer
                key={c.id} // map 함수를 쓸때는 key 속성 값을 넣어주어야 한다.
                image={c.image}
                id={c.id}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            )
          })
        }
        
      </div>
      
    )
  }
}

export default App;
