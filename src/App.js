import React, {Component} from 'react'
import './App.css'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      magazine: [
        {id: 0, itemsName: 'bag', itemImg: 'https://crossroad.com/img/items/76/55/25/default.jpg', conts: 4, price: 12},
        {id: 1, itemsName: 'note', itemImg: 'https://crossroad.com/img/items/76/29/81/default.jpg', conts: 2, price: 7},
        {id: 2, itemsName: 'pen', itemImg: 'https://crossroad.com/img/items/76/56/21/default.jpg', conts: 7, price: 9},
        {id: 3, itemsName: 'chair', itemImg: 'https://crossroad.com/img/items/75/84/05/default.jpg', conts: 8, price: 22},
        {id: 4, itemsName: 'desk', itemImg: 'https://crossroad.com/img/items/76/55/25/default.jpg', conts: 5, price: 15}
      ],
      basket: [],
      total: 0,
      sum:0,
      l: []

    }
  }





  addProduct(a,e){

    let k = this.state.basket.find(i=>i.id==a.id)
    if(k==undefined) {
      let x=Object.assign({}, a)
      x.quantity=1
      this.state.basket.push(x)
      a.conts--

    } else{
      if(a.conts==1){
        this.state.magazine=this.state.magazine.filter(x=>x.id!=a.id)
      }
      k.quantity++
      a.conts--
    }
    this.state.l = []
    this.state.basket.map(j=>{

      this.state.l.push(j.price*j.quantity)

    })

    this.state.l.map(k=>{
      return this.state.total =    this.state.l.reduce((a,b)=>b+a)
    })




    this.setState({})

  }

  deletProduct(v){
    var h = this.state.basket.find(i => i.id == v.id)

    if (h == undefined){

      this.state.magazine = this.state.magazine.filter(i=>i.id!==v.id);

    }else{
      this.state.total = this.state.total - (h.price*h.quantity)
    }
    this.state.basket = this.state.basket.filter(o => o.id !== v.id)


    this.setState({})
  }

  onDeleteHandler(a) {

    let b = this.state.magazine.find(i=>i.id == a.id);
    let c = this.state.basket.find(i=>i.id == a.id)

    if(b==undefined){
      let x=Object.assign({}, a)
      this.state.magazine.push(x)
    }else{
      b.conts = b.conts+a.quantity
    }
    this.state.basket =  this.state.basket.filter(o => o.id !== a.id);
    this.state.total = this.state.total - (c.price*c.quantity)
    this.setState({
    })

  }

  changeConts (a,e) {
    var b = this.state.magazine.find(i=>i.id == a.id)

    let ket=a.quantity
    a.quantity=e.target.value



    if(b == undefined){
      let x = Object.assign({},a)
      x.conts = 1
      this.state.magazine.push(x)
    }
    else if(a.quantity==0){
      this.state.basket=this.state.basket.filter(i=>i.id!=a.id)
      b.conts = a.conts
    }
    else if(b.conts>1 ){
      b.conts=this.state.basket.reduce((a,b = this.state.magazine.find(i=>i.id == a.id))=>b.conts-b.quantity,0);


    }
    else if(b.conts==1 && a.quantity-1 == ket){

      this.state.magazine=this.state.magazine.filter(i=>i.id!=a.id)

    }
    else {

      b.conts++


    }
    this.state.l = []
    this.state.basket.map(j=>{

      this.state.l.push(j.price*j.quantity)

    })

    this.state.l.map(k=>{
      return this.state.total = this.state.l.reduce((a,b)=>b+a)
    })


    if(this.state.l.length == 0 ){
      this.state.total = 0
    }


    this.setState({})
  }





  render() {
    return(
        <div className={'text-center'}>
          <h2> Online Magazine </h2>
          <table className={'table table-bordered table-hover'}>
            <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>conts</th>
              <th colSpan={3}>Price</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.magazine.map((v, i) =>
                  <tr key={i}>
                    <td>{v.itemsName}</td>
                    <td>
                      <img src={v.itemImg} alt="itemsName"/>
                    </td>
                    <td>{v.conts}</td>
                    <td>{v.price}</td>
                    <td>
                      <button className={'btn btn-success'} onClick={this.addProduct.bind(this,v)}>Add</button>
                    </td>
                    <td>
                      <button className={'btn btn-danger'} onClick={this.deletProduct.bind(this,v)}>Delete</button>
                    </td>
                  </tr>
              )
            }
            </tbody>
          </table>
          <h2> Cart </h2>
          <table className={'table table-bordered table-hover'}>
            <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>conts</th>
              <th colSpan={3}>Price</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.basket.map((a, b) =>

                  <tr key={b}>
                    <td>{a.itemsName}</td>
                    <td>
                      <img src={a.itemImg} alt="itemsName"/>
                    </td>
                    <td>
                      <input className={a} type='number' min="0" max={a.conts} value={a.quantity} onChange={this.changeConts.bind(this,a)}/>
                    </td>
                    <td>{a.quantity*a.price}$</td>
                    <td>
                      <button className={'btn btn-danger'} onClick={this.onDeleteHandler.bind(this, a)}>Delete</button>
                    </td>
                  </tr>



              )
            }
            </tbody>
          </table>
          <div className={'total'}>
            <b>Total Price</b>
            <p>{this.state.total}</p>
          </div>
        </div>
    )
  }
}